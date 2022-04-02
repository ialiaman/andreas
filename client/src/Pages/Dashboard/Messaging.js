import React, { Fragment } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './styles.module.css'
import { DashboardHeader } from '../../Components/UI/MiniComponents/MiniComponent'
function Messaging() {
    return (
        <Fragment>
            <DashboardHeader title='Messaging' />
            <div className="container-fluid  px-1 px-md-2 ps-lg-4 pe-lg-5 ">
                <div className="row px-1  py-2">
                    <div className="col-12 col-xl-11">
                        <div className="contianer-fluid card">
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
                        </div>

                        <div className="contianer-fluid mx-3">
                            <div className="row d-flex flex-wrap align-items-center my-3">
                                <div className="col-md-6 d-flex flex-wrap align-items-center" style={{gap:40}}>
                                    <div className="d-flex  align-items-center" style={{gap:15}}>
                                        <button className="btn-light-blue" >
                                            All
                                        </button>
                                        <input style={{height:33}} type="search" class="form-control   rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                        <span style={{height:33}} class="input-group-text px-4  bgMountainMeadow  border-0" id="search-addon">
                                            <i class="fas text-white fa-search"></i>
                                        </span>
                                    </div>
                                    <div className="d-flex mx-auto flex-wrap" style={{gap:40}} >
                                        <div className='d-flex flex-wrap align-items-center' style={{gap:8}}>
                                            <img className='messaging-tick-img' src={require('../../assets/Images/selects.png')}/>
                                            <span className='text-grey'>
                                                Chats
                                            </span>
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center' style={{gap:8}}>
                                            <img  className='messaging-tick-img' src={require('../../assets/Images/selects.png')}/>
                                            <span className='text-grey'>
                                                Tickets
                                            </span>
                                        </div>
                                    </div>    
                                </div>
                                <div className="col-md-5 d-flex flex-grow-1 justify-content-end align-items-center"  style={{gap:15}}>
                                  <span className="text-grey me-2">
                                      Sort by
                                      <MdKeyboardArrowDown className='ms-1'/>
                                  </span>
                                  
                                  <button className="btn-white    font-12 "> <img className='mx-2' src={require('../../assets/Images/filter.png')} alt="" /> Filter Visitors</button>
                                </div>
                            </div>
                            <div className={`row  `} >
                                <table className={`${styles.messageingTable} table `}>
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
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Closed</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Closed</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Closed</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span  class="badge badge-green-light-bold ">Open</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge  badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Closed</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-green-light-bold ">Open</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Closed</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-green-light-bold ">Open</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Closed</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span class="badge badge-curious-bold">T</span>
                                            </td>
                                                <td>
                                                V168495545544
                                                </td>
                                                <td>
                                                2messages
                                                </td>
                                                <td>
                                                9 min
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Ahad Aman</span>
                                                </td>
                                                <td>
                                                16 march 18:42
                                                </td>
                                                <td>
                                                <span class="badge badge-grey-light-bold ">Closed</span>
                                                </td>
                                                <td>
                                                    <img src={require('../../assets/Images/chatimg.png')} alt="" />
                                                </td>
                                                <td>
                                                <input type="checkbox" />
                                                </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>

    )
}

export default Messaging