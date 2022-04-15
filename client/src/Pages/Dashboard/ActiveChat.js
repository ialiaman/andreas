import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import { DashboardHeader } from '../../Components/UI/MiniComponents/MiniComponent'
import { FaUser } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { HiOutlineScissors, HiClock, } from 'react-icons/hi';
import { IoIosCloseCircleOutline, IoIosArrowForward } from 'react-icons/io';
import { AiFillSave } from 'react-icons/ai';
import styles from './styles.module.css'
import colors from '../../../src/assets/Constants/ui_constants'
import { DiLinux } from 'react-icons/di';
import { GrNote } from 'react-icons/gr';
import { AiFillWindows, AiFillPrinter } from 'react-icons/ai';
import { useLocation } from 'react-router-dom'
import socket from '../../helpers/socket'
import { AuthContext } from '../../App'
import axios from 'axios'

const asyncLocalStorage = {
    setItem: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        await null;
        return localStorage.getItem(key);
    }
};


function ActiveChat() {
    const [ip, setIP] = useState('');
    const [customerID, setcustomerID] = useState('')
    const [allMessages, setallMessages] = useState([])
    const { authState, setAuthState } = useContext(AuthContext);
    const [currentAgentMessage, setcurrentAgentMessage] = useState('')
    const agentName = (authState.LoggedUserData.f_name + ' ' + authState.LoggedUserData.l_name).toUpperCase()


    // get ip function
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')

        setIP(res.data.IPv4)
    }
    // fetch all messages handler
    const LoadMessagesHandler = () => {

        axios.post('http://192.163.206.200:3001/chats/messages', { id: customerID }).then(response => {
            const messages = response.data
            // push all messages from database to all messages state
            setallMessages([...messages])
            console.log(allMessages)
        })
    }
    const AgentMessageHandler = () => {
        // setallMessages([...allMessages, { source: 'agent', message: currentAgentMessage, }])
        console.log('agent handler called');

        socket.emit('NEW_MESSAGE', { id: customerID, message: currentAgentMessage })
        axios.post('http://192.163.206.200:3001/chats/addmessage', {
            id: customerID,
            message: currentAgentMessage,
        }).then(response => {
            console.log('message added to datbase')
            LoadMessagesHandler()
        })
        setcurrentAgentMessage('')
    }

    useEffect(() => {
        asyncLocalStorage.getItem('selected_customer').then(value => {
            setcustomerID(value)
            // Get record for   about the chat
            axios.post('http://192.163.206.200:3001/chats/chat',{id:value}).then(response=>{
                console.log(response.data)

                // get agent info for this active chat
                
            })
            socket.emit('join room', { id: value, agent: (authState.LoggedUserData.f_name + ' ' + authState.LoggedUserData.l_name) })
        })

    }, [])

    // get all messages from database on first render
    useEffect(() => {
        LoadMessagesHandler()
    }, [customerID])


    useEffect(() => {
        chatarea.current.scrollTop = (chatarea.current.scrollHeight - chatarea.current.clientHeight)
        getData()
    })
    const chatarea = useRef()


    socket.on('NEW MESSAGE', (msg) => {
        LoadMessagesHandler()
    })

    return (
        <Fragment>
            <DashboardHeader title='ActiveChat' />
            <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
                <div className="row  pb-2" >
                    <div className="   col-md-8">
                        <div className="card mt-9 mb-9">
                            <div className="d-flex  py-9 px-13 justify-content-between" >
                                <div className='d-flex   flex-grow-1' style={{ gap: 10 }} >
                                    <span className='font-500 font-18'>{agentName}</span>
                                    <span className='font-18'>{ip} </span>
                                </div>
                                <div className='d-flex flex-grow-1'>
                                    <span className='font-18'>
                                        Monday 01:12 AM
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="card pb-4 px-9 mt-0">
                            <div className={`${styles.chatarea}`} ref={chatarea} >
                                {
                                    allMessages.map(message => {
                                        console.log(message.source)
                                        if (message.source == 'customer') {
                                            return <MessageBoxClient key={message.id} id={customerID} message={message.message} time={message.msgTime} />
                                        }
                                        else if (message.source == 'Agent') {
                                            return <MessageBoxAgent key={message.id} agentName={agentName} message={message.message} />
                                        }
                                    })

                                }
                            </div>
                            <div className="msg_area flex-wrap d-flex mt-3" style={{ gap: 20 }}>
                                <div className="d-flex " style={{ flexGrow: 10 }} >
                                    <textarea
                                        onKeyPress={(event) => {
                                            if (event.key == 'Enter') {
                                                AgentMessageHandler()
                                            }
                                        }}
                                        value={currentAgentMessage}
                                        placeholder='Type Here..' className='w-100 active-chat-msg-area'
                                        onChange={(e) => {
                                            setcurrentAgentMessage(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className=" d-flex  flex-column" style={{ gap: 10, flexGrow: 2 }}>
                                    <button className=' py-3 btn-grey-action'
                                        onClick={() => {
                                            AgentMessageHandler()
                                        }}
                                    >Message</button>
                                    <button className=' py-3 btn-grey-action'>Whisper</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card  mt-9">
                            <div className={`d-flex   border-grey-bottom flex-wrap align-items-center justify-content-between ${styles.detail_header} `}>
                                <div className="  flex-wrap d-flex flex-grow-1  align-items-center " style={{ gap: 20 }}>
                                    <button className=" px-2 py-2 btn-grey-action">
                                        <BsFillInfoCircleFill size={20} />
                                        <span className='ms-2'> Details </span>
                                    </button>
                                    <span>
                                        <HiOutlineScissors size={25} />
                                    </span>
                                    <span>
                                        <HiClock size={25} />
                                    </span>
                                </div>
                                <span><IoIosCloseCircleOutline size={20} color='red' /></span>
                            </div>
                            <div className={`${styles.details_body}`}>
                                <div className={`${styles.details_field_card} bg-grey`}>
                                    <span>
                                        V10396849659
                                    </span>
                                    <span color={colors.colors.green}>
                                        <AiFillSave />
                                    </span>
                                </div>
                                <div className={`${styles.details_field_card} bg-grey`}>
                                    <span>
                                        Visiter Email
                                    </span>
                                    <span color={colors.colors.green}>
                                        <AiFillSave />
                                    </span>
                                </div>
                                <div className={`${styles.details_field_card} bg-grey`}>
                                    <span>
                                        Islamabad,Pakistan
                                    </span>
                                    <span color={colors.colors.green}>
                                        115.168.174.112
                                    </span>
                                </div>
                                <div className={`${styles.details_field_card} bg-grey`}>
                                    <span>
                                        00:03:55
                                    </span>
                                    <span color={colors.colors.green}>
                                        4
                                    </span>
                                    <span>
                                        0 chats
                                    </span>
                                    <span>
                                        <DiLinux size={20} className='me-2' />
                                        <AiFillWindows color='#878787' size={20} className='me-2' />
                                    </span>
                                </div>
                                <div className="d-flex flex-column" style={{ gap: 10 }}>
                                    <div className='d-flex align-items-center ' style={{ gap: 10 }}>
                                        <button className="btn-light-blue py-1">
                                            45:34
                                        </button>
                                        <span>
                                            Chat Started
                                        </span>
                                    </div>
                                    <div className='d-flex flex-wrap align-items-center ' style={{ gap: 10 }}>
                                        <button className="btn-light-blue py-1">
                                            18:36
                                        </button>
                                        <span className='font-12'>
                                            Visitor navigated to <br />
                                            <a className='font-12 blue-link text-blue text-decoration-none' href="">
                                                https://linke123here/chat/
                                                210402098
                                            </a>

                                        </span>
                                    </div>
                                    <div className='d-flex ' style={{ gap: 10 }}>
                                        <IoIosArrowForward />
                                        <a style={{ color: '#5494F3' }} className='font-12 blue-link text-blue text-decoration-none' href="">
                                            https://dashboard.jataq.tv
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.details_card_footer}`}>
                                <div className="d-flex justify-content-between" style={{ gap: 10 }}>
                                    <button style={{ backgroundColor: '#5BC0DE' }} className="btn px-3">
                                        <AiFillPrinter color='white' size={20} /> <span className='ms-2 font-12  text-white'>
                                            Print
                                        </span>
                                    </button>
                                    <button style={{ backgroundColor: '#5CB85C' }} className="btn px-3 bg-green">
                                        <GrNote color='white' size={20} /> <span className='ms-2 font-12  text-white'>
                                            Note
                                        </span>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between mt-3" style={{ gap: 10 }}>
                                    <div>
                                        <span style={{ color: '#F00E0E' }} className='text-decoration-underline font-14'>Clear all</span>
                                    </div>
                                    <div className='d-flex flex-wrap ' style={{ gap: 10 }}>
                                        <button disabled className='btn-grey-action px-2'>
                                            Cancel
                                        </button>
                                        <button className='px-3  text-white ' style={{ backgroundColor: '#5BC0DE', border: '0px' }}>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ActiveChat
const MessageBoxClient = (props) => {
    return (
        <div className="msg mt-4 pt-15 dotted-border-top">
            <div className="d-flex justify-content-between">
                <div className='d-flex align-items-center' style={{ gap: 15 }}>
                    <span ><FaUser color={colors.colors.green} /></span>
                    <span style={{ color: colors.colors.green }}>{props.id}</span>
                </div>
                <div className="span">
                    {props.time}
                </div>
            </div>
            <p className='mt-2 font-16 fw-300'>{props.message} </p>
        </div>
    )
}
const MessageBoxAgent = (props) => {
    return (
        <div className="msg mt-4 pt-15 dotted-border-top">
            <div className="d-flex">
                <div className='d-flex align-items-center' style={{ gap: 15 }}>
                    <span className='font-500'>{props.agentName}</span>
                </div>
            </div>
            <p className='mt-2 font-16 fw-300'>{props.message} </p>
        </div>
    )
}
