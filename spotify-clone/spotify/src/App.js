import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import Spotify from "./components/Spotify/Spotify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user-slice";

export default function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch(userActions.setToken(token))
      }
    }
    document.title = "Spotify";
  }, [token, dispatch]);

  return <div>{token && token !== '' ? <Spotify /> : <Login />}</div>;
}
