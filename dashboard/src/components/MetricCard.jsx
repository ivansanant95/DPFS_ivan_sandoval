import React from 'react';

function MetricCard({ title, value }) {
    return (
        <div className="metric-card">
            <h3>{title}</h3>
            <div className="value">{value !== undefined ? value : '--'}</div>
        </div>
    );
}

export default MetricCard;
