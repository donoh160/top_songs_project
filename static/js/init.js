// --------------------------------------------------------------------------
// CREATE YEAR DROPDOWN
// --------------------------------------------------------------------------

// create the year array
let years = []
for (let i = 2006; i < 2025; i++) {
    years.push(i)
};

// identify its location in index.html
let dropdown = d3.select('#dropdown');

// create dropdown
years.forEach((year) => {
    let chosen = dropdown.append("option")
    chosen.text(year)
});

// function when an option is chosen from the dropdown
function yearChanged(selectedYear){
  duration(parseInt(selectedYear))
};


// --------------------------------------------------------------------------
// DURATION
// --------------------------------------------------------------------------

function duration(targetYear) {
// Select data from json file
  fetch('../columns_final_df.json')
    .then(response => response.json())
    .then(data => {

      // console.log('Duration: data, year, duration')
      // console.log(data)
      // console.log(data.Year)
      // console.log(data.Duration)

      // Create Duration Array
      let durArray = []

      // Loop through each track for selected year
      for (let i = 0; i < Object.keys(data.Duration).length; i++) {
        let year = data.Year[i]

        // Filter by Year
        if (year === targetYear){
          
          // Create array of track durations
          let dur = data.Duration[i]
          let min = dur.slice(0,1)
          let sec = dur.slice(2,)
          let totalSeconds = parseInt(parseInt(min)*60 + parseInt(sec))
          durArray.push(totalSeconds)
          }
        }
        console.log('Duration: durationArray')
        console.log(durArray)

      // Graph track durations as histogram
      let trace = {
        x: durArray,
        type: 'histogram',
      };
      var data = [trace];
      Plotly.newPlot('bubble', data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
  };



// --------------------------------------------------------------------------
// ARTIST
// --------------------------------------------------------------------------



// --------------------------------------------------------------------------
// POPULARITY
// --------------------------------------------------------------------------
