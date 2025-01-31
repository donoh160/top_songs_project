///////////// Dual Y-Axis Bar Chart Code///////////////////////////////////
// Select data from JSON file
fetch('columns_final_df.json')
    .then(response => response.json())
    .then(data => {
        console.log('Data loaded:', data);

        // Get unique years for dropdown
        let uniqueYears = [...new Set(Object.values(data.Year))];

        // Create dropdown for year selection
        let dropdown = document.createElement('select');
        dropdown.id = 'yearDropdown';
        dropdown.onchange = updateChart;
        uniqueYears.forEach(year => {
            let option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            dropdown.appendChild(option);
        });
        document.body.appendChild(dropdown);

        // Initial plot with the first available year
        updateChart();
    });

// Function to update chart based on selected year
function updateChart() {
    let selectedYear = document.getElementById('yearDropdown').value;

    fetch('columns_final_df.json')
        .then(response => response.json())
        .then(data => {
            let titles = [];
            let ranks = [];
            let popularities = [];

            // Loop through data and filter by selected year
            Object.keys(data.Year).forEach(index => {
                if (data.Year[index] == selectedYear) {
                    titles.push(data.Title[index]);
                    ranks.push(data.Rank[index]);
                    popularities.push(data.Popularity[index]);
                }
            });

            // Create traces for Rank and Popularity
            let trace1 = {
                x: titles,
                y: popularities,
                type: 'bar',
                name: 'Popularity',
                marker: { color: 'green' },
                yaxis: 'y1',
                offsetgroup: 1,
            };

            let trace2 = {
                x: titles,
                y: ranks,
                type: 'bar',
                name: 'Rank',
                marker: { color: 'red', opacity: 0.7 },
                yaxis: 'y2',
                offsetgroup: 2,
            };

            let layout = {
                paper_bgcolor: 'rgba(240,240,240,0.9)',  // Light gray background
                plot_bgcolor: 'white',  // White chart background
                title: `Song Rankings and Popularity in ${selectedYear}`,
                width: 1000,
                height: 750,
                xaxis:{ title: {text: 'Song Title'},
                automargin: true,
                autosize: false,
                margin: {
                  l: 50,
                  r: 50,
                  b: 100,
                  t: 100,
                  pad: 4
                },
            },
                yaxis: {
                    title: 'Popularity',
                    side: 'left',
                    range: [20,100],
                    showgrid: false
                },
                yaxis2: {
                    title: 'Rank',
                    overlaying: 'y',
                    side: 'right',
                    range: [1, 100], // Rank starts at 1 (removes 0)
                    tickmode: 'linear', // Keeps ticks evenly spaced
                    dtick: 10 // Adjusts tick spacing 
                },
                barmode: 'group'
            };

            let dataPlot = [trace1, trace2];

            Plotly.newPlot('chart', dataPlot, layout);
        });
}

// Add a div to hold the chart
document.body.innerHTML += '<div id="chart"></div>';
