import React from 'react'
import './App.css'

import AD from './component/AD'
import PlayListPage from './component/PlayListPage'
import PlayBackPage from './component/PlayBackPage'
import { tracks } from './constant'

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
    const playPromise = this.audio.play()

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        if (this.state.isPlaying) {
          this.audio.pause()
          this.setState({isPlaying: false})
        } else {
          this.audio.play()
          this.setState({isPlaying: true})
        }
      })
      .catch(error => {
        console.log(error)
      })
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
     this.setState({currentTrack: nextTrack, isPlaying: true })
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
     this.setState({currentTrack: nextTrack, isPlaying: true })
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

      this.setState({currentTrack: nextTrack, isPlaying: true })
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
      })
    })
  }

  selectTrack = trackId => e => {
     const { tracks } = this.state
     const bg = document.querySelector('.main_container_bg')

     const selectedTrack = tracks[trackId - 1]
     this.audio.pause()
     this.audio = new Audio(`./tracks/${selectedTrack.title}.mp3`)
     this.getDuration()

     this.setState({currentTrack: selectedTrack, isPlaying: false })
     bg.style.backgroundImage = `url(${selectedTrack.img})`
  }

  changeLoopStatus = e => {
    const { isLooping } = this.state

    e.target.classList.toggle('no_looping')
    this.setState({ isLooping: !isLooping })
  }

  changeRandomStatus = e => {
    const { isRandom } = this.state

    e.target.classList.toggle('no_random')
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
        <div className="header">
          <button className="btn_back" value="back" onClick={this.changePage()}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="track-name">{this.formattedString(currentTrack.title)}</h2>
        </div>
         { currentPage }
      </div>
    )
  }
}

export default App
