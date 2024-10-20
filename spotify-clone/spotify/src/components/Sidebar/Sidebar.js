import React from "react";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "../Playlist/Playlist";
import './Sidebar.css'
// import Playlists from "./Playlists";
export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="top__links">
                <div className="logo">
                    <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                        alt="spotify"
                    />
                </div>
                <ul>
                    <li>
                        <MdHomeFilled />
                        <span>Home</span>
                    </li>
                    <li>
                        <MdSearch />
                        <span>Search</span>
                    </li>
                    <li>
                        <IoLibrary />
                        <span>Your Library</span>
                    </li>
                </ul>
            </div>
            <Playlists />
        </div>
    );
}

