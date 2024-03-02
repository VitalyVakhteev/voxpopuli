import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './PollPage.css';

function PollPage() {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const username = localStorage.getItem('currentUsername');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPollAndComments = async () => {
            try {
                const pollResponse = await axios.get(`${process.env.REACT_APP_API_URL}/polls/${id}`);
                setPoll(pollResponse.data);

                const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/polls/${id}/comments`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.log(error);
                setErrorMessage("Error loading poll or comments.");
            }
        };
        fetchPollAndComments();
    }, [id]);

    const vote = async (optionId) => {
        if (!username) {
            setErrorMessage("You must be logged in to vote.");
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/polls/options/${optionId}/vote?username=${username}`);
            // Refresh poll to update votes
            const pollResponse = await axios.get(`${process.env.REACT_APP_API_URL}/polls/${id}`);
            setPoll(pollResponse.data);
        } catch (error) {
            console.log(error);
            setErrorMessage("You have already voted in this poll.");
        }
    };

    const submitComment = async () => {
        if (!username || !newComment.trim()) {
            setErrorMessage("You must be logged in and comment cannot be empty.");
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/polls/${id}/comments`, {
                username,
                text: newComment
            });
            setNewComment('');
            // Refresh comments
            const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/polls/${id}/comments`);
            setComments(commentsResponse.data);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error submitting comment.");
        }
    };

    const hasVoted = poll?.options.some(option => option.votes.some(vote => vote.username === username));

    const hasEndTimePassed = (endTime) => {
        return new Date(endTime).getTime() < new Date().getTime();
    };

    if (!poll) return <div>Loading...</div>;

    return (
        <div style={{ paddingLeft: '20px' }}>
            <button onClick={() => navigate('/')} style={{ marginTop: '20px', marginRight: '20px', float: "right" }}>Back to Home</button>
            <h2>{poll.name}</h2>
            <p>{poll.description}</p>
            <p>Started on: {new Date(poll.startTime).toLocaleString() + " GMT"}</p>
            <p>Ends on: {new Date(poll.endTime).toLocaleString() + " GMT"}</p>
            <div>
                {poll.options.map(option => (
                    <div key={option.id}>
                        <p>{option.description} - Votes: {option.votes.length}</p>
                        <button
                            onClick={() => vote(option.id)}
                            disabled={hasVoted || hasEndTimePassed(poll.endTime)}
                            style={{
                                backgroundColor: hasEndTimePassed(poll.endTime) ? '#ccc' : '',
                                cursor: hasEndTimePassed(poll.endTime) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Vote
                        </button>
                    </div>
                ))}
            </div>
            <div className="comments-section">
                <h3>Comments</h3>
                {comments.map(comment => (
                    <div key={comment.id} style={{ marginBottom: '10px' }} className="comment">
                        <strong>{comment.username}: </strong>{comment.text}
                    </div>
                ))}
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..."></textarea>
                <button onClick={submitComment}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default PollPage;