const siteColors = [
    '#A8D5BA', '#F5EEDC', '#8B5E3C', '#F8D568', '#BFD9DA',
    '#415D43', '#D9D9D9', '#FF7043', '#B9E4C9', '#333333',
    '#A0C4FF', '#D97C5A', '#FFD166', '#7A9D54', '#547AA5',
    '#FFF2CC', '#9C9C9C', '#6B8E23', '#708090', '#E1A7A5'
];

// Charger le fichier CSV et afficher les projets
Papa.parse('./fichier-methodes-controle-biologique.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
        csvData = results.data;
    
        // Extraire les projets uniques
        const projetsUniques = [...new Set(csvData.map(item => item["Nom du projet "]).filter(Boolean))];
        
        // Sélectionner les éléments de sélection pour les projets
        const projectSelect1 = document.getElementById('project-select-1');
        const projectSelect2 = document.getElementById('project-select-2');
        
        // Remplir les options des projets
        projetsUniques.forEach(projet => {
            const option1 = document.createElement('option');
            option1.value = projet;
            option1.textContent = projet;
            projectSelect1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = projet;
            option2.textContent = projet;
            projectSelect2.appendChild(option2);
        });

        // Afficher les options pour chaque projet dès que le projet est sélectionné
        projectSelect1.addEventListener('change', (e) => afficherOptions(e.target.value, 1));
        projectSelect2.addEventListener('change', (e) => afficherOptions(e.target.value, 2));

        // Fonction pour afficher les options du projet
        function afficherOptions(projet, projectNumber) {
            const optionsContainer = document.getElementById(`options-container-${projectNumber}`);
            optionsContainer.classList.remove('d-none');
            optionsContainer.innerHTML = ''; // Réinitialiser le contenu

            // Liste des options à afficher
            const options = ['Type de traitement', 'Méthodes', 'Cultures', 'Type de traitements par culture', 'Cible principale', 'Informations'];
            
            // Ajouter des cartes pour chaque option
            options.forEach(option => {
                const card = createCard(option, projectNumber);
                card.onclick = () => afficherGraphique(option, projet, projectNumber);
                optionsContainer.appendChild(card);
            });
        }

        // Créer une carte d'option
        function createCard(content, projectNumber) {
            const colDiv = document.createElement('div');
            colDiv.className = "card h-auto rounded border-0 d-flex flex-row align-items-center p-2 mt-1";
            colDiv.style.cssText = "min-width: 200px; max-width: 300px; cursor: pointer;";

            colDiv.innerHTML = `
                <i class="bi bi-folder-fill fs-6 me-3 text-dark "></i> <!-- Icône -->
                <div class="flex-grow-1" style="text-align: left;">
                    <h5 class="card-title m-0">${content}</h5>
                </div>
                <i class="bi bi-arrow-right fs-5 text-dark"></i> <!-- Flèche -->
            `;

            return colDiv;
        }

        

        // Fonction pour afficher le graphique en fonction de l'option choisie
        function afficherGraphique(option, projet, projectNumber) {
            const chartTitle = document.getElementById(`chart-title-${projectNumber}`);
            const chartContainer = document.getElementById('charts-row');
            chartContainer.classList.remove('d-none');

            switch (option) {
                case 'Type de traitement':
                    afficherDiagrammeCirculaire(projet, 'Type de traitement ', projectNumber);
                    chartTitle.innerText = `Graphique - Type de traitement (${projet})`;
                    break;
                case 'Cultures':
                    afficherDiagrammeCirculaire(projet, 'Cultures', projectNumber);
                    chartTitle.innerText = `Graphique - Cultures (${projet})`;
                    break;
                case 'Cible principale':
                    afficherDiagrammeCirculaire(projet, 'Cible principale ', projectNumber);
                    chartTitle.innerText = `Graphique - Cible principale (${projet})`;
                    break;
                case 'Type de traitements par culture':
                    afficherDiagrammeBarresParCulture(projet, projectNumber);
                    chartTitle.innerText = `Graphique - Traitements par culture (${projet})`;
                    break;
                case 'Méthodes':
                    afficherDiagrammeBarresMethodes(projet, projectNumber);
                    chartTitle.innerText = `Graphique - Méthodes (${projet})`;
                    break;
                case 'Informations':
                    afficherInformations(projet, projectNumber);
                    chartTitle.innerText = `Informations (${projet})`;
                    break;
                default:
                    console.error(`Option inconnue : ${option}`);
            }
        }

        // Fonctions pour afficher différents types de graphiques
        function afficherDiagrammeCirculaire(projet, colonne, projectNumber) {
            const traitements = csvData.filter(item => item["Nom du projet "] === projet)
                                       .map(item => item[colonne]);

            const traitementCounts = {};
            traitements.forEach(type => {
                traitementCounts[type] = (traitementCounts[type] || 0) + 1;
            });

            const labels = Object.keys(traitementCounts);
            const values = Object.values(traitementCounts);
            const colors = siteColors.slice(0, labels.length);

            const ctx = document.getElementById(`chart-${projectNumber}`).getContext('2d');
            if (window[`treatmentChart${projectNumber}`]) window[`treatmentChart${projectNumber}`].destroy();
            window[`treatmentChart${projectNumber}`] = new Chart(ctx, {
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

        function afficherDiagrammeBarresParCulture(projet, projectNumber) {
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
        
            const ctx = document.getElementById(`chart-${projectNumber}`).getContext('2d');
            
            // Si un graphique existe déjà, le détruire
            if (window[`treatmentChart${projectNumber}`]) {
                window[`treatmentChart${projectNumber}`].destroy();
            }
        
            // Réinitialiser la taille du canvas pour éviter l'agrandissement infini
            const canvas = document.getElementById(`chart-${projectNumber}`);
            canvas.width = canvas.width; // Redessiner en réinitialisant la largeur (réinitialisation de l'élément)
            
            // Créer un nouveau graphique
            window[`treatmentChart${projectNumber}`] = new Chart(ctx, {
                type: 'bar',
                data: { labels: labels, datasets: datasets },
                options: {
                    plugins: {
                        legend: { position: 'bottom', labels: { color: 'white' } },
                        title: { display: false },
                    },
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                            ticks: { color: 'white' },
                        },
                        y: {
                            stacked: true,
                            ticks: { color: 'white' },
                        },
                    },
                },
            });
        }
        

        function afficherDiagrammeBarresMethodes(projet, projectNumber) {
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

            const ctx = document.getElementById(`chart-${projectNumber}`).getContext('2d');
            if (window[`treatmentChart${projectNumber}`]) window[`treatmentChart${projectNumber}`].destroy();
            window[`treatmentChart${projectNumber}`] = new Chart(ctx, {
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

        function afficherInformations(projet, projectNumber) {
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
    
        const container = document.getElementById(`chart-${projectNumber}`);
        container.classList.remove('d-none');
        container.innerHTML = `
            <div class="text-white p-3">
                <h5 class="card-title">Informations pour "${projet}"</h5>
                <div class="card-body">${contenuHTML}</div>
            </div>
        `;
    }
    }
});
