import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs/promises';
import path from 'path';

async function generateTestPdf() {
    try {
        console.log('Starting PDF generation test...');

        const giftCardCode = 'TEST-CODE-1234';
        const amount = '50.00';

        const templatePath = path.join(process.cwd(), 'public', 'gift-card-template.pdf');
        const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Rye-Regular.ttf');

        console.log(`Loading template from: ${templatePath}`);
        console.log(`Loading font from: ${fontPath}`);

        const [templateBytes, fontBytes] = await Promise.all([
            fs.readFile(templatePath),
            fs.readFile(fontPath),
        ]);

        const pdfDoc = await PDFDocument.load(templateBytes);
        pdfDoc.registerFontkit(fontkit);
        const ryeFont = await pdfDoc.embedFont(fontBytes);

        const pages = pdfDoc.getPages();
        console.log(`PDF has ${pages.length} pages.`);

        let targetPage = pages[0];
        if (pages.length > 1) {
            targetPage = pages[1];
            console.log('Using second page.');
        }

        const { width, height } = targetPage.getSize();
        console.log(`Page size: ${width} x ${height}`);

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
        // Moved up to reduce margin
        const amountY = 100; // Was 90
        const codeY = 85;    // Was 70

        console.log(`Drawing Amount at: ${amountX}, ${amountY}`);
        console.log(`Drawing Code at: ${codeX}, ${codeY}`);

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
        const outputPath = path.join(process.cwd(), 'public', 'test-output.pdf');
        await fs.writeFile(outputPath, pdfBytes);

        console.log(`PDF generated successfully at: ${outputPath}`);

    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

generateTestPdf();
