const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePDF() {
    console.log('📄 Démarrage de la génération du PDF avec PDFKit...');

    // Créer un nouveau document PDF
    const doc = new PDFDocument({
        size: 'A4',
        margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        },
        info: {
            Title: 'La Sécurité des Travailleurs',
            Author: 'Guide Éducatif',
            Subject: 'Sécurité au travail',
            Keywords: 'sécurité, travail, prévention, risques professionnels'
        }
    });

    // Créer un flux d'écriture
    const outputPath = 'La_Securite_des_Travailleurs.pdf';
    doc.pipe(fs.createWriteStream(outputPath));

    // Couleurs
    const blueColor = '#1a5490';
    const darkBlueColor = '#2c5f8d';
    const textColor = '#333333';
    const grayColor = '#555555';

    // ===== PAGE DE TITRE =====
    doc.fontSize(32)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('LA SÉCURITÉ DES', { align: 'center' })
       .moveDown(0.3)
       .text('TRAVAILLEURS', { align: 'center' })
       .moveDown(1);

    doc.fontSize(14)
       .fillColor(grayColor)
       .font('Helvetica-Oblique')
       .text('Guide pratique pour un environnement de travail sûr et sain', { align: 'center' })
       .moveDown(2);

    // Ajouter une icône simulée avec un rectangle
    const boxX = doc.page.width / 2 - 150;
    const boxY = doc.y;
    doc.roundedRect(boxX, boxY, 300, 120, 10)
       .fillAndStroke('#667eea', '#667eea');

    doc.fontSize(50)
       .fillColor('white')
       .text('⚠️', boxX, boxY + 20, { width: 300, align: 'center' });

    doc.fontSize(18)
       .fillColor('white')
       .text('Sécurité et Prévention', boxX, boxY + 80, { width: 300, align: 'center' });

    doc.moveDown(8);

    // Introduction
    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'La sécurité au travail est un enjeu majeur qui concerne chaque employeur et chaque travailleur. ' +
           'Dans un monde professionnel en constante évolution, protéger la santé et la sécurité des employés ' +
           'n\'est pas seulement une obligation légale, mais aussi un investissement dans la productivité et ' +
           'le bien-être collectif. Ce guide présente les principes essentiels pour créer et maintenir un ' +
           'environnement de travail sécuritaire.',
           { align: 'justify', lineGap: 4 }
       );

    // Nouvelle page pour Section 1
    doc.addPage();

    // ===== SECTION 1: LES RISQUES PROFESSIONNELS =====
    doc.fontSize(20)
       .fillColor(darkBlueColor)
       .font('Helvetica-Bold')
       .text('1. Les Risques Professionnels', { continued: false });

    // Ligne de séparation
    doc.moveTo(50, doc.y + 5)
       .lineTo(doc.page.width - 50, doc.y + 5)
       .lineWidth(3)
       .stroke(darkBlueColor);

    doc.moveDown(1);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'Les risques professionnels sont présents dans tous les secteurs d\'activité. Leur identification ' +
           'et leur compréhension constituent la première étape vers un environnement de travail sécurisé.',
           { align: 'justify', lineGap: 4 }
       );

    doc.moveDown(1);

    // Encadré illustratif
    const section1BoxY = doc.y;
    doc.roundedRect(50, section1BoxY, doc.page.width - 100, 80, 8)
       .fillAndStroke('#f093fb', '#f093fb');

    doc.fontSize(40)
       .fillColor('white')
       .text('⚠️', 50, section1BoxY + 10, { width: doc.page.width - 100, align: 'center' });

    doc.fontSize(16)
       .fillColor('white')
       .font('Helvetica-Bold')
       .text('Identification des Risques', 50, section1BoxY + 55, { width: doc.page.width - 100, align: 'center' });

    doc.moveDown(6);

    // Contenu Section 1
    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('Les principaux types de risques :', { continued: false });

    doc.moveDown(0.5);

    const risques = [
        { titre: 'Risques physiques', desc: 'Chutes, glissades, collisions, exposition au bruit excessif, vibrations, températures extrêmes.' },
        { titre: 'Risques chimiques', desc: 'Manipulation de produits toxiques, inhalation de vapeurs dangereuses, contact avec des substances corrosives.' },
        { titre: 'Risques biologiques', desc: 'Exposition à des virus, bactéries, champignons dans certains environnements de travail (hôpitaux, laboratoires).' },
        { titre: 'Risques ergonomiques', desc: 'Postures inadaptées, mouvements répétitifs, port de charges lourdes causant des troubles musculosquelettiques.' },
        { titre: 'Risques psychosociaux', desc: 'Stress chronique, harcèlement, surcharge de travail, manque de reconnaissance.' }
    ];

    risques.forEach(risque => {
        doc.fontSize(11)
           .fillColor(blueColor)
           .font('Helvetica-Bold')
           .text(`• ${risque.titre} : `, { continued: true })
           .fillColor(textColor)
           .font('Helvetica')
           .text(risque.desc, { align: 'justify', lineGap: 3 });
        doc.moveDown(0.5);
    });

    doc.moveDown(0.5);

    // Encadré point clé
    const keyBoxY = doc.y;
    doc.roundedRect(50, keyBoxY, doc.page.width - 100, 50, 5)
       .fillAndStroke('#e3f2fd', '#e3f2fd');

    doc.rect(50, keyBoxY, 4, 50)
       .fillAndStroke(blueColor, blueColor);

    doc.fontSize(10)
       .fillColor(textColor)
       .font('Helvetica')
       .text('💡 Point clé : ', 60, keyBoxY + 15, { continued: true })
       .text('L\'évaluation des risques n\'est pas une démarche ponctuelle, mais un processus continu qui doit s\'adapter aux évolutions de l\'entreprise.');

    doc.moveDown(3);

    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('L\'importance de l\'évaluation des risques :', { continued: false });

    doc.moveDown(0.5);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'Chaque entreprise doit procéder à une évaluation régulière des risques présents sur ses lieux de travail. ' +
           'Cette démarche permet d\'identifier les dangers potentiels, d\'analyser leur probabilité d\'occurrence et ' +
           'leur gravité, puis de mettre en place des mesures préventives adaptées. Le document unique d\'évaluation ' +
           'des risques professionnels (DUERP) est l\'outil central de cette démarche.',
           { align: 'justify', lineGap: 4 }
       );

    // Nouvelle page pour Section 2
    doc.addPage();

    // ===== SECTION 2: LES MESURES DE PRÉVENTION =====
    doc.fontSize(20)
       .fillColor(darkBlueColor)
       .font('Helvetica-Bold')
       .text('2. Les Mesures de Prévention', { continued: false });

    doc.moveTo(50, doc.y + 5)
       .lineTo(doc.page.width - 50, doc.y + 5)
       .lineWidth(3)
       .stroke(darkBlueColor);

    doc.moveDown(1);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'La prévention est la clé pour réduire les accidents du travail et les maladies professionnelles. ' +
           'Elle repose sur des principes concrets et applicables à tous les secteurs.',
           { align: 'justify', lineGap: 4 }
       );

    doc.moveDown(1);

    // Encadré illustratif Section 2
    const section2BoxY = doc.y;
    doc.roundedRect(50, section2BoxY, doc.page.width - 100, 80, 8)
       .fillAndStroke('#4facfe', '#4facfe');

    doc.fontSize(40)
       .fillColor('white')
       .text('🛡️', 50, section2BoxY + 10, { width: doc.page.width - 100, align: 'center' });

    doc.fontSize(16)
       .fillColor('white')
       .font('Helvetica-Bold')
       .text('Protection et Prévention', 50, section2BoxY + 55, { width: doc.page.width - 100, align: 'center' });

    doc.moveDown(6);

    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('Les principes généraux de prévention :', { continued: false });

    doc.moveDown(0.5);

    const preventions = [
        '1. Éviter les risques : Supprimer le danger à la source quand c\'est possible.',
        '2. Évaluer les risques : Analyser ceux qui ne peuvent être évités.',
        '3. Combattre les risques à la source : Agir sur les causes plutôt que sur les conséquences.',
        '4. Adapter le travail à l\'homme : Concevoir les postes de travail en tenant compte des capacités humaines.',
        '5. Tenir compte de l\'évolution technique : Intégrer les innovations pour améliorer la sécurité.',
        '6. Remplacer ce qui est dangereux : Substituer les produits ou procédés dangereux par des alternatives plus sûres.',
        '7. Planifier la prévention : Intégrer la sécurité dans l\'organisation du travail.',
        '8. Prioriser les protections collectives : Privilégier les mesures qui protègent tous les travailleurs.',
        '9. Former et informer : Donner aux travailleurs les instructions appropriées.'
    ];

    preventions.forEach((prevention, index) => {
        const [num, ...rest] = prevention.split(': ');
        doc.fontSize(11)
           .fillColor(blueColor)
           .font('Helvetica-Bold')
           .text(`• ${num}: `, { continued: true })
           .fillColor(textColor)
           .font('Helvetica')
           .text(rest.join(': '), { align: 'justify', lineGap: 2 });
        doc.moveDown(0.3);
    });

    doc.moveDown(0.5);

    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('Équipements de protection :', { continued: false });

    doc.moveDown(0.5);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'Les équipements de protection individuelle (EPI) sont essentiels lorsque les risques ne peuvent être ' +
           'éliminés par d\'autres moyens. Casques, gants, lunettes de protection, chaussures de sécurité, ' +
           'protections auditives et respiratoires doivent être adaptés aux risques identifiés, entretenus ' +
           'régulièrement et portés systématiquement.',
           { align: 'justify', lineGap: 4 }
       );

    // Nouvelle page pour la suite de Section 2 et Section 3
    doc.addPage();

    // Encadré point clé Section 2
    const keyBox2Y = doc.y;
    doc.roundedRect(50, keyBox2Y, doc.page.width - 100, 50, 5)
       .fillAndStroke('#e3f2fd', '#e3f2fd');

    doc.rect(50, keyBox2Y, 4, 50)
       .fillAndStroke(blueColor, blueColor);

    doc.fontSize(10)
       .fillColor(textColor)
       .font('Helvetica')
       .text('💡 Point clé : ', 60, keyBox2Y + 15, { continued: true })
       .text('La formation est la première ligne de défense. Un travailleur bien formé est un travailleur en sécurité.');

    doc.moveDown(3.5);

    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('Formation et sensibilisation :', { continued: false });

    doc.moveDown(0.5);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'La formation continue des employés est indispensable. Elle doit couvrir les procédures de sécurité, ' +
           'l\'utilisation correcte des équipements, les gestes de premiers secours et les comportements à adopter ' +
           'en cas d\'urgence. Des sessions de sensibilisation régulières maintiennent la vigilance et renforcent ' +
           'la culture de sécurité.',
           { align: 'justify', lineGap: 4 }
       );

    doc.moveDown(2);

    // ===== SECTION 3: LE RÔLE DE L'ENTREPRISE ET DU TRAVAILLEUR =====
    doc.fontSize(20)
       .fillColor(darkBlueColor)
       .font('Helvetica-Bold')
       .text('3. Le Rôle de l\'Entreprise et du Travailleur', { continued: false });

    doc.moveTo(50, doc.y + 5)
       .lineTo(doc.page.width - 50, doc.y + 5)
       .lineWidth(3)
       .stroke(darkBlueColor);

    doc.moveDown(1);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'La sécurité au travail est une responsabilité partagée. Employeurs et employés ont chacun ' +
           'un rôle crucial à jouer pour créer et maintenir un environnement de travail sûr.',
           { align: 'justify', lineGap: 4 }
       );

    doc.moveDown(1);

    // Encadré illustratif Section 3
    const section3BoxY = doc.y;
    doc.roundedRect(50, section3BoxY, doc.page.width - 100, 80, 8)
       .fillAndStroke('#43e97b', '#43e97b');

    doc.fontSize(40)
       .fillColor('white')
       .text('🤝', 50, section3BoxY + 10, { width: doc.page.width - 100, align: 'center' });

    doc.fontSize(16)
       .fillColor('white')
       .font('Helvetica-Bold')
       .text('Responsabilité Partagée', 50, section3BoxY + 55, { width: doc.page.width - 100, align: 'center' });

    doc.moveDown(6);

    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('Les responsabilités de l\'employeur :', { continued: false });

    doc.moveDown(0.5);

    const employeurRoles = [
        { titre: 'Obligation de sécurité', desc: 'L\'employeur a une obligation légale de protéger la santé physique et mentale de ses employés.' },
        { titre: 'Évaluation et prévention', desc: 'Mettre en place une démarche d\'évaluation des risques et des mesures de prévention appropriées.' },
        { titre: 'Formation', desc: 'Assurer la formation à la sécurité de tous les travailleurs, y compris les nouveaux arrivants.' },
        { titre: 'Information', desc: 'Communiquer clairement sur les risques et les procédures de sécurité.' },
        { titre: 'Moyens matériels', desc: 'Fournir les équipements de protection et les outils de travail adaptés.' },
        { titre: 'Organisation', desc: 'Planifier le travail de manière à limiter les risques et éviter la surcharge.' },
        { titre: 'Consultation', desc: 'Impliquer les représentants du personnel et les travailleurs dans les démarches de prévention.' }
    ];

    employeurRoles.forEach(role => {
        doc.fontSize(11)
           .fillColor(blueColor)
           .font('Helvetica-Bold')
           .text(`• ${role.titre} : `, { continued: true })
           .fillColor(textColor)
           .font('Helvetica')
           .text(role.desc, { align: 'justify', lineGap: 2 });
        doc.moveDown(0.4);
    });

    // Nouvelle page pour la suite de Section 3 et Conclusion
    doc.addPage();

    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('Les responsabilités du travailleur :', { continued: false });

    doc.moveDown(0.5);

    const travailleurRoles = [
        { titre: 'Respecter les consignes', desc: 'Suivre les instructions de sécurité et les procédures établies.' },
        { titre: 'Utiliser les équipements', desc: 'Porter et utiliser correctement les équipements de protection fournis.' },
        { titre: 'Signaler les dangers', desc: 'Alerter immédiatement sur toute situation dangereuse ou dysfonctionnement.' },
        { titre: 'Participer à la formation', desc: 'S\'investir dans les sessions de formation et de sensibilisation.' },
        { titre: 'Prendre soin de sa santé', desc: 'Veiller à sa propre sécurité et à celle de ses collègues.' },
        { titre: 'Droit d\'alerte', desc: 'Exercer son droit de retrait en cas de danger grave et imminent.' },
        { titre: 'Contribuer à l\'amélioration', desc: 'Proposer des idées pour améliorer la sécurité sur le lieu de travail.' }
    ];

    travailleurRoles.forEach(role => {
        doc.fontSize(11)
           .fillColor(blueColor)
           .font('Helvetica-Bold')
           .text(`• ${role.titre} : `, { continued: true })
           .fillColor(textColor)
           .font('Helvetica')
           .text(role.desc, { align: 'justify', lineGap: 2 });
        doc.moveDown(0.4);
    });

    doc.moveDown(0.5);

    // Encadré point clé Section 3
    const keyBox3Y = doc.y;
    doc.roundedRect(50, keyBox3Y, doc.page.width - 100, 50, 5)
       .fillAndStroke('#e3f2fd', '#e3f2fd');

    doc.rect(50, keyBox3Y, 4, 50)
       .fillAndStroke(blueColor, blueColor);

    doc.fontSize(10)
       .fillColor(textColor)
       .font('Helvetica')
       .text('💡 Point clé : ', 60, keyBox3Y + 15, { continued: true })
       .text('La sécurité est l\'affaire de tous. Chaque acteur, quel que soit son niveau hiérarchique, a un rôle à jouer.');

    doc.moveDown(3.5);

    doc.fontSize(12)
       .fillColor(blueColor)
       .font('Helvetica-Bold')
       .text('Une culture de sécurité collective :', { continued: false });

    doc.moveDown(0.5);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica')
       .text(
           'La sécurité ne peut être efficace que si elle est intégrée dans la culture de l\'entreprise. ' +
           'Cela implique une communication ouverte, une reconnaissance des efforts en matière de sécurité, ' +
           'et une amélioration continue basée sur le retour d\'expérience. Les comités de santé, sécurité ' +
           'et conditions de travail (CSSCT) jouent un rôle clé dans cette dynamique collaborative.',
           { align: 'justify', lineGap: 4 }
       );

    doc.moveDown(2);

    // ===== CONCLUSION =====
    // Encadré de conclusion
    const conclusionY = doc.y;
    doc.roundedRect(50, conclusionY, doc.page.width - 100, 220, 8)
       .fillAndStroke('#f8f9fa', '#f8f9fa');

    doc.rect(50, conclusionY, 5, 220)
       .fillAndStroke(darkBlueColor, darkBlueColor);

    doc.fontSize(18)
       .fillColor(darkBlueColor)
       .font('Helvetica-Bold')
       .text('Conclusion', 60, conclusionY + 20, { width: doc.page.width - 120 });

    doc.moveDown(0.8);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica-Oblique')
       .text(
           'La sécurité des travailleurs n\'est pas une option, c\'est une priorité absolue. Chaque accident ' +
           'évité, chaque maladie professionnelle prévenue représente une vie protégée, une famille préservée ' +
           'et une entreprise plus performante. En combinant vigilance, formation, équipements adaptés et ' +
           'dialogue social, nous pouvons créer des environnements de travail où chacun rentre chez soi en ' +
           'bonne santé.',
           60, doc.y, { width: doc.page.width - 120, align: 'justify', lineGap: 4 }
       );

    doc.moveDown(1);

    doc.fontSize(11)
       .fillColor(darkBlueColor)
       .font('Helvetica-Bold')
       .text('Ensemble, faisons de la sécurité au travail une réalité quotidienne !', 60, doc.y, { width: doc.page.width - 120, align: 'justify' });

    doc.moveDown(0.8);

    doc.fontSize(11)
       .fillColor(textColor)
       .font('Helvetica-Oblique')
       .text(
           'Rappelons-nous que la sécurité commence par chacun d\'entre nous. Un geste simple, une attention ' +
           'particulière, un signalement à temps peuvent faire toute la différence. Investir dans la sécurité, ' +
           'c\'est investir dans l\'humain, et c\'est toujours un investissement rentable.',
           60, doc.y, { width: doc.page.width - 120, align: 'justify', lineGap: 4 }
       );

    doc.moveDown(3);

    // Encadré final de motivation
    const finalBoxY = doc.y;
    doc.roundedRect(50, finalBoxY, doc.page.width - 100, 70, 8)
       .fillAndStroke(darkBlueColor, darkBlueColor);

    doc.fontSize(11)
       .fillColor('white')
       .font('Helvetica-Bold')
       .text('💡 Retenez ceci :', 60, finalBoxY + 15, { width: doc.page.width - 120, align: 'center' });

    doc.fontSize(10)
       .fillColor('white')
       .font('Helvetica')
       .text(
           'Un travailleur en sécurité est un travailleur productif, épanoui et engagé. ' +
           'La sécurité n\'est pas une contrainte, c\'est une valeur qui profite à tous !',
           60, finalBoxY + 35, { width: doc.page.width - 120, align: 'center', lineGap: 3 }
       );

    // Footer
    doc.fontSize(9)
       .fillColor('#999999')
       .font('Helvetica-Oblique')
       .text('Document éducatif - La Sécurité des Travailleurs © 2025', 50, doc.page.height - 70, { align: 'center' });

    // Finaliser le document
    doc.end();

    console.log('✓ PDF créé avec succès : La_Securite_des_Travailleurs.pdf');
    console.log('✓ Le document contient 3 pages complètes avec illustrations et contenu structuré');
}

// Exécuter
try {
    generatePDF();
    console.log('\n🎉 Processus terminé avec succès !');
} catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
}
