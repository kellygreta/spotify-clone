const client_id = "your client id"
const client_secret = "your client id"

function getToken() {

    var url = "https://accounts.spotify.com/api/token"
    var spotifyToken = window.localStorage.getItem("spotifyToken");

    if (window.navigator.onLine != true) {
       alert("Nessuna connessione a Internet")
    } else {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(client_id + ":" + client_secret),
            },
            body: new URLSearchParams({ grant_type: "client_credentials" }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Qualcosa è andato storto")
            })
    
            .then(tokenResponse => {
                window.localStorage.setItem("spotifyToken", tokenResponse.access_token)
                spotifyToken = window.localStorage.getItem("spotifyToken")
            })
            .catch((error) => console.log(error))
            
        return spotifyToken;
    }
}

var loggato = document.getElementById('loggato')
var form = document.getElementById('form')

function checkLogin() {
    if (window.localStorage.getItem('logged') != undefined) {
        logIn()

    } else {
        logOut()
    }
}

function logOut() {
    window.localStorage.removeItem('logged')
    form.classList.remove("visually-hidden")
    loggato.classList.add("visually-hidden")
}

function logIn() {
    form.classList.add("visually-hidden")
    loggato.classList.remove("visually-hidden")
}


function login() {
    users = window.localStorage.getItem('users')
    user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }

    if (users == null) {
        users = []
    } else {
        users = JSON.parse(users)
    }
    if (users.find(u => u.email == user.email && u.password == user.password) == undefined) {
        alert("email e/o password errati")
    } else {
        window.localStorage.setItem('logged', user.email)
        logIn()
    }

}
