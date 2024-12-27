Papa.parse('http://localhost/pestify/fichier-methodes-controle-biologique.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
        csvData = results.data;

        // Préparer les graphiques pour Nom méthode et Famille méthode
        afficherDonutUnique('Nom méthode ', 'Graphique des Noms Méthode');
        afficherDonutUnique('Famille méthode ', 'Graphique des Familles Méthode');
    }
});

function afficherDonutUnique(colonne, titre) {
    // Extraire les valeurs uniques
    const valeursUniques = [...new Set(csvData.map(item => item[colonne]).filter(Boolean))];

    // Préparer les données pour le graphique
    const labels = valeursUniques;
    const values = Array(labels.length).fill(1); // Chaque valeur unique compte comme 1
    const colors = labels.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)); // Couleurs aléatoires

    // Ajouter un conteneur pour chaque graphique
    const container = document.createElement('div');
    container.style.marginBottom = '30px';

    const chartTitle = document.createElement('h3');
    chartTitle.style.color = 'white';
    chartTitle.innerText = titre;

    const canvas = document.createElement('canvas');
    canvas.style.maxWidth = '600px';
    container.appendChild(chartTitle);
    container.appendChild(canvas);

    document.body.appendChild(container);

    // Afficher le graphique
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                legend: { position: 'bottom', labels: { color: 'white' } }
            },
            responsive: true
        }
    });
}
