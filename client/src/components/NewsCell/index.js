import React from 'react';
import './style.css'

export default ({ idx, feed }) => (
    <div key={idx} className="cell" onClick={() => window.open(`${feed.url}`, '_blank')}>
        <div className="cell-index" >{`${idx + 1}.`}</div>
        <div>
            <div className="cell-title">{feed.title}</div>
            <div className="cell-link">{feed.url}</div>
            <div className="cell-desc">{`${feed.points} points by ${feed.author}`}</div>
        </div>
    </div>
)