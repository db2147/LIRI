/* Command: node liri.js <argument>

Arguments:
- my-tweets
- spotify-song
- movie-this
- do-what-it-says

*/
var fs = require("fs");
var keys = require("./keys.js");

var Twitter = require("twitter");

var spotifyKeys = require("./spotifykeys.js");
var Spotify = require('node-spotify-api');

//var omdbKeys = require("./omdbkeys.js");    

var request = require("request");

var arg1 = process.argv[2];
var arg2 = process.argv[3];

function getMyTweets() {
    // ... logic that uses your api key to retrieve tweets

    var client = new Twitter(keys.twitterKeys);

    var params = {
        screen_name: 'Jose Ole'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log("-------------------------------------------------------");
            }
        }
        if (error) {
            console.log(error);
        }
    });

}
    //created a function for spotify
function spotifySong(song) {
    var spotify = new Spotify(keys.spotifyKeys);

        if (song == undefined) {
            song = 'The Sign Ace of Base';
        }

    spotify.search({ 
        type: 'track', 
        query: song 
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("ALBUM: " + data.tracks.items[0].album.name);  
        console.log("ARTIST: " + data.tracks.items[0].artists[0].name);
        console.log("SONG TITLE: " + data.tracks.items[0].name);
        console.log("SONG PREVIEW LINK: " + data.tracks.items[0].album.external_urls.spotify);
        // album 
        //artist
        // preview link
        // song name
         
        }); 
    }


// wrap code in function called getAMovie
function getAMovie(movieName) {

    if (movieName == undefined) {
        movieName = 'Mr.+Nobody';
    }



    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKeys.key;

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

        //     Parse the body of the site and recover just the imdbRating
        //     (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        //    https://stackoverflow.com/questions/46500553/referencing-json-data-result-from-api-request-javascript
        //    https://reformatcode.com/code/javascript/referencing-json-data-result-from-api-request---javascript 
        var body = JSON.parse(body);

            console.log("Title: " + body.Title);        
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value + RottenTomatoes);
        }
    });
}

function whatItSays() {
        fs.readFile('./random.txt', 'utf8', function (err, data) {
            if (err) throw err;
            spotifySong(data);
        });
}


if (arg1 === "my-tweets") {
    getMyTweets();

}  else if (arg1 === "spotify-song") {
    spotifySong(arg2)
// spotify song 

}   else if (arg1 === "movie-this") {
        getAMovie(arg2);

}  else if (arg1 === "do-what-it-says") {
    whatItSays()

} else {
    console.log("I don't know this command... ");

} 

    



