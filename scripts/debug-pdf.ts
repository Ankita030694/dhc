import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

async function debugPdf() {
    try {
        console.log('Starting PDF DEBUG generation...');

        const templatePath = path.join(process.cwd(), 'public', 'gift-card-template.pdf');
        const templateBytes = await fs.readFile(templatePath);

        const pdfDoc = await PDFDocument.load(templateBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();

        console.log(`Total pages: ${pages.length}`);

        // Iterate over ALL pages to see if we can draw on any of them
        pages.forEach((page, index) => {
            const { width, height } = page.getSize();
            console.log(`Page ${index + 1}: ${width} x ${height}`);

            // Draw a big red rectangle in the center
            page.drawRectangle({
                x: 50,
                y: 50,
                width: width - 100,
                height: height - 100,
                borderColor: rgb(1, 0, 0),
                borderWidth: 5,
            });

            // Draw text in the center
            page.drawText(`DEBUG TEXT PAGE ${index + 1}`, {
                x: 100,
                y: height / 2,
                size: 50,
                font: helveticaFont,
                color: rgb(1, 0, 0), // Red color
            });

            // Draw text at 0,0
            page.drawText(`Origin (0,0)`, {
                x: 0,
                y: 0,
                size: 20,
                font: helveticaFont,
                color: rgb(0, 0, 1), // Blue
            });
        });

        const pdfBytes = await pdfDoc.save();
        const outputPath = path.join(process.cwd(), 'public', 'debug-output.pdf');
        await fs.writeFile(outputPath, pdfBytes);

        console.log(`Debug PDF saved to: ${outputPath}`);

    } catch (error) {
        console.error('Error:', error);
    }
}

debugPdf();
