import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";

const GamesStreams = () => {

    let location = useLocation();

    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`)

            let dataArray = result.data.data;

            let finalArray = dataArray.map(stream => {
                let newURL = stream.thumbnail_url
                    .replace('{width}', "320")
                    .replace('{height}', "180");
                stream.thumbnail_url = newURL;
                return stream;
            })

            //total viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0);

            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            let baseUrl = "https://api.twitch.tv/helix/users?"
            let queryParamsUsers = "";

            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })
            let finalUrl = baseUrl + queryParamsUsers;

            let getUsersLogin = await api.get(finalUrl);

            let userLoginArray = getUsersLogin.data.data;

            finalArray = dataArray.map(stream => {
                stream.login = "";
                userLoginArray.forEach(login => {
                    if(stream.user_id === login.id) {
                        stream.login = login.login;
                    }
                })

                return stream;
            })

            setViewers(totalViewers);
            setStreamData(finalArray);
        
        };

        fetchData();

    }, [])

    return (
        <div>
            <br /><br /><br /><br />
            <h1>Je suis Games Streams</h1>
        </div>
       
    )
}

export default GamesStreams;