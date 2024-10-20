import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { spotifyActions } from "../../store/spotify-slice";
import './Navbar.css'
export default function Navbar() {
    const dispatch = useDispatch()
    const userInfo = {
        name: "abhay Bhatt",
        userUrl: "dasdsas"
    }
    const token = useSelector(state => state.user.token)
    const songs = useSelector(state => state.spotify.songs)
    const [query, setQuery] = useState('')
    const [marketOptions, setMarketOptions] = useState({ label: '', value: '' })
    const [selectedMarkets, setSelectedMarkets] = useState([])
    const [selectedPopularity, setSelectedpopularity] = useState({ label: 'none', value: 'none', min: 0, max: 0 })
    const popularityOption = [
        { label: 'none', value: 'none', min: 0, max: 0 },
        { label: 'low', value: 'low', min: 0, max: 50 },
        { label: 'medium', value: 'medium', min: 51, max: 70 },
        { label: 'high', value: 'high', min: 71, max: 100 },
    ]

    //function to serch songs according to the input query
    const getSearchedSongs = async () => {
        dispatch(spotifyActions.setLoading({ loading: true }))
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${query}&type=track,artist&offset=0&limit=10`,
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
                const artists = apiData.data.artists.items
                dispatch(spotifyActions.setArtists({ artists: artists }))
                dispatch(spotifyActions.setQuery({ query: query }))
                dispatch(spotifyActions.setFilterOn({ filterOn: false }))
                dispatch(spotifyActions.setLoading({ loading: false }))
            } catch (err) {
                dispatch(spotifyActions.setFilterOn({ filterOn: false }))
                dispatch(spotifyActions.setLoading({ loading: false }))
                return err
            }
            setSelectedpopularity({ label: 'none', value: 'none', min: 0, max: 0 })
            setSelectedMarkets([])
        })
    };


    //function to get markets to put in the filters
    const getMarkets = async () => {
        const response = await axios.get(
            `https://api.spotify.com/v1/markets`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        ).then(res => {
            try {
                const markets = res.data.markets
                const options = []
                markets.forEach(market => {
                    options.push({ value: market, label: market })
                });
                setMarketOptions(options)
            } catch (err) {
                alert(err)
            }
        })
    }

    useEffect(() => {
        getMarkets()
    }, [])

    // function to search songs on pressing enter key
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getSearchedSongs()
        }
    }

    //function to sort songs according to filter
    const applyFilters = async () => {
        if (selectedMarkets.length === 0 && selectedPopularity.value === 'none') return
        dispatch(spotifyActions.setLoading({ loading: true }))
        let change = false
        let filteredSongs = []

        if (selectedMarkets.length > 0 && songs.length > 0) {
            songs.forEach((song) => {
                const availableMarkets = song.album.available_markets
                for (let i = 0; i < selectedMarkets.length; i++) {
                    if (availableMarkets.indexOf(selectedMarkets[0]) !== -1) {
                        filteredSongs.push(song)
                        change = true
                        break;
                    }
                }
            })
            dispatch(spotifyActions.setLoading({ loading: false }))
        }

        if (selectedPopularity.value !== 'none') {
            dispatch(spotifyActions.setLoading({ loading: true }))
            if (songs.length === 0) {
                const response = await axios.get(
                    `https://api.spotify.com/v1/search?q=${query}&type=track,artist&offset=0&limit=10`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                ).then((apiData) => {
                    try {
                        const songs = apiData.data.tracks.items
                        // dispatch(spotifyActions.setSongs({ songs: songs }))
                        const filteredSongs = songs.filter((song) => song.popularity >= selectedPopularity.min && song.popularity <= selectedPopularity.max)
                        dispatch(spotifyActions.setFilteredSongs({ filteredSongs: filteredSongs }))
                        const artists = apiData.data.artists.items
                        dispatch(spotifyActions.setArtists({ artists: artists }))
                        dispatch(spotifyActions.setQuery({ query: query }))
                        dispatch(spotifyActions.setLoading({ loading: false }))
                        dispatch(spotifyActions.setFilterOn({ filterOn: true }))
                    } catch (err) {
                        dispatch(spotifyActions.setLoading({ loading: false }))
                        dispatch(spotifyActions.setFilterOn({ filterOn: true }))
                        return err

                    }
                })
            } else {
                console.info('selected', selectedPopularity)
                let filtered2Songs = []
                if (filteredSongs.length === 0) {
                    filteredSongs = songs
                }
                filtered2Songs = filteredSongs.filter((song) => song.popularity >= selectedPopularity.min && song.popularity <= selectedPopularity.max)
                console.info('filter', filteredSongs)
                dispatch(spotifyActions.setFilteredSongs({ filteredSongs: filtered2Songs }))
                dispatch(spotifyActions.setFilterOn({ filterOn: true }))
            }

        } else {
            console.info('filteredSongs', filteredSongs)
            if (change) {
                dispatch(spotifyActions.setFilteredSongs({ filteredSongs: filteredSongs }))
            }
            dispatch(spotifyActions.setLoading({ loading: false }))
            dispatch(spotifyActions.setFilterOn({ filterOn: true }))
        }

    }

    const handleMarketChange = (selectedOptions) => {
        let markets = [];
        selectedOptions.map(o =>
            markets.push(o.value)
        );

        setSelectedMarkets(markets)
    }

    const handlePopularity = (selectedOption) => {
        setSelectedpopularity(selectedOption)
    }

    return (
        <div style={{ paddingLeft: '10px', marginBottom: '30px' }}>
            <div className="navbar-container">
                <div className="search__bar">
                    <FaSearch />
                    <input type="text" placeholder="Artists, songs" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
            </div>

            <div className="filters">
                <div style={{ width: '40%' }}>
                    <div style={{ color: 'white', paddingBottom: '5px' }}>Market/Region</div>
                    <Select
                        isMulti
                        name="colors"
                        options={marketOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleMarketChange}
                    />
                </div>
                <div style={{ width: '40%' }}>
                    <div style={{ color: 'white', paddingBottom: '5px' }}>Popularity</div>
                    <Select
                        defaultValue={popularityOption[0]}
                        name="colors"
                        options={popularityOption}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handlePopularity}
                    />
                </div>
            </div>
            <button className="filter-button" onClick={async () => {
                dispatch(spotifyActions.setLoading({ loading: true }))
                await applyFilters()
                dispatch(spotifyActions.setLoading({ loading: false }))
            }}>Apply Filters</button>


        </div>
    );
}

