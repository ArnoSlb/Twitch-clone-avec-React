import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link, useParams } from "react-router-dom";

const Result = () => {

    let {slug} = useParams();

    const [result, setResult] = useState(true);
    const [streamerInfo, setStreamerInfo] = useState([]);

    // on supprime les espaces pour les appels API
    let cleanSearch = slug.replace(/ /g,'')

    useEffect(() => {
        const fetchData = async() => {

            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`)
            console.log(result.data.data);

            setStreamerInfo(result.data.data)

        }
        fetchData();
    }, []) 

    return(
        <div>
            <div className="containerResult">
                <h4>Résultats de recherche :</h4>
                {streamerInfo.map((stream, index) => (

                    <div key={index} className="cardResult">
                        <img src={stream.profile_image_url} alt="resultat profile" className="imgCard" />

                        <div className="cardBodyResult">
                            <h5 className="titleCardStreamer">{stream.display_name}</h5>
                            <div className="txtResult">
                                {stream.description}
                            </div>

                            <Link 
                            className="lien"
                            to={{
                                pathname: `/live/${stream.login}`
                            }}>
                                <div className="btnCard btnResult">
                                    Regarder {stream.display_name}
                                </div>
                            </Link>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default Result;