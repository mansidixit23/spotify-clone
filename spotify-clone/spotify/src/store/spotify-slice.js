import { createSlice } from "@reduxjs/toolkit";


// global states related to songs
// playlist - for stroing playlists
// songs - for maintainging searched results
// artists - for maintainging artists searched results
// query - for maintainging searched query to make api request
// queryType - for maintainging searched query to make api request
// loading - for maintainging a loader while data is being fetched
// filteredSongs - for maintainging songs after result
const spotifySlice = createSlice({
    name: "spotify",
    initialState: { playlist: [], songs: [], artists: [], markets: [], query: "rock", queryType: "", loading: false, filteredSongs: [], filterOn: false },
    reducers: {
        setPlaylist(state, action) {
            state.playlist = action.payload.playlist
        },
        setSongs(state, action) {
            state.songs = action.payload.songs
        },
        setQuery(state, action) {
            state.query = action.payload.query
        },
        setArtists(state, action) {
            state.artists = action.payload.artists
        },
        setMarkets(state, action) {
            state.markets = action.payload.markets
        },
        setLoading(state, action) {
            state.loading = action.payload.loading
        },
        setFilteredSongs(state, action) {
            state.filteredSongs = action.payload.filteredSongs
        },
        setFilterOn(state, action) {
            state.filterOn = action.payload.filterOn
        },

    }
})

export const spotifyActions = spotifySlice.actions
export default spotifySlice