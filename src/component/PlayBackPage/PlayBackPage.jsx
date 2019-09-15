import React from 'react'

class PlayBackPage extends React.Component {
  componentDidMount() {
    const bg = document.querySelector('.main_container_bg')
    bg.style.backgroundImage = `url(${this.props.currentTrack.img})`
  }

  render() {
    const {
      currentTrack,
      formattedString,
      playBackward,
      playForward,
      addFav,
      changeRandomStatus,
      changeLoopStatus,
      playMusic,
      isPlaying,
      currentTime,
      duration,
      handleOnChange,
      handleMouseUp
    } = this.props
    const favClass = (currentTrack.isFav)? 'fas fav fa-heart' : 'far fa-heart'

    return (
      <div className="main_container">
        <div className="main_container_bg"></div>
        <div className="main_panel play_back">
          <img src={currentTrack.img} alt=""/>
        </div>
        <div className="control_panel" >
          <div className="range_bar_wrapper" >
            <span className="start_time">{Math.floor(currentTime / 60).toString().padStart(2, '0')} : {(currentTime % 60).toString().padStart(2, '0') }</span>
            <input type="range" min="0" max={duration} step="1" value={currentTime} onChange={handleOnChange} onMouseUp={handleMouseUp} onPointerUp={handleMouseUp}/>
            <span className="start_time">{Math.floor(duration / 60).toString().padStart(2, '0')} : {(duration % 60).toString().padStart(2, '0') }</span>
          </div>
          <div className="track_wrapper">
            <p className="track_name">{formattedString(currentTrack.title)}</p>
            <p className="album_name">{formattedString(currentTrack.album)}</p>
          </div>
          <div className="info_wrapper">
            <button className="btn_add" onClick={e => alert('建構中')}>
              <i className="fas fa-plus"></i>
            </button>
            <button className="btn_fav" onClick={addFav}>
              <i className={ favClass }></i>
            </button>
            <button className="btn_lyric" onClick={e => alert('建構中')}>
              歌詞
            </button>
          </div>
          <div className="activity_of_track_wrapper">
            <button className="btn_random" >
              <i className="fas fa-random no_random" onClick={changeRandomStatus}></i>
            </button>
            <button
              className="btn_backward"
              onClick={playBackward(currentTrack.id)}
            >
              <i className="fas fa-step-backward"></i>
            </button>
            <button className="btn_play" >
              <i
                className={(isPlaying)? "far fa-pause-circle" : "far fa-play-circle"}
                onClick={playMusic(currentTrack)}
              >
              </i>
            </button>
            <button
              className="btn_forward"
              onClick={e => playForward(currentTrack.id)}
            >
              <i className="fas fa-step-forward"></i>
            </button>
            <button className="btn_repeat" >
              <i className="fas fa-sync-alt no_looping" onClick={changeLoopStatus}></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayBackPage
