import React, {useState, useEffect} from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const [topStreams, setTopStreams] = useState([]);

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
                stream.truePic = "";
                stream.login = "";
                stream.view = "";
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
                    })
                })

                return stream;

            })

            setTopStreams(finalArray.slice(0,10));
        }

        fetchData()

    }, [])

    // console.log(topStreams)

    return (
        <div className="sidebar">
            <h2 className="titleSidebar">Chaînes recommandées</h2>
            <ul className="listStream">
                {topStreams.map((stream, index) => (
                    <Link className="lien" to={{pathname: `/live/${stream.user_login}`}}>
                        <li className="containerFlexSidebar" key={index}>
                            <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
                            <div className="sidebarStreamData">
                                <div className="streamUser">{stream.user_name}</div>
                                <div className="gameNameSidebar">{stream.gameName}</div>
                            </div>
                            <div className="viewerRight">
                                <div className="redPoint"></div>
                                <div>{stream.view}</div>
                            </div>
                        </li>
                    </Link>
        
                ))}
            </ul>
        </div>
    )
};

export default Sidebar;