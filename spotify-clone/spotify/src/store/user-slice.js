import { createSlice } from "@reduxjs/toolkit";


//global state to maintain user token 
const userSlice = createSlice({
    name: "user",
    initialState: { token: "" },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
    }
})

export const userActions = userSlice.actions
export default userSlice