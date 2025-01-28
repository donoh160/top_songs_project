
// Select data from json file
fetch('static/js/data.json')
  .then(response => response.json())
  .then(data => {

    console.log('data')
    console.log(data)

    // Create Duration Array
    let durArray = []

    // Filter songs by Target Year (Will be selected from Dropdown in future)
    let targetYear = '2006'

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
