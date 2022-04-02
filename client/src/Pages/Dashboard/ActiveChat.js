import React, { Fragment } from 'react'
import { DashboardHeader } from '../../Components/UI/MiniComponents/MiniComponent'
import { FaUser } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { HiOutlineScissors, HiClock, } from 'react-icons/hi';
import { IoIosCloseCircleOutline,IoIosArrowForward } from 'react-icons/io';
import { AiFillSave } from 'react-icons/ai';
import styles from './styles.module.css'
import colors from '../../../src/assets/Constants/ui_constants'
import { DiLinux } from 'react-icons/di';
import { GrNote } from 'react-icons/gr';
import { AiFillWindows,AiFillPrinter } from 'react-icons/ai';

function ActiveChat() {
    return (
        <Fragment>
            <DashboardHeader title='ActiveChat' />
            <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
                <div className="row  pb-2" >
                    <div className="   col-md-8">
                        <div className="card mt-9 mb-9">
                            <div className="d-flex  py-9 px-13 justify-content-between" >
                                <div className='d-flex   flex-grow-1' style={{ gap: 10 }} >
                                    <span className='font-500 font-18'>Mr.DjterryxD</span>
                                    <span className='font-18'>168.168.137.1</span>
                                </div>
                                <div className='d-flex flex-grow-1'>
                                    <span className='font-18'>
                                        Monday 01:12 AM
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="card pb-4 px-9 mt-0">
                            <MessageBoxClient id='VA4554646574846548' time='12:45 AM' />
                            <MessageBoxAgent agentName='Ahad Aman (ME)' />
                            <MessageBoxAgent agentName='Ahad Aman (ME)' />
                            <MessageBoxClient id='CD4554646574846546' time='12:50 AM' />
                            <div className="msg_area flex-wrap d-flex mt-3" style={{ gap: 20 }}>
                                <div className="d-flex " style={{ flexGrow: 10 }} >
                                    <textarea placeholder='Type Here..' className='w-100 active-chat-msg-area' />
                                </div>
                                <div className=" d-flex  flex-column" style={{ gap: 10, flexGrow: 2 }}>
                                    <button disabled className=' py-3 btn-grey-action'>Message</button>
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
                                <div className="d-flex flex-column" style={{gap:10}}>
                                    <div className='d-flex align-items-center ' style={{ gap: 10 }}>
                                        <button className="btn-light-blue py-1">
                                            18:36
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
                                            <a  className='font-12 blue-link text-blue text-decoration-none' href="">
                                            https://linke123here/chat/
                                            210402098
                                            </a>
                                    
                                        </span>
                                    </div>
                                    <div className='d-flex ' style={{gap:10}}>
                                    <IoIosArrowForward/>
                                    <a style={{color:'#5494F3'}} className='font-12 blue-link text-blue text-decoration-none' href="">
                                    https://dashboard.jataq.tv
                                            </a>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.details_card_footer}`}>
                            <div className="d-flex justify-content-between" style={{gap:10}}>
                            <button style={{backgroundColor:'#5BC0DE'}} className="btn px-3">
                              <AiFillPrinter color='white' size={20} /> <span className='ms-2 font-12  text-white'>
                                  Print
                              </span>
                            </button>
                            <button style={{backgroundColor:'#5CB85C'}} className="btn px-3 bg-green">
                              <GrNote color='white' size={20} /> <span className='ms-2 font-12  text-white'>
                                  Note
                              </span>
                            </button>
                            </div>
                            <div className="d-flex justify-content-between mt-3" style={{gap:10}}>
                                <div>
                                    <span style={{color:'#F00E0E'}} className='text-decoration-underline font-14'>Clear all</span>
                                </div>
                                <div className='d-flex flex-wrap ' style={{gap:10}}>
                                    <button disabled className='btn-grey-action px-2'>
                                        Cancel
                                    </button>
                                    <button className='px-3  text-white ' style={{backgroundColor:'#5BC0DE',border:'0px'}}>
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
            <p className='mt-2 font-16 fw-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget nullam et hendrerit in. In volutpat vitae, pellentesque amet ultrices faucibus etiam in. </p>
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
            <p className='mt-2 font-16 fw-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget nullam et hendrerit in. In volutpat vitae, pellentesque amet ultrices faucibus etiam in. </p>
        </div>
    )
}
