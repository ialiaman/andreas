import React, { useContext, useState } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import { Fragment } from "react";
import styles from "./styles.module.css";
import Button from "../../Components/Buttons/Button";
import { AuthContext } from "../../App";
import axios from 'axios'
import SVGS from "../../helpers/svgs";
const SettingsButton = (props) => {
  return (
    <button
      className={`${styles.SettingsLeftNavButton}`}
      onClick={() => {
        props.changeHandler(props.value);
      }}
    >
      {props.value}
    </button>
  );
};
const LeftSideBar = ({ changeHandler }) => {
  return (
    <div className={`${styles.clientSetingsLeftSideContainer}`}>
      <SettingsButton value="Overview" changeHandler={changeHandler} />
      <div className={`accordion accordion-flush`} id="accordionFlushExample">
        <div className={`accordion-item  ${styles.settingsAccordions}`}>
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className={`accordion-button collapsed`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Channels
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              first item's accordion body.
            </div>
          </div>
        </div>
      </div>
      <div className={`accordion accordion-flush`} id="accordionFlushExample">
        <div className={`accordion-item  ${styles.settingsAccordions}`}>
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className={`accordion-button collapsed`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Settings
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              first item's accordion body.
            </div>
          </div>
        </div>
      </div>
      <div className={`accordion accordion-flush`} id="accordionThree">
        <div className={`accordion-item  ${styles.settingsAccordions}`}>
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className={`accordion-button collapsed`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Account
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionThree"
          >
            <div class="accordion-body">
              <button
                style={{ border: "none", background: "none" }}
                onClick={() => {
                  changeHandler("Subscription");
                }}
              >
                Subscriptions
              </button>{" "}
              <br />
              <button style={{ border: "none", background: "none" }}>
                Account Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Overview = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [editable, setEditable] = useState(0);

  const [isSucces, setSuccess] = useState(null);
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });

  }


  const submit = async () => {
    const formdata = new FormData();
    console.log(userInfo.file)
    formdata.append('avatar', userInfo.file);
    formdata.append('UID', authState.LoggedUserData.id)


    axios.post("http://localhost:3001/imageupload", formdata, {
      headers: { "Content-Type": "multipart/form-data" },



    })
      .then(res => { // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          setSuccess("Image upload successfully");
        }

      })
  }


  const UpdateHandler = () => {
    alert('sub')
    submit()
  }
  console.log(authState.LoggedUserData)
  return (
    <div>
      <h3>Account Details</h3>

      <div className="row">
        <div className="col-md-8 col-12">
          <div className="card">
            <div className="card-body">
              <b>
                <h5>Account Owner</h5>
              </b>
              <div className={`${styles.accountDetailsContainer}`}>
                <img

                  style={{ width: 50, height: 50 }}
                  className="rounded-circle align-middle m-2"
                  src={`http://localhost:3001/images/${authState.LoggedUserData.image}`}
                />
                <div>
                  <div>

                    {editable == 0 ? (
                      <span>
                        {authState.LoggedUserData.f_name +
                          " " +
                          authState.LoggedUserData.l_name}
                      </span>
                    ) : (
                      <>
                        <input value={authState.LoggedUserData.f_name} />
                        <input value={authState.LoggedUserData.l_name} />
                      </>
                    )}

                  </div>
                  {editable == 0 ? (
                    <span>({authState.LoggedUserData.email})</span>
                  ) : (
                    <input value={authState.LoggedUserData.email} />

                  )}
                  <div className="my-3" style={{ display: "flex" }}>
                    {editable == 1 ? (

                      <button onClick={() => UpdateHandler()} className='my-3 btn-primary' type="primary" > Save Changes</button>
                    ) : null}
                    {editable == 1 ? (
                      <Button title="Cancel" type="nobg" />
                    ) : null}
                  </div>
                </div>

              </div>
              {
                editable && <>
                  <div className="form-row">
                    <span className="font-weight-bold">Update Image</span>

                    <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                  </div>

                </>

              }
              <i
                className="fas float-end fa-pencil-alt"
                style={{ marginLeft: "10px" }}
                onClick={() => setEditable(!editable)}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-8 col-12">
          <div className="card">
            <div className="card-body">
              <b>
                <h5 className="mb-3">Billing Details</h5>
              </b>
              <Button
                type="primary"
                title="Add Billing Details"
              // click={clickEvent}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-8 col-12">
          <div className="card">
            <div className="card-body">
              <b>
                <h5 className="mb-3">Cancel Account</h5>
              </b>
              <p className="mb-2">
                You can cancel anytime and you won't be charged again. We don't
                offer refunds for unused time in the billing cycle.
                <br />
              </p>
              <a href="#" className="mt-4">
                Continue to the Cancel page
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-12">
          <br />
          <Button title="Save" type={`primary`} classes="mr-2" />
          <Button title="Cancel" type="nobg" classes="mx-2" />
        </div>
      </div>
    </div>
  );
};
const Subscriptions = () => {
  const price = {
    color: "#5CB85C",
    fontSize: "30px",
  };
  return (
    <div className="container">
      <h3>Subscriptions</h3>
      <p>Choose your plan</p>
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <h1>
                <b>Free Trial</b>
              </h1>
              <p>Best for learning and chatting with customers.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={price}>Free</span>
                <span>8 days</span>
              </div>
              <Button title="Subscribe Now" type="primaryFullWidth" />
              <br />
              <br />
              <p>Track up to 50 leads</p>
              <p>Unlimited chat history</p>
              <p>Customization</p>
              <p>Analytics</p>
            </div>
          </div>
          <br />
          <div className="card">
            <div className="card-body">
              <h1>
                <b>Addons</b>
              </h1>
              <p>Best for learning and chatting with customers.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={price}>10$</span>
                <span>Per lead</span>
              </div>
              <Button title="Add Now" type="primaryFullWidth" />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <h1>
                <b>Starter</b>
              </h1>
              <p>Full customization, targeting, and team management.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={price}>$16</span>
                <span>Monthly</span>
              </div>
              <Button title="Subscribe Now" type="primaryFullWidth" />
              <br />
              <br />
              <p>Track up to 200 Leads</p>
              <p>Unlimited chat history</p>
              <p>Customization</p>
              <p>Analytics</p>
              <p>Software engineer support</p>
              <p>Multiple website support</p>
              <p>LiveChat Dashboard</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <h1>
                <b>Business</b>
              </h1>
              <p>Key features, advanced reporting, and workflow automation.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={price}>$60</span>
                <span>Monthly</span>
              </div>
              <Button title="Subscribe Now" type="primaryFullWidth" />
              <br />
              <br />
              <p>Track up to 5000 Leads</p>
              <p>Unlimited chat history</p>
              <p>Customization</p>
              <p>Analytics</p>
              <p>Software engineer support</p>
              <p>Multiple website support</p>
              <p>LiveChat Dashboard</p>
              <p>White label chat widget</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className={`${styles.methods_title}`}>
            Payment Methods
          </div>
        </div>
        <div className="row">
          <div className="card p-4 align-items-center justify-content-center col-md-3">
          <img
                  className={`${styles.iconImg} col-4 `}
                  src={SVGS.PaymentIcon}
                />
            <p className="mb-0 mt-2">
              Pay With Master
            </p>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-6">
            <h3 className={`${styles.info_type}`}>Billing Info</h3>
            <form class="row g-3">
              <div class="col-md-12 payment_form">
                <label for="inputEmail4" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="inputEmail4" placeholder="none" />
              </div>
              <div class="col-md-12">
                <label for="inputPassword4" class="form-label">Billing Address</label>
                <input type="text" class="form-control" placeholder="none" id="inputPassword4" />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="col-md-6">
                <label for="inputZip" class="form-label">Zip Code</label>
                <input type="text" class="form-control" id="inputZip" />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="col-12">
                <label for="inputState" class="form-label">Country</label>
                <select id="inputState" class="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>

              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gridCheck" />
                  <label className={`form-check-label ${styles.tick_text}`} for="gridCheck">
                    Remember Billing Info
                  </label>
                </div>
              </div>
              <h3 className={`${styles.info_type} mt-4`}>
                Credit Card Info
              </h3>
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">Card Holder Name</label>
                <input type="text" class="form-control" id="inputEmail4" placeholder="none" />
              </div>
              <div class="col-md-12">
                <label for="inputEmail4" class="form-label">Card Number 14 Digits</label>
                <input type="text" class="form-control" id="inputEmail4" placeholder="none" />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">Exp Month</label>
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="col-md-6">
                <label for="inputZip" class="form-label">Exp Year</label>
                <input type="text" class="form-control" id="inputZip" />
              </div>
              <div class="col-12">
                <label for="inputPassword4" class="form-label">CVC Number</label>
                <input type="text" class="form-control" placeholder="none" id="inputPassword4" />
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gridCheck" />
                  <label  className={`form-check-label ${styles.tick_text}`} for="gridCheck">
                    Remember Card Info
                  </label>
                </div>
              </div>
              <div className="d-flex" style={{ gap: 10 }}>
                <button className={`${styles.payment_save_btn} py-2 px-3`}>
                  Save
                </button>
                <span>Cancel</span>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="card p-3">
              <h4 className={`${styles.info_type}`}>Summary Details</h4>
              <h5>Business Plan</h5>

              <div className="d-flex justify-content-between">
                <div>
                  <h3 className={`${styles.methods_title}`} >Starter pack</h3>
                  <p class="fw-lighter">Free Tial Ends Apr 12 2023.</p>
                </div>

                <span className="font-500"> $60/Mo</span>
              </div>
              <div className="payment-line my-3">
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h3>Monthly Total</h3>
                  <p class="fw-lighter">Get 15% off in annual subscribtion</p>
                </div>

                <span> $60</span>
              </div>
              <div className="payment-line my-3">
              </div>
              <div className="d-flex justify-content-between">
                  <h2 className={`${styles.big_text}`}>Total</h2>
                  <h2 className={`${styles.big_text}`}>$60</h2>
              </div>
              <div className={`${styles.subscribe_btn} my-2 p-3`}>
                Subscribe Now
              </div>
              <p className={`${styles.card_footer_text} px-2 mt-3 text-center`}>
              You will be chared for indivisual produtcs at the  end of the free trials , your subscription will continue until you cancel
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const RightSideBar = ({ currentPage }) => {
  return currentPage == "Overview" ? (
    // <Overview />
    <Payment />
  ) : currentPage == "Subscription" ? (
    <Subscriptions />
  ) : null;
};
function Setting() {
  const [currentPage, setCurrentPage] = useState("Overview");
  const changeHandler = (e) => {
    setCurrentPage(e);
  };
  return (
    <Fragment>
      <DashboardHeader title="Settings" />
      <br />
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-md-3 col-12">
            <LeftSideBar changeHandler={changeHandler} />
          </div>
          <div className="col-md-9 col-12">
            <RightSideBar currentPage={currentPage} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Setting;
