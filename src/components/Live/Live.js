import React, {useState, useEffect} from "react";
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from "react-router-dom";
import api from "../../api";

const Live = () => {

    let {slug} = useParams();

    const [infoStream, setInfoStream] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);

            let dataArray = result.data.data[0];

            const resultUser = await api.get(`https://api.twitch.tv/helix/streams?login=${slug}`);

            const dataUserArray = resultUser.data.data;

            const finalUserArray = dataUserArray.filter(user => user.user_login === slug)

            console.log(finalUserArray);

            setInfoStream(dataArray);
        }

        fetchData();

    },[slug])

    return(
        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="containerImgLive">
                    {/* <img src="" alt="image du profile" /> */}
                    <p className="live">Live</p>
                </div>
                <div className="containerStreamLiveData">
                    <h5 className="streamLiveUser">{infoStream.user_name}</h5>
                    <p className="streamLiveTitle">{infoStream.title}</p>
                    <p className="streamLiveGame">{infoStream.game_name}</p>
                    <p className="streamLiveViewer">{infoStream.viewer_count} viewers</p>
                </div>
            </div>
        </div>
    )
}

export default Live;