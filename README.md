# top_songs_project

## Overview
This repo was created in collaboration with Makenna Vick, Jonathon Bidon, Zach Rehfuss, DuVoe Moua, and Ethan Donoho. The purpose of this project is to analyze the "Billboard Hot 100" songs from the years 2006 to 2024. A webpage that displays yearly song data can be accessed via https://donoh160.github.io/top_songs_project/ (or on the repo home page). The analysis folder contains three python files that provide further analysis. The roles of each of the project members is outlined below. 
<br>

## Makenna Vick
The static folder includes our HTML, CSS, and final JavaScript file. I combined our group's various JavaScript files into one: init.js. While combining the JS files was not necessary, doing so simplified the number of JS files we needed to include, avoided accidental duplicate variable names, and resolved a few other minor issues. To view yearly data on song length, artists with the most hits, and current streaming popularity, visit https://donoh160.github.io/top_songs_project/ (alternatively, open index.html with a live server). 
<br>
I was set back quite a bit due to losing a full class day's worth of work due to a mix-up with my git commit. Were that not the case, I would have loved to add more details to our webpage. For help, I used previously provided code from earlier activities in the bootcamp, and Stack Overflow & ChatGPT (very minimally) to toggle the visibility of certain components of the webpage. Thanks to my team members as well for their help!
<br>

## Jonathan Bidon
The ranks.js file is JavaScript code to create a dual y-axis bar chart as an initial visualization to compare Billboards Hot 100 ranks and Spotify’s Popularity score for each year.
<br>
The ranks_analysis.ipynb is a Jupyter Notebook file that shows the scatter plots for each year to find the correlation coefficient for each year of data we have. You can edit the year of each scatter plot by switching the year in the third cell.
<br>
Then to take it a step further, I created another scatter plot that combines all the years together to shows the correlation coefficient, regression equation, and the r^2 value. You can find further analysis in the notebook file at the bottom.
<br>
I collaborated with all members of the group, as well as our TA Jordan Tompkins, a tutor from our bootcamp, and utilized the Xpert Learning Assistant.
<br>

## Zach Rehfuss
My project mate Ethan helped with fixing the for loop to find the target years as well as troubleshooting a lot of the issues related to the way the JSON data was being pulled and how it was affecting the graph. He came up with the idea to add a placeholder variable into the artistObject as the data was pulling incorrectly and not being able to be plotted on the bar graph as well as how to remove it. He also helped tweak the code for where I was pulling the JSON data from and fixing my code for having the data descending instead of ascending. He helped fix the slicing of the object to pull the artists with more than 1 song as there were multiple years where the 9th and 10th place artists were all tied for 2nd so we changed it from top 10 to every artist with more than 2. He also helped store the data for artists and frequency so we could plot it on the bar graph. Lastly, he helped format and debug some of my code for graphing the Data and some of my syntax for the layout. For my Jupyter Notebook Code, the Xpert learning assistant helped me fix my code for finding artists with only 1 Hit and it helped with syntax for my code looking at Drake’s total number of hits by showing me the .shape function.
<br>

## Ethan Donoho
I created the duration_analysis.ipynb file and the duration and top_10 functions inside of app.js which is used to display the webpage. 
<br>
duration_analysis.ipynb is a notebook which finds trends between song duration between the years of 2006 and 2024. A scatterplot is created with a regression line. Further analysis is found inside the file. 
<br>
I collaborated with all members of the group as well as the Xpert Learning Assistant. 
<br>

## DuVoe Moua

#### billboard.py
In order to make the API call there were several steps needed to get the proper information first.
<br>
Billboard.py provided 99% of the titles needed to get the added data from the spotify api. After running our for loop through the api to get data from 2006-2024 we noticed that the totals came out to 1898/1900. Meaning that 2 songs were missing. I did a len count by year and noticed that 2011 and 2016 were both missing 1 song. I created dataframes for both years and exported them as csvs and did a google search for the top 100 songs of both years to find the 2 missing values. Thankfully it didn’t take long. Once the 2 songs were found I added them into my data making sure they were added by year and rank.
<br>

```
new_row1 = {
   "Year": 2011,
   "Rank": 7,
   "Title": "Fuck You",
   "Artist": "CeeLo Green"
}
new_row2 = {
   "Year": 2016,
   "Rank": 87,
   "Title": "All the Way Up",
   "Artist": "Fat Joe Featuring Remy Ma, French Montana and Infared"
}
```
<br>

Once added I did another count to verify the totals were correct. There were also several songs and artists that needed to be updated.

<br>

```
df_all_years.loc[524, 'Title'] = 'Good Life'
df_all_years.loc[148, 'Title'] = "I'm a Flirt Remix (feat. T.I. & T-Pain)"
df_all_years.loc[148, 'Artist'] = "R. Kelly Featuring Bow Wow (Featuring T.I. & T-Pain)"
df_all_years.loc[1506, 'Artist'] = "Bruno Mars Featuring Anderson .Paak (Silk Sonic)"
df_all_years.loc[1123, 'Title'] = "Bodak Yellow"
df_all_years.loc[1656, 'Title'] = "Hrs & Hrs"
df_all_years.loc[1485, 'Artist'] = "Travis Scott"
df_all_years.loc[691, 'Title'] = "Cashin' Out"
df_all_years.loc[691, 'Artist'] = "Ca$h Out"
df_all_years.loc[691, 'Title'] = "Ransom"
```
<br>

I also replaced certain special characters and replaced them with the word “featuring” and split my artist column on Featuring to ensure that we would have 1 artist pulling from the spotify api. I then dropped extra ‘Artist’ columns as needed.
<br>

```
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' & ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(':', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' Duet With ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' x ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' With ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' + ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(', ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' / ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' vs. ', ' Featuring ', regex=False)
df_all_years['Artist'] = df_all_years['Artist'].str.replace(' Feat. ', ' Featuring ', regex=False)
df_all_years.head(1523)
```
<br>
Once the totals were confirmed I put the title names into a list and ran my list through the Spotify api.

#### Spotify API:
In order to use the Spotify API I needed to first create a Spotify Developer acct. Thankfully its easy if you already have an acct. Once the acct has been made you can create an app to get your client_id and Client_secret needed to run the api. From there I utilized stackoverflow and youtube to create functions to: Get my Token, Get my authorization Header, and search for the specific songs in my list.
<br>
Once the api was ran I put all the data into a dataframe. I removed the release date and added 2006 to the first 100 rows and had the years increase by 1 every 100 rows. I also iterated through the rows to make sure to add the rank 1-100 for each 100 rows.
<br>

#### Citations
https://stackoverflow.com/questions/65435932/spotify-api-authorization-code-flow-with-python
https://stackoverflow.com/questions/69457719/trouble-iterating-through-pandas-dataframe-and-executing-spotify-api
https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
https://developer.spotify.com/documentation/web-api/concepts/api-calls#response-status-codes
https://www.artist.tools/features/spotify-popularity-index
https://www.youtube.com/watch?v=WAmEZBEeNmg&t=1032s
https://github.com/guoguo12/billboard-charts
https://spotipy.readthedocs.io/en/2.25.0/
https://medium.com/@rachit.lsoni/scraping-song-lyrics-a-fun-and-practical-guide-c0b07e8e7312
https://www.androidpolice.com/spotify-new-api-terms-third-party-apps/




