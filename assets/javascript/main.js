$(document).ready(function () {

//Halloween Array
    var topics = [
        "Halloween",
        "Ghost",
        "Michael Myers",
        "Witch",
        "Spooky",
        "Pumpkin"
        
    ]

    var API_KEY = "dc6zaTOxFJmzC&limit=10";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";


    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        $("#buttons").append(button);
        button.addClass("btn btn-info topic");
        button.text(topics[i]);
    };

    function createImage(response, i) {
        var img = $("<img class='giphy-img'>");
        var rating = $("<h2>Rating: </h2>" + "<p>" + response.data[i].rating + "</p>");

        img.attr("src", response.data[i].images.downsized_still.url);
        img.attr("data-animated", response.data[i].images.downsized.url);
        img.attr("data-still", response.data[i].images.downsized_still.url);
        img.attr("data-state", "still");

        var cardDiv = $("<div class='card' text-white bg-dark id='gif-card'>");
        var cardBody = $("<div class='card-body'>");
        var cardFooter = $("<div class='card-footer'>");

        cardBody.append(img);
        cardFooter.append(rating);
        cardDiv.append(cardBody);
        cardDiv.append(cardFooter);
        return cardDiv;
    }

    $(document).on("click", ".topic", function () {
        $("#gifs").empty();
        $.ajax({
            method: "GET",
            url: queryUrl + $(this).text()
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                var img = createImage(response, i);

                $("#gifs").append(img);

            }
        });
    });

    $(document).on("click", ".giphy-img", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("data-state", "animated");
            $(this).attr("src", $(this).attr("data-animated"));
        } else {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
        }
    });

    var searchButton = $("#search-button");

    $(searchButton).on("click", function () {
        var newText = $("#search").val().trim();
        var newButton = $("<button>");
        newButton.text(newText);
        newButton.addClass("btn btn-info topic");
        $("#buttons").append(newButton);

    });

});