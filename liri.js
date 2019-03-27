require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//grab user input
//check what command they wanted to run using process.argv

//if command ==== spotify-this-song then do spotify
//else if command === 

//command is process.argv[2]

let command = process.argv[2];
checkCommand();

function checkCommand() {
    if (command === "concert-this") {
        concertThis();
    }
    else if (command === "spotify-this-song") {
        // spotifyThis();
    }
    else if (command === "movie-this") {
        movieThis();
    }
    else if (command === "do-what-it-says") {
        // doWhatItSays();
    }
    else {
        console.log("Enter a valid command!")
    }
}

function fixUserInput() {
    let input = "";
    var nodeArgs = process.argv;
    for (let i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            input = input + "+" + nodeArgs[i];
        }
        else {
            input += nodeArgs[i];
        }
    } return input;
}

function concertThis() {

    let userInput = fixUserInput();

    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data[0].venue)
        }
    )
}

function movieThis() {
    let userInput = fixUserInput();

    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    console.log(queryUrl)

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            let omdb = response.data
            let title = omdb.Title;
            console.log(title);
            let year = omdb.Year;
            console.log(year);
            let imdb = omdb.Ratings[0].Value
            console.log(imdb)
            let rottenTomatoes = omdb.Ratings[1].Value
            console.log(rottenTomatoes);
            let country = omdb.Country
            console.log(country)
            let language = omdb.Language
            console.log(language);
            let plot = omdb.Plot
            console.log(plot)
            let actors = omdb.Actors
            console.log(actors)

        }
    )
}

