# Liri-Node-App
A console based language search app. Uses Axios or node to access the following API's:

* [Bands in Town](https://manager.bandsintown.com/support/bandsintown-api)
* [OMDB](http://www.omdbapi.com/)
* [Spotify](https://www.npmjs.com/package/node-spotify-api)

### Running Liri App ###

This app has the following dependencies:

* [axios](https://www.npmjs.com/package/axios): ^0.18.0
* [dotenv](https://www.npmjs.com/package/dotenv): ^7.0.0
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api): ^1.0.7

You'll also need a [client ID and secret ID from Spotify](https://developer.spotify.com/my-applications/). 

### Built With ###
* Node.js
* JavaScript

### Command Structure ###
* concert-this __band name__
* movie-this __movie name__
* spotify-this-song __song name__
* do-what-it-says 

## Using Liri App ##

Using the command structure, users can search for a band, a movie, or a song, and retrieve information on those searches. The last command, do-what-it-says, is linked to a .txt file that the user can directly enter commands into.

### Concert-this ###

When the user types concert-this __band name__ the bands in town API is queried using Axios and returns where the band is playing next. If no band name is provided, the default is Death Cab for Cutie because those folks are _always_ on tour. The user must enter a valid command or else they receive a notifiction. 

To see this in action, [check out this video!](https://drive.google.com/open?id=1EZ37QVkYvs-rjmnaxYQEUywVmda7_5xJ)

![concert-this snap shot](/images/concert-this.PNG)

### Movie-this ###

When the user types movie-this __movie name__ the OMDB API is queried using Axios and returns information on the movie, including the actors, plot, release year, what country it was filmed in and what language. If no movie name is provided, the default is _Mr. Nobody_, which is currently available on Netflix. 

To see this in action, [check out this video!](https://drive.google.com/open?id=16wklU1vOD3hseuZ8WedlWlWLzw1i4Cee)

![movie-this snap shot](/images/movie-this.PNG)

### Spotify-this-song ###

When the user types spotify-this-song __song name__ the Spotify search API is hit using Node and returns the top five songs that match that name and provides information on those songs, including album name, artist name, and a preview link. If no song name is provided, the Spotify request API is hit instead and retrieves information on the song _Seattle Freeze_ by Who is She? [Check them out! ](https://www.youtube.com/watch?v=M1S5C7UJ_3s)

To see this in action, [check out this video!] (https://drive.google.com/open?id=1V1bder4x7rOrV6cGvCYUUmAZzMQczGC9) 

![spotify-this snap shot](/images/spotify-this.PNG)

### Do-what-it-says ###

When the user types do-what-it-says node retrieves the command and search from a .txt file.

To see this in action, [check out this video!](https://drive.google.com/open?id=1GG9PbSeQC_NZcgITbt7_Z2M6E9hTmmg1)

![do-what-it-says snap shot](/images/do-what-it-says.PNG)

## Roadmap ##

This little bot would really benefit from a little [Inquirer](https://www.npmjs.com/package/inquirer-checkbox-status) TLC.



