
import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          id: "1",
          name: "Simple Love",
          artist: "Jay Chou",
          album: "Fantasy",
        },
        {
          id: "2",
          name: "In the name of the father",
          artist: "Jay Chou",
          album: "Night's 7th Chapter",
        },
      ],
      playlistName: "My Fav Jay Chou",
      playlistTracks: [
        {
          id: "1",
          name: "Simple Love",
          artist: "Jay Chou",
          album: "Fantasy",
        },
        {
          id: "2",
          name: "In the name of the father",
          artist: "Jay Chou",
          album: "Night's 7th Chapter",
        },
      ],
    };
  }

  addTrack(track){
    if (this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    };
    const newPlaylistTracks = this.state.playlistTracks;
    newPlaylistTracks.push(track);
    this.setState({playlistTracks: newPlaylistTracks});
    
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;