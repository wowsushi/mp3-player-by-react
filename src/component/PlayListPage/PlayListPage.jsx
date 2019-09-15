import React from 'react'

class PlayListPage extends React.Component {
  componentDidMount() {
    const bg = document.querySelector('.main_container_bg')
    bg.style.backgroundImage = `url(${this.props.currentTrack.img})`
  }
  render() {
    const {
      tracks,
      currentTrack,
      formattedString,
      selectTrack,
      addFav,
      playMusic,
      isPlaying } = this.props

    let list = []
    tracks.map(track => {
      list.push(
        <div key={track.id} className="track" id={track.id} onClick={selectTrack(track.id)}>
            <img className="track_img"src={track.img} alt=""/>
            <p className="track_name">{formattedString(track.title)}</p>
            <p className="album_name">{formattedString(track.album)}</p>
        </div>
      )
      return null
    })

    const favClass = (currentTrack.isFav)? 'fas fav fa-heart' : 'far fa-heart'

    return (
      <div className="main_container">
        <div className="main_container_bg"></div>
        <div className="main_panel play_list">
          <button className="btn_add_music" onClick={e => alert('建構中')}>
            <i className="fas fa-plus"></i>
          </button>
          <img className="track_img" src={currentTrack.img} alt=""/>
          <button className="btn_add_fav" onClick={addFav}>
            <i className={favClass}></i>
          </button>
          <p className="album_name">{formattedString(currentTrack.album)}</p>
          <div className="play_bar">
            <button className="btn_play" onClick={playMusic(currentTrack)} >
              <i className={(isPlaying)? "fas fa-pause" : "fas fa-play"}></i>
            </button>
            <button className="btn_download">
              <a href={`./tracks/${currentTrack.title}.mp3`} download={`${currentTrack.title}.mp3`}>
                <i className="fas fa-download"></i>
              </a>
            </button>
          </div>
        </div>
        <div className="play_list_panel">
          { list }
        </div>
      </div>
    )
  }
}

export default PlayListPage
