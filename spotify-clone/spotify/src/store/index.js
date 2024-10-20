import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import spotifySlice from "./spotify-slice";

//global store for maintaining states

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        spotify: spotifySlice.reducer
    }
})

export default store