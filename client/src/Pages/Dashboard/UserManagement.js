import React, { useEffect, useState } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./styles.module.css";
import { Fragment } from "react";
import axios from "axios";
const UserEditModal = (props) => {
  const [loading, setLoading] = useState(false);
  // UPDATE DATA
  const updateUser = () => {
    setLoading(true);
    axios
      .post(`http://localhost:3001/updateuser`, {
        id: props.id,
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        props.loadingHandler();
      });
  };
  // UPDATE DATA END
  const modalStyle = {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    display: props.open == false ? "none" : "block",
  };
  const modalContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const modalCardStyle = {
    width: "400px",
  };
  return (
    <div style={modalStyle}>
      <div className="container" style={modalContainerStyle}>
        <div className="card" style={modalCardStyle}>
          <div className="card-body">
            <div>
              <h4>Edit User {props.firstname}</h4>
            </div>
            <hr />
            <form>
              <div class="form-group">
                <label for="formGroupExampleInput">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Example input"
                  value={props.firstname}
                  onChange={(e) => {
                    props.changeFirstName(e.target.value);
                  }}
                />
              </div>
              <br />
              <div class="form-group">
                <label for="formGroupExampleInput">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Example input"
                  value={props.lastname}
                  onChange={(e) => {
                    props.changeLastName(e.target.value);
                  }}
                />
              </div>
              <br />
              <div class="form-group">
                <label for="formGroupExampleInput">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Example input"
                  value={props.email}
                  onChange={(e) => {
                    props.changeEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <br />
                <button
                  className="btn btn-outline-danger"
                  style={{ marginRight: 10 }}
                  onClick={(event) => {
                    event.preventDefault();
                    props.closeModal(false);
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-outline-success"
                  disabled={loading == true ? true : false}
                  onClick={(event) => {
                    event.preventDefault();
                    updateUser();
                  }}
                >
                  {loading == true ? "Please wait..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const UserManagement = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("all");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const closeModal = (e) => {
    // e.preventDefault();
    setOpen(!open);
  };
  const loadHandler = () => {
    setLoading(!loading);
  };
  const changeFirstName = (e) => {
    setFirstName(e);
  };

  const changeLastName = (e) => {
    setLastName(e);
  };

  const changeEmail = (e) => {
    setEmail(e);
  };

  const deleteUser = (id) => {
    axios
      .post(`http://localhost:3001/deleteuser`, {
        user_id: id,
      })
      .then((response) => {
        setLoading(true);
      });
  };
  useEffect(() => {
    axios
      .post(`http://localhost:3001/userslist`, {
        role: role,
      })
      .then((response) => {
        setUsersList((usersList) => [...response.data]);
        console.log(response.data);
        setLoading(false);
      });
  }, [loading, role]);
  return (
    <Fragment>
      <DashboardHeader />
      <UserEditModal
        open={open}
        closeModal={closeModal}
        firstname={firstName}
        lastname={lastName}
        email={email}
        changeFirstName={changeFirstName}
        changeLastName={changeLastName}
        changeEmail={changeEmail}
        id={userId}
        loadingHandler={loadHandler}
      />
      <div className="container-fluid  px-1 px-md-2 ps-lg-4 pe-lg-5 ">
        <div className="row px-1  py-2">
          <div className="col-12 col-xl-11">
            <div className="container-fluid mx-3">
              <div className="row d-flex flex-wrap align-items-center my-3">
                <div
                  className="col-md-6 d-flex flex-wrap align-items-center"
                  style={{ gap: 40 }}
                >
                  <div
                    className="d-flex  align-items-center"
                    style={{ gap: 15 }}
                  >
                    <button
                      className={
                        role == "all"
                          ? "btn-light-blue"
                          : "btn btn-outline-primary"
                      }
                      onClick={() => {
                        setRole("all");
                      }}
                    >
                      All
                    </button>
                    <button
                      className={
                        role == "agent"
                          ? "btn-light-blue"
                          : "btn btn-outline-primary"
                      }
                      onClick={() => {
                        setRole("agent");
                      }}
                    >
                      Agents
                    </button>
                    <button
                      className={
                        role == "client"
                          ? "btn-light-blue"
                          : "btn btn-outline-primary"
                      }
                      onClick={() => {
                        setRole("client");
                      }}
                    >
                      Customer
                    </button>
                    <input
                      style={{ height: 33 }}
                      type="search"
                      className="form-control   rounded"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                    />
                    <span
                      style={{ height: 33 }}
                      className="input-group-text px-4  bgMountainMeadow  border-0"
                      id="search-addon"
                    >
                      <i className="fas text-white fa-search"></i>
                    </span>
                  </div>
                  {/* <div className="d-flex mx-auto flex-wrap" style={{ gap: 40 }} >
                                        <div className='d-flex flex-wrap align-items-center' style={{ gap: 8 }}>
                                            <img className='messaging-tick-img' src={require('../../assets/Images/selects.png')} />
                                            <span className='text-grey'>
                                                Chats
                                            </span>
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center' style={{ gap: 8 }}>
                                            <img className='messaging-tick-img' src={require('../../assets/Images/selects.png')} />
                                            <span className='text-grey'>
                                                Tickets
                                            </span>
                                        </div>
                                    </div> */}
                </div>
                <div
                  className="col-md-5 d-flex flex-grow-1 justify-content-end align-items-center"
                  style={{ gap: 15 }}
                >
                  <span className="text-grey me-2">
                    Sort by
                    <MdKeyboardArrowDown className="ms-1" />
                  </span>

                  <button className="btn-white    font-12 ">
                    {" "}
                    <img
                      className="mx-2"
                      src={require("../../assets/Images/filter.png")}
                      alt=""
                    />{" "}
                    Filter Visitors
                  </button>
                </div>
              </div>
              <div className={`row `}>
                <div className="col-12 table-responsive-lg">
                  <table
                    className={`${styles.messageingTable} table `}
                    style={{ maxWidth: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <span className=" badge badge-curious-bold">ID</span>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Company Name</th>
                        <th>Membership</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading == true
                        ? "Loading"
                        : usersList.map((element) => {
                            return (
                              <tr key={element.id}>
                                <td>
                                  <span className="badge badge-curious-bold">
                                    {element.id}
                                  </span>
                                </td>
                                <td>{element.f_name + " " + element.l_name}</td>
                                <td>{element.email}</td>
                                <td>{element.account_type}</td>
                                <td>
                                  {/* <span className="badge badge-grey-light-bold ">
                                'Ahad Aman'
                              </span> */}
                                  {element.account_type == "agent"
                                    ? "AGENT"
                                    : element.c_name}
                                </td>
                                <td>
                                  {/* {chat.is_end ? (
                            <span className="badge badge-grey-light-bold ">
                              Closed
                            </span>
                          ) : (
                            <span className="badge badge-grey-light-bold ">
                              open
                            </span>
                          )} */}
                                  <span className="badge badge-grey-light-bold ">
                                    open
                                  </span>
                                </td>
                                <td
                                  onClick={() => {
                                    setOpen(!open);
                                    setFirstName(element.f_name);
                                    setLastName(element.l_name);
                                    setEmail(element.email);
                                    setUserId(element.id);
                                  }}
                                >
                                  {/* <input type="checkbox" /> */}
                                  Edit
                                </td>
                                <td
                                  onClick={() => {
                                    deleteUser(element.id);
                                  }}
                                >
                                  Delete
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
      </div>
    </Fragment>
  );
};

export default UserManagement;
