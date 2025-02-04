// // CREATE YEAR DROPDOWN
// // --------------------------------------------------------------------------

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

function duration(targetYear) {
// Select data from json file
  fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {

      console.log('data')
      console.log(data)

      // Create Duration Array
      let durArray = []

      // Filter songs by Target Year (Will be selected from Dropdown in future)
      // let targetYear = '2006'

      // Loop through each track for selected year
      for (let i = 0; i < Object.keys(data).length; i++) {
        let initDate = data['Release Date'][i]
        let year = initDate.slice(0,4)

        // Filter by Year
        if (year === targetYear){
          
          // Create array of track durations
          let dur = data['Duration']
          for (let i = 0; i < Object.keys(dur).length; i++) {
            let min = dur[i].slice(0,1)
            let sec = dur[i].slice(2,)
            let totalSeconds = parseInt(parseInt(min)*60 + parseInt(sec))
            durArray.push(totalSeconds)
          }
        }
      }
        console.log('durationArray')
        console.log(durArray)

      // Graph track durations as histogram
      let trace = {
        x: durArray,
        type: 'histogram',
      };
      var data = [trace];
      Plotly.newPlot('durations', data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
    console.log(targetYear)
};


function yearChanged(selectedYear){
  // // ok i don't understand what to do here
  // // adjust plots accordingly.
  // // assign the chosen dropdown year to a variable
      // let targetYear = targetYear;
      // console.log(`lalala ${selectedYear}`)
    duration(selectedYear)
  };