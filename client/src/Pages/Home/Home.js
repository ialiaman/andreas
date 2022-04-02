import React, { Fragment } from 'react'
import Navbar from '../../Components/UI/Header/Header'
import Constant from '../../assets/Constants/ui_constants'
import Hero from '../../Components/UI/Hero/Hero'
import main from './main.module.css'
import {RightShape} from '../../Components/UI/MiniComponents/MiniComponent'
import Footer from '../../Components/UI/Footer/Footer'


const Features = (props) => {
  return (
    <div className='d-flex'>
     <img src={require('../../assets/Images/icon.png')}  alt=""  style={{alignSelf:'baseline'}} />
      <div className='d-flex flex-column'>
        <p style={{ fontSize: 18, fontWeight: 600 }}>{props.title}</p>
        <p style={{ color: '#565962' }}>
          {props.detail}
        </p>

      </div>
    </div>
  )
}
const FeatureSection = (props) => {
  const { reverse = 'row' } = props
  return (
    <div className="row d-flex my-5" style={{ flexDirection: reverse }}>
      <div className="col-md-6 d-flex justify-content-center " >
        {reverse != 'row-reverse' ? <img className='img-fluid' src={props.img}/>
         : <img className='img-fluid' src={props.img}/>}
        {/* {reverse != 'row-reverse' ? <div className={`${main.backgroundBox} bg-primary`}>
          <div className={`${main.frontBox} `}>
          </div>
        </div> : <div className={`${main.blueBackground} bg-blue`}>
          <div className={`${main.white} `}>
          </div>
        </div>} */}

      </div>
      <div className={`col-md-6 d-flex flex-column justify-content-center  py-5 px-5 ${reverse}`}>
        <h1 className='.h2 fw-bold'>
          Get more visitors, get
          more sales.
        </h1>
        <p style={{ color: '#6A6D77' }}>
          We share common trends and strategies for improving your rental income and making sure you stay in high demand.
        </p>
        <a className='text-decoration-none' href="
        ">
          <p className='text-primary'>Start a free trail   <i className="fas ms-2 fa-arrow-right"></i></p>

        </a>
      </div>
    </div>
  )
}
function Home() {
  return (
    <Fragment>
      <div className={`${main.dashboard_header} bg-blue`}>
        <Navbar bgColor={Constant.colors.mirage} />
        <Hero />
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <Features title='Proactive chat' detail='A feature in which your operators start the conversation and give immediate assistance to your website users.' />
          </div>
          <div className="col-md-4">
            <Features title='Increasing Sales' detail='Live chat may assist improve customer experience, generate leads, and raise sales income.' />
          </div>
          <div className="col-md-4">
            <Features title='Track progress fast' detail={`This is a thorough tracking tool that gives you a better understanding of your website's visitors' activity.`} />
          </div>
        </div>
      </div>

      <div className="container-fluid pb-4" style={{ backgroundColor: '#E5E5E5' }}>
        <div className="container py-5" >
          <FeatureSection img={require('../../assets/Images/firstRow.png')} />
          <FeatureSection img={require('../../assets/Images/secondRow.png')}  reverse='row-reverse' />
          <FeatureSection img={require('../../assets/Images/thirdRow.png')} />
          
        </div>
        <div className="container text-center">
          <p className='h2' style={{ color: '#161C2D' }} >Pricing  Plans</p>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6 mb-md-0 mb-3">
              <div style={{ width: '100%', height: 300, backgroundColor: 'white' }}></div>
            </div>
            <div className="col-md-6">
              <div style={{ width: '100%', height: 300, backgroundColor: 'white' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pe-0 py-4" style={{ position: 'relative' }}>
        <div className="row me-0">
          <div className=" mx-auto text-center col-md-8">
            <h2 className='h2 text-blue'>
              Add Live Chat to Your Website Today
            </h2>
            <p className='text-blue'>
              Start chatting to convert more leads, close more deals, and provide better real-time support.
            </p>
            <span>
              <button className='btn-primary bg-primary px-3 py-2'>Get started</button>
            </span>
          </div>
          <RightShape/>
          {/* <div className={` ${main.right_shape}  float-end`} style={{ position: 'absolute', right: 0, top: 50,padding:0 }}>
            <div className={`${main.first_shape}`}>
            </div>
            <div className={`${main.second_shape}`}>
            </div>
            <div className={`${main.third_shape}`}>
            </div>
          </div> */}
        </div>
      </div>
      <Footer/>
    </Fragment>

  )
}

export default Home