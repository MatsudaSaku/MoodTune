import React from "react";

const SpotifyLogin = () => {
    const handleSpotifyLogin = () => {
        window.location.href = "https://mood-tune.com/auth/spotify/redirect";
    };

    return (
        <div>
            <h1>Login with Spotify</h1>
            <button onClick={handleSpotifyLogin}>Login with Spotify</button>
        </div>
    );
};

export default SpotifyLogin;
