const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
    console.log('📄 Démarrage de la génération du PDF...');

    let browser;
    try {
        // Lancer Puppeteer
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });

        console.log('✓ Navigateur lancé');

        const page = await browser.newPage();

        // Lire le fichier HTML
        const htmlPath = path.join(__dirname, 'securite_travailleurs.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        // Charger le contenu HTML
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        console.log('✓ Contenu HTML chargé');

        // Options du PDF
        const pdfOptions = {
            path: 'La_Securite_des_Travailleurs.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            },
            preferCSSPageSize: true
        };

        // Générer le PDF
        await page.pdf(pdfOptions);

        console.log('✓ PDF généré avec succès : La_Securite_des_Travailleurs.pdf');

        await browser.close();
        console.log('✓ Processus terminé');

        return true;

    } catch (error) {
        console.error('❌ Erreur lors de la génération du PDF:', error.message);
        if (browser) {
            await browser.close();
        }
        return false;
    }
}

// Exécuter la fonction
generatePDF().then(success => {
    if (success) {
        console.log('\n🎉 Document PDF créé avec succès !');
        console.log('📍 Emplacement: La_Securite_des_Travailleurs.pdf');
    } else {
        console.log('\n❌ Échec de la génération du PDF');
        process.exit(1);
    }
}).catch(error => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
});
