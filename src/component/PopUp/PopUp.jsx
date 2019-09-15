/*
 under construction for this component
 show the current music on the bottom of window
*/

import React from 'react'

const PopUp = () => {
  return (
    <div className="pop_up_panel">
      <img className="track_img" src={currentTrack.img}/>
      <p className="track_name">{formattedString(currentTrack.title)}</p>
      <p className="album_name">{formattedString(currentTrack.album)}</p>
      <button className="btn_pause">
        <i className="far fa-pause-circle"></i>
      </button>
    </div>
  )
}

export default PopUp
