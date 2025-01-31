// Fetch the JSON
fetch('static/js/split_cleaned_df.json')
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    console.log(data);

    //Create array to hold artists
    let artistObject = {};
    let targetYear = 2007;

    
    //Create for loop to get all songs release by Artist by year
    for (let i = 0; i < Object.keys(data.Artist); i++) {
      
      let year = data[i].Year

      if (year === targetYear) {
      // Find artist for each song
      
      let artist = data.artist[i];
      // Check if artist is in Object, add 1
      if (artist in artistObject) {
        artistObject[artist] += 1;
      }
      // Found new artist, create key and set to one
      else{
        artistObject[artist] = 1
        }
      }
    }
  // Graph Top songs by Artist as bar Graph
  let barData = [{
    type: "bar",
    x: artistObject,
    y: targetYear,
    orientation: "h"
  }];

  // Create layout to format graph
  let layout = {
    title: `Top Songs by Artist in ${targetYear}`,
    xaxis: {title: 'Number of Songs in Top 100'},
    yaxis: {title: 'Artist'}
  };
  // Plot the graph
  Plotly.newPlot('Artists', barData, layout);
})
// Handle any errors
  .catch(error => {
  console.error('Error:', error);
  });
