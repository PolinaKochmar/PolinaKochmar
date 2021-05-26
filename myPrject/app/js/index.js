$.get('js/data.json', function(data){
    chart(data)
})

function chart(data){
    const fctx = $("#firstChart")[0].getContext('2d');
    const firstChart = new Chart(fctx, {
        type: 'line',
        data: {
            labels: data.chartLabels,
            datasets: [
                {
                    label: 'Current usage',
                    data: data.firstCurrentUsageData,
                    backgroundColor: '#38C3FF',
                    borderColor: '#38C3FF',
                    borderWidth: 4,
                    pointRadius: 3,
                },
                {
                    label: 'Target amount',
                    data: data.firstTargetAmountData,
                    backgroundColor: '#38FFC0',
                    borderColor: '#38FFC0',
                    borderWidth: 4,
                    pointRadius: 3,
                },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })

    const sctx = $("#secondChart")[0].getContext('2d');
    const secondChart = new Chart(sctx, {
        type: 'line',
        data: {
            labels: data.chartLabels,
            datasets: [
                {
                    label: 'Current usage',
                    data: data.secondCurrentUsageData,
                    backgroundColor: '#38C3FF',
                    borderColor: '#38C3FF',
                    borderWidth: 4,
                    pointRadius: 3,
                },
                {
                    label: 'Target amount',
                    data: data.secondTargetAmountData,
                    backgroundColor: '#38FFC0',
                    borderColor: '#38FFC0',
                    borderWidth: 4,
                    pointRadius: 3,
                },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

$("#circle-125").circleProgress({
    value: 0.35,
    size: 150,
    fill: {
        gradient: ["#38C3FF", "#78F9E3", "#38FFC0"],
    },
    startAngle: -4.5
})

$("#circle-76").circleProgress({
    value: 0.30,
    fill: {
        gradient: ["#38FFC0", "#38C3FF"],
    },
    startAngle: -1.7
})