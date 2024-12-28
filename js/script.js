const siteColors = [
    '#A8D5BA', '#F5EEDC', '#8B5E3C', '#F8D568', '#BFD9DA',
    '#415D43', '#D9D9D9', '#FF7043', '#B9E4C9', '#333333',
    '#A0C4FF', '#D97C5A', '#FFD166', '#7A9D54', '#547AA5',
    '#FFF2CC', '#9C9C9C', '#6B8E23', '#708090', '#E1A7A5'
];

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



function resetChartContainer(isBarChart = false) {
    const container = document.getElementById('chart-container');
    container.classList.remove('d-none');
    container.innerHTML = `
        <h5 id="chart-title" class="text-white"></h5>
        <canvas id="treatment-chart" 
                class="${isBarChart ? 'bar-chart' : ''}" 
                style="width: 100%; height: ${isBarChart ? '600px' : '400px'};"></canvas>
    `;
}


function afficherOptions(projet) {
    resetChartContainer(); // Réinitialiser le conteneur avant d'afficher les options
    document.getElementById('options-container').classList.remove('d-none');
    document.getElementById('chart-container').classList.add('d-none');
    window.projetSelectionne = projet; // Stocker le projet sélectionné
}

function afficherGraphique(option) {
    const projet = window.projetSelectionne;
    resetChartContainer(option === 'Type de traitements par culture' || option === 'Méthodes'); // Adapter le conteneur

    switch (option) {
        case 'Type de traitement':
            afficherDiagrammeCirculaire(projet, 'Type de traitement ');
            break;
        case 'Cultures':
            afficherDiagrammeCirculaire(projet, 'Cultures');
            break;
        case 'Cible principale':
            afficherDiagrammeCirculaire(projet, 'Cible principale ');
            break;
        case 'Type de traitements par culture':
            afficherDiagrammeBarresParCulture(projet);
            break;
        case 'Méthodes':
            afficherDiagrammeBarresMethodes(projet);
            break;
        case 'Informations':
            afficherInformations(projet);
            break;
        default:
            console.error(`Option inconnue : ${option}`);
    }
}

function afficherDiagrammeCirculaire(projet, colonne) {
    const traitements = csvData.filter(item => item["Nom du projet "] === projet)
                               .map(item => item[colonne]);

    const traitementCounts = {};
    traitements.forEach(type => {
        traitementCounts[type] = (traitementCounts[type] || 0) + 1;
    });

    const labels = Object.keys(traitementCounts);
    const values = Object.values(traitementCounts);
    const colors = siteColors.slice(0, labels.length);

    document.getElementById('chart-title').innerText = `${colonne} pour "${projet}"`;

    const ctx = document.getElementById('treatment-chart').getContext('2d');
    if (window.treatmentChart) window.treatmentChart.destroy();
    window.treatmentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: { legend: { position: 'bottom', labels: { color: 'white' } } }
        }
    });
}

function afficherDiagrammeBarresParCulture(projet) {
    const culturesData = csvData.filter(item => item["Nom du projet "] === projet);
    const cultureCounts = {};

    culturesData.forEach(item => {
        const culture = item["Cultures"];
        const traitement = item["Type de traitement "];
        if (!cultureCounts[culture]) cultureCounts[culture] = {};
        cultureCounts[culture][traitement] = (cultureCounts[culture][traitement] || 0) + 1;
    });

    const labels = Object.keys(cultureCounts);
    const datasets = Object.keys(cultureCounts[labels[0]]).map((type, index) => ({
        label: type,
        data: labels.map(culture => cultureCounts[culture][type] || 0),
        backgroundColor: siteColors[index % siteColors.length]
    }));

    document.getElementById('chart-title').innerText = `Nombre de traitements par culture pour "${projet}"`;

    const ctx = document.getElementById('treatment-chart').getContext('2d');
    if (window.treatmentChart) window.treatmentChart.destroy();
    window.treatmentChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: labels, datasets: datasets },
        options: {
            plugins: {
                legend: { position: 'bottom', labels: { color: 'white' } },
                title: { display: false }
            },
            responsive: true,
            scales: {
                x: { stacked: true, ticks: { color: 'white' } },
                y: { stacked: true, ticks: { color: 'white' } }
            }
        }
    });
}

function afficherDiagrammeBarresMethodes(projet) {
    const dataFiltree = csvData.filter(item => item["Nom du projet "] === projet);
    const methodesCounts = {};

    dataFiltree.forEach(item => {
        const methode = item["Nom méthode "];
        const satisfaction = item["Niveau de satisfaction de l'utilisation de la méthode"];
        if (!methodesCounts[methode]) {
            methodesCounts[methode] = { Bon: 0, Mitigé: 0, Insatisfaisant: 0 };
        }
        methodesCounts[methode][satisfaction]++;
    });

    const labels = Object.keys(methodesCounts);
    const bon = labels.map(methode => methodesCounts[methode].Bon);
    const mitige = labels.map(methode => methodesCounts[methode].Mitigé);
    const insatisfaisant = labels.map(methode => methodesCounts[methode].Insatisfaisant);

    document.getElementById('chart-title').innerText = `Méthodes pour "${projet}"`;

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
                title: { display: false }
            },
            responsive: true,
            scales: {
                x: { stacked: true, ticks: { color: 'white' } },
                y: { stacked: true, ticks: { color: 'white' } }
            }
        }
    });
}

function afficherInformations(projet) {
    const dataFiltree = csvData.filter(item => item["Nom du projet "] === projet);
    const informations = {
        "Période expérimentation": new Set(),
        "Site expérimental": new Set(),
        "Code postal site": new Set(),
        "Nom du système": new Set()
    };

    dataFiltree.forEach(item => {
        informations["Période expérimentation"].add(item["Période expérimentation"]);
        informations["Site expérimental"].add(item["Site expérimental"]);
        informations["Code postal site"].add(item["Code postal site"]);
        informations["Nom du système"].add(item["Nom du système"]);
    });

    let contenuHTML = "";
    Object.entries(informations).forEach(([titre, valeurs]) => {
        contenuHTML += `
            <div class="mb-3">
                <h6>${titre}</h6>
                <ul>
                    ${[...valeurs].map(valeur => `<li>${valeur || "Non spécifié"}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    const container = document.getElementById('chart-container');
    container.classList.remove('d-none');
    container.innerHTML = `
        <div class="text-white p-3">
            <h5 class="card-title">Informations pour "${projet}"</h5>
            <div class="card-body">${contenuHTML}</div>
        </div>
    `;
}
