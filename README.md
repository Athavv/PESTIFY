# Projet SAé : Visualisation de Données sur le Biocontrôle  

## Introduction  
Dans un monde où les données jouent un rôle crucial dans la communication et la prise de décision, ce projet vise à développer un site web interactif pour visualiser des données sur le **biocontrôle**. Ce dernier est une alternative naturelle aux pesticides conventionnels, utilisant des mécanismes écologiques pour protéger les cultures.  

🔗 **Accéder au site : [Pestify](https://pestify.alwaysdata.net/)**  

L'objectif est de fournir des outils visuels clairs pour mieux comprendre et communiquer sur ces pratiques respectueuses de l'environnement.  

---

## Présentation de l'équipe  

- **Aathavan** : Chef de projet, Développeur web Full stack, Analyste des données et Designer graphique
  - Supervision globale et coordination de l’équipe.  
  - Développement du site web et intégration des graphiques interactifs.  
  - Analyse et organisation des données pour leur intégration dans le site. 
  - Conception de maquettes interactives avec Figma.  
  - Conception du Trello pour la répartition des tâches
  - Modélisation du MCD
 


- **Trystan** : Analyste des données et gestionnaire de la base de données  
  - Analyse et organisation des données pour leur intégration dans le site.  
  - Choix des représentations graphiques pour les statistiques.  

- **Abeeschan** : Designer graphique, Développeur web Back end et modeleur 3D  
  - Conception de maquettes interactives avec Figma.  
  - Création du logo, des éléments visuels et des modèles 3D (poivron et tomate).  
  - Conception de la base de données
  - Modélisation du MCD

- **Nicolas** : Développeur web Front end
  - Collaboration avec Aathavan sur le développement des fonctionnalités interactives du site.  
  - Conception du Trello pour la répartition des tâches


---

## Planification du projet  

La planification a été réalisée via **Trello**, permettant une gestion claire et structurée des tâches :  
- Répartition en listes par étape (analyse, conception graphique, développement, etc.).  
- Suivi des échéances pour une progression régulière.  

🔗 **[Lien vers le tableau Trello](https://trello.com/invite/b/676ee83cf1b89f62acb7e6e1/ATTId7e4aeabe3b0297ca7f02af0894e045c413598AE/sae-301-303)**  

---

## Conception graphique et ergonomique  

### Maquette Figma  
Une maquette interactive a été créée avec **Figma** pour structurer l’interface utilisateur :  
- Navigation intuitive et design épuré.  
- Organisation optimisée des éléments pour une lisibilité accrue.  

🔗 **[Lien vers la maquette Figma](https://www.figma.com/design/8mRHvdfTYGTHmoM3o85o5m/PESTIFY?node-id=0-1&t=8iA4ZDTZV5Ms6UxE-1)**  
![Aperçu de la maquette](./ressources/figma.png)  

### Charte graphique  
- **Palette de couleurs** :  
  - **A1CCA5 (Vert clair)** : Fond général et éléments secondaires.  
  - **415D43 (Vert foncé)** : Titres et sections importantes.  
  - **111D13 (Vert très foncé)** : Texte principal pour un contraste optimal.  

![Palette de couleurs](./ressources/color_palette.png)  

- **Polices utilisées** :  
  - **Cartoo Nature** : Pour les titres.  
  - **Poppins** : Pour le corps de texte.  



### Modèles 3D  
Des modèles 3D d’un **poivron** et d’une **tomate** ont été créés pour renforcer l’aspect immersif et visuel du site.  
![Modèle 3D - Poivron](./ressources/poivron_model.png) ![Modèle 3D - Tomate](./ressources/tomate_model.png)  

---

## Analyse et choix des statistiques  

### Statistiques retenues  
- **Nom du projet → Nombre de méthodes → Niveau de satisfaction**  
  - Visualisation : Graphique en bâtons avec une légende pour le niveau de satisfaction.  
- **Nom du projet → Types de traitements**  
  - Visualisation : Diagramme circulaire illustrant les proportions par projet.  
- **Nom du projet → Types de cultures**  
  - Visualisation : Diagramme circulaire représentant les pourcentages des cultures concernées.  
- **Nom du projet → Répartition des méthodes par traitement**  
  - Visualisation : Diagramme circulaire coloré pour une lecture simplifiée. 
- **Nom du projet → Cible Principale**  
  - Visualisation : Diagramme circulaire illustrant les proportions par projet. 
- **Nom du projet → Information**  
  - Visualisation : En texte, ajout d'information bonus sur le projet.   

![Exemple de graphique](./ressources/bar_chart.png)  

---

## Conception et gestion de la base de données  

### Modèle Conceptuel de Données (MCD)  
La base de données, conçue avec **MySQL**, organise les informations de manière optimale grâce au MCD suivant :  
![Modèle Conceptuel de Données](./ressources/mcd_diagram.png)  

### Colonnes sélectionnées  
- Nom de projet  
- Niveau de satisfaction  
- Nombre de méthodes  
- Famille de méthode  
- Nombre de cultures  
- Cible principale  

---

## Développement du site web  

### Technologies utilisées  
- **HTML, CSS, JavaScript** pour la structure et le style.  
- **Bootstrap** pour une mise en page responsive.  
- **Chart.js** pour les graphiques interactifs.  
- **PapaParse** pour manipuler les fichiers CSV.  

### Défis rencontrés  
1. **Choix de PapaParse**  
   - PapaParse a été utilisé à la place de D3.js, car l’équipe ne connaissait pas encore D3 au début du projet. Une fois avancés, il était difficile de changer.  

2. **Problèmes avec les fichiers CSV**  
   - Initialement, la lecture des fichiers CSV était impossible sans passer par localhost.  
   - Lors de l’hébergement, les données ne s’affichaient pas à cause d’un chemin d’accès incorrect.  

3. **Débogage**  
   - De nombreux bugs ont été résolus grâce à une collaboration efficace et des tests fonctionnels.  

![Aperçu du site web](./ressources/site_preview.png)  

---

## Hébergement sur AlwaysData  

Le site a été hébergé sur **AlwaysData** pour permettre un accès en ligne :  
- **Problème rencontré** : Lors de l'hébergement, le chemin d’accès aux fichiers CSV était incorrect, ce qui empêchait l’affichage des données. Ce problème a été corrigé en modifiant les liens pour qu’ils s’adaptent à l’environnement d’hébergement.  

---

## Outils et technologies utilisées  

### Outils  
- **VS Code** : Environnement de développement.  
- **Figma** : Conception graphique.  
- **Trello** : Gestion de projet.  

### Langages et frameworks  
- **HTML, CSS, JavaScript**  
- **Bootstrap**  
- **Chart.js**  
- **PapaParse**  
- **Model-Viewer**  

---

## Conclusion  

Ce projet a permis de développer des compétences en analyse de données, conception graphique et développement web. Malgré les défis rencontrés, l’équipe a su collaborer efficacement pour créer un outil innovant et interactif, contribuant à la promotion de pratiques agricoles respectueuses de l’environnement.  
