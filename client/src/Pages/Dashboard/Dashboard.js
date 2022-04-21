import React, { useState, Fragment, useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import { BiStats } from "react-icons/bi";
import LiveVisitorsChart from "../../Components/UI/Charts/LiveVisitors/LiveVisitors";
import VisitorsChart from "../../Components/UI/Charts/Visitors/Visitors";
import PageViewsChart from "../../Components/UI/Charts/PageView/PageView";
import ChatChart from "../../Components/UI/Charts/Chat/ChatChart";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import { AuthContext } from "../../App";
import editIcon from "../../assets/Images/edit_icon.png";
import cancelIcon from "../../assets/Images/cancel.png";
import axios from "axios";

const AgentDashboard = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  return (
    <Fragment>
      <DashboardHeader title="Dashboard" />
      <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
        <div className="row  pb-2">
          <div className="col-12 my-2  ">
            <div className="d-flex br-3 bg-primary align-items-center px-2 justify-content-between">
              <p className=" mb-0  text-white py-2">
                Click here to resume the setup wizard.
              </p>
              <AiOutlineClose color="white" size={25} />
            </div>
          </div>
          <div className="col-md-8">
            <div className={`${styles.live_now} p-3`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Live now</h1>
                <button className={` px-2 ${styles.live_now_btn}`}>
                  <span>
                    {" "}
                    <AiOutlineCalendar />{" "}
                  </span>
                  Live Now
                </button>
              </div>
              <LiveVisitorsChart />
            </div>
            <div className={`${styles.live_now} mt-3 p-3`}>
              <div className="">
                <h1 className="h4 fw-bold">Chat History</h1>
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
                      <td>Visitor ID</td>
                      <td>
                        <button
                          className="px-3 py-0"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            borderRadius: 4,
                          }}
                        >
                          Ali A.
                        </button>
                      </td>
                      <td>26/Feb 17:42</td>
                    </tr>
                    <tr>
                      <td>Visitor ID</td>
                      <td>
                        <button
                          className="px-3 py-0"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            borderRadius: 4,
                          }}
                        >
                          Ali A.
                        </button>
                      </td>
                      <td>26/Feb 17:42</td>
                    </tr>{" "}
                    <tr>
                      <td>Visitor ID</td>
                      <td>
                        <button
                          className="px-3 py-0"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            borderRadius: 4,
                          }}
                        >
                          Ali A.
                        </button>
                      </td>
                      <td>26/Feb 17:42</td>
                    </tr>{" "}
                    <tr>
                      <td>Visitor ID</td>
                      <td>
                        <button
                          className="px-3 py-0"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            borderRadius: 4,
                          }}
                        >
                          Ali A.
                        </button>
                      </td>
                      <td>26/Feb 17:42</td>
                    </tr>
                    <tr>
                      <td>Visitor ID</td>
                      <td>
                        <button
                          className="px-3 py-0"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            borderRadius: 4,
                          }}
                        >
                          Ali A.
                        </button>
                      </td>
                      <td>26/Feb 17:42</td>
                    </tr>
                    <tr>
                      <td>Visitor ID</td>
                      <td>
                        <button
                          className="px-3 py-0"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            borderRadius: 4,
                          }}
                        >
                          Ali A.
                        </button>
                      </td>
                      <td>26/Feb 17:42</td>
                    </tr>
                    <tr>
                      <td>Visitor ID</td>
                      <td>
                        <button
                          className="px-3 py-0"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            borderRadius: 4,
                          }}
                        >
                          Ali A.
                        </button>
                      </td>
                      <td>26/Feb 17:42</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Visitors</h1>

                <span>
                  {" "}
                  <span className="me-1" style={{ fontWeight: 500 }}>
                    128
                  </span>{" "}
                  <BiStats size={30} />
                </span>
              </div>

              <VisitorsChart />
            </div>
            <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Page View</h1>

                <span>
                  {" "}
                  <span className="me-1" style={{ fontWeight: 500 }}>
                    140
                  </span>{" "}
                  <BiStats size={30} />
                </span>
              </div>
              <PageViewsChart />
            </div>
            <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Chat</h1>

                <span>
                  {" "}
                  <span className="me-1" style={{ fontWeight: 500 }}>
                    110
                  </span>{" "}
                  <BiStats size={30} />
                </span>
              </div>
              <ChatChart />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const ClientDashboard = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  // GET ALL LEADS
  useEffect(() => {
    axios
      .post(`http://localhost:3001/getleads`, {
        c_name: authState.LoggedUserData.c_name,
      })
      .then((response) => {
        setLeads((leads) => [...leads, response]);
        setLeadsLoading(!leadsLoading);
        console.log(leads);
      });
  }, []);
  return (
    <Fragment>
      <DashboardHeader title="Dashboard" />
      <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
        <div className="row  pb-2">
          <div className="col-12 my-2  ">
            <div className="d-flex br-3 bg-danger align-items-center px-2 justify-content-between">
              <p className=" mb-0  text-white py-2 px-4">
                Trial Version: 45 leads remaining Buy PRO for limitless leads.
              </p>
              <AiOutlineClose color="white" size={25} />
            </div>
          </div>
          <div className="col-12 my-2">
            <div className="card">
              <div className="card-body">
                <div className="row px-4">
                  <div
                    className={`col-md-6 col-12 ${styles.clientCompanyNameContainer}`}
                  >
                    <h2>
                      <b>{authState.LoggedUserData.c_name}</b>
                    </h2>
                  </div>
                  <div
                    className={`col-md-6 col-12 ${styles.clientNameContainer}`}
                  >
                    <h2>
                      <b>
                        {authState.LoggedUserData.f_name +
                          " " +
                          authState.LoggedUserData.l_name}
                      </b>
                    </h2>
                    <p>CEO</p>
                  </div>
                </div>
                <div className="row px-4">
                  <div className="col-md-6 col-12">
                    <div className={`${styles.subAndLeadRow}`}>
                      <p>Subscription: Trial Version</p>
                      <p>Leads:15</p>
                    </div>
                    <p className={`${styles.clientSiteLink}`}>
                      <a
                        href={authState.LoggedUserData.company_url}
                        target="_blank"
                      >
                        {authState.LoggedUserData.company_url}
                      </a>
                    </p>
                  </div>
                  <div
                    className={`col-md-6 col-12 ${styles.clientCardButtonsContainer}`}
                  >
                    <button className="btn btn-primary">Upgrade</button>
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className={`${styles.live_now} p-3`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Live now</h1>
                <button className={` px-2 ${styles.live_now_btn}`}>
                  <span>
                    {" "}
                    <AiOutlineCalendar />{" "}
                  </span>
                  Live Now
                </button>
              </div>
              <LiveVisitorsChart />
            </div>
            <h1 className="h4 fw-bold px-4 pt-4">Chat History</h1>
            <div className={`${styles.live_now} mt-3 p-3`}>
              <div className="">
                <table className={`table text-center ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col badge badge-curious-bold">
                        <span className="badge badge-curious-bold">ID</span>
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Agent</th>
                      <th scope="col">Date</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsLoading === true
                      ? "Loading"
                      : leads[0].data.map((element) => {
                          return (
                            <tr className="pt-2">
                              <td>
                                <span className="badge badge-curious-bold">
                                  ID
                                </span>
                              </td>
                              <td>
                                <p className="px-3 py-0">{element.lead_name}</p>
                              </td>
                              <td>{element.lead_email}</td>
                              <td>{element.lead_phone}</td>
                              <td>{element.agent_name}</td>
                              <td>{element.date}</td>
                              <td>
                                <img src={editIcon} />
                              </td>
                              <td>
                                <img src={cancelIcon} />
                              </td>
                              <td>
                                <input type="checkbox" />
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function Content() {
  const { authState, setAuthState } = useContext(AuthContext);
  return authState.LoggedUserData.account_type == "client" ? (
    <ClientDashboard />
  ) : (
    <AgentDashboard />
  );
}
export default Content;
