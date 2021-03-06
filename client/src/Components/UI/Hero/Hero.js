import React from 'react'
import styles from './style.module.css'
import ChatBox from '../Chatbox/Chatbox'
import { Scale } from '@mui/icons-material'
function Dashboard() {
  return (
   <div className={`conainer-fluid mt-auto  bg-blue ${styles.section}`}  >
        <div className="container-lg">
            <div className="row">
                <div className="col-md-6 align-self-center ">
                        <h1 className='h1 text-light fw-bold'>
                        Speak to your customers in real time
                        </h1>
                        <p className='text-white'>
                        Everything your customers need to chat with you,  self serve and chat with your customers in real time and get more leads
                        </p>
                        <button className={`${styles.dashboard_left_btn}`}>
                            Start free Trial <i className="fas fa-arrow-right"></i>
                        </button>
                       
                </div>
                <div className="col-md-6 " style={{zIndex:100000,overflow:'hidden'}}>
                    <ChatBox/>
                </div>
            </div>
        </div>
        <img className={`${styles.dashboard_right_img} d-none d-lg-block`} src={require('../../../assets/Images/dashboard_right.png')} alt="" />
   </div>
  )
}

export default Dashboard
