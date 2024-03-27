import React, {useState, useEffect} from "react";
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from "react-router-dom";
import api from "../../api";

const Live = () => {

    let {slug} = useParams();

    const [infoStream, setInfoStream] = useState([]);
    const [userImg, setUserImg] = useState('')

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);

            if (result.data.data.length === 0){

                setInfoStream({title: "Le Streamer est offligne !"})

            } else {

            let dataArray = result.data.data[0];

            let userID = result.data.data.map(userid => {
                return userid.user_id;
            })

            // console.log(dataArray, userID);

            const resultUser = await api.get(`https://api.twitch.tv/helix/users?id=${userID}`);

            let dataUser = resultUser.data.data[0];
            let profile_pic = dataUser.profile_image_url;

            setUserImg(profile_pic);

            setInfoStream(dataArray);

            }
        }

        fetchData();

    },[slug])

    return(
        infoStream.title === "Le Streamer est offligne !" ?

        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="containerStreamLiveData">
                    <p className="streamLiveTitle">{infoStream.title}</p>
                </div>
            </div>
        </div>
        :
        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="containerImgLive">
                    <img className="liveUserImg" src={userImg} alt="image du profile" />
                    <p className="imgLive">Live</p>
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