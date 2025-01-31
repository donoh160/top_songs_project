// Fetch the JSON
fetch('static/js/columns_final_df.json')
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    console.log(data);

    //Create array to hold artists
    let artistArray = [{}];
    let targetYear = 2007;

    
    //Create for loop to get all songs release by Artist by year
    for (let i = 0; i < Object.keys(data.Artist).length; i++) {
      
      //Check year
      let year = data.Year[i]
      if (year === targetYear) {

      // Find artist for each song
      let artist = data.artist[i];

      for (let i = 0; i < artistArray.length; i++) {
      
      // Check if artist is in Object, add 1
      if (artist in artistArray[i]) {
        artistObject[i][artist] += 1
        break
      }
      // Found new artist, create key and set to one
      else{
        artistArray[artist] = 1
        }
      }
    }

  // Define Variables to capture total songs per year
  let arr = Object.entries(artistArray)
  let frequencies = []
  
  // For loop to grab frequency of Artist in top 100
  for (let i = 0; i < arr.length; i++) {
    frequencies.push(arr[i][1])
  }

  // Graph Top songs by Artist as bar Graph
  let barData = [{
    type: "bar",
    x: artist.keys(artistArray).slice(0,10).reverse(),
    y: frequencies.slice(0,10).reverse(),
    orientation: "h"
  }];

  // Create layout to format graph
  let layout = {
    title: `Top Songs by Artist in ${targetYear}`,
    xaxis: {title: 'Artist'},
    yaxis: {title: 'Number of Songs in Top 100'}
  };
  // Plot the graph
  Plotly.newPlot('Artists', barData, layout);
}})
// Handle any errors
  .catch(error => {
  console.error('Error:', error);
  });
