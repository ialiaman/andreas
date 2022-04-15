import React, { Fragment, useContext, useState, useEffect } from 'react';
import { DashboardHeader } from '../../Components/UI/MiniComponents/MiniComponent';
import styles from './styles.module.css';
import { MdOutlineKeyboardArrowDown, MdDisabledVisible,MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { DiLinux } from 'react-icons/di';
import { AiFillWindows } from 'react-icons/ai';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import socket from '../../helpers/socket';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import axios from 'axios'
function Monitor() {
    const [ActiveCustomer, setActiveCustomer] = useState([])
    const [UnAnsweredCustomer, setUnAnsweredCustomer] = useState([])
    const [ServedCustomer, setServedCustomer] = useState([])
    const { authState, setAuthState } = useContext(AuthContext);
    // get all unansered users from database
    const unAnsweredUsers=()=>{
        axios.get('http://192.163.206.200:3001/chats/unanswered').then(res => {
            setUnAnsweredCustomer([...res.data])
        })
    }
      // get all active users from database
      const ActiveUsers=()=>{
        axios.get('http://192.163.206.200:3001/chats/active').then(res => {
            setActiveCustomer([...res.data])
        })
    }
    useEffect(() => {
        ActiveUsers()
        unAnsweredUsers()
    }, [])
    const navigate = useNavigate()
    useEffect(() => {
        socket.emit('agent active')
    })
    socket.on('NEW USER', (data) => {
        unAnsweredUsers()
    })
        // map all the active customers
        const ActiveList = ActiveCustomer.map((customer) => {
            return <ListCard id={customer.customer_id} 
            address={customer.address}
            origin={customer.origin}
            created_date={customer.created_date}
            plateform={customer.plateform}
            clickHandler={()=>{
                localStorage.setItem('selected_customer',customer.customer_id)
                navigate('/dashboard/activeChat')
            }} />
        })
        // map all the unanswered customers
        const UnAnsweredList = UnAnsweredCustomer.map((customer) => {
            return <ListCard id={customer.customer_id}
            address={customer.address}
            origin={customer.origin}
            created_date={customer.created_date}
            plateform={customer.plateform}
            clickHandler={()=>{
                axios.post('http://192.163.206.200:3001/chats/status1',{
                    id:customer.customer_id
                }
                )
                axios.post('http://192.163.206.200:3001/chats/servedby/',{
                    chatID:customer.customer_id,
                    agentID:authState.LoggedUserData.id      
                })
                localStorage.setItem('selected_customer',customer.customer_id)
                navigate('/dashboard/activeChat')
            }} />
        })
        console.log(socket)
    return (
        <Fragment>
            <DashboardHeader title='Monitor' />
            <div className="container-fluid  px-1 px-md-2 ps-lg-4 pe-lg-5 bg-grey ">
                <div className="row py-2">
                    <div className="col-12  col-xl-11">
                        <div className='d-flex px-3 justify-content-between'>
                            <button className="btn-light-blue ">ID</button>
                            <button className="btn-white  font-12 "> <img className='mx-2' src={require('../../assets/Images/filter.png')} alt="" /> Filter Visitors</button>
                        </div>
                        <div className="container-fluid">'
                            <StatusCard key={1} statusTitle='Served' statusColor='#855CF8'
                            />
                            <StatusCard key={2} statusTitle='Unanswered' statusColor='#F35454'
                            list={UnAnsweredList.length?UnAnsweredList:<p className={`card ${styles.empty_list}`}
                            >No UnAnswered Users</p>}
                            />
                            <StatusCard key={3} statusTitle='Active' statusColor='#5CB85C'
                            list={ActiveList.length?ActiveList:
                            <p className={`card ${styles.empty_list}`}
                            >No Active Users</p>} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Monitor
const StatusCard = (props) => {
    const [listShow, setlistShow] = useState(false)
    const LIST=props.list?props.list: <p>no users</p>
    return (
        <div className="row mb-3" onClick={props.clickHandler}>
            <div class={`card ${styles.status_header}`} >
                <div className='d-flex align-items-center my-2' >
                    <div className="d-flex flex-grow-1" >
                        <span className={`${styles.status_circle}`} style={{ backgroundColor: props.statusColor }}></span>
                        <p className='mb-0 align-baseline ms-3 font-14  font-500' > {props.statusTitle}</p>
                        <span className=' ms-2 ms-md-4 ms-lg-5 font-14 '> (1-1/1)</span>
                    </div>
                    <div>
                        {
                            listShow?<MdOutlineKeyboardArrowUp size={20} onClick={()=>setlistShow(!listShow)} />:<MdOutlineKeyboardArrowDown size={20} onClick={()=>setlistShow(!listShow)} />
                        }
                    </div>
                </div>
            </div>
            { listShow && LIST}
        </div>
    )
}
const ListCard = (props) => {
    console.log( typeof props.created_date)
    return (
        <div class="card border-top-0 rounded-0" onClick={props.clickHandler}>
            <div className="d-flex py-2 flex-wrap  align-items-center justify-content-between"
                style={{ gap: 10 }}
            >
                <div className="btn-light-blue">
                    T
                </div>
                <span>
                    {props.id}
                </span>
                <span>
                   {props.address}
                </span>
                <a className='text-primary text-decoration-none' href="">https://linke123here/chat/210402098</a>
                <a className='text-blue text-decoration-none' href="" >{props.origin}</a>
                <span>
                    {props.created_date.slice(11,-5)}
                </span>
                <div className='flex-shrink-0'>
                    <span className='me-2'>
                        4
                    </span>
                    <span className='me-2'>
                        0
                    </span>
                    {  
                      (props.plateform=="\"Windows\"")?  <AiFillWindows color='#878787' size={20} className='me-2' />:<DiLinux size={20} className='me-2' />
                    }
                    <BsFillEyeSlashFill color='#5494F3' size={20} className='me-2' />
                    <MdDisabledVisible color='red' size={20} className='me-2' />
                    <img className='me-2' src={require('../../assets/Images/pak.png')} />
                </div>
            </div>
        </div>
    )
}
