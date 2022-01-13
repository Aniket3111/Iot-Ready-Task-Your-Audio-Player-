import React from 'react'

import i from "../images/m.png"
import "./music.css"

function music(props){
  
    let { title,file} = props;
    return (
        <>
        <div className="card" >
        <img src={i} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className='audio'>
          <audio controls="controls" className='audio1' >
    <source src={file} />
</audio>
          </div>
        </div>
      </div> 
        </>
    )
}
export default music