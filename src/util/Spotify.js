const clientID = "22c6f400d36c48f389b3ee33bf7182d6";
const redirectURI = "http://localhost:3000/";

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
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
};

export default Spotify;
