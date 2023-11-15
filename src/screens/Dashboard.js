import React, { useState, useEffect } from 'react'; 
import { apiUrl, tokenKey, mailUrl } from "../utils";
import axios from 'axios';

const Dashboard = () => { 
    const [alias, setAlias] = useState(''); 
    const [data, setData] = useState([]); 

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        let useralias = sessionStorage.getItem("Alias");
        let userem = sessionStorage.getItem("Email");

        var api = `${mailUrl}/inbox/${userem}`;
        axios
        .get(api,"", {
          headers: {Authorization: `Bearer ${tokenKey}`},
        })
        .then((response) => {
            console.log(response);
            if(response.data.length){
                setData(response.data);
            }
        })
        .catch((error) => {
          console.log(error);
        });
        
        setAlias(useralias);

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

    const goToSent = async () => {
        window.location.href = "/sent";
    }

    const goToCompose = async () => {
        window.location.href = "/compose";
    }

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
                    className="btn btn-outline-info form-control"
                    type="button"
                    onClick={()=>goToCompose()}
                    >
                    Compose Mail
                    </button>
                    <button
                    className="btn btn-info form-control"
                    type="button"
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
                            <p>Inbox({data.length})</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12 mt-4'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Sender</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Message</th>
                                        <th scope="col">Sent On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.map(emai => (
                                    <tr key={emai.id}>
                                        <td>{emai.sender}</td>
                                        <td>{emai.subject}</td>
                                        <td>{emai.content}</td>
                                        <td>{emai.created_at}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    ); 
} 
export default Dashboard;