import React from 'react';

function StatusesList({ statuses }) {
    return (
        <div>
            <h2>Status Updates</h2>
            <ul>
                {statuses.map((status, index) => (
                    <li key={index}>{status.text} - {status.user}</li>
                ))}
            </ul>
        </div>
    );
}

export default StatusesList;
