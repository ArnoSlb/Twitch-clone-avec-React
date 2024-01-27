import React, {useState, useEffect} from "react";
import api from "../../api";

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

                gamesNamesArray.forEach(name => {
                    getUsersArray.forEach(user => {
                        if(stream.user_id === user.id && stream.game_id === name.id) {

                            stream.gameName = name.name;
                            stream.truePic = user.profile_image_url;
                            stream.login = user.login;
                        }
                    })
                })

                return stream;

            })

            setTopStreams(finalArray.slice(0,10));
        }

        fetchData()

    }, [])

    console.log(topStreams)

    return (
        <div className="sidebar">
            <h2 className="titleSidebar">Chaînes recommandées</h2>
            <ul className="listStream">
                {topStreams.map((stream, index) => (
                    <li className="containerFlexSidebar" key={index}>
                        <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
                        <div className="streamUser">{stream.user_name}</div>
                        <div className="viewerRight">
                            <div className="redPoint"></div>
                            <div>{stream.viewer_count}</div>
                        </div>
                        <div className="gameNameSidebar">{stream.gameName}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Sidebar;