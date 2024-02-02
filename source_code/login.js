function findUser(users, user) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == user.email)
            return true
    }
    return false
}


function check() {

    clearBadge()

    if (!minLen("email", 6)) {
        addBadge("Email troppo corta!");
    }
    if (!checkMail("email")) {
        addBadge("Email non valida!");
    }
    if (!minLen("nome", 3)) {
        addBadge("Nome troppo corto!");
    }
    if (!checkPassword()) {
        addBadge("La password non soddisfa i requisiti dei criteri di password");
    }
    if (!testPass()) {
        addBadge("La password inserita non coincide con la prima!");
    }
    if (!minLen("artistid", 1)) {
        addBadge("Aggiungi il tuo artista preferito!");
    }
    if(!checkGeneri(".btn-check:checked")){
        addBadge("Aggiungi almeno un genere che ti piace!");
    }
    if (!minLen("trackid", 1)) {
        addBadge("Aggiungi la tua traccia preferita!");
    }

    if (minLen("email", 6) && checkMail("email") && minLen("nome", 3)
        && checkPassword() && minLen("artistid", 1) && minLen("trackid", 1) && testPass()) {
        addSuccess()
    }
    return false;
}

function minLen(id, n) {
    return document.getElementById(id).value.length >= n

}

function checkGeneri(classe){
    return document.querySelectorAll(classe).length > 0
}

function checkMail(id) {
    email = document.getElementById(id).value;
    emailR = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return emailR.test(email)
}


function checkPassword() {
    password = document.getElementById("password").value;
    passwprdR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i
    return passwprdR.test(password)
}

function addBadge(text) {
    var alert = document.getElementById('alert');
    alert.style.display = "block";
    alert.innerHTML = alert.innerHTML + "<p>" + text + "</p>"

}

function addSuccess() {
    var success = document.getElementById('success');
    success.style.display = "block";
    success.innerHTML = "<p> Utente registrato con successo! Per accedere a GCMO clicca in basso a su Accedi e inserisci le tue credenziali. </p>"

}

function clearBadge() {

    var alert = document.getElementById('alert');
    alert.style.display = "none";
    innerHTML = alert.innerHTML = ""

    var success = document.getElementById('success');
    success.style.display = "none";
    innerHTML = success.innerHTML = ""
}


function testPass() {
    password = document.getElementById('password').value;
    password_2 = document.getElementById('password_conf').value;

    if (password.value != password_2.value) {
        return false
    }
    return true
}


function searchArtist(query) {
    var url = "https://api.spotify.com/v1/search?q=" + query + "&type=artist&limit=5"

    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("spotifyToken")
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Qualcosa è andato storto")
        })
        .catch((error) => console.log(error))
}

function searchBarArtist() {

    var tbody = document.getElementById('tbodyArtist')
    tbody.innerHTML = ""

    var query = document.getElementById('cercaArtista').value

    if (query.length > 2) {

        searchArtist(query)
            .then(json => {

                json.artists.items.forEach(artist => {

                    var generi = ""

                    if (artist.genres.length > 0) {
                        for (var i = 0; i < artist.genres.length; i++) {
                            generi += artist.genres[i] + "<br>"
                        }
                    }

                    tbody.innerHTML +=
                        `<tr><td><button class='btn btn-primary' onclick='setInputArtist("${artist.id}")' > + </button></td>`
                        + "<td>" + artist.name + "</td><td>"
                        + generi + "</td><tr>"

                });
            })

    }
}

function setInputArtist(id) {
    document.getElementById('artistid').value = id
}

function getGenres() {
    var generi = document.getElementById('generi')
    generi.innerHTML = ""

    fetch("	https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("spotifyToken")
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Qualcosa è andato storto")
        })
        .then(json => {
            json.genres.forEach(genre => {

                generi.innerHTML +=
                    "<div class='mb-3 col'><input type='checkbox' class='btn-check' id='" + genre + "' autocomplete='off'  value='" + genre + "'>" +
                    "<label class='btn btn-outline-primary' for='" + genre + "'>" + genre + "</label></div>"

            })
            registerLimitCheckEventListener()
        })
        .catch((error) => console.log(error))
}

function limitCheck(event) {
    var max = 3;
    var checkedChecks = document.querySelectorAll(".btn-check:checked")
    if (checkedChecks.length >= max + 1) {
        alert("Puoi scegliere al massimo 3 generi preferiti. Deseleziona qualche altro genere per aggiungere quello che hai appena selezionato")
        event.target.checked = false
        return
    }

}

function registerLimitCheckEventListener() {
    const checkboxes = document.getElementsByClassName("btn-check")
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", limitCheck)
    }
}


function searchTrack(query) {
    var url = "https://api.spotify.com/v1/search?q=" + query + "&type=track&limit=5"

    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("spotifyToken")
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Qualcosa è andato storto")
                .catch((error) => console.log(error))
        })

}

function searchBarTrack() {

    var tbody = document.getElementById('tbodyTrack')
    tbody.innerHTML = ""

    var query = document.getElementById('cercaTraccia').value

    if (query.length > 2) {

        searchTrack(query)
            .then(json => {

                json.tracks.items.forEach(track => {

                    var artists = ""
                    var coverUrl = ""

                    if (track.album.images.length > 0) {
                        coverUrl = "<img src='" + track.album.images[2].url + "'>"
                    }
                    else {
                        coverUrl = "foto non presente per la traccia corrispondente"
                    }

                    for (var i = 0; i < track.artists.length; i++) {
                        artists += track.artists[i].name + "<br>"
                    }

                    tbody.innerHTML +=
                        `<tr><td><button class='btn btn-primary' onclick='setInputTrack("${track.id}")' >+</button></td>`
                        + "<td>" + track.name + "</td><td>"
                        + artists + "</td><td>"
                        + millisToMinutesAndSeconds(track.duration_ms) + "</td><td>"
                        + track.album.release_date + "</td><td>"
                        + coverUrl + "</td><tr>"


                });
            })


    }
}

function setInputTrack(id) {
    document.getElementById('trackid').value = id
}