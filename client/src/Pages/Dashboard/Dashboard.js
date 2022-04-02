import React, { useState,Fragment,useContext, useEffect } from 'react'
import styles from './styles.module.css'
import { AiOutlineCalendar,AiOutlineClose } from 'react-icons/ai';
import { BiStats } from 'react-icons/bi';
import LiveVisitorsChart from '../../Components/UI/Charts/LiveVisitors/LiveVisitors'
import VisitorsChart from '../../Components/UI/Charts/Visitors/Visitors'
import PageViewsChart from '../../Components/UI/Charts/PageView/PageView'
import ChatChart from '../../Components/UI/Charts/Chat/ChatChart'
import {DashboardHeader} from '../../Components/UI/MiniComponents/MiniComponent'
import {AuthContext} from '../../App'
function Content() {

  const {authState, setAuthState } = useContext(AuthContext);
  return (
    <Fragment>
       <DashboardHeader  title='Dashboard' />
      <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
        <div className="row  pb-2" >
          <div className="col-12 my-2  " >
            <div className="d-flex br-3 bg-primary align-items-center px-2 justify-content-between">
            <p className=' mb-0  text-white py-2'>Click here to resume the setup wizard.</p>
          <AiOutlineClose color='white' size={25}/>
            </div>
          </div>
          <div className="col-md-8">
            <div className={`${styles.live_now} p-3`}>
              <div className="d-flex justify-content-between">
                <h1 className='h4 fw-bold' >
                  Live now
                </h1>
                <button className={` px-2 ${styles.live_now_btn}`}>
                  <span> <AiOutlineCalendar /> </span>
                  Live Now
                </button>
              </div>
              <LiveVisitorsChart/>
            </div>
            <div className={`${styles.live_now} mt-3 p-3`}>
              <div className="">
                <h1 className='h4 fw-bold' >
                  Chat History
                </h1>
                <table className={`table text-center ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col">Visitor ID</th>
                      <th scope="col">Agent</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                       <tr>
                    <td>
                      Visitor ID
                    </td>
                    <td>
                      <button className='px-3 py-0' style={{backgroundColor:'#3498DB',border:'none',borderRadius:4}}>
                        Ali A.
                      </button>
                    </td>
                    <td>
                    26/Feb 17:42
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Visitor ID
                    </td>
                    <td>
                      <button className='px-3 py-0' style={{backgroundColor:'#3498DB',border:'none',borderRadius:4}}>
                        Ali A.
                      </button>
                    </td>
                    <td>
                    26/Feb 17:42
                    </td>
                  </tr> <tr>
                    <td>
                      Visitor ID
                    </td>
                    <td>
                      <button className='px-3 py-0' style={{backgroundColor:'#3498DB',border:'none',borderRadius:4}}>
                        Ali A.
                      </button>
                    </td>
                    <td>
                    26/Feb 17:42
                    </td>
                  </tr> <tr>
                    <td>
                      Visitor ID
                    </td>
                    <td>
                      <button className='px-3 py-0' style={{backgroundColor:'#3498DB',border:'none',borderRadius:4}}>
                        Ali A.
                      </button>
                    </td>
                    <td>
                    26/Feb 17:42
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Visitor ID
                    </td>
                    <td>
                      <button className='px-3 py-0' style={{backgroundColor:'#3498DB',border:'none',borderRadius:4}}>
                        Ali A.
                      </button>
                    </td>
                    <td>
                    26/Feb 17:42
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Visitor ID
                    </td>
                    <td>
                      <button className='px-3 py-0' style={{backgroundColor:'#3498DB',border:'none',borderRadius:4}}>
                        Ali A.
                      </button>
                    </td>
                    <td>
                    26/Feb 17:42
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Visitor ID
                    </td>
                    <td>
                      <button className='px-3 py-0' style={{backgroundColor:'#3498DB',border:'none',borderRadius:4}}>
                        Ali A.
                      </button>
                    </td>
                    <td>
                    26/Feb 17:42
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
              <div className="d-flex justify-content-between">
              <h1 className='h4 fw-bold'>
                  Visitors
              </h1>
      
              <span> <span className='me-1' style={{fontWeight:500}}>128</span> <BiStats size={30}/></span>
              </div>
      
              <VisitorsChart/>
      
            </div>
            <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
            <div className="d-flex justify-content-between">
              <h1 className='h4 fw-bold'>
                  Page View
              </h1>
      
              <span> <span className='me-1' style={{fontWeight:500}}>140</span> <BiStats size={30}/></span>
              </div>
              <PageViewsChart/>
            </div>
            <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
            <div className="d-flex justify-content-between">
              <h1 className='h4 fw-bold'>
                  Chat
              </h1>
      
              <span> <span className='me-1' style={{fontWeight:500}}>110</span> <BiStats size={30}/></span>
              </div>
              <ChatChart/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default Content

