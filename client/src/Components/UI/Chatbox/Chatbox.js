import React from 'react'
import styles from './styles.module.css'
const AgentMsg=()=>{
    return(
        <div className={`${styles.agent_msg} my-4`}>
            <img  className={`${styles.round_img}`} src={require('../../../assets/Images/chat_icon.png')} alt="" />
            <p className={`${styles.chat_text} py-2 `}>    
            Hello, I’m Sara, how may I help you?
            </p>
        </div>
    )

}
const ClientMsg=()=>{
    return(
<div className={`${styles.client_msg} my-4 bg-primary`}>
        <p className={`mb-0 ps-3 ${styles.chat_text_agent}`}> I’d like to check my order status.</p>
    </div>
    )
    
}
function Chatbox() {
  return (
    <div className={`${styles.container}`} >
        <div className={`${styles.top} bg-primary px-2 py-3`}>
                <p className='fw-bold mb-0'>We’re here to assist you 24/7</p>
                <p className='mb-0'>
                We typically reply in few minutes
                </p>
        </div>
        <div className={`${styles.chat_box} text-dark py-3`}>
           
                <AgentMsg/>
                <ClientMsg/>
                <AgentMsg/>
                <ClientMsg/>
                
        </div>
    </div>
  )
}

export default Chatbox