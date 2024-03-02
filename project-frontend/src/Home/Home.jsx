import React from 'react'
import './Home.css'

export default function Home() {
    let polls = [{pollId:123456789,name:"Poll Name",description:"ajfdkasdf", endTime:"10m"}]
    
    let mappedPoll = polls.map((poll)=>{
        return <Poll id={poll.pollId} name={poll.name} description={poll.description} endTime={poll.endTime} />
    })
    return (
    <div id='home-page-parent'>
        {mappedPoll}
    </div>
  )
}


function Poll({id, name, description, endTime}){
    return(
        <div className='individual-poll-parent'>
            <div className='poll-header'>
                <h1>{name}</h1>
                <p>Ends in: {endTime}</p>
            </div>
            <div className='poll-description'>{description}</div>
        </div>
    )
}