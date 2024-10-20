import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spotifyActions } from "../../store/spotify-slice";
import './Playlist.css'

export default function Playlists() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const playlist = useSelector(state => state.spotify.playlist)
    const query = useSelector(state => state.spotify.query)
    // console.info('playlist', playlist)

    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${query}&type=playlist`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.data.playlists.items).then((playlists) => dispatch(spotifyActions.setPlaylist({ playlist: playlists })));
        };
        getPlaylistData();
    }, [token, dispatch]);
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        // console.info('selectedplaylist', selectedPlaylistId)
    };
    return (
        <div className="playlist">
            <ul>
                {playlist.map(({ name, id }) => {
                    return (
                        <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                            {name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

