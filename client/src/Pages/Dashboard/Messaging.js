import React, { Fragment, useEffect,useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md';

import styles from './styles.module.css'
import { DashboardHeader } from '../../Components/UI/MiniComponents/MiniComponent'
import axios from 'axios'
function Messaging() {
    const [chatList, setchatList] = useState([])
    console.log(chatList)
    // GET All CHAT DATA FROM DATABASE
    useEffect(() => {
        axios.get('http://localhost:3001/chats/getallchats').then(response => {
            console.log(response)
            setchatList((pre)=>{                
                return [...pre,...response.data]
            })
        })
    },[])
    return (
        <Fragment>
            <DashboardHeader title='Messaging' />
            <div className="container-fluid  px-1 px-md-2 ps-lg-4 pe-lg-5 ">
                <div className="row px-1  py-2">
                    <div className="col-12 col-xl-11">
                        {/* <div className="contianer-fluid card">
                            <div className="row  py-2">
                                <div className="col-md-7 align-items-center ms-auto d-flex justify-content-between ">
                                    <span className='ms-1' >
                                        Monday 01:12 AM
                                    </span>
                                    <button className="btn-primary-light me-2">
                                        New Ticket
                                    </button>
                                </div>
                            </div>
                        </div> */}

                        <div className="container-fluid mx-3">
                            <div className="row d-flex flex-wrap align-items-center my-3">
                                <div className="col-md-6 d-flex flex-wrap align-items-center" style={{ gap: 40 }}>
                                    <div className="d-flex  align-items-center" style={{ gap: 15 }}>
                                        <button className="btn-light-blue" >
                                            All
                                        </button>
                                        <input style={{ height: 33 }} type="search" className="form-control   rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                        <span style={{ height: 33 }} className="input-group-text px-4  bgMountainMeadow  border-0" id="search-addon">
                                            <i className="fas text-white fa-search"></i>
                                        </span>
                                    </div>
                                    {/* <div className="d-flex mx-auto flex-wrap" style={{ gap: 40 }} >
                                        <div className='d-flex flex-wrap align-items-center' style={{ gap: 8 }}>
                                            <img className='messaging-tick-img' src={require('../../assets/Images/selects.png')} />
                                            <span className='text-grey'>
                                                Chats
                                            </span>
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center' style={{ gap: 8 }}>
                                            <img className='messaging-tick-img' src={require('../../assets/Images/selects.png')} />
                                            <span className='text-grey'>
                                                Tickets
                                            </span>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="col-md-5 d-flex flex-grow-1 justify-content-end align-items-center" style={{ gap: 15 }}>
                                    <span className="text-grey me-2">
                                        Sort by
                                        <MdKeyboardArrowDown className='ms-1' />
                                    </span>

                                    <button className="btn-white    font-12 "> <img className='mx-2' src={require('../../assets/Images/filter.png')} alt="" /> Filter Visitors</button>
                                </div>
                            </div>
                            <div className={`row `} >
                                <div className="col-12 table-responsive-lg">
                                    <table className={`${styles.messageingTable} table `} style={{ maxWidth: '100%' }}>
                                        <thead>

                                            <tr >
                                                <th>
                                                    <span className=" badge badge-curious-bold">
                                                        ID
                                                    </span>
                                                </th>
                                                <th>
                                                    User Name
                                                </th>
                                                <th>
                                                    Messages
                                                </th>
                                                <th>
                                                    Time
                                                </th>
                                                <th>
                                                    Agent
                                                </th>
                                                <th>
                                                    Date
                                                </th>
                                                <th>
                                                    Activity
                                                </th>
                                                <th>
                                                    Chat
                                                </th>
                                            </tr>
                                        </thead>


                                        <tbody>

                                            {
                                                chatList.map(chat => { 
                                                    return <tr>
                                                    <td>
                                                        <span className="badge badge-curious-bold">T</span>
                                                    </td>
                                                    <td>
                                                        {chat.customer_id}
                                                    </td>
                                                    <td>
                                                        2messages
                                                    </td>
                                                    <td>
                                                        9 min
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-grey-light-bold ">{chat.agent_name}</span>
                                                    </td>
                                                    <td>
                                                        {chat.created_date.slice(0,10)}
                                                    </td>
                                                    <td>
                                                        {chat.is_end?<span className="badge badge-grey-light-bold ">Closed</span>:<span className="badge badge-grey-light-bold ">open</span>}
                                                        
                                                    </td>
                                                    <td>
                                                        <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                    </td>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                </tr> 
                                                })
                                            }

                                            
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>

    )
}

export default Messaging