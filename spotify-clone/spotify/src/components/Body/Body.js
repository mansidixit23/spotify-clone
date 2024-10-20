import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spotifyActions } from "../../store/spotify-slice";
import { AiFillClockCircle, AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Artists from "../Artists/Artists";
import './Body.css'

const Body = () => {
    const dispatch = useDispatch()
    const [view, setView] = useState('list')
    const [page, setPage] = useState(1)
    const token = useSelector(state => state.user.token)
    const query = useSelector(state => state.spotify.query)
    const filterOn = useSelector(state => state.spotify.filterOn)
    const filteredSongs = useSelector(state => state.spotify.filteredSongs)
    let songss = useSelector(state => state.spotify.songs)
    const songs = filterOn ? filteredSongs : songss

    //function to get initail data on page when component mounts for the first time
    const getPlaylistData = async () => {
        dispatch(spotifyActions.setLoading({ loading: true }))
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=rock&type=track&offset=0&limit=10`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        ).then((apiData) => {
            try {
                const songs = apiData.data.tracks.items
                dispatch(spotifyActions.setSongs({ songs: songs }))
                dispatch(spotifyActions.setLoading({ loading: false }))
            } catch (err) {
                dispatch(spotifyActions.setLoading({ loading: false }))
                return err
            }
        })
    };
    useEffect(() => {
        getPlaylistData();
    }, []);

    //function to handle pagination
    const handlePage = async (type) => {
        if (type === 'prev') {
            if (page > 1) {
                setPage(page - 1)
            }
        }

        if (type === 'forw') {
            dispatch(spotifyActions.setLoading({ loading: true }))
            if (page >= 1) {
                await axios.get(
                    `https://api.spotify.com/v1/search?q=${query === '' ? 'rock' : query}&type=track&offset=${((page + 1) * 10) - 10}&limit=10`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                ).then((apiData) => {
                    try {
                        const newSongs = songs.concat(apiData.data.tracks.items)
                        dispatch(spotifyActions.setSongs({ songs: newSongs }))
                        dispatch(spotifyActions.setLoading({ loading: false }))
                        setPage(page + 1)
                    } catch (err) {
                        dispatch(spotifyActions.setLoading({ loading: false }))
                        return err
                    }
                })
            }
        }
    }

    //function to coberts ms to minutes + seconds
    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };
    return (
        <div className="body">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="body-title">Tracks</div>
                <div className="body-view" onClick={() => view === 'grid' ? setView('list') : setView('grid')}>{view === 'grid' ? 'List View' : 'Grid View'}</div>
            </div>

            {view === 'grid' && (
                <div className="body-grid">
                    {songs.map((song, idx) => {
                        return (
                            <div className="song-card" key={idx}>
                                {song.album.images.length > 0 && <img className="song-card-image" src={song.album.images[0].url} />}
                                <div className="song-card-detail">
                                    <div>
                                        <div className="song-card-name">{song.name.substr(0, 15)}...</div>
                                        <div className="song-artist">
                                            {song.artists.slice(0, 3).map((artist) => {
                                                return (
                                                    <span>{artist.name.substr(0, 15)}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="song-time"><AiFillClockCircle /><div style={{ marginLeft: '10px' }}>{msToMinutesAndSeconds(song.duration_ms)}</div></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}


            {view === 'list' && (
                <div className="list-container">
                    <div className="list">
                        <div className="header-row">
                            <div className="col">
                                <span>#</span>
                            </div>
                            <div className="col">
                                <span>TITLE</span>
                            </div>
                            <div className="col">
                                <span>ALBUM</span>
                            </div>
                            <div className="col">
                                <span style={{ color: 'white' }}>
                                    <AiFillClockCircle />
                                </span>
                            </div>
                        </div>
                        <div className="tracks">
                            {songs.slice(((page * 10) - 10), page * 10).map(
                                (
                                    song,
                                    index
                                ) => {
                                    return (
                                        <div
                                            className="row"
                                            key={song.id}

                                        >
                                            <div className="col">
                                                <span>{((page * 10) - 10) + index + 1}</span>
                                            </div>
                                            <div className="col detail">
                                                <div className="image">
                                                    <img src={song.album.images[0].url} alt="track" />
                                                </div>
                                                <div className="info">
                                                    <span className="name">{song.name}</span>
                                                    <span>{song.artists[0].name}</span>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <span>{song.album.name}</span>
                                            </div>
                                            <div className="col">
                                                <span>{msToMinutesAndSeconds(song.duration_ms)}</span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div className="pagination">
                        {page !== 1 && <div onClick={() => handlePage('prev')}> <AiFillCaretLeft /> </div>}

                        <div>{page}</div>
                        <div onClick={() => handlePage('forw')}><AiFillCaretRight /> </div>
                    </div>
                </div>
            )}




            <Artists />
        </div >
    )
}

export default Body