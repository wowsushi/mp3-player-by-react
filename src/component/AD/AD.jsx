import React from 'react'

const AD = props => {
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

export default AD
