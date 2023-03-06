import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
function UploadedList({ update, text, url }) {
    let [videoList, updateVideoList] = useState([])
    async function getListOfVideos() {
        try {
            let response = await fetch(url, {
                method: "POST"
            })
            let result = await response.json()
            console.log(result);
            updateVideoList(result.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getListOfVideos()
    }, [update])
    async function deteteFile(id) {
        try {
            let response = await fetch("/deletefile", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            let result = await response.json()
            console.log(result.data);
            window.alert(result.data)
            getListOfVideos()
        } catch (error) {
            console.log(error);
        }
    }
    async function generateReport(id) {
        try {
            fetch("/generatereport", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            window.alert("We have send the request for generating the Report")
            getListOfVideos()
        } catch (error) {
            console.log(error);
        }
    }
    async function generateAudioReport(id) {
        try {
            fetch("/generateaudioreport", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            window.alert("We have send the request for generating the Report")
            getListOfVideos()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='UploadedFilesList'>
            <h1>{text}</h1>
            {
                !!videoList && videoList.length > 0 ? (
                    <>
                        {
                            videoList.map((value, index) => {
                                return (
                                    <div key={index} className="UploadedFile">
                                        <div className="description">
                                            <h3><i className="fas fa-video"></i> {value[1]}</h3>
                                            <p>Uploaded At: {value[4]}</p>
                                            <button disabled="disabled" style={{ padding: "2px 10px", background: "black", color: "white" }}>{value[8]}</button>
                                        </div>
                                        <div className="options">
                                            {
                                                value[3] == "Working" ? (
                                                    <>
                                                        <button className="waitingButton">
                                                            Generating Reports
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="deleteButton" onClick={() => deteteFile(value[0])}>
                                                            Delete File
                                                        </button>
                                                        {
                                                            value[3] === "No" ? (
                                                                <>
                                                                    {
                                                                        value[8] === 'audio' ? (
                                                                            <>
                                                                                <button className="generateButton" onClick={() => generateAudioReport(value[0])}>
                                                                                    Generate Report
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            <>

                                                                                <button className="generateButton" onClick={() => generateReport(value[0])}>
                                                                                    Generate Report
                                                                                </button>
                                                                            </>
                                                                        )
                                                                    }

                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button className="viewReport">
                                                                        {
                                                                            value[8] === 'audio' ? (
                                                                                <>
                                                                                    <NavLink to={`/audioreport/${value[0]}`}> View Report</NavLink>

                                                                                </>
                                                                            ) : (
                                                                                <>

                                                                                    <NavLink to={`/report/${value[0]}`}> View Report</NavLink>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </button>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <>
                        <div className="MessageContainer">
                            <h1>You have Not uploaded any videos</h1>
                            <p>Follow above instructions to upload video</p>
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default UploadedList