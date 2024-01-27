import React from "react";
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from "react-router-dom";

const Live = () => {

    let {slug} = useParams();

    return(
        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
        </div>
    )
}

export default Live;