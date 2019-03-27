require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs")

let command = process.argv[2];
checkCommand();

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

function fixUserInput(fileArgs) {
    if (fileArgs !== undefined) {
        return fileArgs
    }
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

    if (userInput === "") {
        let emptyUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy"
        axios.get(emptyUrl).then(
            function (response) {
                let mrNobody = response.data
                console.log(mrNobody.Title)
                console.log(mrNobody.Year)
                console.log(mrNobody.Ratings[0].Value)
                console.log(mrNobody.Ratings[1].Value)
                console.log(mrNobody.Country)
                console.log(mrNobody.Language)
                console.log(mrNobody.Plot)
                console.log(mrNobody.Actors)
            }
        )
    } else {

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
}

function spotifyThis(fileArgs) {
    let userInput = fixUserInput(fileArgs);

    if (userInput === "") {
        userInput = "The Sign"
    }

    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        let tracks = data.tracks.items

        for (i = 0; i < tracks.length; i++) {
            let artists = tracks[i].artists
            let songName = tracks[i].name
            let previewLink = tracks[i].preview_url
            let album = tracks[i].album.name
            console.log("Song Name:", songName, "Preview:", previewLink, "Album:", album)
            for (j = 0; j < artists.length; j++) {
                let artistName = artists[j].name;
                console.log("Artist(s)", artistName)
            }
        }
    });
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        // console.log(data);
        let newArr = data.split(",");
        if (newArr[0] === "concert-this") {
            concertThis();
        }
        if (newArr[0] === "spotify-this-song") {
            spotifyThis(newArr[1]);
        }


    })
}
