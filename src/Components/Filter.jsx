import React from 'react';

const Filter = (props) => {
    const { filter, handleFilterChange } = props;
    return (
        <div>
            <div>
                Filter show with<input type="text" value={filter} onChange={handleFilterChange} />
            </div>
        </div>
    );
};

export default Filter;