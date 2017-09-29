

// requesting Keys from keys.js and grabbing data
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var fs = require('fs');

//store arguments in an array

var nodeArg = process.argv;
var command  = process.argv[2];

//user input, calls what you want
var userInput = '';

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify({
  id: "b2ba687426b54577aa72f3f6845852cc",
  secret: "09436987d4d44f2b98249b139c4fe342"
});

for(var i = 3; i < nodeArg.length; i ++){
	// if(i > 3  && i < nodeArg.length){
		userInput += userInput + "+" + nodeArg[i];
	// }
	
}



//____________________Tweetter

// Function for running a Twitter Search
var myTweets = function() {
  var client = new Twitter(keys);

  var params = {
    screen_name: "Holarpm",
    count: 20
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) {
    	console.log('error', error)
    }
    else {
			console.log("----------");
			console.log("recent tweets");

			for (var i = 0; i < tweets.length; i++){
				console.log("_______________");
                console.log("Tweets: " + tweets[i].created_at);
                console.log(tweets[i].text);
			}
		}
  });
};


//__________________Spotify

function spotifySong(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        
        //adds text to log.txt
        fs.appendFile('log.txt', songData.artists[0].name);
        fs.appendFile('log.txt', songData.name);
        fs.appendFile('log.txt', songData.preview_url);
        fs.appendFile('log.txt', songData.album.name);
        fs.appendFile('log.txt', "-----------------------");
      }
    } else{
      console.log('Error occurred.');
    }
  });
}

//__________________movie
function omdbMovie(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true&r=json&apikey=40e9cece';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var bodydata = JSON.parse(body);

      console.log("Title: " + bodydata.Title);
      console.log("Release Year: " + bodydata.Year);
      console.log("IMdB Rating: " + bodydata.imdbRating);
      console.log("Country: " + bodydata.Country);
      console.log("Language: " + bodydata.Language);
      console.log("Plot: " + bodydata.Plot);
      console.log("Actors: " + bodydata.Actors);
      console.log("Rotten Tomatoes Rating: " + bodydata.tomatoRating);
      console.log("Rotten Tomatoes URL: " + bodydata.tomatoURL);

      //adds text to log.txt
      fs.appendFile('log.txt', "Title: " + bodydata.Title);
      fs.appendFile('log.txt', "Release Year: " + bodydata.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + bodydata.imdbRating);
      fs.appendFile('log.txt', "Country: " + bodydata.Country);
      fs.appendFile('log.txt', "Language: " + bodydata.Language);
      fs.appendFile('log.txt', "Plot: " + bodydata.Plot);
      fs.appendFile('log.txt', "Actors: " + bodydata.Actors);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + bodydata.tomatoRating);
      fs.appendFile('log.txt', "Rotten Tomatoes URL: " + bodydata.tomatoURL);

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}

function doIt(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}

//swhitch case
console.log(userInput);
switch(command){
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	if(userInput){
		spotifySong(userInput);
	}
	else{
		spotifySong("The Sign");
	}
   break;

   case "movie-this":
   if(userInput){
   	omdbMovie("Mr. Nobody")
   }
   break;

   case "do-what-it-says":
    doIt();
    break;

    default:
    console.log("{Please chose a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;

}










