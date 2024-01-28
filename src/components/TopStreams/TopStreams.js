import React, {useEffect, useState} from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const TopStreams = () => {

    const [channels, setChannels] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get('https://api.twitch.tv/helix/streams')

            let dataArray = result.data.data;
            // console.log(dataArray);

            let gameIDs = dataArray.map( stream => {
                return stream.game_id
            })

            let userIDs = dataArray.map( stream => {
                return stream.user_id
            })

            // URL perso

            let baseUrlGames = `https://api.twitch.tv/helix/games?`
            let baseUrlUsers = `https://api.twitch.tv/helix/users?`

            let queryParamsGame = "";
            let queryParamsUser = ""

            gameIDs.map(id => {
                return (queryParamsGame = queryParamsGame + `id=${id}&`)
            })
            userIDs.map(id => {
                return (queryParamsUser = queryParamsUser + `id=${id}&`)
            })
            // console.log(queryParamsGame)

            // URL final

            let urlFinalGames = baseUrlGames + queryParamsGame
            let urlFinalUsers = baseUrlUsers + queryParamsUser
            // console.log(urlFinalGames, urlFinalUsers)

            // API call
            let gamesNames = await api.get(urlFinalGames);
            let getUsers = await api.get(urlFinalUsers);

            let gamesNamesArray = gamesNames.data.data;
            let getUsersArray = getUsers.data.data;
            // console.log(gamesNamesArray, getUsersArray)

            // Final Array
            let finalArray = dataArray.map(stream => {

                stream.gameName = "";
                stream.login = "";
                stream.truePic = "";
                let strViewer_count = null;

                gamesNamesArray.forEach(name => {
                    getUsersArray.forEach(user => {
                        if(stream.user_id === user.id && stream.game_id === name.id) {

                            stream.gameName = name.name;
                            stream.truePic = user.profile_image_url;
                            stream.login = user.login;
                        }

                        if(stream.viewer_count > 999 && stream.viewer_count < 10000){
                            strViewer_count = stream.viewer_count.toString();
                            stream.view = strViewer_count.substr(0,1) + "," + strViewer_count.substr(1,1) + " k";
                        } else if(stream.viewer_count > 9999 && stream.viewer_count < 100000){
                            strViewer_count = stream.viewer_count.toString();
                            stream.view = strViewer_count.substr(0,2)  + "," + strViewer_count.substr(2,1) + " k";
                        } else if(stream.viewer_count > 99999 && stream.viewer_count < 1000000){
                            strViewer_count = stream.viewer_count.toString();
                            stream.view = strViewer_count.substr(0,3)  + "," + strViewer_count.substr(3,1) + " k";
                        } else if(stream.viewer_count > 999999){
                            strViewer_count = stream.viewer_count.toString();
                            stream.view = strViewer_count.substr(0,1)  + "," + strViewer_count.substr(1,1) + " m";
                        }
                        stream.view = stream.view + " spectateurs"

                    })
                })

                let newUrl = stream.thumbnail_url
                .replace('{width}', '320')
                .replace('{height}', '180');
                stream.thumbnail_url = newUrl;
                return stream;

            })

            // console.log(finalArray)
            setChannels(finalArray);
        }

        fetchData()

    }, [])

    return (
        <div>
            <h1 className="titleGames">Parcourir</h1>
            <h5 className="categoriesGames">Top Streams</h5>
            <div className="flexAccueil">
                {channels.map((channel, index) => (
                     <div key={index} className="cardStream">
                        <Link className="lien" to={{
                            pathname: `/live/${channel.login}`
                        }}>
                            <img src={channel.thumbnail_url} className="imgStreamCard" alt="jeu" />
                            <p className="live">live</p>
                            <p className="liveViewers">{channel.view}</p>
                            <div className="cardBodyStream">
                                <img src={channel.truePic} alt="logo user" className="profilePicRonde" />
                                <div className="carBodyStreamData">
                                    <h5 className="titleCardsStream">{channel.title}</h5>
                                    <p className="gameNameSidebar">{channel.user_login}</p>
                                    <div className="gameNameSidebar">{channel.gameName}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default TopStreams;