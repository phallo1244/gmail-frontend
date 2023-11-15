import React, { useState, useEffect } from 'react'; 
import { apiUrl, tokenKey, mailUrl } from "../utils";
import axios from 'axios';
import Swal from "sweetalert2";

const Compose = () => { 
    const [alias, setAlias] = useState(''); 
    const [usermail, setUsermail] = useState(''); 

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {

        let useralias = sessionStorage.getItem("Alias");
        let userem = sessionStorage.getItem("Email");
        
        setAlias(useralias);
        setUsermail(userem);

    };

    const signOut = async () => {
        //const res = await apiCall.get(`/branches`);
        //setTblData({ tblDataArray: res.data });
        var api = `${apiUrl}/signout`;
        axios
        .post(api,"", {
            headers: {Authorization: `Bearer ${tokenKey}`},
        })
        .then((response) => {
            if(response.data.message === "User successfully logged out"){
                sessionStorage.clear();
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const goToInbox = async () => {
        window.location.href = "/dashboard";
    }

    const goToSent = async () => {
        window.location.href = "/sent";
    }

    const handleSubmit = () => {
    
        console.log(frmData);
        let userem = sessionStorage.getItem("Email");
        setFrmData({ ...frmData, sender: userem })

        var api = `${mailUrl}/send`;
        var requestMethod = 'post';
        
        axios({
            method: requestMethod,
            url: api,
            data: frmData,
            config: { headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${tokenKey}` }}
        })
        .then((response) => {
            //handle success
            console.log(response)
            if (response.data.error === "Failed"){
            Swal.fire({
                //position: 'top-end',
                position: "center",
                icon: "warning",
                title: "Incorrect login details",
                showConfirmButton: false,
                timer: 2500,
            });
            }else{
                Swal.fire({
                    //position: 'top-end',
                    position: "center",
                    icon: "success",
                    title: "Mail Sent Successfully",
                    showConfirmButton: false,
                    timer: 2500,
                });
            }	
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const [frmData, setFrmData] = useState({
        receiver: "",
        subject: "",
        content: "",
        sender: usermail,
    });

    return ( 
        <div className='container'> 
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <p className="navbar-brand">Gmail</p>
                    <form className="d-flex">
                    <p style={{marginTop: 7}}>Welcome: {alias}&nbsp;&nbsp;</p>
                    <button className="btn btn-outline-info" type="button" onClick={()=>signOut()}>Logout</button>
                    </form>
                </div>
            </nav>
            <div className='row'>
                <div className='col-lg-2 mt-4'>
                    <button
                    className="btn btn-info form-control"
                    type="button"
                    >
                    Compose Mail
                    </button>
                    <button
                    className="btn btn-outline-info form-control"
                    type="button"
                    onClick={()=>goToInbox()}
                    >
                    Received Mail
                    </button>
                    <button
                    className="btn btn-outline-info form-control"
                    type="button"
                    onClick={()=>goToSent()}
                    >
                    Sent Mail
                    </button>
                </div>
                <div className='col-lg-10'>
                    <div className='row'>
                        <div className='col-lg-10 mt-4'>
                          
                        </div>
                        <div className='col-lg-2 mt-4'>
                            <p>Composing Mail</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <form className="signup-form" method="post">
                                <input
                                className="form-control"
                                style={{ marginBottom: "10px" }}
                                type="text"
                                placeholder="Recepient"
                                name="txtReceiver"
                                value={frmData.receiver}
                                onChange={(e) =>
                                    setFrmData({ ...frmData, receiver: e.target.value })
                                }
                                />
                                <input
                                className="form-control"
                                style={{ marginBottom: "10px" }}
                                type="text"
                                placeholder="Subject"
                                name="txtSubject"
                                value={frmData.subject}
                                onChange={(e) =>
                                    setFrmData({ ...frmData, subject: e.target.value })
                                }
                                />
                                <textarea
                                className="form-control"
                                style={{ marginBottom: "10px" }}
                                type="text"
                                rows={7}
                                placeholder="Email Content"
                                name="txtMail"
                                value={frmData.content}
                                onChange={(e) =>
                                    setFrmData({ ...frmData, content: e.target.value })
                                }
                                />
                                <button
                                className="btn btn-outline-info form-control"
                                value="submit"
                                type="button"
                                onClick={(e) => handleSubmit()}
                                >
                                Send Mail
                                </button>
                            </form>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
            </div>
        </div> 
    ); 
} 
export default Compose;