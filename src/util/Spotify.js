const clientID = "22c6f400d36c48f389b3ee33bf7182d6";
const redirectURI = "https://tan-xianglong.github.io/spotify_jammming/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //if accessToken is not set, check current URL to see if accessToken has been obtained
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    console.log(`accessTokenMatch is ${accessTokenMatch}`);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    console.log(`expiresInMatch is ${expiresInMatch}`);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // This clears the access token once it expries so that we can grab a new one thereafter
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/spotify_jammming/");
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public playlist-modify-private&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },

  async search(term) {
    await this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(endpoint, option);
      if (response.ok) {
        const jsonResponse = await response.json();
        const trackList = jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
        console.log(trackList);
        return trackList;
      }
      throw new Error("Request failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async getUserID() {
    const endpoint = `https://api.spotify.com/v1/me`;
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(endpoint, option);
      if (response.ok) {
        const jsonResponse = await response.json();
        const userID = jsonResponse.id;
        return userID;
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async createNewPlaylistID(userID, playlistName) {
    const endpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: playlistName,
        public: false
      }),
    };
    try {
      const response = await fetch(endpoint, option);
      if (response.ok) {
        const jsonResponse = await response.json();
        const playlistID = jsonResponse.id;
        return playlistID;
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async addTracksToPlaylist(playlistID, trackArr) {
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackArr,
      }),
    };
    try {
      const response = await fetch(endpoint, option);
      if (response.ok) {
        const jsonResponse = await response.json();
        const snapshotID = jsonResponse.snapshot_id;
        window.alert('Tracks added successfully!')
        return snapshotID;
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(playlistName, trackArr) {
    if (!playlistName || !trackArr) {
      return;
    }
    await this.getAccessToken();
    const userID = await this.getUserID();
    const playlistID = await this.createNewPlaylistID(userID, playlistName);
    this.addTracksToPlaylist(playlistID, trackArr);
  },
};

export default Spotify;
