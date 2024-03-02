import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

function AddPollModal({ isOpen, onClose, onSubmit, endDate, setEndDate }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState(['']);

    if (!isOpen) return null;

    const modalStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const modalContentStyle = {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 5,
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    };

    const inputStyle = {
        marginBottom: '10px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const addOptionInput = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = () => {
        onSubmit(name, description, endDate, options.filter(option => option.trim() !== ''));
        // Reset states if needed
    };

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <h2>Add a New Poll</h2>
                <input
                    type="text"
                    placeholder="Poll Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    placeholder="Poll Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{...inputStyle, height: '100px'}}
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e)}
                        style={inputStyle}
                    />
                ))}
                <button onClick={addOptionInput} style={{marginBottom: '10px'}}>Add Option</button>
                <DatePicker selected={endDate} onChange={setEndDate} style={inputStyle} />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={handleSubmit} style={{display: 'inline-block'}}>Submit</button>
                    <button onClick={onClose} style={{display: 'inline-block'}}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddPollModal;
