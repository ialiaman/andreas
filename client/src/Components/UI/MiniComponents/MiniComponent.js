import React,{useContext} from 'react'
import main from './main.module.css'
import { UserContext } from '../../../Pages/Dashboard/main'
import { GiHamburgerMenu } from 'react-icons/gi';
import {AuthContext} from '../../../App'
function RightShape() {
  return (

    <div className={` ${main.right_shape}  float-end`} style={{ position: 'absolute', right: 0, top: 50, padding: 0 }}>
      <div className={`${main.first_shape}`}>
      </div>
      <div className={`${main.second_shape}`}>
      </div>
      <div className={`${main.third_shape}`}>
      </div>
    </div>


  )
}
function LinksNav(props) {
  const { bgColor = 'red' } = props
  return (
    <div className="container-fluid px-0" style={{ backgroundColor: bgColor }}>
      <div className="container-lg ">
        <div className="row g-1">
          <nav class="navbar navbar-expand-md navbar-dark  " style={{ backgroundColor: bgColor }}>
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Comapny Logo</a>
              {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button> */}
              {/* <div class="collapse row navbar-collapse align-middle" id="navbarTogglerDemo02">     
                <div className="col-md-5  align-items-center text-center  " style={{flexGrow:1}}>
                  <ul class="navbar-nav mb-0  text-center align-items-center  d-flex justify-content-around me-auto mb-2 mb-lg-0">
                    <li class="nav-item ms-5">
                      <a class="nav-link active" aria-current="page" href="#">Link Example</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link ms-5" href="#">Link Example</a>
                    </li>
                    <li class="nav-item ms-5">
                      <a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Link Example</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4"></div>
              </div> */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
function SignUpNav(props) {
  const { bgColor = 'red' } = props
  return (
    <div className="container-fluid px-0" style={{ backgroundColor: bgColor }}>
      <div className="container-lg ">
        <div className="row g-1">
          <nav class="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: bgColor }}>
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Comapny Logo</a>
              {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button> */}
              {/* <div class="collapse  navbar-collapse w-100 align-middle" id="navbarTogglerDemo02">     
                <div className="col-md-8 w-100  align-items-center text-center  " style={{flexGrow:1}}>
                  <ul class="navbar-nav mb-0  text-center align-items-center  d-flex justify-content-around me-auto mb-2 mb-lg-0">
                    <li class="nav-item ms-md-5">
                      <a class="nav-link active" aria-current="page" href="#">Link Example</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link ms-md-5" href="#">Link Example</a>
                    </li>
                    <li class="nav-item ms-md-5">
                      <a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Link Example</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4"></div>
              </div> */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}


function DashboardHeader(props) {
  const {authState, setAuthState } = useContext(AuthContext);
console.log(authState.userData)
  return (
    <UserContext.Consumer>
      {
        (value) => {

          return (<div className="container-fluid  px-md-2 px-lg-5 py-3 bg-white">
            <div className="row">
              <div className="col col-md-11">
                <div className="  d-flex  justify-content-between">
                  <div className='d-flex align-items-center'>
                    <span className='me-3' onClick={value}  > <GiHamburgerMenu size={25} /> {props.title} </span>
                    <img className='align-middle me-2' src={require('../../../assets/Images/DashboardIcon.png')} />
                    <span className='align-middle fw-bold'></span>
                  </div>
                  <div>
                    <img className='align-middle me-2' src={require('../../../assets/Images/notify.png')} />
                    <span>
                    {   
                    `${authState.LoggedUserData.f_name} ${authState.LoggedUserData.l_name}` }
                    </span>
                    <img className='align-middle m-2' src={require('../../../assets/Images/dashboardimg.png')} />
                  </div>
                </div>
              </div>
            </div>
          </div>)
        }
      }

    </UserContext.Consumer>

  )
}

const DashboardRightContainer = (props) => {
  return (
    <div className="container-fluid  px-1 px-md-2 ps-lg-4 pe-lg-5 bg-grey">
      {props.children}
    </div>
  )
}

export { RightShape, LinksNav, SignUpNav, DashboardHeader,DashboardRightContainer } 