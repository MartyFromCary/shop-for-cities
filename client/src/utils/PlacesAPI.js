// import keys from "../../../keys";

// const googleKey = new googleID(keys.google);

const googleKey = "AIzaSyDp_oAh4hQ_MZcAM-mtx5vJW65NCs_cxMA";

// fetch option////////////////////////////////////


export const POI = function (latlong, callback) {
    var queryUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance&location=" + latlong + "&key=" + googleKey;
    // https://cors-anywhere.herokuapp.com/
    fetch(queryUrl)
    .then(function(response) {
        console.log(response);
      return response.json();
    })
    .then(function(json) {
      callback({
          results: json.results
      });
  })
    .catch(function (err) {
        console.log("error");
    });
}

// export default Places;
