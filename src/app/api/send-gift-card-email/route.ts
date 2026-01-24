import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import path from 'path';
import imaps from 'imap-simple';
import MailComposer from 'nodemailer/lib/mail-composer';

/**
 * Compile raw email message from Nodemailer mail options
 */
async function compileRawMessage(mailOptions: nodemailer.SendMailOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const mail = new MailComposer(mailOptions);

    mail.compile().build((err: any, message: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(message.toString('ascii'));
      }
    });
  });
}

/**
 * Append email message to IMAP Sent folder
 */
async function appendToSentFolder(rawMessage: string): Promise<void> {
  const email = process.env.WEBMAIL_EMAIL;
  const password = process.env.WEBMAIL_PASS;

  if (!email || !password) {
    throw new Error('WEBMAIL_EMAIL and WEBMAIL_PASS environment variables are required');
  }

  const config = {
    imap: {
      user: email,
      password: password,
      host: 'mail.delhihousecafe.co.uk',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 3000,
    },
  };

  const connection = await imaps.connect(config);

  try {
    await connection.openBox('Sent');
    await connection.append(rawMessage, { mailbox: 'Sent' });
  } finally {
    connection.end();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderEmail, recipientEmail, giftCardCode, amount, productName } = body;

    if (!senderEmail || !recipientEmail || !giftCardCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter using the provided credentials
    const transporter = nodemailer.createTransport({
      host: 'mail.delhihousecafe.co.uk',
      port: 465, // Standard secure SMTP port
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.WEBMAIL_EMAIL,
        pass: process.env.WEBMAIL_PASS,
      },
    });

    // Generate PDF
    const templatePath = path.join(process.cwd(), 'public', 'gift-card-template.pdf');
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Rye-Regular.ttf');

    const [templateBytes, fontBytes] = await Promise.all([
      fs.readFile(templatePath),
      fs.readFile(fontPath),
    ]);

    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);
    const ryeFont = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    // Use second page if available, otherwise first
    const targetPage = pages.length > 1 ? pages[1] : pages[0];
    const { width, height } = targetPage.getSize();

    // Color: #ddab5a -> RGB(221, 171, 90) -> (0.866, 0.670, 0.352)
    const goldColor = rgb(0.866, 0.670, 0.352);

    // Text to draw
    const amountText = `£${amount}`;
    const codeText = `${giftCardCode}`;
    const textSize = 12; // Reduced from 14

    // Calculate X to center the amount
    const amountWidth = ryeFont.widthOfTextAtSize(amountText, textSize);
    const amountX = (width - amountWidth) / 2;

    // Calculate X to center the code
    const codeWidth = ryeFont.widthOfTextAtSize(codeText, textSize);
    const codeX = (width - codeWidth) / 2;

    // Calculate Y positions
    // Header is around top.
    // Moved up to reduce margin (closer to header)
    const amountY = 100; // Was 90
    const codeY = 85;    // Was 70

    targetPage.drawText(amountText, {
      x: amountX,
      y: amountY,
      size: textSize,
      font: ryeFont,
      color: goldColor,
    });

    targetPage.drawText(codeText, {
      x: codeX,
      y: codeY,
      size: textSize,
      font: ryeFont,
      color: goldColor,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    // 1. Email to Sender (Confirmation)
    const senderMailOptions = {
      from: '"Delhi House Cafe" <gift.card@delhihousecafe.co.uk>',
      to: senderEmail,
      subject: `Purchase Confirmation: ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #d4af37;">Delhi House Cafe</h1>
          </div>
          
          <h2 style="color: #333;">Purchase Successful!</h2>
          
          <p>Dear Customer,</p>
          
          <p>Thank you for your purchase. Your gift card has been successfully processed and sent to the recipient.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Amount:</strong> £${amount}</p>
            <p><strong>Gift Card Code:</strong> <span style="font-family: monospace; font-size: 1.2em; font-weight: bold; color: #d4af37;">${giftCardCode}</span></p>
            <p><strong>Recipient:</strong> ${recipientEmail}</p>
          </div>
          
          <p>A copy of the gift card is attached to this email for your records.</p>
          
          <p>If you have any questions, please contact us.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
            <p>&copy; ${new Date().getFullYear()} Delhi House Cafe. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'GiftCard.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // 2. Email to Recipient (Gift Card + PDF)
    const recipientMailOptions = {
      from: '"Delhi House Cafe" <gift.card@delhihousecafe.co.uk>',
      to: recipientEmail,
      subject: `You've received a Gift Card!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #d4af37;">Delhi House Cafe</h1>
          </div>
          
          <h2 style="color: #333;">You've received a Gift Card!</h2>
          
          <p>Greetings,</p>
          
          <p>Here's a gift card for you!</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Amount:</strong> £${amount}</p>
            <p><strong>Gift Card Code:</strong> <span style="font-family: monospace; font-size: 1.2em; font-weight: bold; color: #d4af37;">${giftCardCode}</span></p>
          </div>

          <p>Please find your official gift card attached as a PDF.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
            <p>&copy; ${new Date().getFullYear()} Delhi House Cafe. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'GiftCard.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // 3. Email to Owner (Notification)
    const ownerMailOptions = {
      from: '"Delhi House Cafe" <gift.card@delhihousecafe.co.uk>',
      to: 'delhihousecafe@gmail.com, bhavyajain817@gmail.com',
      subject: `New Gift Card Purchase: ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #d4af37;">Delhi House Cafe</h1>
          </div>
          
          <h2 style="color: #333;">New Gift Card Sold!</h2>
          
          <p>A new gift card has been purchased. Here are the details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Amount:</strong> £${amount}</p>
            <p><strong>Gift Card Code:</strong> <span style="font-family: monospace; font-size: 1.2em; font-weight: bold; color: #d4af37;">${giftCardCode}</span></p>
            <p><strong>Purchaser Email:</strong> ${senderEmail}</p>
            <p><strong>Recipient Email:</strong> ${recipientEmail}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>A copy of the gift card is attached.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'GiftCard.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // Compile raw messages for IMAP storage
    const [senderRawMessage, recipientRawMessage, ownerRawMessage] = await Promise.all([
      compileRawMessage(senderMailOptions),
      compileRawMessage(recipientMailOptions),
      compileRawMessage(ownerMailOptions),
    ]);

    // Send all three emails via SMTP
    await Promise.all([
      transporter.sendMail(senderMailOptions),
      transporter.sendMail(recipientMailOptions),
      transporter.sendMail(ownerMailOptions)
    ]);

    // Append both emails to Sent folder via IMAP
    try {
      await Promise.all([
        appendToSentFolder(senderRawMessage),
        appendToSentFolder(recipientRawMessage),
        appendToSentFolder(ownerRawMessage),
      ]);
    } catch (imapError) {
      // Log IMAP error but don't fail the request since emails were already sent
      console.error('Error appending to Sent folder (emails were still sent):', imapError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
