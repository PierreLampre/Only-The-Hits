 //Global Variables

        

        let bandID;
        let newBand0;
        let newBand1;
        let newBand2;
        let newBand3;
        let newBand4;
        let userId;
        let track; 
        let simBandName;


        //Arrays

        let similars = [];

        let simTopTracks = [];

        let simTrackNames = [];

        let simTrackURIs = [];

        let playlistId = [];

        // let currentURI;

        //authorization code from similar stackoverflow issue answered by spotify employee.

        // Get the hash of the url
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce(function (initial, item) {
                if (item) {
                    var parts = item.split('=');
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});
        window.location.hash = '';

        // Set token
        let _token = hash.access_token;

        const authEndpoint = 'https://accounts.spotify.com/authorize';

        // Replace with your app's client ID, redirect URI and desired scopes
        const clientId = '2ea8916fc375497c977cf897e6533579';
        const redirectUri = 'https://pierrelampre.github.io/OnlyTheHits';
        const scopes = [
            'playlist-modify-private',
            'playlist-modify-public',
            'user-top-read'
        ];

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
            window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
        }

        //_end stackoverflow auth fix_

        // necessary functions

        function getSimilarArtists() {

            console.log(initArtist);

            similars = [];
            var initArtist = $("#artistInput").val();

            // let initArtist = document.getElementById("artistInput").value;
            initArtist = initArtist.split(' ').join('+');

            $.ajax({
                url: "https://api.spotify.com/v1/search?query=" + initArtist + "&offset=0&limit=10&type=artist",
                type: "GET",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
                success: function (data) {

                    console.log(data);

                    bandID = data.artists.items[0].id.toString();

                    $.ajax({
                        url: "https://api.spotify.com/v1/artists/" + bandID + "/related-artists",
                        type: "GET",
                        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
                        success: function (data) {

                            console.log(data);

                            newBand0 = data.artists[0];
                            newBand1 = data.artists[1];
                            newBand2 = data.artists[2];
                            newBand3 = data.artists[3];
                            newBand4 = data.artists[4];

                            similars.push(newBand0);
                            similars.push(newBand1);
                            similars.push(newBand2);
                            similars.push(newBand3);
                            similars.push(newBand4);

                            namesInDiv();
                        }
                    });
                }
            });
        }

        function namesInDiv() {

            $("#sim-art").empty();

            for (let i = 0; i < similars.length; i++) {

                if (i === 4) {
                    $("#sim-art").append("<span class='sa'><img src='" + similars[i].images[0].url + "'width='100' height='100'><div id='button-div'><button class='sa-button' id='" + similars[i].name + "' data-id='" + similars[i].id + "'>" + similars[i].name + "</button'><button class='shows' data-id='" + similars[i].name + "'>Shows</button></div></span>");
                } else {
                    $("#sim-art").append("<span class='sa'><img src='" + similars[i].images[0].url + "' width='100' height='100'><div id='button-div'><button class='sa-button' id='" + similars[i].name + "' data-id='" + similars[i].id + "'>" + similars[i].name + "</button><button class='shows' data-id='" + similars[i].name + "'>Shows</button></div></span>");
                }

            }
        }

        //Button functionality for top track append

        $(document).on("click", ".sa-button", function () {

            $("#preview").empty();

            simTopTracks = [];

            simTrackNames = [];

            simTrackURIs = [];

            simBandName = "";

            var buttonId = $(this).attr("data-id");
            let theNumber = 0;

            $.ajax({
                url: "https://api.spotify.com/v1/artists/" + buttonId + "/top-tracks?country=US",
                type: "GET",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
                success: function (data) {

                    console.log(data);
                    console.log(data.tracks[0].preview_url);

                    simTopTracks = [];

                    prevTrack0 = data.tracks[0].preview_url;
                    prevTrack1 = data.tracks[1].preview_url;
                    prevTrack2 = data.tracks[2].preview_url;
                    prevTrack3 = data.tracks[3].preview_url;
                    prevTrack4 = data.tracks[4].preview_url;

                    simTopTracks.push(prevTrack0);
                    simTopTracks.push(prevTrack1);
                    simTopTracks.push(prevTrack2);
                    simTopTracks.push(prevTrack3);
                    simTopTracks.push(prevTrack4);

                    prevName0 = data.tracks[0].name;
                    prevName1 = data.tracks[1].name;
                    prevName2 = data.tracks[2].name;
                    prevName3 = data.tracks[3].name;
                    prevName4 = data.tracks[4].name;

                    simTrackNames.push(prevName0);
                    simTrackNames.push(prevName1);
                    simTrackNames.push(prevName2);
                    simTrackNames.push(prevName3);
                    simTrackNames.push(prevName4);

                    trackURI0 = data.tracks[0].uri;
                    trackURI1 = data.tracks[1].uri;
                    trackURI2 = data.tracks[2].uri;
                    trackURI3 = data.tracks[3].uri;
                    trackURI4 = data.tracks[4].uri;

                    simTrackURIs.push(trackURI0);
                    simTrackURIs.push(trackURI1);
                    simTrackURIs.push(trackURI2);
                    simTrackURIs.push(trackURI3);
                    simTrackURIs.push(trackURI4);

                    simBandName = data.tracks[0].artists[0].name;



                    $("#preview").append("<div class='iframe'><span id='iframebox'><p id='track-name'> " + simTrackNames[theNumber] + "</p><iframe src='" + simTopTracks[theNumber] + "'></iframe></span><p><button id='back'>Back</button><button id='atp' data-uri='" + simTrackURIs[theNumber] + "'>Add To Playlist</button><button id='next'>Next</button</p></div>");
                    $("#next").on("click", function () {
                        if (theNumber <= 3) {
                            theNumber++;
                            $("#iframebox").empty();
                            $("#iframebox").html("<p id='track-name'> " + simTrackNames[theNumber] + "</p><iframe src='" + simTopTracks[theNumber] + "'</iframe>");
                            $("#atp").attr("data-uri", simTrackURIs[theNumber]);
                        } else {

                        }
                    })
                    $("#back").on("click", function () {
                        if (theNumber >= 1) {
                            theNumber--;
                            $("#iframebox").empty();
                            $("#iframebox").html("<p id='track-name'> " + simTrackNames[theNumber] + "</p><iframe src='" + simTopTracks[theNumber] + "'</iframe>");
                            $("#atp").attr("data-uri", simTrackURIs[theNumber]);
                        } else {

                        }
                    })

                    $("#atp").on("click", function () {
                        let uri = $(this).attr("data-uri");
                        console.log(uri);
                        currentURI = uri
                        console.log("boo");

                        const url = "https://api.spotify.com/v1/playlists/" + playlistId[0] + "/tracks?uris=" + currentURI;

                        console.log(url);
                        console.log("uri ", currentURI );

                        $.ajax({
                            url: url,
                            headers: {
                                'Authorization': 'Bearer ' + _token,
                            },

                            method: "POST",

                            success: function (data) {
                                console.log("cool bro");
                                console.log(data);
                            },
                            error: function (response, status, error) {
                                console.log("This is the error:", error);
                                console.log("full response object is:", response);
                                console.log("somethin about status?", status);
                            }
                    });
                    $("#playlist").append("<p>" + simBandName + " - " + simTrackNames[theNumber] + "</p>");
                })

        }
            });

        console.log(buttonId);

        });

        //get user id function

        function getUserId() {

            $.ajax({
                url: "https://api.spotify.com/v1/me",
                type: "GET",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
                success: function (data) {

                    console.log(data);
                    userId = data.id;
                }
            });
        }

        //create a playlist function

        function createPlaylist() {

            playlistName = document.getElementById("listName").value;

            $.ajax({
                url: "https://api.spotify.com/v1/me/playlists",
                headers: {
                    'Authorization': 'Bearer ' + _token,
                },
                contentType: 'application/json',
                method: "POST",
                data: JSON.stringify({
                    "name": `${playlistName}`,
                    "public": true
                }),

                success: function (data) {
                    console.log(data);
                    let plID = data.id;
                    playlistId.push(plID);
                },
                error: function () {
                    console.log("Nope");
                }
            });

        }

        //add songs to playlist

        // function addSongToPlaylist() {

        //     currentURI = currentURI.split(':').join('%3A');

        //     $.ajax({
        //         url: "https://api.spotify.com/v1/playlists/" + playlistId[0] + "/tracks?uri=" + currentURI + "/",
        //         headers: {
        //             'Authorization': 'Bearer ' + _token,
        //         },
        //         contentType: 'application/json',
        //         method: "POST",

        //         success: function (data) {
        //             console.log("cool bro");
        //         },
        //         error: function () {
        //             console.log("Nopers");
        //         }
        //     });

        // }

        //functionality for similar artist search

        $("#submit").on("click", function (event) {
            event.preventDefault();

            getSimilarArtists();

        })

        //on click create playlist 

        $("#play").on("click", function (event) {
            event.preventDefault();

            console.log("Faaay");

            createPlaylist();

            $("#playlist").empty();
            $("#playlist").text("Click 'add to playlist' to add songs to your playlist!");

        })
