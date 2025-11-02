const PDFDocument = require('pdfkit');
const fs = require('fs');

function createPDF() {
    console.log('📄 Creating PDF document...');

    // Create a new PDF document
    const doc = new PDFDocument({
        size: 'A4',
        margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }
    });

    // Output file
    const outputPath = 'output.pdf';
    doc.pipe(fs.createWriteStream(outputPath));

    // Title
    doc.fontSize(24)
       .fillColor('#2c3e50')
       .font('Helvetica-Bold')
       .text('Sample PDF Document', { align: 'center' });

    doc.moveDown(1);

    // Subtitle
    doc.fontSize(14)
       .fillColor('#7f8c8d')
       .font('Helvetica-Oblique')
       .text('Generated with PDFKit', { align: 'center' });

    doc.moveDown(2);

    // Add a colored box
    doc.roundedRect(50, doc.y, doc.page.width - 100, 100, 10)
       .fillAndStroke('#3498db', '#3498db');

    doc.fontSize(16)
       .fillColor('white')
       .font('Helvetica-Bold')
       .text('Welcome!', 50, doc.y - 80, { width: doc.page.width - 100, align: 'center' });

    doc.fontSize(12)
       .fillColor('white')
       .font('Helvetica')
       .text('This is a simple PDF created with Node.js', 50, doc.y - 50, { width: doc.page.width - 100, align: 'center' });

    doc.moveDown(4);

    // Content section
    doc.fontSize(16)
       .fillColor('#2c3e50')
       .font('Helvetica-Bold')
       .text('About This Document');

    doc.moveDown(0.5);

    doc.fontSize(11)
       .fillColor('#34495e')
       .font('Helvetica')
       .text(
           'This PDF was generated using PDFKit, a powerful PDF generation library for Node.js. ' +
           'PDFKit allows you to create complex documents with text, images, shapes, and more.',
           { align: 'justify', lineGap: 4 }
       );

    doc.moveDown(1);

    // Features list
    doc.fontSize(14)
       .fillColor('#2c3e50')
       .font('Helvetica-Bold')
       .text('Key Features:');

    doc.moveDown(0.5);

    const features = [
        'Create multi-page documents',
        'Add text with various fonts and styles',
        'Insert images and graphics',
        'Draw shapes and lines',
        'Support for colors and gradients',
        'Generate tables and lists',
        'Add headers and footers',
        'Create interactive forms'
    ];

    features.forEach(feature => {
        doc.fontSize(11)
           .fillColor('#2c3e50')
           .font('Helvetica')
           .text(`• ${feature}`, { lineGap: 3 });
    });

    doc.moveDown(2);

    // Info box
    const infoBoxY = doc.y;
    doc.roundedRect(50, infoBoxY, doc.page.width - 100, 60, 5)
       .fillAndStroke('#ecf0f1', '#ecf0f1');

    doc.rect(50, infoBoxY, 4, 60)
       .fillAndStroke('#3498db', '#3498db');

    doc.fontSize(10)
       .fillColor('#2c3e50')
       .font('Helvetica-Bold')
       .text('💡 Tip: ', 60, infoBoxY + 15, { continued: true })
       .font('Helvetica')
       .text('You can customize this template to create any type of document you need!', { width: doc.page.width - 120 });

    doc.moveDown(3);

    // Add a new page
    doc.addPage();

    doc.fontSize(20)
       .fillColor('#2c3e50')
       .font('Helvetica-Bold')
       .text('Second Page', { align: 'center' });

    doc.moveDown(1);

    doc.fontSize(11)
       .fillColor('#34495e')
       .font('Helvetica')
       .text(
           'This is the second page of the document. You can add as many pages as you need. ' +
           'Each page can have different content, layouts, and styles.',
           { align: 'justify', lineGap: 4 }
       );

    doc.moveDown(2);

    // Add some shapes
    doc.fontSize(14)
       .fillColor('#2c3e50')
       .font('Helvetica-Bold')
       .text('Visual Elements:');

    doc.moveDown(1);

    // Draw some colored rectangles
    const colors = ['#e74c3c', '#f39c12', '#2ecc71', '#9b59b6'];
    const startX = 100;
    const startY = doc.y;
    const boxSize = 80;
    const spacing = 20;

    colors.forEach((color, index) => {
        const x = startX + (index * (boxSize + spacing));
        doc.roundedRect(x, startY, boxSize, boxSize, 5)
           .fillAndStroke(color, color);
    });

    doc.moveDown(8);

    // Footer
    doc.fontSize(9)
       .fillColor('#95a5a6')
       .font('Helvetica-Oblique')
       .text(
           `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
           50,
           doc.page.height - 50,
           { align: 'center' }
       );

    // Finalize the PDF
    doc.end();

    console.log(`✅ PDF created successfully: ${outputPath}`);
    console.log('📍 Location: ' + require('path').resolve(outputPath));
}

// Execute
try {
    createPDF();
    console.log('\n🎉 Process completed!');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
