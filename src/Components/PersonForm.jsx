import React from 'react';

const PersonForm = (props) => {
    const { addContact, handleNameChange, handleNumberChange, newName, newNumber } = props;
    return (
        <div>
            <form onSubmit={addContact}>
                <div>
                    Name: <input type="text" value={newName} onChange={handleNameChange} required />
                </div>
                <div>
                    <div>
                        Number: <input type="text" value={newNumber} onChange={handleNumberChange} required />
                        <small>xxx-xxx-xxxx</small>
                    </div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;