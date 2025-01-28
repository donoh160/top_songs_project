// Fetch the JSON
fetch('split_cleaned_df.json')
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    console.log(data);

    //Create array to hold artists
    let artistArray = [];
    let releaseYear = []
    
    //Create for loop to get all songs release by Artist by year
    for (let i = 0; i < data.length; i++) {

      // set variables for Year and Artist NAme
      let releaseYear = data[i].year; 
      let artistName = data[i].artist;
  
  }
})


  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
