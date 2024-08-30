import axios from "axios";

let api = axios.create({
    headers: {
        "Client-ID": "ukj6mwo1dyrrbxv5tkmfcwx0eceogj",
        "Authorization": "Bearer p8zyo1lv2icyn69jdj1rx8s6469nbp"
    }
});

// CLIENT_ID = ukj6mwo1dyrrbxv5tkmfcwx0eceogj
// REDIRECT= 'http://localhost'
// LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token
// LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=ukj6mwo1dyrrbxv5tkmfcwx0eceogj&redirect_uri=http://localhost&response_type=token



export default api;