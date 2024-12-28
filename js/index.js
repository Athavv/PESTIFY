const siteColors = [
    '#A8D5BA', '#F5EEDC', '#8B5E3C', '#F8D568', '#BFD9DA',
    '#415D43', '#D9D9D9', '#FF7043', '#B9E4C9', '#333333',
    '#A0C4FF', '#D97C5A', '#FFD166', '#7A9D54', '#547AA5',
    '#FFF2CC', '#9C9C9C', '#6B8E23', '#708090', '#E1A7A5'
];

Papa.parse('./fichier-methodes-controle-biologique.csv', {
    download: true,
    header: true,
    complete: function(results) {
        const csvData = results.data;

        // Colonnes à analyser
        const columns = [
            { key: "Nom du projet ", graphId: "graph1", countId: "countGraph1", description: "projets" },
            { key: "Nom méthode ", graphId: "graph2", countId: "countGraph2", description: "méthodes utilisées" },
            { key: "Famille méthode de contrôle biologique", graphId: "graph3", countId: "countGraph3", description: "familles de contrôle biologique" },
            { key: "Sous-famille méthode de contrôle biologique", graphId: "graph4", countId: "countGraph4", description: "sous-familles de contrôle biologique" },
            { key: "Type de traitement ", graphId: "graph5", countId: "countGraph5", description: "types de traitement" },
            { key: "Mode d'action ", graphId: "graph6", countId: "countGraph6", description: "modes d'action" },
            { key: "Groupe ciblé", graphId: "graph7", countId: "countGraph7", description: "groupes ciblés" },
            { key: "Cible principale ", graphId: "graph8", countId: "countGraph8", description: "cibles principales" },
            { key: "Cultures", graphId: "graph9", countId: "countGraph9", description: "cultures" },
            { key: "Filière", graphId: "graph10", countId: "countGraph10", description: "filières" }
        ];
        

        // Analyse des données pour chaque colonne
        columns.forEach(column => {
            const uniqueValues = [...new Set(csvData.map(item => item[column.key]).filter(Boolean))];
            const counts = uniqueValues.map(value =>
                csvData.filter(item => item[column.key] === value).length
            );

            // Mise à jour du texte
            document.getElementById(column.countId).textContent = `Nombre total de ${column.description} : ${uniqueValues.length}`;


            // Affichage du graphique
            afficherGraphique(column.graphId, uniqueValues, counts);
        });
    }
});



// Fonction pour afficher un graphique
function afficherGraphique(graphId, labels, data) {
    const colors = [
        '#A8D5BA', '#F5EEDC', '#8B5E3C', '#F8D568', '#BFD9DA',
        '#415D43', '#D9D9D9', '#FF7043', '#B9E4C9', '#333333',
        '#A0C4FF', '#D97C5A', '#FFD166', '#7A9D54', '#547AA5',
        '#FFF2CC', '#9C9C9C', '#6B8E23', '#708090', '#E1A7A5'
    ];

    const ctx = document.getElementById(graphId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length)
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Suppression des légendes
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

