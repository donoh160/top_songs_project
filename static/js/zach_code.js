function zachsCode(){
  fetch('static/js/columns_final_df.json')
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    console.log('data', data);

    //Create array to hold artists
    let artistObject = [{'Artist': 'Placeholder', 'Frequency': 0}];
    let targetYear = 2006;
    
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
  console.log('artistObj', artistObject)

  // Sort by decending frequency
  artistObject.sort((a, b) => b.Frequency - a.Frequency);
  console.log('sorted artistObj', artistObject)

  // Take top 10 Artists
  // artistObject = artistObject.slice(0,10)
  // console.log('artistObj', artistObject)

  // Take all Artists with more than 1 song
  artistObject = artistObject.filter(artist => artist.Frequency>1)
  console.log('>1 Song', artistObject)

  // Create arrays for artists and frequencies
  let artistArr = []
  let freqArr = []
  for (let i = 0; i < artistObject.length; i++) {
    artistArr.push(artistObject[i]['Artist'])
    freqArr.push(artistObject[i]['Frequency'])
  }
  console.log(artistArr)
  console.log(freqArr)
  


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

zachsCode()
