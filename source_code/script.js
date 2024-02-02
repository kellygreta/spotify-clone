function showPlaylistsOption() {

    var sbody = document.getElementById('playlist_select')
    sbody.innerHTML = ""

    var playlists = window.localStorage.getItem('playlists')

    if (playlists === null) {
        playlists = []
    } else {
        playlists = JSON.parse(playlists)
    }

    for (var i = 0; i < playlists.length; i++) {
        if (playlists[i].owner === window.localStorage.getItem('logged')) {
            sbody.innerHTML += "<option value='"+playlists[i].nome+"'>" + playlists[i].nome + "</option>"
        }
    }
}

function setInput(id) {
    document.getElementById('trackid').value = id
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function add2playlist() {

    var trackid = document.getElementById('trackid').value
    var selected = document.getElementById('playlist_select').value

    var playlists = window.localStorage.getItem('playlists')

    if (playlists != null) {
        playlists = JSON.parse(playlists)
        for (var i = 0; i < playlists.length; i++) {
            if (playlists[i].nome == selected) {
                if(playlists[i].tracks.includes(trackid)){
                    alert("traccia già presente nella playlist") 
                }else{
                    playlists[i].tracks.push(trackid)
                    alert("traccia aggiunta alla playlist con successo")
                    window.localStorage.setItem('playlists', JSON.stringify(playlists));
                }
            }
        }
    }

}

function addplaylist() {

    playlists = window.localStorage.getItem('playlists')

    if (playlists === null) {
        playlists = []
    } else {
        playlists = JSON.parse(playlists)
    }

    var tracks = []

    var playlist = {
        nome: document.getElementById('playlist_nome').value,
        descrizione: document.getElementById('playlist_desc').value,
        tag: document.getElementById('playlist_tag').value,
        public: document.getElementById('pubblica').checked,
        owner: window.localStorage.getItem('logged'),
        tracks: tracks
    }

    //controllo se la playlist inserita ha lo stesso nome di una playlist già creata
    if (findPlaylist(playlists, playlist)) {
        alert("playlists già registrata")
    } else if(playlist.nome=="" || playlist.descrizione=="" || playlist.tag==""){
        alert("hai lasciato uno o più campi vuoti, per creare una playlist devi completarli tutti")
    }else{
        playlists.push(playlist)
        alert("playlists creata con successo!")
    }
       
    window.localStorage.setItem('playlists', JSON.stringify(playlists))

}

function findPlaylist(playlists, playlist) {
    for (var i = 0; i < playlists.length; i++) {
        if (playlists[i].nome == playlist.nome && playlists[i].owner == window.localStorage.getItem('logged'))
            return true
    }
    return false
}

function getParameter(parameter) {
    var query = window.location.search;
    var urlParams = new URLSearchParams(query);
    return urlParams.get(parameter)
}

function stato(flag) {
    var stato = ""
    if (flag == true) {
        stato = "pubblica"
    } else {
        stato = "privata"
    }
    return stato
}