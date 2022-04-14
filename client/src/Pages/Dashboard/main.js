import React, { useState, createContext, useContext } from 'react';
import SVGS from '../../helpers/svgs'
import { BrowserRouter as Router, Route, Routes, Link, Outlet, NavLink, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { BsChatLeftDots } from 'react-icons/bs';
import { AiOutlineArrowLeft, AiTwotoneSetting } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi';
import { ImStatsDots } from 'react-icons/im';
import { BiHelpCircle } from 'react-icons/bi';
import { AuthContext } from '../../App'
import { ImportantDevices } from '@mui/icons-material';
const UserContext = createContext()
function MainDashboard() {
    const { authState, setAuthState } = useContext(AuthContext);
    let navigate = useNavigate();
    const logoutHandler = () => {
        alert('logout')
        localStorage.removeItem('accessToken')
        setAuthState({ LoggedUserData: '', status: false })
        return navigate("/signin");
    }
    const [sideNav, setsideNav] = useState('d-block')
    const [SideBar, setSideBar] = useState('d-block')
    const togglerHandler = () => {
        if (sideNav === 'd-block') {
            setsideNav('d-none')
        }
        else
            setsideNav('d-block')
    }
    // const [sidebar, setsidebar] = useState(true);
  
    const handleSidebar = () => {
        setSideBar('d-none')
    }
    return (
        <UserContext.Provider value={() => {
            if (sideNav === 'd-block') {
                setsideNav('d-none')
            }
            else
                setsideNav('d-block')

        }} >
            <div className="container-fluid p-0 " >
                <div className="row flex-nowrap m-0 ">
                    <div className={` ${sideNav}  text-center pt-3  text-white ${styles.sidebar} col-md-3   ${SideBar}`} >
                        <ul className='d-flex  flex-md-column border-bottom-grey justify-content-around pb-5  list-group'>
                            <NavLink
                                end
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLinkActive} row  pe-3  mb-2` :`${styles.navLink} row  pe-3  mb-2`
                                }
                              
                                to=""
                               
                            >
                                <img className={`${styles.iconImg} col-4 `} src={SVGS.Dashboard} /> <span className='col-8'>Dashboard</span>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                isActive ? `${styles.navLinkActive} row  pe-3  mb-2` :`${styles.navLink} row  pe-3  mb-2`
                            }
                                to="/dashboard/monitor"
                              
                            >
                                <img className={`${styles.iconImg} col-4 `} src={SVGS.Monitor} />
                                <span className="span col-8  ">Monitor</span>
                            </NavLink>
                            <NavLink
                               className={({ isActive }) =>
                               isActive ? `${styles.navLinkActive} row  pe-3  mb-2` :`${styles.navLink} row  pe-3  mb-2`
                           }
                                to="/dashboard/activeChat"
                               
                            >
                                <img className={`${styles.iconImg} col-4 `} src={SVGS.ActiveChat} />
                                <span className='col-8'>Active Chat</span>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                isActive ? `${styles.navLinkActive} row  pe-3  mb-2` :`${styles.navLink} row  pe-3  mb-2`
                            }
                                to="/dashboard/messaging"
                              
                            >
                                <img className={`${styles.iconImg} col-4 `} src={SVGS.Messaging} />
                                <span className='col-8'>Messaging</span>
                            </NavLink>
                            {/* <li className='list-group-item my-3'>
                                <Link className='text-style-none' to={'/dashboard/products'}>
                                    Dashboard
                                </Link>
                            </li> */}
                        </ul>
                        <div className="grey-line mb-3"></div>
                        <ul className='d-flex pe-3 flex-column border-bottom-grey justify-content-around pb-5 flex-grow-1 flex-row list-group'>
                            <NavLink
                            
                            className={({ isActive }) =>
                            isActive ? `${styles.navLinkActive} row  pe-3  mb-2` :`${styles.navLink} row  pe-3  mb-2`
                        }
                                to="help"
                               
                            >
                                <img className={`${styles.iconImg} col-4 `} src={SVGS.Help} />
                                <span className='col-8'>Help</span>
                            </NavLink>
                            <NavLink
                               className={({ isActive }) =>
                               isActive ? `${styles.navLinkActive} row  pe-3  mb-2` :`${styles.navLink} row  pe-3  mb-2`
                           }
                                to="/dashboard/setting"
                               
                            >
                                <img className={`${styles.iconImg} col-4 `} src={SVGS.Setting} /> <span className="col-8">Settings</span>
                            </NavLink>
                           
                        </ul>
                        <div>

                        <button onClick={logoutHandler} className=' text-light mt-auto' style={{ border: '0', boxShadow: '0px', backgroundColor: '#5CB85C' }}> Logout</button>
                        </div>
                    </div>
                    <div className="col px-0 bg-grey ">
                        <Outlet toggler={() => alert('toggler presses')} />
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    )
}
export default MainDashboard
export { UserContext }
