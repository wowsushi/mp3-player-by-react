import React from 'react';
import './App.css';

const tracks = [
  {
    id: 1,
    title: 'Dawn_of_Man',
    album: 'Quincas Moreira',
    img: './tracks/01.jpg',
    time: 127,
    isFav: false,
    lyrics: 'No lyrics'
  },
  {
    id: 2,
    title: 'Metamorphosis',
    album: 'Quincas Moreira',
    img: './tracks/02.jpg',
    time: 171,
    isFav: false,
    lyrics: 'No lyrics'
  },
  {
    id: 3,
    title: 'Slowly_Until_We_Get_There',
    album: 'Joey Pecoraro',
    img: './tracks/03.jpg',
    time: 98,
    isFav: false,
    lyrics: 'No lyrics'
  },
  {
    id: 4,
    title: 'Jessica',
    album: 'Joey Pecoraro',
    img: './tracks/04.jpg',
    time: 167,
    isFav: false,
    lyrics: 'No lyrics'
  },
  {
    id: 5,
    title: 'For_We_Are_Many',
    album: 'Cooper Cannell',
    img: './tracks/05.jpg',
    time: 173,
    isFav: false,
    lyrics: 'No lyrics'
  }]

function AD(props) {
  const { closeAD } = props
  return (
    <React.Fragment>
      <div className="promote_bg" onClick={closeAD}></div>
      <div className="promote_main">
        <img className="bg" src="./ad.jpg" alt=""/>
        <button className="btn_cancel" onClick={closeAD}>
          <i className="fas fa-times"></i>
        </button>
        <div className="promote_content">
          <button className="btn_subscription">前往訂閱</button>
          <p>現在訂閱<span>1</span>年，即刻享有<span>3</span>個月會員優惠！</p>
        </div>
      </div>
    </React.Fragment>
  )
}

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="cover"></div>
        <li>歌曲清單</li>
        <li>我的最愛</li>
      </div>
    )
  }
}

// class PopUp extends React.Component {
//   render() {
//     return (
//       <div className="pop_up_panel">
//         <img className="track_img" src={currentTrack.img}/>
//         <p className="track_name">{formattedString(currentTrack.title)}</p>
//         <p className="album_name">{formattedString(currentTrack.album)}</p>
//         <button className="btn_pause">
//           <i className="far fa-pause-circle"></i>
//         </button>
//       </div>
//     )
//   }
// }

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
          <button className="btn_add_music">
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
              <i className="fas fa-download"></i>
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
      handleMouseUp } = this.props
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
            <button className="btn_add">
              <i className="fas fa-plus"></i>
            </button>
            <button className="btn_fav" onClick={addFav}>
              <i className={ favClass }></i>
            </button>
            <button className="btn_lyric">
              歌詞
            </button>
          </div>
          <div className="activity_of_track_wrapper">
            <button className="btn_random" >
              <i className="fas fa-random no_randoming" onClick={changeRandomStatus}></i>
            </button>
            <button
              className="btn_backward"
              onClick={playBackward(currentTrack.id)}
            >
              <i className="fas fa-step-backward"></i>
            </button>
            <button className="btn_play" >
              <i className={(isPlaying)? "far fa-pause-circle" : "far fa-play-circle"} onClick={playMusic(currentTrack)} ></i>
            </button>
            <button
              className="btn_fowward"
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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      currentPage: 'PlayList',
      currentTrack: tracks[0],
      historical_visit_record: [],
      tracks: tracks,
      isPlaying: false,
      isLooping: false,
      isRandom: false,
      adOpened: false,
      currentTime: 0,
      duration: 0
    }
    this.audio = new Audio(`./tracks/${this.state.currentTrack.title}.mp3`)
  }

  componentDidMount() {
    //this.audio.pause()
   this.getDuration()
  }

  playMusic = currentTrack => e => {
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        if (this.state.isPlaying) {
          this.audio.pause();
          this.setState({isPlaying: false})
        } else {
          this.audio.play();
          this.setState({isPlaying: true})
        }
      })
      .catch(error => {
        console.log(error)
      });
    }

  }


  playForward = currentTrackId => {
    const { tracks, isRandom } = this.state
    const bg = document.querySelector('.main_container_bg')

    if ( isRandom ) {
      //play in random
      this.playRandom()
    } else {
      //play in order
     const nextTrack = (tracks[currentTrackId]) ? tracks[currentTrackId] : tracks[0]

     this.audio.pause()
     this.audio = new Audio(`./tracks/${nextTrack.title}.mp3`)
     this.audio.play()
     this.getDuration(nextTrack)
     this.setState({currentTrack: nextTrack, isPlaying: true });
     bg.style.backgroundImage = `url(${nextTrack.img})`
    }
    this.showAD()
  }

  playBackward = currentTrackId => e => {
    const { tracks, isRandom } = this.state
     const bg = document.querySelector('.main_container_bg')

    if ( isRandom ) {
      //play in random
      this.playRandom()
    } else {
      //play in order.
     const nextTrack = (tracks[currentTrackId - 2]) ? tracks[currentTrackId - 2] : tracks[tracks.length -1 ]

     this.audio.pause()
     this.audio = new Audio(`./tracks/${nextTrack.title}.mp3`)
     this.audio.play()
     this.getDuration(nextTrack)
     this.setState({currentTrack: nextTrack, isPlaying: true });
     bg.style.backgroundImage = `url(${nextTrack.img})`
    }
    this.showAD()
  }

  playRandom = e => {
    const { tracks, currentTrack } = this.state
    const randomNum =  Math.floor(Math.random() * tracks.length)

    if ( currentTrack.id !== randomNum + 1 ) {
      //play in random
      const nextTrack = tracks[randomNum]
      const bg = document.querySelector('.main_container_bg')

      this.audio.pause()
      this.audio = new Audio(`./tracks/${nextTrack.title}.mp3`)
      this.audio.play()
      this.getDuration(nextTrack)

      this.setState({currentTrack: nextTrack, isPlaying: true });
      bg.style.backgroundImage = `url(${nextTrack.img})`
    } else {
      this.playRandom()
    }
  }

  getDuration = (currentTrack) => {

    this.audio.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: Math.floor(e.target.currentTime),
        duration: Math.floor(e.target.duration)
      });
    });
  }

  selectTrack = trackId => e => {
     const { tracks } = this.state
     const bg = document.querySelector('.main_container_bg')

     const selectedTrack = tracks[trackId - 1]
     this.audio.pause()
     this.audio = new Audio(`./tracks/${selectedTrack.title}.mp3`)
     this.getDuration()

     this.setState({currentTrack: selectedTrack, isPlaying: false });
     bg.style.backgroundImage = `url(${selectedTrack.img})`
  }

  changeLoopStatus = e => {
    const { isLooping } = this.state

    e.target.classList.toggle('no_looping')
    this.setState({ isLooping: !isLooping })
  }

  changeRandomStatus = e => {
    const { isRandom } = this.state

    e.target.classList.toggle('no_randoming')
    this.setState({ isRandom: !isRandom })
  }

  handleOnChange = e => {
    this.audio.pause()
    this.audio.currentTime = e.target.value
    this.setState({currentTime: e.target.value, isPlaying: false})
  }

  handleMouseUp = e => {
    this.audio.play()
    this.setState({isPlaying: true})
  }

  showAD = e => {
    return (Math.random() < 0.3)?  this.setState({adOpened: !this.state.adOpened}) : ''
  }

  closeAD = e => {
    this.setState({adOpened: !this.state.adOpened})
  }

  addFav = e => {
    const { currentTrack } = this.state

    currentTrack.isFav = !currentTrack.isFav
    this.setState({currentTrack: currentTrack})
  }

  changePage = () => e => {
    const { currentPage } = this.state

    if (currentPage === 'PlayList') {
      this.setState({currentPage: 'PlayBack'})
    } else {
      this.setState({currentPage: 'PlayList'})
    }
  }

  formattedString (string) {
    return string.split('_').join(' ')
  }

  showMenu = () => e => {
    return (<Menu />)
  }

  render() {
    const {
      currentTrack,
      tracks,
      isPlaying,
      isLooping,
      isRandom,
      adOpened,
      currentTime,
      duration,
    } = this.state

    const currentPage = (this.state.currentPage === 'PlayList') ?
      <PlayListPage
        tracks={tracks}
        currentTrack={currentTrack}
        formattedString={this.formattedString}
        addFav={this.addFav}
        selectTrack={this.selectTrack}
        playMusic={this.playMusic}
        isPlaying={isPlaying}
      /> :
      <PlayBackPage
        currentTrack={currentTrack}
        formattedString={this.formattedString}
        playBackward={this.playBackward}
        playForward={this.playForward}
        addFav={this.addFav}
        changeRandomStatus={this.changeRandomStatus}
        changeLoopStatus={this.changeLoopStatus}
        isPlaying={isPlaying}
        isLooping={isLooping}
        isRandom={isRandom}
        playMusic={this.playMusic}
        currentTime={currentTime}
        duration={duration}
        handleOnChange={this.handleOnChange}
        handleMouseUp={this.handleMouseUp}
      />

      let width = currentTime / duration * 100
      document.documentElement.style.setProperty("--bar-width", width + '%')

      this.audio.onended = e => {
        if (isLooping) {
          this.playForward(this.state.currentTrack.id)
        } else {
          this.audio.currentTime = 0
          this.setState({isPlaying: false})
        }

      }
    return (
      <div className="app" onLoadedMetadata={this.getDuration}>
        {(adOpened)?  <AD closeAD={this.closeAD}/> : ''}
        { this.showMenu }
        <div className="header">
          <button className="btn_back" value="back">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="track-name">{this.formattedString(currentTrack.title)}</h2>
          <button className="btn_info" onClick={this.changePage()}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
         { currentPage }
      </div>
    )
  }
}

export default App;
