const chart = document.getElementById("graph1").getContext("2d");

const chart2 = document.getElementById("graph2").getContext("2d");


let data = {
    labels: ["Paris", "Lyon", "Marseille", "Nantes", "Toulon", "Toulouse", "Lille"],
    datasets: [{
        label:'Pluviométrie',
        data: [35, 40, 10, 17, 19, 10, 39],
        backgroundColor:['#fdebd0','#c0392b', '#f6ff16', '#15ff00', '#ff3fa4', '#b200ff', '#ffbf5f'],
        borderColor: '#c0392b',
        borderWidth: 1 
    }, {
        label:'Températures',
        data: [8, 30, 35, 17, 11, 40, 2],
        backgroundColor:['#fdebd0','#c0392b', '#f6ff16', '#15ff00', '#ff3fa4', '#b200ff', '#ffbf5f'],
        borderColor: '#c0392b',
        borderWidth: 1 
    }]
};


const can1 = new Chart(chart, 
    {
    type:"bar",
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtzero : true,
            },

            plugins:{
                title: {
                    display: true,
                    title: 'Pluviométrie 2024'
                }
            }
        }
    }
});

const can2 = new Chart(chart2, 
    {
    type:"line",
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtzero : true,
            },

            plugins:{
                title: {
                    display: true,
                    title: 'Pluviométrie 2024'
                }
            }
        }
    }
});