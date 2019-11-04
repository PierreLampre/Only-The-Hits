        $(document).on("click", "#select-artist", function () {
            event.preventDefault();

            var artist = $('#artist-name').val();
            //console.log(artist)
            var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/?app_id=codingbootcamp";
            // https://rest.bandsintown.com/artists/Weezer/events?app_id=codingbootcamp&date=upcoming
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $().text(JSON.stringify(response));

                var artistName = $("<h1>").text(response.name);

                //button for "To The Shows"
                var buttonOne = $("<button>");
                buttonOne.addClass("button")
                //button for "Follow On Facebook"
                var buttonTwo = $("<button>");
                buttonTwo.addClass("button")

                //link for shows
                var forShows = $("<a>").attr("href", response.url).text("To the shows");
                console.log(forShows);
                //link to facebook
                var socialMedia = $("<a>").attr("href", response.facebook_page_url).text("Follow On Facebook");

                //var forShows= $("#artist-div").html("<p><a href='" + response.url + "'>To the shows</a></p>");
                buttonOne.append(forShows);
                buttonTwo.append(socialMedia);


                $("#artist-div").empty();
                $("#artist-div").append(artistName);
                $('#artist-div').append(buttonOne);
                $('#artist-div').append(buttonTwo);

            });
            //Showing to page
            $("#selectArtist").on("click", function (event) {
                var artistInfo = $('#artist-name').val().trim();
            });

        });