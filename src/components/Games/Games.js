import React, {useState, useEffect} from "react";
import api from "../../api";

const Games = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            console.log(result);

            let dataArray = result.data.data;
            let finalArray = dataArray.map((game) => {
                let newUrl = game.box_art_url
                .replace("{width}", "250")
                .replace("{height}", "300");
            game.box_art_url = newUrl;
            return game;
            });

            setGames(finalArray);
        };

        fetchData();
    }, [])

    return (
        <div>
            <h1 className="titleGames">Jeux les plus populaires</h1>
            <div className="flexAccueil">
                {games.map((game, index) => (
                    <div key={index} className="cardGames">
                        <img src={game.box_art_url} alt="jeu profile pic" className="imgCard" />
                        <div className="cardBodyGames">
                            <h5 className="titleCardGames">{game.name}</h5>
                            <div className="btnCard">Regarder {game.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Games;