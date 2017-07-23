var mediaArray = ["Game of Thrones", "Broad City", "Workaholics", "Vikings", "Stranger Things", "Outlander", "Key & Peele", "Parks and Recreations",];


//here we create the function for displaying buttons 
function createButtons()
{

  // Deleting the media buttons prior to adding new media buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#makeButtons").empty();

  /*This loops through the array of tv shows, so in the next steps
  I can create the buttons dynamically for each of the elements in 
  this array*/
  for (var i = 0; i < mediaArray.length; i++) 
  {
    // here we create and store the variable for the button
    var mediaButton = $("<button>");

    /*here I add a bootstrap class to the media button
    which also gives it its color*/
    mediaButton.addClass("media btn btn-info button");

    //here I add a data-name attribute to value of each object in the array
    mediaButton.attr("data-name", mediaArray[i]);

    // the button is provided text with the value of the string at mediaArray[i]
    mediaButton.text(mediaArray[i]);

    // Adding the button that I just created to the HTML ID of madeButtons
    $("#makeButtons").append(mediaButton);
  }
}

//after creating the function, the function is
createButtons();


// Event listener for all button elements

$(document).on("click", "button", function(event) {

// This was the first way we used the on click:   $("button").on("click", function() {
// In this case, the "this" keyword refers to the button that was clicked

var media = $(this).attr("data-name");

// Constructing a URL to search Giphy for the name of the person who said the quote
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    media + "&api_key=dc6zaTOxFJmzC&limit=10";

console.log(queryURL);
// Performing our AJAX GET request
$.ajax({
        url: queryURL,
        method: "GET"
    })
    // After the data comes back from the API
    .done(function(response) {

// Removing after the first 10 items so it doesn't repeat
$("img").remove();
$(".rating").remove();

// Storing an array of results in the results variable

var results = response.data;

// Looping over every result item
for (var i = 0; i < results.length; i++) {

// Only taking action if the photo has an appropriate rating
if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    // Creating a div with the class "item"
    var gifDiv = $("<div class='item '>");

    // Storing the result item's rating
    var rating = results[i].rating;

    // Creating a paragraph tag with the result item's rating
    var p = $("<p>").text("Rating: " + rating);

    p.addClass("rating");

    // Creating an image tag
    var stillImage = $("<img>");


    // Giving the image tag an src attribute of a proprty pulled off the
    // result item

    stillImage.attr("src", results[i].images.fixed_height.url);

    // animatedImage.attr("src", results[i].images.fixed_height.url);



    // Appending the paragraph and personImage we created to the "gifDiv" div we created

    gifDiv.append(p);
    gifDiv.append(stillImage);

    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML

    $("#gifs-appear-here").prepend(gifDiv);


                    }
                }
            });
    });


    // // This function handles events where one button is clicked


    $("#add-tv-show").on("click", function(event) {

        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want

        event.preventDefault();

        // This line will grab the text from the input box

        var newmedia = $("#tv-show-input").val().trim();

        // The media from the textbox is then added to our array

        mediaArray.push(newmedia);
        createButtons();

        $('#tv-show-input').val('');

});