import React from "react";
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'

const Live = () => {
    return(
        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel="boxbox" />
        </div>
    )
}

export default Live;