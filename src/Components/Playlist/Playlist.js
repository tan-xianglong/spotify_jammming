import React from "react";
import "./Playlist.css";
import {TrackList} from "../TrackList/TrackList"

export class Playlist extends React.Component{
  render(){
    let defaultValue = "New Playlist";

    return (
      <div className="Playlist">
        <input value={defaultValue} />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
