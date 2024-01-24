import axios from "axios";

let api = axios.create({
    headers: {
        'Client-ID' : 'ukj6mwo1dyrrbxv5tkmfcwx0eceogj'
    }
});

export default api;