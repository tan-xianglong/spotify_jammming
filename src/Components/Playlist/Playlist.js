import React from "react";
import "./Playlist.css";
import {TrackList} from "./TrackList"

export class Playlist extends React.Component{
  render(){
    let defaultValue = "New Playlist";

    return (
      <div className="Playlist">
        <input value={defaultValue} />
        {/* <!-- Add a TrackList component --> */}
        {/* <Tracklist /> */}
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
