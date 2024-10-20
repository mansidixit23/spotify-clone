import React from "react";
import './Login.css'

export default function Login() {
    const handleClick = async () => {
        const client_id = "448f0c16daf440308c6649e24883ee2b";
        const redirect_uri = "https://spotify-coral-sigma.vercel.app/";
        const api_uri = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-private",
            "user-read-email",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read",
        ];
        window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`;
    };
    return (
        <div className="login-container">
            <img
                className="login-container-img"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
                alt="spotify"
            />
            <button className="login-container-button" onClick={handleClick}>Connect Spotify</button>
        </div>
    );
}

