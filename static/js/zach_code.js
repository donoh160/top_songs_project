// Fetch the JSON
fetch('split_cleaned_df.json')
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    console.log(data);

    //Create array to hold artists
    let artistObject = {};
    let releaseYear = [];

    
    //Create for loop to get all songs release by Artist by year
    for (let i = 0; i < Object.keys(data); i++) {
      let releaseYear = data[i].Year

      if (releaseYear === targetYear) {
      // set variables for Year and Artist NAme
      let  = data[i].year; 
      let artist = data[i].artist;
      if (artist in artistObject) {
        artistObject[artist] += 1;
      }
      // Found new artist, create key and set to one
      else{
        artistObject[artist] = 1
      }
  

      }
  }
})

// Graph Top songs by Artist as bar Graph
let barData = [{
  type: "bar",
  x: artistArray,
  y: totalSongs,
  horizontal: "h"
}];


  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
