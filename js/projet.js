// Charger le fichier CSV et afficher les projets
Papa.parse('http://localhost/pestify/fichier-methodes-controle-biologique.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
        csvData = results.data;
    
        // Extraire les projets uniques
        const projetsUniques = [...new Set(csvData.map(item => item["Nom du projet "]).filter(Boolean))];
        const projectList = document.getElementById('project-list');
        const optionsContainer = document.getElementById('options-container');
    
        // Afficher chaque projet
        projetsUniques.forEach(projet => {
            const card = createCard(projet, true);
            card.onclick = () => afficherOptions(projet);
            projectList.appendChild(card);
        });
    
        // Afficher les options
        ['Type de traitement', 'Méthodes', 'Cultures', 
          'Type de traitements par culture', 'Cible principale',
          'Informations'].forEach(option => {
            const card = createCard(option, false);
            card.onclick = () => afficherGraphique(option);
            optionsContainer.appendChild(card);
        });
    }
    });
    

// Créer une carte
function createCard(content, isProject) {
    const colDiv = document.createElement('div');
    colDiv.className = "card h-auto rounded border-0 d-flex flex-row align-items-center p-2";
    colDiv.style.cssText = "min-width: 200px; max-width: 300px; cursor: pointer;";

    // Utilisation correcte de innerHTML avec des guillemets pour inclure le contenu
    colDiv.innerHTML = `
        <i class="bi bi-folder-fill fs-6 me-3 text-dark"></i> <!-- Icône -->
        <div class="flex-grow-1" style="text-align: left;">
            <h5 class="card-title m-0">${content}</h5>
        </div>
        <i class="bi bi-arrow-right fs-5 text-dark"></i> <!-- Flèche -->
    `;

    if (isProject) {
        colDiv.id = "green"; // Projets uniquement
    }

    return colDiv;
}


// Afficher les options pour un projet
function afficherOptions(projet) {
    document.getElementById('options-container').classList.remove('d-none');
    document.getElementById('chart-container').classList.add('d-none');
    window.projetSelectionne = projet; // Stocker le projet sélectionné
}


function afficherGraphique(option) {
    const projet = window.projetSelectionne;
    
    if (option === 'Type de traitement') {
        // Logique pour le diagramme circulaire
        const traitements = csvData.filter(item => item["Nom du projet "] === projet)
                                   .map(item => item["Type de traitement "]);
        
        // Compter les occurrences
        const traitementCounts = {};
        traitements.forEach(type => {
            traitementCounts[type] = (traitementCounts[type] || 0) + 1;
        });
        
        // Préparer les données
        const labels = Object.keys(traitementCounts);
        const values = Object.values(traitementCounts);
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF7043', '#9575CD'];
        
        // Mettre à jour le titre
        document.getElementById('chart-title').innerText = `${option} pour "${projet}"`;
        
        // Afficher le graphique
        document.getElementById('chart-container').classList.remove('d-none');
        const ctx = document.getElementById('treatment-chart').getContext('2d');
        if (window.treatmentChart) window.treatmentChart.destroy();
        window.treatmentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors.slice(0, labels.length)
                }]
            },
            options: {
                plugins: { legend: { position: 'bottom', labels: { color: 'white' } } }
            }
        });
        
    } else if (option === 'Méthodes') {
        // Logique pour le diagramme en barres
        const dataFiltree = csvData.filter(item => item["Nom du projet "] === projet);
        const methodesCounts = {};
        
        // Compter les avis pour chaque méthode
        dataFiltree.forEach(item => {
            const methode = item["Nom méthode "];
            const satisfaction = item["Niveau de satisfaction de l'utilisation de la méthode"];
            if (!methodesCounts[methode]) {
                methodesCounts[methode] = { Bon: 0, Mitigé: 0, Insatisfaisant: 0 };
            }
            methodesCounts[methode][satisfaction]++;
        });
        
        // Préparer les données pour le graphique
        const labels = Object.keys(methodesCounts);
        const bon = labels.map(methode => methodesCounts[methode].Bon);
        const mitige = labels.map(methode => methodesCounts[methode].Mitigé);
        const insatisfaisant = labels.map(methode => methodesCounts[methode].Insatisfaisant);
        
        // Mettre à jour le titre
        document.getElementById('chart-title').innerText = `Méthodes pour "${projet}"`;
        
        // Afficher le graphique
        document.getElementById('chart-container').classList.remove('d-none');
        const ctx = document.getElementById('treatment-chart').getContext('2d');
        if (window.treatmentChart) window.treatmentChart.destroy();
        window.treatmentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Bon', data: bon, backgroundColor: '#4CAF50' },
                    { label: 'Mitigé', data: mitige, backgroundColor: '#FFCE56' },
                    { label: 'Insatisfaisant', data: insatisfaisant, backgroundColor: '#FF6384' }
                ]
            },
            options: {
                plugins: { 
                    legend: { position: 'bottom', labels: { color: 'white' } }, 
                    title: { display: false },
                },
                responsive: true,
                scales: {
                    x: { stacked: true, ticks: { color: 'white' } },
                    y: { stacked: true, ticks: { color: 'white' } }
                }
            }
        });
    } else if (option === 'Cultures') {
        // Logique pour le diagramme circulaire
        const traitements = csvData.filter(item => item["Nom du projet "] === projet)
                                   .map(item => item["Cultures"]);
        
        // Compter les occurrences
        const traitementCounts = {};
        traitements.forEach(type => {
            traitementCounts[type] = (traitementCounts[type] || 0) + 1;
        });
        
        // Préparer les données
        const labels = Object.keys(traitementCounts);
        const values = Object.values(traitementCounts);
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF7043', '#9575CD'];
        
        // Mettre à jour le titre
        document.getElementById('chart-title').innerText = `${option} pour "${projet}"`;
        
        // Afficher le graphique
        document.getElementById('chart-container').classList.remove('d-none');
        const ctx = document.getElementById('treatment-chart').getContext('2d');
        if (window.treatmentChart) window.treatmentChart.destroy();
        window.treatmentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors.slice(0, labels.length)
                }]
            },
            options: {
                plugins: { legend: { position: 'bottom', labels: { color: 'white' } } }
            }
        });
        
    } else if (option === 'Cible principale') {
        // Logique pour le diagramme circulaire
        const traitements = csvData.filter(item => item["Nom du projet "] === projet)
                                   .map(item => item["Cible principale "]);
        
        // Compter les occurrences
        const traitementCounts = {};
        traitements.forEach(type => {
            traitementCounts[type] = (traitementCounts[type] || 0) + 1;
        });
        
        // Préparer les données
        const labels = Object.keys(traitementCounts);
        const values = Object.values(traitementCounts);
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF7043', '#9575CD'];
        
        // Mettre à jour le titre
        document.getElementById('chart-title').innerText = `${option} pour "${projet}"`;
        
        // Afficher le graphique
        document.getElementById('chart-container').classList.remove('d-none');
        const ctx = document.getElementById('treatment-chart').getContext('2d');
        if (window.treatmentChart) window.treatmentChart.destroy();
        window.treatmentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors.slice(0, labels.length)
                }]
            },
            options: {
                plugins: { legend: { position: 'bottom', labels: { color: 'white' } } }
            }
        });
    } else if (option === 'Type de traitements par culture') {
        // Logique pour le nombre de traitements par culture
        const culturesData = csvData.filter(item => item["Nom du projet "] === projet);
        const cultureCounts = {};

        culturesData.forEach(item => {
            const culture = item["Cultures"];
            const traitement = item["Type de traitement "];
            if (!cultureCounts[culture]) cultureCounts[culture] = {};
            cultureCounts[culture][traitement] = (cultureCounts[culture][traitement] || 0) + 1;
        });

        const labels = Object.keys(cultureCounts);
        const datasets = Object.keys(cultureCounts[labels[0]]).map(type => ({
            label: type,
            data: labels.map(culture => cultureCounts[culture][type] || 0),
            backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) // Couleurs aléatoires
        }));

        document.getElementById('chart-title').innerText = `Nombre de traitements par culture pour "${projet}"`;

        const ctx = document.getElementById('treatment-chart').getContext('2d');
        if (window.treatmentChart) window.treatmentChart.destroy();
        window.treatmentChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: labels, datasets: datasets },
            options: {
                plugins: { legend: { position: 'bottom', labels: { color: 'white' } }, title: { display: false } },
                responsive: true,
                scales: { x: { stacked: true, ticks: { color: 'white' } }, y: { stacked: true, ticks: { color: 'white' } } }
            }
        });
    }
}
