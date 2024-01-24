import axios from "axios";

let api = axios.create({
    headers: {
        "Client-ID": "ukj6mwo1dyrrbxv5tkmfcwx0eceogj",
        "Authorization": "Bearer yk8yd1nafcm349yryucu8hvbkv1woo"
    }
});

// CLIENT_ID = ukj6mwo1dyrrbxv5tkmfcwx0eceogj
// REDIRECT= 'http://localhost'
// LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token
// LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=ukj6mwo1dyrrbxv5tkmfcwx0eceogj&redirect_uri=http://localhost&response_type=token



export default api;