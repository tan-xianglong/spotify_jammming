import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render(){
    const tracks = this.props.tracks;

    return (
      <div className="TrackList">
          {tracks.map(track => (
            <Track track={track} key={track.id}/>
          ))}
      </div>
    )
  }
}