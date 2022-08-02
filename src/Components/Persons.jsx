import React from 'react';

const Persons = (props) => {
    const { persons, filter, handleDelete } = props;
    const filteredPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase())
    })

    return (
        <div>
            <ul>{
                filteredPersons ?
                    filteredPersons.map(person =>{
                        return(
                        <li key={person.name}>
                            <div>
                                {person.name} {person.telephone}
                                <button value={person._id} onClick={handleDelete}>delete</button>
                            </div>
                        </li>
                        )
                    }
                    )
                    : persons.map(person =>{
                        return(
                        <li key={person.name}>
                            <div>
                                {person.name} {person.telephone}
                                <button value={person._id} onClick={handleDelete}>delete</button>
                            </div>
                        </li>
                        )
                    }
                    )
            }</ul>
        </div>
    );
};

export default Persons;