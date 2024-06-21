import React from "react";

const SpotifyLogin = () => {
    const handleSpotifyLogin = () => {
        window.location.href = "https://mood-tune.com/auth/spotify/redirect";
    };

    return (
        <div>
            <h1>Login with Spotify 1a</h1>
            <button onClick={handleSpotifyLogin}>Login with Spotify</button>
        </div>
    );
};

export default SpotifyLogin;
