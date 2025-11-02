#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Générateur de PDF: La Sécurité des Travailleurs
Document éducatif professionnel en français
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
import requests
from io import BytesIO

def create_worker_safety_pdf():
    """Crée un PDF sur la sécurité des travailleurs"""

    # Configuration du document
    filename = "La_Securite_des_Travailleurs.pdf"
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )

    # Container pour les éléments du PDF
    story = []

    # Styles
    styles = getSampleStyleSheet()

    # Style personnalisé pour le titre principal
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=colors.HexColor('#1a5490'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    # Style pour les sous-titres
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#2c5f8d'),
        spaceAfter=12,
        spaceBefore=20,
        fontName='Helvetica-Bold'
    )

    # Style pour le corps du texte
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontSize=11,
        alignment=TA_JUSTIFY,
        spaceAfter=12,
        leading=16,
        fontName='Helvetica'
    )

    # Style pour les listes
    list_style = ParagraphStyle(
        'CustomList',
        parent=styles['BodyText'],
        fontSize=11,
        leftIndent=20,
        spaceAfter=8,
        leading=14,
        fontName='Helvetica'
    )

    # Style pour la conclusion
    conclusion_style = ParagraphStyle(
        'Conclusion',
        parent=styles['BodyText'],
        fontSize=11,
        alignment=TA_JUSTIFY,
        spaceAfter=12,
        leading=16,
        fontName='Helvetica-Oblique',
        textColor=colors.HexColor('#2c5f8d')
    )

    # Page de titre
    story.append(Spacer(1, 1*cm))

    # Titre principal
    title = Paragraph("La Sécurité des Travailleurs", title_style)
    story.append(title)
    story.append(Spacer(1, 0.3*cm))

    # Sous-titre
    intro_text = Paragraph(
        "<i>Guide pratique pour un environnement de travail sûr et sain</i>",
        ParagraphStyle('Intro', parent=body_style, alignment=TA_CENTER, fontSize=12, textColor=colors.HexColor('#555555'))
    )
    story.append(intro_text)
    story.append(Spacer(1, 1*cm))

    # Introduction
    intro = Paragraph(
        """La sécurité au travail est un enjeu majeur qui concerne chaque employeur et chaque travailleur.
        Dans un monde professionnel en constante évolution, protéger la santé et la sécurité des employés
        n'est pas seulement une obligation légale, mais aussi un investissement dans la productivité et
        le bien-être collectif. Ce guide présente les principes essentiels pour créer et maintenir un
        environnement de travail sécuritaire.""",
        body_style
    )
    story.append(intro)
    story.append(Spacer(1, 1*cm))

    # Image illustrative pour l'introduction (placeholder - simulation d'image)
    try:
        # Créer un rectangle coloré comme placeholder pour l'image
        from reportlab.graphics.shapes import Drawing, Rect
        from reportlab.graphics import renderPDF

        # Note: En production, vous utiliseriez des vraies images
        # Par exemple: img = Image('chemin/vers/image.jpg', width=12*cm, height=6*cm)

        story.append(Spacer(1, 0.5*cm))

    except Exception as e:
        print(f"Note: Placeholder pour image - {e}")

    story.append(PageBreak())

    # ===== SECTION 1: Les Risques Professionnels =====
    section1_title = Paragraph("1. Les Risques Professionnels", subtitle_style)
    story.append(section1_title)
    story.append(Spacer(1, 0.3*cm))

    section1_intro = Paragraph(
        """Les risques professionnels sont présents dans tous les secteurs d'activité. Leur identification
        et leur compréhension constituent la première étape vers un environnement de travail sécurisé.""",
        body_style
    )
    story.append(section1_intro)
    story.append(Spacer(1, 0.5*cm))

    # Sous-section: Types de risques
    section1_content1 = Paragraph(
        "<b>Les principaux types de risques :</b>",
        body_style
    )
    story.append(section1_content1)
    story.append(Spacer(1, 0.2*cm))

    risques = [
        "<b>• Risques physiques :</b> Chutes, glissades, collisions, exposition au bruit excessif, vibrations, températures extrêmes.",
        "<b>• Risques chimiques :</b> Manipulation de produits toxiques, inhalation de vapeurs dangereuses, contact avec des substances corrosives.",
        "<b>• Risques biologiques :</b> Exposition à des virus, bactéries, champignons dans certains environnements de travail (hôpitaux, laboratoires).",
        "<b>• Risques ergonomiques :</b> Postures inadaptées, mouvements répétitifs, port de charges lourdes causant des troubles musculosquelettiques.",
        "<b>• Risques psychosociaux :</b> Stress chronique, harcèlement, surcharge de travail, manque de reconnaissance."
    ]

    for risque in risques:
        story.append(Paragraph(risque, list_style))

    story.append(Spacer(1, 0.5*cm))

    section1_content2 = Paragraph(
        """<b>L'importance de l'évaluation des risques :</b><br/>
        Chaque entreprise doit procéder à une évaluation régulière des risques présents sur ses lieux de travail.
        Cette démarche permet d'identifier les dangers potentiels, d'analyser leur probabilité d'occurrence et
        leur gravité, puis de mettre en place des mesures préventives adaptées. Le document unique d'évaluation
        des risques professionnels (DUERP) est l'outil central de cette démarche.""",
        body_style
    )
    story.append(section1_content2)
    story.append(Spacer(1, 0.8*cm))

    # Placeholder pour image section 1
    story.append(Spacer(1, 0.3*cm))

    story.append(PageBreak())

    # ===== SECTION 2: Les Mesures de Prévention =====
    section2_title = Paragraph("2. Les Mesures de Prévention", subtitle_style)
    story.append(section2_title)
    story.append(Spacer(1, 0.3*cm))

    section2_intro = Paragraph(
        """La prévention est la clé pour réduire les accidents du travail et les maladies professionnelles.
        Elle repose sur des principes concrets et applicables à tous les secteurs.""",
        body_style
    )
    story.append(section2_intro)
    story.append(Spacer(1, 0.5*cm))

    section2_content1 = Paragraph(
        "<b>Les principes généraux de prévention :</b>",
        body_style
    )
    story.append(section2_content1)
    story.append(Spacer(1, 0.2*cm))

    preventions = [
        "<b>1. Éviter les risques :</b> Supprimer le danger à la source quand c'est possible.",
        "<b>2. Évaluer les risques :</b> Analyser ceux qui ne peuvent être évités.",
        "<b>3. Combattre les risques à la source :</b> Agir sur les causes plutôt que sur les conséquences.",
        "<b>4. Adapter le travail à l'homme :</b> Concevoir les postes de travail en tenant compte des capacités humaines.",
        "<b>5. Tenir compte de l'évolution technique :</b> Intégrer les innovations pour améliorer la sécurité.",
        "<b>6. Remplacer ce qui est dangereux :</b> Substituer les produits ou procédés dangereux par des alternatives plus sûres.",
        "<b>7. Planifier la prévention :</b> Intégrer la sécurité dans l'organisation du travail.",
        "<b>8. Prioriser les protections collectives :</b> Privilégier les mesures qui protègent tous les travailleurs.",
        "<b>9. Former et informer :</b> Donner aux travailleurs les instructions appropriées."
    ]

    for prevention in preventions:
        story.append(Paragraph(prevention, list_style))

    story.append(Spacer(1, 0.5*cm))

    section2_content2 = Paragraph(
        """<b>Équipements de protection :</b><br/>
        Les équipements de protection individuelle (EPI) sont essentiels lorsque les risques ne peuvent être
        éliminés par d'autres moyens. Casques, gants, lunettes de protection, chaussures de sécurité,
        protections auditives et respiratoires doivent être adaptés aux risques identifiés, entretenus
        régulièrement et portés systématiquement.""",
        body_style
    )
    story.append(section2_content2)
    story.append(Spacer(1, 0.5*cm))

    section2_content3 = Paragraph(
        """<b>Formation et sensibilisation :</b><br/>
        La formation continue des employés est indispensable. Elle doit couvrir les procédures de sécurité,
        l'utilisation correcte des équipements, les gestes de premiers secours et les comportements à adopter
        en cas d'urgence. Des sessions de sensibilisation régulières maintiennent la vigilance et renforcent
        la culture de sécurité.""",
        body_style
    )
    story.append(section2_content3)
    story.append(Spacer(1, 0.8*cm))

    story.append(PageBreak())

    # ===== SECTION 3: Le Rôle de l'Entreprise et du Travailleur =====
    section3_title = Paragraph("3. Le Rôle de l'Entreprise et du Travailleur", subtitle_style)
    story.append(section3_title)
    story.append(Spacer(1, 0.3*cm))

    section3_intro = Paragraph(
        """La sécurité au travail est une responsabilité partagée. Employeurs et employés ont chacun
        un rôle crucial à jouer pour créer et maintenir un environnement de travail sûr.""",
        body_style
    )
    story.append(section3_intro)
    story.append(Spacer(1, 0.5*cm))

    section3_content1 = Paragraph(
        "<b>Les responsabilités de l'employeur :</b>",
        body_style
    )
    story.append(section3_content1)
    story.append(Spacer(1, 0.2*cm))

    employeur_roles = [
        "• <b>Obligation de sécurité :</b> L'employeur a une obligation légale de protéger la santé physique et mentale de ses employés.",
        "• <b>Évaluation et prévention :</b> Mettre en place une démarche d'évaluation des risques et des mesures de prévention appropriées.",
        "• <b>Formation :</b> Assurer la formation à la sécurité de tous les travailleurs, y compris les nouveaux arrivants.",
        "• <b>Information :</b> Communiquer clairement sur les risques et les procédures de sécurité.",
        "• <b>Moyens matériels :</b> Fournir les équipements de protection et les outils de travail adaptés.",
        "• <b>Organisation :</b> Planifier le travail de manière à limiter les risques et éviter la surcharge.",
        "• <b>Consultation :</b> Impliquer les représentants du personnel et les travailleurs dans les démarches de prévention."
    ]

    for role in employeur_roles:
        story.append(Paragraph(role, list_style))

    story.append(Spacer(1, 0.5*cm))

    section3_content2 = Paragraph(
        "<b>Les responsabilités du travailleur :</b>",
        body_style
    )
    story.append(section3_content2)
    story.append(Spacer(1, 0.2*cm))

    travailleur_roles = [
        "• <b>Respecter les consignes :</b> Suivre les instructions de sécurité et les procédures établies.",
        "• <b>Utiliser les équipements :</b> Porter et utiliser correctement les équipements de protection fournis.",
        "• <b>Signaler les dangers :</b> Alerter immédiatement sur toute situation dangereuse ou dysfonctionnement.",
        "• <b>Participer à la formation :</b> S'investir dans les sessions de formation et de sensibilisation.",
        "• <b>Prendre soin de sa santé :</b> Veiller à sa propre sécurité et à celle de ses collègues.",
        "• <b>Droit d'alerte :</b> Exercer son droit de retrait en cas de danger grave et imminent.",
        "• <b>Contribuer à l'amélioration :</b> Proposer des idées pour améliorer la sécurité sur le lieu de travail."
    ]

    for role in travailleur_roles:
        story.append(Paragraph(role, list_style))

    story.append(Spacer(1, 0.5*cm))

    section3_content3 = Paragraph(
        """<b>Une culture de sécurité collective :</b><br/>
        La sécurité ne peut être efficace que si elle est intégrée dans la culture de l'entreprise.
        Cela implique une communication ouverte, une reconnaissance des efforts en matière de sécurité,
        et une amélioration continue basée sur le retour d'expérience. Les comités de santé, sécurité
        et conditions de travail (CSSCT) jouent un rôle clé dans cette dynamique collaborative.""",
        body_style
    )
    story.append(section3_content3)
    story.append(Spacer(1, 1*cm))

    # ===== CONCLUSION =====
    conclusion_title = Paragraph("<b>Conclusion</b>", subtitle_style)
    story.append(conclusion_title)
    story.append(Spacer(1, 0.3*cm))

    conclusion_text = Paragraph(
        """La sécurité des travailleurs n'est pas une option, c'est une priorité absolue. Chaque accident
        évité, chaque maladie professionnelle prévenue représente une vie protégée, une famille préservée
        et une entreprise plus performante. En combinant vigilance, formation, équipements adaptés et
        dialogue social, nous pouvons créer des environnements de travail où chacun rentre chez soi en
        bonne santé.<br/><br/>

        <b>Ensemble, faisons de la sécurité au travail une réalité quotidienne !</b><br/><br/>

        Rappelons-nous que la sécurité commence par chacun d'entre nous. Un geste simple, une attention
        particulière, un signalement à temps peuvent faire toute la différence. Investir dans la sécurité,
        c'est investir dans l'humain, et c'est toujours un investissement rentable.""",
        conclusion_style
    )
    story.append(conclusion_text)
    story.append(Spacer(1, 0.5*cm))

    # Encadré final motivant
    final_box_data = [[Paragraph(
        "<b>💡 Retenez ceci :</b> Un travailleur en sécurité est un travailleur productif, épanoui et engagé. "
        "La sécurité n'est pas une contrainte, c'est une valeur qui profite à tous !",
        ParagraphStyle('FinalBox', parent=body_style, fontSize=10, alignment=TA_CENTER, textColor=colors.white)
    )]]

    final_table = Table(final_box_data, colWidths=[15*cm])
    final_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#2c5f8d')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 15),
        ('ROUNDEDCORNERS', [8, 8, 8, 8]),
    ]))

    story.append(final_table)
    story.append(Spacer(1, 1*cm))

    # Footer
    footer = Paragraph(
        "<i>Document éducatif - La Sécurité des Travailleurs © 2025</i>",
        ParagraphStyle('Footer', parent=body_style, fontSize=8, alignment=TA_CENTER, textColor=colors.grey)
    )
    story.append(footer)

    # Générer le PDF
    doc.build(story)
    print(f"✓ PDF créé avec succès : {filename}")
    return filename

if __name__ == "__main__":
    create_worker_safety_pdf()
