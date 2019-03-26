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


//When a user types conert-this <band name> do an axios call
//to bandsintwon and return the name of the venue, venue location
//and the date of the event using moment to format "MM/DD/YYYY"

var nodeArgs = process.argv;

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
        // movieThis();
    }
    else if (command === "do-what-it-says") {
        // doWhatItSays();
    }
    else {
        console.log("Enter a valid command!")
    }
}

var userInput = "";

for (let i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        userInput = userInput + "+" + nodeArgs[i];
    }
    else {
        userInput += nodeArgs[i];
    }
}

function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response)
        }
    )
}