import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import './Spotify.css'
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { ThreeCircles } from 'react-loader-spinner'
// import Body from "./Body";

export default function Spotify() {
    const loading = useSelector(state => state.spotify.loading)
    return (
        <div className="spotify-container">
            <div className="loading">
                {loading === true && (
                    <ThreeCircles
                        height="100"
                        width="100"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                )}
            </div>

            <div className="spotify__body">
                {/* <Sidebar /> */}
                <div className="spotify__body__right">
                    <Navbar />
                    <div className="body__contents">
                        <Body />
                        {/* <Body headerBackground={headerBackground} /> */}
                    </div>
                </div>
            </div>
            <div className="spotify__footer">
                {/* <Footer /> */}
            </div>


        </div>
    );
}
