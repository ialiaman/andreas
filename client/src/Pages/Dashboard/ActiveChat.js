import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import { DashboardHeader } from '../../Components/UI/MiniComponents/MiniComponent'
import { FaUser } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { HiOutlineScissors, HiClock, } from 'react-icons/hi';
import { IoIosCloseCircleOutline, IoIosArrowForward } from 'react-icons/io';
import { AiFillSave, AiFillInfoCircle } from 'react-icons/ai';
import styles from './styles.module.css'
import colors from '../../../src/assets/Constants/ui_constants'
import { DiLinux } from 'react-icons/di';
import { GrNote } from 'react-icons/gr';
import { AiFillWindows, AiFillPrinter, AiFillAndroid } from 'react-icons/ai';
import { MdOutlineContentCut } from 'react-icons/md'
import { BsClock } from 'react-icons/bs'
import { FaUserPlus } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import socket from '../../helpers/socket'
import { AuthContext } from '../../App'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'
import './styles.css'



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
    const [customerLocation, setcustomerLocation] = useState('');
    const [othersChat, setothersChat] = useState(false)
    const [customerID, setcustomerID] = useState('')
    const [chatData, setchatData] = useState('')
    const [allMessages, setallMessages] = useState([])
    const { authState, setAuthState } = useContext(AuthContext);
    const [currentAgentMessage, setcurrentAgentMessage] = useState('')
    const [agentName, setagentName] = useState('')
    const [show, setShow] = useState(false);
    const [tabIcon, settabIcon] = useState({details:true,leads:false})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // match agent to show message area
    useEffect(() => {
        if (authState.LoggedUserData.f_name && authState.LoggedUserData.l_name) {

            const curretUser = authState.LoggedUserData.f_name.toUpperCase() + ' ' + authState.LoggedUserData.l_name.toUpperCase()
            if (curretUser !== agentName) {
                console.log('not qural')
                setothersChat(true)
            }

            else {
                console.log('equal')
                setothersChat(false)
            }
        }

    })
    // fetch all messages handler
    const LoadMessagesHandler = () => {
        axios.post('http://localhost:3001/chats/messages', { id: customerID }).then(response => {
            const messages = response.data
            // push all messages from database to all messages state
            setallMessages([...messages])
            console.log(allMessages)
        })
    }
    const AgentMessageHandler = () => {
        alert(new Date())
        // setallMessages([...allMessages, { source: 'agent', message: currentAgentMessage, }])
        console.log('agent handler called');

        socket.emit('NEW_MESSAGE', { id: customerID, message: currentAgentMessage })
        axios.post('http://localhost:3001/chats/addmessage', {
            id: customerID,
            message: currentAgentMessage,
        }).then(response => {
            console.log('message added to datbase')
            LoadMessagesHandler()
        })
        console.log('current message:' + currentAgentMessage)
        setcurrentAgentMessage('')
    }

    useEffect(() => {
        asyncLocalStorage.getItem('selected_customer').then(value => {
            setcustomerID(value)
            // Get record for   about the chat
            axios.post('http://localhost:3001/chats/chat', { id: value }).then(response => {
                setchatData(response.data[0])

                // get agent info for this active chat

            })

            socket.emit('join room', { id: value, agent: (authState.LoggedUserData.f_name + ' ' + authState.LoggedUserData.l_name) })
        })

    }, [])
    useEffect(() => {
        chatData && axios.post('http://localhost:3001/chats/agent', { id: chatData.served_by }).then(res => {

            setagentName(res.data.f_name.toUpperCase() + ' ' + res.data.l_name.toUpperCase())

        }).catch(error => {
            console.log("error:" + error)
        })
    }, [chatData])

    // get all messages from database on first render
    useEffect(() => {
        LoadMessagesHandler()
        console.log('message loadinggggggggg')
    }, [customerID])


    useEffect(() => {
        chatarea.current.scrollTop = (chatarea.current.scrollHeight - chatarea.current.clientHeight)


    })
    useEffect(() => {

        return () => {
            // Store All Messages on UnMounting

        }
    }, [])
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

                                </div>
                                <div className='d-flex flex-grow-1'>
                                    <span className='font-18'>
                                        {/* {chatData.created_date.slice(11,-5)} */}
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
                            {
                                !othersChat ? <div className="msg_area flex-wrap d-flex mt-3" style={{ gap: 20 }}>
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
                                </div> : null
                            }

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card  mt-9">
                            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="mb-3" onSelect={(event,e)=>{
                              
                            }}>
                                <Tab eventKey="details"  title={<> {
                                   <BsFillInfoCircleFill className='icon' size={20} />
                                } 
                                    <span className='ms-2 text'> Details </span></>} >
                                    <div className={`${styles.details_body}`}>
                                        <div className={`${styles.details_field_card}  bg-grey`}>
                                            <span>
                                                {chatData.customer_id}
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
                                                {`${chatData.city} ${chatData.country}`}
                                            </span>
                                            <span color={colors.colors.green}>
                                                {chatData.address}
                                            </span>
                                        </div>
                                        <div className={`${styles.details_field_card} bg-grey`}>
                                            <span>Plateform</span>
                                            <span>
                                                {(chatData.plateform === "\"Windows\"") ? <AiFillWindows color='#878787' size={20} /> : (chatData.plateform === "\"Android\"") ? <AiFillAndroid size={20} /> : <DiLinux size={20} />}
                                            </span>
                                        </div>
                                        <div className="d-flex flex-column" style={{ gap: 10 }}>
                                            <div className='d-flex align-items-center ' style={{ gap: 10 }}>
                                                <button className="btn-light-blue py-1">
                                                    {chatData.created_date && chatData.created_date.slice(11, -5)}
                                                </button>
                                                <span>
                                                    Chat Started
                                                </span>
                                            </div>
                                            <div className='d-flex flex-wrap align-items-center ' style={{ gap: 10 }}>
                                                <button className="btn-light-blue py-1">
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
                                </Tab>
                              
                                <Tab eventKey="leads"  title={ <> {
                                  <FaUserPlus className='icon' />  
                                } 
                                <span className='text'>Leads</span> </> } >
                                <div>
                                            <Card show={show} onHide={handleClose}>
                                               
                                                <form>
                                                <Card.Body>
                                                   
                                                        <div class="mb-3">
                                                            <label for="exampleInputEmail1" class="form-label">Company Name</label>
                                                            <input placeholder='Company Name' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="exampleInputPassword1" class="form-label">Customer Email</label>
                                                            <input type="email" placeholder='Customer Email' class="form-control" id="exampleInputPassword1" />
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="exampleInputPassword1" class="form-label">Customer Mobile Number</label>
                                                            <input type="email" placeholder='Customer Mobile Number' class="form-control" id="exampleInputPassword1" />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <p className='mb-0'>Visitor navigated to</p>
                                                            <a className='blue-link' href="">
                                                                https://linke123here/chat/210402098
                                                            </a>
                                                        </div>
                                                     
                                                        
                                                    
                                                </Card.Body>
                                                <Card.Footer className='d-flex justify-content-between'>
                                                    
                                            
                                                   
                                                    <Button style={{border:0}}  variant="secondary" onClick={handleClose}>
                                                           Cancel
                                                        </Button>    
                                                    <Button style={{border:0,backgroundColor: '#5BC0DE'}} className='text-decoration-none'  variant="secondary" onClick={handleClose}>
                                                           Done
                                                        </Button>   
                                                   
                                                </Card.Footer>
                                                </form>
                                            </Card>
                                        </div>
                                </Tab>
                            </Tabs>
                        </div>
                        {/* <div className="card  mt-9">
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
                                        {chatData.customer_id}
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
                                        {`${chatData.city} ${chatData.country}`}
                                    </span>
                                    <span color={colors.colors.green}>
                                        {chatData.address}
                                    </span>
                                </div>
                                <div className={`${styles.details_field_card} bg-grey`}>
                                    <span>Plateform</span>
                                    <span>
                                        {(chatData.plateform === "\"Windows\"") ? <AiFillWindows color='#878787' size={20} /> : (chatData.plateform === "\"Android\"") ? <AiFillAndroid size={20} /> : <DiLinux size={20} />}


                                    </span>
                                </div>
                                <div className="d-flex flex-column" style={{ gap: 10 }}>
                                    <div className='d-flex align-items-center ' style={{ gap: 10 }}>
                                        <button className="btn-light-blue py-1">
                                            {chatData.created_date && chatData.created_date.slice(11, -5)}
                                        </button>
                                        <span>
                                            Chat Started
                                        </span>
                                    </div>
                                    <div className='d-flex flex-wrap align-items-center ' style={{ gap: 10 }}>
                                        <button className="btn-light-blue py-1">

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

                                    <div className='d-flex flex-wrap ' style={{ gap: 10 }}>
                                        <button disabled className='btn-grey-action px-2'>
                                            Cancel
                                        </button>
                                        <button onClick={handleShow} className='px-3  text-white ' style={{ backgroundColor: '#5BC0DE', border: '0px' }}>
                                            Add Lead
                                        </button>
                                        <div>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>

                                                    <div className="d-flex w-100 justify-content-around">
                                                        <AiFillInfoCircle size={20} />
                                                        <MdOutlineContentCut size={20} />
                                                        <BsClock size={20} />
                                                        <button className="btn-grey-action">
                                                            <FaUserPlus /> Leads
                                                        </button>
                                                    </div>
                                                </Modal.Header>
                                                <form>
                                                <Modal.Body>
                                                   
                                                        <div class="mb-3">
                                                            <label for="exampleInputEmail1" class="form-label">Company Name</label>
                                                            <input placeholder='Company Name' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="exampleInputPassword1" class="form-label">Customer Email</label>
                                                            <input type="email" placeholder='Customer Email' class="form-control" id="exampleInputPassword1" />
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="exampleInputPassword1" class="form-label">Customer Mobile Number</label>
                                                            <input type="email" placeholder='Customer Mobile Number' class="form-control" id="exampleInputPassword1" />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <p className='mb-0'>Visitor navigated to</p>
                                                            <a className='blue-link' href="">
                                                                https://linke123here/chat/210402098
                                                            </a>
                                                        </div>
                                                     
                                                        
                                                    
                                                </Modal.Body>
                                                <Modal.Footer className='d-flex'>
                                                    <div className="d-flex w-100 px-2 mb-3 px-md-3" style={{gap:30}} >

                                                        <Button className='w-50' style={{ backgroundColor: '#5BC0DE',border:0 }} variant="secondary">
                                                            <AiFillPrinter className='me-2' size={25} />
                                                            print
                                                        </Button>
                                                        <Button className='w-50' style={{ backgroundColor: '#5CB85C',border:0 }} variant="secondary" >
                                                            <GrNote color='white' className='me-2' size={20} />
                                                            Note
                                                        </Button>
                                                    </div>
                                                    
                                                    <div className='d-flex flex-end px-2  px-md-3' style={{gap:10}}>
                                                    <Button style={{border:0}}  variant="secondary" onClick={handleClose}>
                                                           Cancel
                                                        </Button>    
                                                    <Button style={{border:0,backgroundColor: '#5BC0DE'}} className='text-decoration-none'  variant="secondary" onClick={handleClose}>
                                                           Done
                                                        </Button>   
                                                    </div>
                                                </Modal.Footer>
                                                </form>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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
