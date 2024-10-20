import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spotifyActions } from "../../store/spotify-slice";
import { AiOutlineSound } from "react-icons/ai";

import '../Body/Body.css'

const Artists = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const artists = useSelector(state => state.spotify.artists)
    // console.info('artists', artists)



    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };
    if (artists.length <= 0) {
        return <div className="body-title">No Artists</div>
    } else {
        return (<div>
            <div className="body-title">Artists</div>
            <div className="body-grid">
                {artists.map((artist, idx) => {
                    return (
                        <div className="song-card" key={idx}>
                            {artist.images.length > 0 && <img className="song-card-image" src={artist.images[0].url} />}
                            <div className="song-card-detail">
                                <div>
                                    <div className="song-card-name">{artist.name.substr(0, 15)}...</div>
                                    <div className="song-artist">
                                        {artist.genres.slice(0, 3).map((genre) => {
                                            return (
                                                <span>{genre.substr(0, 15)}</span>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="song-time"><AiOutlineSound /><div style={{ marginLeft: '10px' }}>Followers: {artist.followers.total}</div></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        )
    }


}

export default Artists