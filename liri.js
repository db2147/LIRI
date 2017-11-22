/* Command: node liri.js <argument>

Arguments:
- my-tweets
- spotify-song
- movie-this
- do-what-it-says

*/
var keys = require("./keys.js");

var Twitter = require("twitter");
var arg1 = process.argv[2];




function getMyTweets() {
    // ... logic that uses your api key to retrieve tweets

    var client = new Twitter(keys);

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

search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 5 }, callback);

var spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: '2fe392f8af4848e3b98721af5fbd4851',
    secret: 'EGDXozuExiynFeUFk6CCooIxK5dGr7pNUEl55ZQnbU7As'
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
 if (err) {
   return console.log('Error occurred: ' + err);
 }

console.log(data); 
});



if (arg1 === "my-tweets") {
    getMyTweets();

}  else if (arg1 === "spotify-song") {
    console.log("blank");

}  else if (arg1 === "movie-this") {
    console.log("blank");

}  else if (arg1 === "do-what-it-says") {
    console.log("blank");

} else {
    console.log("I don't know this command... ");
}


