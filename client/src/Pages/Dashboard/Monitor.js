import React, { Fragment } from 'react'
import { DashboardHeader } from '../../Components/UI/MiniComponents/MiniComponent'
import styles from './styles.module.css'
import { MdOutlineKeyboardArrowDown, MdDisabledVisible } from 'react-icons/md';
import { DiLinux } from 'react-icons/di';
import { AiFillWindows } from 'react-icons/ai';
import { BsFillEyeSlashFill } from 'react-icons/bs';
function Monitor() {
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
                            <StatusCard statusTitle='Served' statusColor='#855CF8' />
                            <StatusCard statusTitle='Unanswered' statusColor='#F35454' />
                            <StatusCard statusTitle='Active' statusColor='#5CB85C' />
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Monitor
const StatusCard = (props) => {
    return (
        <div className="row mb-3">
            <div class={`card ${styles.status_header}`} >
                <div className='d-flex align-items-center my-2' >
                    <div className="d-flex flex-grow-1" >
                        <span className={`${styles.status_circle}`} style={{ backgroundColor: props.statusColor }}></span>
                        <p className='mb-0 align-baseline ms-3 font-14  font-500' > {props.statusTitle}</p>
                        <span className=' ms-2 ms-md-4 ms-lg-5 font-14 '> (1-1/1)</span>
                    </div>
                    <div>
                        <MdOutlineKeyboardArrowDown size={20} />
                    </div>
                </div>

            </div>
            <div class="card border-top-0 rounded-0">
                <div className="d-flex py-2 flex-wrap  align-items-center justify-content-between"
            style={{gap:10}}
                >
                    <div className="btn-light-blue">
                        T
                    </div>
                    <span>
                        V168495545544
                    </span>
                    <span>
                        115.186.190.156
                    </span>
                    <a className='text-primary text-decoration-none' href="">https://linke123here/chat/210402098</a>
                    <a className='text-blue text-decoration-none' href="" >https://dashboard.jataq.tv</a>
                    <span>
                        00:03:55
                    </span>
                    <div className='flex-shrink-0'>
                        <span className='me-2'>
                            4
                        </span>
                        <span className='me-2'>
                            0
                        </span>
                        <DiLinux size={20} className='me-2' />
                        <AiFillWindows color='#878787' size={20} className='me-2' />
                        <BsFillEyeSlashFill color='#5494F3' size={20} className='me-2' />
                        <MdDisabledVisible color='red' size={20} className='me-2' />
                        <img className='me-2' src={require('../../assets/Images/pak.png')} />
                    </div>
                </div>

            </div>
        </div>
    )

}