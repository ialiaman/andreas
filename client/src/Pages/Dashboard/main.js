import React,{useState,createContext,useContext} from 'react';

import { BrowserRouter as Router, Route, Routes, Link, Outlet, NavLink,useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { BsChatLeftDots } from 'react-icons/bs';
import { AiOutlineArrowLeft,AiTwotoneSetting } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi';
import { ImStatsDots } from 'react-icons/im';
import { BiHelpCircle } from 'react-icons/bi';
import {AuthContext} from '../../App'
const UserContext = createContext()
function MainDashboard() {        
    const {authState, setAuthState } = useContext(AuthContext);
    let navigate = useNavigate();
    const logoutHandler=()=>{
        alert('logout')
           localStorage.removeItem('accessToken')
           setAuthState({LoggedUserData:'',status:false})
           return navigate("/signin");
    }
    const [sideNav, setsideNav] = useState('d-block')
    const [SideBar, setSideBar] = useState('d-block')
        const togglerHandler=()=>{
            if(sideNav==='d-block'){
                setsideNav('d-none')
            }
            else
            setsideNav('d-block')
        }
    // const [sidebar, setsidebar] = useState(true);
    let activeStyle = {
        backgroundColor:'#04A84E',
        color:'white'
    };
    const handleSidebar=()=>{
                setSideBar('d-none')
    }
    let activeClassName = "underline"
    return (
        <UserContext.Provider value={()=>{
            if(sideNav==='d-block'){
                setsideNav('d-none')
            }
            else
            setsideNav('d-block')
           
        }} >
            <div className="container-fluid p-0 " >
                <div className="row m-0 ">
                    <div className={` ${sideNav} bg-dark text-center pt-3  text-white ${styles.sidebar} col-md-3   ${SideBar}`} >
                        <ul className='d-flex   flex-md-column border-bottom-grey justify-content-around pb-5  list-group'>
                            <NavLink
                            end
                             className={`${styles.navLink} row py-3 px-3  mb-2`}
                                to=""
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                               <MdOutlineSpaceDashboard className='col-4' size={25} /> <span className='col-8'>Dashboard</span>
                            </NavLink>
                            <NavLink
                                className={`${styles.navLink} row py-3 px-3  mb-2`}
                                to="/dashboard/monitor"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                                <BsChatLeftDots  size={20} className='col-4'/>
                            <span className="span col-8  ">Monitor</span>
                            </NavLink>
                            <NavLink
                                className={`${styles.navLink} row py-3 px-3  mb-2`}
                                to="/dashboard/activeChat"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                                <BiMessageDetail size={25} className='col-4'/>
                            <span className='col-8'>Active Chat</span>
                            </NavLink>
                            <NavLink
                                className={`${styles.navLink} row py-3 px-3 mb-2`}
                                to="/dashboard/messaging"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                                <ImStatsDots size={25} className='col-4'/>
                            <span className='col-8'>Messaging</span>
                            </NavLink>
                            {/* <li className='list-group-item my-3'>
                                <Link className='text-style-none' to={'/dashboard/products'}>
                                    Dashboard
                                </Link>
                            </li> */}
                        </ul>
                        <div className="grey-line mb-3"></div>
                        <ul className='d-flex px-3 flex-md-column border-bottom-grey justify-content-around pb-5 flex-row list-group'>
                        <NavLink
                             className={`${styles.navLink} py-3 px-3 row mb-2`}
                                to="help"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                               <BiHelpCircle size={25} className='col-4'/>
                                <span className='col-8'>Help</span>
                            </NavLink>
                        <NavLink
                             className={`${styles.navLink} py-3 px-3 row mb-2`}
                                to="/dashboard/setting"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                               <AiTwotoneSetting size={25} className='col-4'/> <span className="col-8">Settings</span>
                            </NavLink>
                                <button onClick={logoutHandler} className='btn-primary ' style={{border:'0',boxShadow:'0px'}}> Logout</button>
                            </ul>
                        
                    </div>
                    <div className="col px-0 bg-grey ">
                        <Outlet toggler={()=>alert('toggler presses')} />
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    )
}
export default MainDashboard
export {UserContext}
