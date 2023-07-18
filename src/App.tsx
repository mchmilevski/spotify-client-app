import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { setAccessToken } from './utils/spotify/spotify.utils';

function App() {
  const [playlists, setPlaylists] = useState([])
  const accessTokenFetched = useRef(false);

  useEffect(() => {
    if (accessTokenFetched.current) return
    accessTokenFetched.current = true
    setAccessToken()
  }, [])

  const getPlaylists = async () => {
    const token = localStorage.getItem("access_token");

    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const { items } = await result.json()
    setPlaylists(items)
  }

  return (
    <div className="App">
      <span>Spotify App</span>
      <button onClick={getPlaylists}>Get playlists</button>
    </div>
  );
}

export default App;
