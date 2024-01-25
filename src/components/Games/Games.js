import React, {useState, useEffect} from "react";
import api from "../../api";

const Games = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            console.log(result);
        };

        fetchData();
    }, [])

    return (
        <div>
            <h1 className="titleGames">Jeux les plus populaires</h1>
            <div className="flexAccueil">

            </div>
        </div>
    )
};

export default Games;