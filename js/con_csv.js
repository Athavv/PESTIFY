 // Charger le fichier CSV avec encodage UTF-8
 Papa.parse('http://localhost/pestify/fichier-methodes-controle-biologique.csv', {
    download: true,
    header: true, // Lire la première ligne comme les noms de colonnes
    dynamicTyping: true,  // Cela peut aider avec des types de données numériques
    encoding: "UTF-8", // Force l'encodage UTF-8
    complete: function(results) {
        const data = results.data; // Récupérer toutes les données du CSV
        
        // Vérifier la première ligne pour voir les données extraites
        console.log("Premières lignes des données extraites : ", data.slice(0, 5));

        // Vérifier si des données ont été extraites
        if (data.length === 0) {
            console.error("Aucune donnée valide trouvée dans le fichier CSV.");
            return;
        }

        // Afficher les noms de colonnes et vérifier les méthodes
        const headers = Object.keys(data[0]);
        console.log("Colonnes dans le fichier CSV : ", headers);

        // Extraire les valeurs de la colonne "Nom de méthode"
        const methods = data.map(item => item["Nom méthode "]);
        console.log("Méthodes extraites : ", methods);

        // Vérifier si la colonne "Nom de méthode" existe
        if (!methods[0]) {
            console.error("La colonne 'Nom de méthode' est introuvable dans les données CSV.");
            return;
        }

        // Comptage des occurrences de chaque méthode
        const methodCounts = {};
        methods.forEach(function(method) {
            methodCounts[method] = (methodCounts[method] || 0) + 1;
        });

        // Obtenir les noms uniques de méthodes et leurs comptages
        const labels = Object.keys(methodCounts);
        const counts = Object.values(methodCounts);

        // Calculer le total pour obtenir les pourcentages
        const total = counts.reduce((a, b) => a + b, 0);
        const percentages = counts.map(count => ((count / total) * 100).toFixed(2));

        // Créer le graphique Donut avec Chart.js
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut', // Type de graphique : Donut
            data: {
                labels: labels, // Méthodes comme labels
                datasets: [{
                    label: 'Répartition des méthodes de traitement',
                    data: counts, // Occurrences de chaque méthode
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.3)',
                        'rgba(54, 162, 235, 0.3)',
                        'rgba(255, 206, 86, 0.3)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const percentage = percentages[tooltipItem.dataIndex];
                                return `${tooltipItem.label}: ${percentage}%`;
                            }
                        }
                    }
                }
            }
        });
    }
});