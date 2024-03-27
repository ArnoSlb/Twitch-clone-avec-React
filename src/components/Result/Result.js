import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link, useParams } from "react-router-dom";
import Error from "../Error/Error";

const Result = () => {

    let {slug} = useParams();

    const [result, setResult] = useState(true);
    const [streamerInfo, setStreamerInfo] = useState([]);

    // on supprime les espaces pour les appels API
    let cleanSearch = slug.replace(/ /g,'')

    useEffect(() => {
        const fetchData = async() => {

            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`)
            // console.log(result.data.data);

            if(result.data.data.length === 0){
                setResult(false);
            } else {
                setStreamerInfo(result.data.data)
            }
            

        }
        fetchData();
    }, [slug]) 

    return(

        result ? 
        <div>
            <div className="containerResult">
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
        :
        <Error/>
    )
}

export default Result;