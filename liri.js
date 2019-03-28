//Requiring the dotenv package so this file can communicate with the
//text that's in the .env file
require("dotenv").config();

//Requiring the keys.js file which exports from the spotify object with the 
//id and secret id. Also need to require the node-spotify-api package in order to 
//access the spotify api via node. 
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
//creating a new instances of the spotify object with the correct keys
var spotify = new Spotify(keys.spotify);
//Requiring the axios and fs node packages
var axios = require("axios");
var fs = require("fs")


//setting the command variable to the process.argv[2]
let command = process.argv[2];
//running the checkCommand function to determine what the command was and if it's valid
checkCommand();

//this function checks the command input to determine which function needs to be called
//if the command isn't valid, the user is notified via the console
function checkCommand() {
    if (command === "concert-this") {
        concertThis();
    }
    else if (command === "spotify-this-song") {
        spotifyThis();
    }
    else if (command === "movie-this") {
        movieThis();
    }
    else if (command === "do-what-it-says") {
        doWhatItSays();
    }
    else {
        console.log("Enter a valid command!")
    }
}

//This function formats the user's input into the necessary format to be queired via
//axios. It takes a parameter of fileArgs which is passed from the doWhatItSays function
function fixUserInput(fileArgs) {
    //if fileArgs is NOT undefined (i.e, a value has been passed) then return fileArgs
    if (fileArgs !== undefined) {
        return fileArgs
    }

    //if fileArgs IS undefined input is an empty string, nodeArgs contains the entire
    //array of arguments (process.argv)
    let input = "";
    var nodeArgs = process.argv;
    //loop through nodeArgs starting at index[3] (we know index[1] is node, index[2] is
    //command). If the total length of nodeArgs is greater than 3, input becomes 
    //a string of each nodeArgs index separated by a space.
    for (let i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            input = input + "+" + nodeArgs[i];
        }
        //otherwise, input just becomes nodeArgs at index
        else {
            input += nodeArgs[i];
        }
        //return the new input
    } return input;
}

//this function runs when the command is concert-this
function concertThis(fileArgs) {

    //userInput becomes the input return from fixUserInput. This is the format for the queryUrl
    let userInput = fixUserInput(fileArgs);

    if (userInput === "") {
        userInput = "Death Cab for Cutie"
    }

    //this is the url that axios is using to call the bandsintown API
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    //axios call to the queryUrl and the promise that follows
    axios.get(queryUrl).then(
        //Object returned from axios
        function (response) {
            console.log("\n\r");
            console.log(`"Here's where ${userInput} is playing next:`)
            console.log(response.data[0].venue.name)
            console.log(response.data[0].venue.country)
            console.log(response.data[0].venue.city)

        }
    )
}
//This function uses axios to call the OMDB api to retrieve information on a movie
function movieThis(fileArgs) {
    let userInput = fixUserInput(fileArgs);

    //if the user doesn't type anything in for the movie, default to Mr Nobody
    if (userInput === "") {
        userInput = "Mr Nobody"
    }
    //omdb query url with the userInput
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    //axios call to the query url and promise
    axios.get(queryUrl).then(
        function (response) {
            //saved the response object in a variable to make it a little easier to call it
            //several times below
            let omdb = response.data
            console.log("\n\r");
            console.log(`Here's information on ${userInput}:`)
            console.log("Title: ", omdb.Title);
            console.log("Release Year:", omdb.Year);
            console.log("IMDB Rating:", omdb.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating:", omdb.Ratings[1].Value);
            console.log("Filmed in:", omdb.Country);
            console.log("Language:", omdb.Language);
            console.log("Actors:", omdb.Actors);
            console.log("Plot:", omdb.Plot);
        }
    )
}

//called when the command is spotify-this-song
function spotifyThis(fileArgs) {
    let userInput = fixUserInput(fileArgs);

    //if the user didn't enter anything for Spotify to search, do a request call instead and 
    //retreive the endpoint for a specific song, in this case Seattle Freeze by Who is She
    // (♫♪ It's not Seattle it's you ♫♪)
    if (userInput === "") {
        spotify
            .request('https://api.spotify.com/v1/tracks/7qUn6eEOgUpm0ZDWAPu1ND')
            .then(function (data) {
                console.log("\n\r");
                console.log("♫♪ It's not Seattle it's you ♫♪")
                console.log("Artist:", data.artists[0].name)
                console.log("Song:", data.name)
                console.log("Album:", data.album.name)
                console.log("Preview:", data.preview_url)

            })
            .catch(function (err) {
                console.error('This is embarrassing! Something went wrong... ' + err);
            });
        //if the user entered something to search, move onto this step
    } else {
        //using Spotify's search to search for what the user inputed, limiting to a return of five songs
        spotify.search({ type: 'track', query: userInput, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('This is embarrassing! Something went wrong... ' + err);
            }

            //since there was a lot to dig through on the search made a variable to hold the object up 
            //to the point I knew I'd need to start looping and grabbing information.
            let spotifyObj = data.tracks.items
            //Had to put this console log at the top or else it logged at every loop!
            console.log(`"Here are the top five results Spotify found for ${userInput}:"`)
            //loop through the spotify object to find the artists (I loop through this again later)
            //the song name, preview link, and album name. End in a second loop to go over the artists
            //object and grab names.
            for (i = 0; i < spotifyObj.length; i++) {
                let artists = spotifyObj[i].artists
                let songName = spotifyObj[i].name
                let previewLink = spotifyObj[i].preview_url
                //turns out a lot of the preview links are null, so made a little
                //message to handle that
                if (!previewLink) {
                    previewLink = "This song is shy and doesn't have a preview"
                }
                let album = spotifyObj[i].album.name
                for (j = 0; j < artists.length; j++) {
                    let artistName = artists[j].name;
                    console.log("\n\r");
                    console.log("Artist(s)", artistName)
                    console.log("Song:", songName)
                    console.log("Preview:", previewLink)
                    console.log("Album:", album)
                }
            }
        });
    }
}

//function is called when the command is do-what-it-says
function doWhatItSays() {
    //reading the random text file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        //splitting the text at the comma into an array with index[0] and index[1]. Index[0] is 
        //the command and index[1] is the search input. Perform a series of if statements to check
        //what the command is and run the appropriate function
        let newArr = data.split(",");
        if (newArr[0] === "concert-this") {
            concertThis();
        }
        if (newArr[0] === "spotify-this-song") {
            spotifyThis(newArr[1]);
        }
        if (newArr[0] === "movie-this") {
            movieThis(newArr[1])
        }
    })
}
