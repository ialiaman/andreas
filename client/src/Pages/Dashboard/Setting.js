import React, { useContext, useState } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import { Fragment } from "react";
import styles from "./styles.module.css";
import Button from "../../Components/Buttons/Button";
import { AuthContext } from "../../App";

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
  const clickEvent = () => {
    alert();
  };
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
                  className="align-middle m-2"
                  src={require("../../assets/Images/dashboardimg.png")}
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
                    <i
                      className="fas fa-pencil-alt"
                      style={{ marginLeft: "10px" }}
                      onClick={() => setEditable(!editable)}
                    ></i>
                  </div>
                  {editable == 0 ? (
                    <span>({authState.LoggedUserData.email})</span>
                  ) : (
                    <input value={authState.LoggedUserData.email} />
                  )}
                  <div style={{ display: "flex" }}>
                    {editable == 1 ? (
                      <Button title="Save changes" type="primary" />
                    ) : null}
                    {editable == 1 ? (
                      <Button title="Cancel" type="nobg" />
                    ) : null}
                  </div>
                </div>
              </div>
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
                click={clickEvent}
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
const RightSideBar = ({ currentPage }) => {
  return currentPage == "Overview" ? (
    <Overview />
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
