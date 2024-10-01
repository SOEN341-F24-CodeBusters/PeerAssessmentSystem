import React, { useState } from 'react';


const AddMemberPopup = ({ onClose, onAddMember }) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');

    const handleAdd = () => {
        if (name.trim() && id.trim()) {
            onAddMember(name, id);
            setName('');
            setId('');
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>Add Member</h2>
                <input
                    type="text"
                    className="team-input"
                    placeholder="Enter Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className="team-input"
                    placeholder="Enter Student ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <div className="popup-buttons">
                    <button className="popup-btn green" onClick={handleAdd}>
                        Add Member
                    </button>
                    <button className="popup-btn gray" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberPopup;