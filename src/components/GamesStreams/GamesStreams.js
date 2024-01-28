import React, {useState, useEffect} from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import api from "../../api";

const GamesStreams = () => {

    let {slug} = useParams();
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
            <h1 className="titleGamesStreams">Streams : {slug}</h1>
            <h3 className="subtitlesGamesStreams">
                <strong className="textColored">{viewers}</strong> personnes regardent {slug}
            </h3>
            <div className="flexAccueil">
                {streamData.map((stream, index) => (
                    <div key={index} className="cardGameStreams">
                        <Link 
                            className="lien"
                            to={{
                                pathname: `/live/${stream.login}`
                            }}
                        >
                            <img src={stream.thumbnail_url} alt="jeu carte img" className="imgCard" />
                            <div className="cardBodyGameStreams">
                                <h5 className="titleCardStream">{stream.user_name}</h5>
                                <p className="txtStream">Nombre de viewers : {stream.viewer_count}</p>
                            </div>
                            <div className="btnCard">Regarder {stream.user_name}</div>
                        </Link>
           
                    </div>
                ))}
            </div>
        </div>
       
    )
}

export default GamesStreams;