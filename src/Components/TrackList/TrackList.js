import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render(){
    const tracks = this.props.tracks;

    return (
      <div className="TrackList">
          {tracks.map(track => (
            <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
          ))}
      </div>
    )
  }
}