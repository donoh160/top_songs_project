// Flag to track if the dropdown has been changed at least once
let isFirstChange = true;

document.getElementById('dropdown').addEventListener('change', function() {
    if (isFirstChange) {
        var simpleBlurb = document.querySelector('.simpleblurb');
        
        // Add the 'visible' class to show the .simpleblurb
        simpleBlurb.classList.add('visible');
        
        // Set the flag to false so it doesn't toggle again
        isFirstChange = false;
    }
});

// --------------------------------------------------------------------------
// CREATE YEAR DROPDOWN FOR HTML
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

  
// --------------------------------------------------------------------------
// CREATE YEAR DROPDOWN FUNCTION
// --------------------------------------------------------------------------

// function when an option is chosen from the dropdown
function yearChanged(selectedYear){
  duration(parseInt(selectedYear)) // ethan
  artist(parseInt(selectedYear)) // zach
  topTen(parseInt(selectedYear))
  popularity(parseInt(selectedYear)) // jonathan
  
  let topTenHeader = `Top 10 Songs of ${selectedYear}`;
  document.getElementById('topTenHeader').innerHTML = topTenHeader;

  let durationHeader = `Duration`;
  document.getElementById('duration').innerHTML = durationHeader;

  let popularHeader = `Current Popularity`;
  document.getElementById('popularity').innerHTML = popularHeader;

  let artistHeader = `Artists`;
  document.getElementById('artist').innerHTML = artistHeader;

};


// --------------------------------------------------------------------------
// DURATION
// --------------------------------------------------------------------------
// change whenever updated: pathname, targetYear/selectedYear
function duration(targetYear){
  // Select data from json file
  fetch('../columns_final_df.json')
    .then(response => response.json())
    .then(data => {

      // DURATION
      
      // Create Duration Array
      let durArray = []

      // Filter songs by Target Year (Will be selected from Dropdown in future)
      // let targetYear = 2019

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
        // console.log('Duration: durationArray')
        // console.log(durArray)

      // Graph track durations as histogram
      let trace = {
        x: durArray,
        type: 'histogram',
      };

      // Create layout to format graph
      let layout = {
        title: {
          text: `Duration of Top Songs in ${targetYear}`
        },
        xaxis: {
          title: {
            text: 'Song Duration (seconds)'
          }
        },
        yaxis: {
          title: {
            text: 'Frequency'
          }
        }
      };

      var data = [trace];
      Plotly.newPlot('bubble', data, layout);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
}

// --------------------------------------------------------------------------
// ARTIST
// --------------------------------------------------------------------------

function artist(targetYear){
  fetch('../columns_final_df.json')
  .then(response => response.json())
  .then(data => {

    //Create array to hold artists
    let artistObject = [{'Artist': 'Placeholder', 'Frequency': 0}];

    //Create for loop to get all songs release by Artist by year
    for (let i = 0; i < Object.keys(data.Artist).length; i++) {
      
      // Check Year
      let year = data.Year[i]
      if (year === targetYear) {

        // Initialize dummy variable
        let located = true

        // Find artist of given song
        let artist = data.Artist[i];
        
        // Check if artist is already logged
        for (let i = 0; i < (artistObject.length); i++) {
          
          // Artist found -> Increment by 1
          if (artist === artistObject[i]['Artist']) {
            artistObject[i]['Frequency'] += 1
            break
          }
          
          // Artist not found -> Add new artist outside of loop
          if (i === (artistObject.length - 1)){
            located = false
          }
        }

        // Add new artist to object
        if (located === false){
        artistObject.push({'Artist': artist, 'Frequency': 1})
        }
    }
  }


  // Remove Placeholder
  artistObject = artistObject.slice(1,)
  // console.log('artistObj', artistObject)

  // Sort by decending frequency
  artistObject.sort((a, b) => b.Frequency - a.Frequency);
  // console.log('sorted artistObj', artistObject)

  // Take top 10 Artists
  // artistObject = artistObject.slice(0,10)
  // console.log('artistObj', artistObject)

  // Take all Artists with more than 1 song
  artistObject = artistObject.filter(artist => artist.Frequency>1)
  // console.log('>1 Song', artistObject)

  // Create arrays for artists and frequencies
  let artistArr = []
  let freqArr = []
  for (let i = 0; i < artistObject.length; i++) {
    artistArr.push(artistObject[i]['Artist'])
    freqArr.push(artistObject[i]['Frequency'])
  }
  // console.log(artistArr)
  // console.log(freqArr)
  


  // Graph Top songs by Artist as bar Graph
  let barData = [{
    type: "bar",
    x: artistArr,
    y: freqArr,
    // orientation: "h"
  }];

  // Create layout to format graph
  let layout = {
    title: {
      text: `Top Songs by Artist in ${targetYear}`
    },
    xaxis: {
      title: {
        text: 'Number of Songs in Top 100'
      }
    },
    yaxis: {
      title: {
        text: 'Artist'
      }
    }
  };

  // Plot the graph
  Plotly.newPlot('bar', barData, layout);
})

// Handle any errors
  .catch(error => {
  console.error('Error:', error);
  });
}

// --------------------------------------------------------------------------
// POPULARITY
// --------------------------------------------------------------------------

function popularity(targetYear) {

  fetch('../columns_final_df.json')
      .then(response => response.json())
      .then(data => {
          let titles = [];
          let ranks = [];
          let popularities = [];

          // Loop through data and filter by selected year
          Object.keys(data.Year).forEach(index => {
              if (data.Year[index] == targetYear) {
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
              title: `Song Rankings and Popularity in ${targetYear}`,
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


// --------------------------------------------------------------------------
// TOP TEN
// --------------------------------------------------------------------------

function topTen(targetYear){
  fetch('../columns_final_df.json')
  .then(response => response.json())
  .then(data => {

    let yearIndex = (targetYear - 2006)*100
    topSongArr = []
    for (let i = 0; i < 10; i++) {
      topSongArr.push({'Artist': data.Artist[yearIndex+i], 'Title': data.Title[yearIndex+i], 'Rank': data.Rank[yearIndex+i]})
    }
    console.log(topSongArr)


    // Use d3 to select the panel with id of `#sample-metadata`
    let sample_metadata = d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("")

    // Append key and property of each object to metadata panel
    topSongArr.forEach((k) => {
      let displaySample = sample_metadata.append("li")
      displaySample.text(`${k.Title} - ${k.Artist}`)
    });
  })
}