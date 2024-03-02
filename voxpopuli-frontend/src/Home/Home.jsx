import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css'
import './PollModal.js'
import AddPollModal from "./PollModal";

function Poll(){
    const [polls, setPolls] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/polls`)
        .then(response => setPolls(response.data))
        .catch(error => console.log(error))
    }, []);

    const handleAddPoll = (name, description, endDate, options) => {
        if (name && description && options.length > 0) {
            const newPoll = {
                name,
                description,
                startTime: new Date().toISOString(),
                endTime: endDate.toISOString(),
                options: options.map(option => ({ description: option }))
            };

            axios.post(`${process.env.REACT_APP_API_URL}/polls`, newPoll)
                .then(response => {
                    console.log('Poll created successfully:', response.data);
                    setPolls(prevPolls => [...prevPolls, response.data]);
                    setIsModalOpen(false);
                })
                .catch(error => {
                    console.error("Error creating poll:", error);
                });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUsername');
        window.location.reload(); // Hacky solution to force a re-render
    };

    return(
        <div>
            <h2>Home</h2>
            <button onClick={handleLogout} style={{margin: '20px', fontSize: '16px', float: "right"}}>
                <FontAwesomeIcon icon={faSignOutAlt}/> Logout
            </button>
            <button onClick={() => setIsModalOpen(true)} style={{margin: '20px', fontSize: '16px', float: "right"}}>
                <FontAwesomeIcon icon={faPlus}/> Add Poll
            </button>
            <AddPollModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddPoll}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
                {polls.map(poll => (
                    <div key={poll.id} style={{border: '1px solid #ddd', padding: '20px'}}>
                        <h2>{poll.name}</h2>
                        <p>{poll.description}</p>
                        <p>Ends on: {new Date(poll.endTime).toLocaleString()  + " GMT"}</p>
                        <Link to={`/${poll.id}`}>View Poll</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Poll;