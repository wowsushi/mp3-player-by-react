import React, { Component } from 'react';
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
      <div class="promote_main">
        <button className="btn_cancel" onClick={closeAD}>
          <i class="fas fa-times"></i>
        </button>
        <img src=""/>
        <div class="promote_content">
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
      <div class="menu">
        <div class="cover"></div>
        <li>歌曲清單</li>
        <li>我的最愛</li>
      </div>
    )
  }
}

// class PopUp extends React.Component {
//   render() {
//     return (
//       <div class="pop_up_panel">
//         <img class="track_img" src={currentTrack.img}/>
//         <p class="track_name">{formattedString(currentTrack.title)}</p>
//         <p class="album_name">{formattedString(currentTrack.album)}</p>
//         <button class="btn_pause">
//           <i class="far fa-pause-circle"></i>
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
    const { tracks, currentTrack, formattedString, selectTrack, addFav } = this.props
    let list = []
    tracks.map(track => {
      list.push(
        <div class="track" id={track.id} onClick={selectTrack(track.id)}>
            <img class="track_img"src={track.img}/>
            <p class="track_name">{formattedString(track.title)}</p>
            <p class="album_name">{formattedString(track.album)}</p>
        </div>
      )
    })

    const favClass = (currentTrack.isFav)? 'fas fav fa-heart' : 'far fa-heart'

    return (
      <div class="main_container">
        <div class="main_container_bg"></div>
        <div class="main_panel play_list">
          <button class="btn_add_music">
            <i class="fas fa-plus"></i>
          </button>
          <img class="track_img" src={currentTrack.img}/>
          <button class="btn_add_fav" onClick={addFav}>
            <i class={favClass}></i>
          </button>
          <p class="album_name">{formattedString(currentTrack.album)}</p>
          <div class="play_bar">
            <button class="btn_play">
              <i class="fas fa-play"></i>
            </button>
            <button class="btn_download">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
        <div class="play_list_panel">
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
    const { currentTrack, formattedString, playBackward, playForward, addFav, changeRandomStatus, changeLoopStatus } = this.props
    const favClass = (currentTrack.isFav)? 'fas fav fa-heart' : 'far fa-heart'

    return (
      <div class="main_container">
        <div class="main_container_bg"></div>
        <div class="main_panel play_back">
          <img src={currentTrack.img}/>
        </div>
        <div class="control_panel">
          <div class="range_bar_wrapper">
            <span class="start_time">00 : 00</span>
            <input type="range" min="1" max="100" step="1"/>
            <span class="start_time">{Math.floor(currentTrack.time / 60).toString().padStart(2, '0')} : {(currentTrack.time % 60).toString().padStart(2, '0') }</span>
          </div>
          <div class="track_wrapper">
            <p class="track_name">{formattedString(currentTrack.title)}</p>
            <p class="album_name">{formattedString(currentTrack.album)}</p>
          </div>
          <div class="info_wrapper">
            <button class="btn_add">
              <i class="fas fa-plus"></i>
            </button>
            <button class="btn_fav" onClick={addFav}>
              <i class={ favClass }></i>
            </button>
            <button class="btn_lyric">
              歌詞
            </button>
          </div>
          <div class="activity_of_track_wrapper">
            <button class="btn_random" >
              <i class="fas fa-random no_randoming" onClick={changeRandomStatus}></i>
            </button>
            <button
              class="btn_backward"
              onClick={playBackward(currentTrack.id)}
            >
              <i class="fas fa-step-backward"></i>
            </button>
            <button class="btn_play">
              <i class="far fa-play-circle"></i>
            </button>
            <button
              class="btn_fowward"
              onClick={playForward(currentTrack.id)}
            >
              <i class="fas fa-step-forward"></i>
            </button>
            <button class="btn_repeat" >
              <i class="fas fa-sync-alt no_looping" onClick={changeLoopStatus}></i>
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
      isLoop: false,
      isRandom: false,
      adOpened: false
    }
  }

  compondneDidUpdate() {

  }

  playMusic(currentTrack) {

  }

  playForward = currentTrackId => e => {
    const { tracks, isRandom } = this.state
    const bg = document.querySelector('.main_container_bg')

    if ( isRandom ) {
      //play in random
      this.playRandom()
    } else {
      //play in order
     const nextTrack = (tracks[currentTrackId]) ? tracks[currentTrackId] : tracks[0]

     this.setState({currentTrack: nextTrack });
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

     this.setState({currentTrack: nextTrack });
     bg.style.backgroundImage = `url(${nextTrack.img})`
    }
    this.showAD()
  }

  playRandom = e => {
    const { tracks, isRandom, currentTrack } = this.state
    const randomNum =  Math.floor(Math.random() * tracks.length)

    if ( currentTrack.id !== randomNum + 1 ) {
      //play in random
      const nextTrack = tracks[randomNum]
      const bg = document.querySelector('.main_container_bg')

      this.setState({currentTrack: nextTrack });
      bg.style.backgroundImage = `url(${nextTrack.img})`
    } else {
      this.playRandom()
    }
  }

  selectTrack = trackId => e => {
     const { tracks } = this.state
     const bg = document.querySelector('.main_container_bg')

     const selectedTrack = tracks[trackId - 1]

     this.setState({currentTrack: selectedTrack });
     bg.style.backgroundImage = `url(${selectedTrack.img})`
  }

  changePlayingStatus() {

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

  showAD = e => {
    (Math.random() < 0.3)?  this.setState({adOpened: !this.state.adOpened}) : ''
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
    console.log(<Menu />)
    return (<Menu />)
  }

  render() {
    const {
      currentTrack,
      historical_visit_record,
      tracks,
      isPlaying,
      isLoop,
      isRandom,
      adOpened
    } = this.state

    const currentPage = (this.state.currentPage === 'PlayList') ?
      <PlayListPage
        tracks={tracks}
        currentTrack={currentTrack}
        formattedString={this.formattedString}
        addFav={this.addFav}
        selectTrack={this.selectTrack}
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
        isLoop={isLoop}
        isRandom={isRandom}
      />
    return (
      <div class="app">
        {(adOpened)?  <AD closeAD={this.closeAD}/> : ''}
        { this.showMenu }
        <div class="header">
          <button class="btn_back" value="back">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h2 class="track-name">{this.formattedString(currentTrack.title)}</h2>
          <button class="btn_info" onClick={this.changePage()}>
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
         { currentPage }
      </div>
    )
  }
}

export default App;
