 // Chargement du fichier CSV et affichage des graphiques
 Papa.parse('http://localhost/pestify/fichier-methodes-controle-biologique.csv', {
    download: true,
    header: true,
    complete: function(results) {
        const csvData = results.data;

        // Extraction des données uniques pour le premier graphique (Nom méthode)
        const nomsMethodesUniques = [...new Set(csvData.map(item => item["Nom méthode "]).filter(Boolean))];
        const nomsMethodesCounts = nomsMethodesUniques.map(nom => 
            csvData.filter(item => item["Nom méthode "] === nom).length
        );

        // Extraction des données uniques pour le second graphique (Famille méthode)
        const famillesMethodesUniques = [...new Set(csvData.map(item => item["Famille méthode de contrôle biologique"]).filter(Boolean))];
        const famillesMethodesCounts = famillesMethodesUniques.map(famille => 
            csvData.filter(item => item["Famille méthode de contrôle biologique"] === famille).length
        );

        // Mise à jour des textes de compte
        document.getElementById("countGraph1").textContent = `Nombre total : ${nomsMethodesUniques.length}`;
        document.getElementById("countGraph2").textContent = `Nombre total : ${famillesMethodesUniques.length}`;

        // Création des graphiques
        afficherGraphiques(nomsMethodesUniques, nomsMethodesCounts, famillesMethodesUniques, famillesMethodesCounts);
    }
});

// Fonction pour créer les deux graphiques
function afficherGraphiques(labels1, data1, labels2, data2) {
    // Couleurs pour les graphiques
    const colors1 = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF7043', '#9575CD', '#03A9F4', '#8BC34A'];
    const colors2 = ['#4CAF50', '#FF7043', '#9575CD', '#36A2EB', '#FFCE56', '#FF6384', '#03A9F4', '#8BC34A'];

    // Initialiser le premier graphique (Nom méthode)
    const ctx1 = document.getElementById('graph1').getContext('2d');
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: labels1,
            datasets: [{
                data: data1,
                backgroundColor: colors1.slice(0, labels1.length)
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

    // Initialiser le second graphique (Famille méthode)
    const ctx2 = document.getElementById('graph2').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels2,
            datasets: [{
                data: data2,
                backgroundColor: colors2.slice(0, labels2.length)
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