Thank you for the explanation.

Please go to the following link: https://bls.sygic.com

 

Login credentials:

Login – please use your email address ( anna_p@mail.com )

Password - uDSaqG3C75WHBxMt

 

Your API key is valid from today for the period of two months : FSIhp77WhUeqYKTXyPx3g8aNe

 

Good luck with the project.

Miro

//API url for retrieve city with activities
const sygicURLBase = "https://api.sygictravelapi.com/1.0/en/places/list?"
var city = null;
var gate = 0;

//No city selected for call
let cityInput = null


//API key for Sygic
const sygicApiKey = "FSIhp77WhUeqYKTXyPx3g8aNe"

// create function to call the Point of Interest api
function getPOIs(location, callback) {
    const sygicURLBase = "https://api.sygictravelapi.com/1.0/en/places/list?" + location + "&APPID=" + weatherAppID;
  




//Sygic API call for city data
$.ajax({
    url: 'https://api.sygictravelapi.com/1.0/en/places/list?parents=city:'+ city +'&categories='+ activityVal +'&limit=20',
    beforeSend: function(xhr) {
         xhr.setRequestHeader("x-api-key", sygicApiKey)
    }, success: function(response){
        console.log(response);
        //process the JSON data etc
        
        //creates an array with all of the points of interested (poi) objects within. Use pois[i].location to get coords
        const placesObj = response.data.places

        
        /*if (response.data.places.length === 0) {
            gate2 = 1
            console.log(response.data.places.length)
            return getActivity ()
        }*/

        var pois = [];

        for (var i = 0; i < placesObj.length; i++) {
             pois[i] = placesObj[i];
        }

        console.log(pois)