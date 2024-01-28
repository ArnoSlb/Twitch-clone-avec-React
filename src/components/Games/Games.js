import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Games = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            // console.log(result);

            let dataArray = result.data.data;
            let finalArray = dataArray.map((game) => {
                let newUrl = game.box_art_url
                .replace("{width}", "182")
                .replace("{height}", "252");
            game.box_art_url = newUrl;
            return game;
            });

            setGames(finalArray);
        };

        fetchData();
    }, [])

    return (
        <div>
            <h1 className="titleGames">Parcourir</h1>
            <h5 className="categoriesGames">Top Games</h5>
            <div className="flexAccueil">
                {games.map((game, index) => (
                    <div key={index} className="cardGames">
                        <Link 
                            className="lien" 
                            to={{pathname: "game/" + game.name}}
                            state={{ gameID: game.id}}
                        >
                            <img src={game.box_art_url} alt="jeu profile pic" className="imgCard" />
                            <div className="cardBodyGames">
                                <h5 className="titleCardGames">{game.name}</h5>
                                <div className="btnCard">Regarder {game.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Games;