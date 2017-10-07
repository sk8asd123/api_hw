var topics = ["CPP", "JavaScript", "Clojure", "Haskell", "Prolog", "Java", "Scala", "Fortran", "SQL"];
createButtons();


function search()  {
    var userInput = document.getElementById("search-input").value;
    console.log(userInput);
    console.log("i am clicked");
    topics.push(userInput);
    console.log(topics);
    createButtons();
    $("#search-input").val(" ");
};


var imageLimit = 10;
function createButtons() {
    $("#navigation-bar").empty();

    for (language in topics) {
        var btn = document.createElement("BUTTON");
        btn.setAttribute("data-language", topics[language]);
        btn.setAttribute("data-state", "still");
        btn.setAttribute("class", "btn btn-info navbar-btn");
        var t = document.createTextNode(topics[language]);
        console.log(t);
        btn.appendChild(t);
        $("#navigation-bar").prepend(btn);

    }
    $("button").on("click", displayGiph);
    console.log(topics);
}

function displayGiph() {
    console.log("button click");
    var language = $(this).attr("data-language");
    console.log(language)

    var state = $(this).attr("data_state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data_animate"));
        $(this).attr("data_state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data_still"));
        $(this).attr("data_state", "still");
    }

    // Constructing a URL to search Giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        language + "&api_key=dc6zaTOxFJmzC&limit=" + imageLimit;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating == "pg" || results[i].rating == "g") {
                    var gifDiv = $("<div class='item'>");

                    var p = $("<p>").text(language + " Rating: " + results[i].rating);

                    // Creating an image tag
                    var languageImage = $("<img>");

                    languageImage.attr("src", results[i].images.fixed_height_still.url);
                    languageImage.data("data-still", results[i].images.fixed_height_still.url);
                    languageImage.data("data-state", "animate");
                    languageImage.data("data-animate", results[i].images.fixed_height.url);
                    languageImage.data("class", "gif");

                    languageImage.on("mouseenter",animate);
                    languageImage.on("mouseleave", still);
                    gifDiv.append(p);
                    gifDiv.append(languageImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
};

function animate() {
    var animatedURL = $(this).data("data-animate");
    $(this).attr("src",animatedURL);
    $(this).data("state", "animate");
}

function still(){
    var stillURL = $(this).data("data-still");
    $(this).attr("src",stillURL);
    $(this).data("state", "still");
}
