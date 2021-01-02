const clientId = '9292dc64213a4ed58151523d8f69a063';
const redirectUri = 'http://localhost:3000';

let userAccessToken;

const Spotify = {
  // provides user access token for Spotify account
  getAccessToken() {
    // checks for presence of user access token
    if (userAccessToken) {
      return userAccessToken;
    }

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  
    // if token and expiration time are present in the URL (line 21), 
      // sets the access token value (line 22)
      // defines expiration time (line 23)
    if (accessTokenMatch && expiresInMatch) {
      userAccessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // clears access token and URL parameters, allowing user to obtain a new access token when current token expires
      // also preventing the app from trying to re-obtain the current access token **after** it has expired
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  // search method that accepts a search term input and returns a list of tracks is JSON format
    // provides access to the user's access token which is required in order to make requests to the Spotify API (line 41)
    // uses implicit grant flow request parameters to make requests (line 42)
    // authorization header containing access token (lines 43-45)
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=50&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      // after promise resolves, the response is converted to JSON (lines 47-48)
    }).then(response => {
      return response.json();
      // after response is converted to JSON, performs a series of checks (using conditionals)
    }).then(jsonResponse => {
        // checks for the presence of tracks (line 53)
          // if no tracks are present, returns an empty array (line 54)
        if(!jsonResponse.tracks) {
          return [];
      }
      // if tracks are present, maps the converted JSON to a mapped array containiing a list of track objects (lines 57-63)
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        cover: track.album.images[2].url,
        uri: track.uri,
      }));
    })
  },

  // TODO ** convert savePlaylist() to async function **
  // savePlaylist method that allows user to save a custom playlist to their spotify account (lines 69-92)
  savePlaylist(name, trackUris) {
    // checks for the presence of a playlist name and a track Uris array (line 72)
      // returns nothing if not present (line 73)
    if (!name || !trackUris.length) {
      return;
    }
    
    // provides accesss to the user's access token (line 79)
    // provides access to the authorization header containing the user's access token
    // provides access to the user's ID once the GET request has been fulfilled
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;

    // GET request to obtain the user's Spotify username using fetch(x, y) (line 88)
    // after the request for the user's Spotify username has been fullfilled, 
    // converts the response to JSON (line 89)
    // after the response has been converted to JSON (line 90)
      // stores the jsonResponse.id parameter (or username) to the userID variable (line 91)
    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json()
    ).then(jsonResponse => {
      userID = jsonResponse.id;
      
      // POST request using returned userID from line 91 that creates a new playlist (line 94)
        // additional settings (lines 96-99)
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
       {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        
        // after POST request to create a new playlist is fulfilled, converts response to JSON (line 102)
        // after response is converted to JSON (line 103)
          // stores the jsonResponse.id (or playlist name) to the playlistId variable (line 105)
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;

        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, 
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris })
        })
      })
    })
  }
};

export default Spotify;