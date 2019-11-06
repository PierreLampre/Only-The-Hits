        $(document).on("click", ".shows", function () {
            event.preventDefault();

            var artist = $(this).attr("data-id");
            //console.log(artist)
            var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/?app_id=codingbootcamp";
            // https://rest.bandsintown.com/artists/Weezer/events?app_id=codingbootcamp&date=upcoming
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $().text(JSON.stringify(response));

                //var artistName = $("<h1>").text(response.name);

                //button for "To The Shows"
                var buttonOne = $("<button>");
                buttonOne.addClass("btn-shows")
                //button for "Follow On Facebook"
                var buttonTwo = $("<button>");
                buttonTwo.addClass("btn-social")

                //link for shows
                var forShows = $("<a>").attr({"href": response.url, "target": "_blank"}).text("To the shows");
                console.log(forShows);
                forShows.addClass("for-shows");
                //link to facebook
                var socialMedia = $("<a>").attr({"href": response.facebook_page_url, "target": "_blank"}).text("Follow On Facebook");

                //var forShows= $("#artist-div").html("<p><a href='" + response.url + "'>To the shows</a></p>");
                buttonOne.append(forShows);
                buttonTwo.append(socialMedia);


                $("#bandsInTown").empty();
                // $("#bandsInTown").append(artistName);
                $('#bandsInTown').append(buttonOne);
                $('#bandsInTown').append(buttonTwo);

            });
            //Showing to page
            // $(".shows").on("click", function (event) {
            //    artist = $(this).attr("data-id");
            // });

        });