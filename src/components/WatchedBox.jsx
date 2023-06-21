import React, { useState } from 'react';

import { tempWatchedData } from '../tempData';
import WatchedMoviesList from './WatchedMoviesList';
import WatchedSummary from './WatchedSummary';

const WatchedBox = () => {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
            <button 
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}    
            >
                {isOpen2 ? "-" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </>
            )}
        </div>
    );
}

export default WatchedBox;
