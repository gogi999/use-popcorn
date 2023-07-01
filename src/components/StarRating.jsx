import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Star from './Star';

const containerStyle = {
    display: 'flex',
    textAlign: 'center',
    gap: '16px',
};

const starContainerStyle = {
    display: 'flex',
    gap: '4px',
};

const StarRating = ({ maxRating = 5, color = '#fcc419', size = 48, defaultRating = 0, onSetRating }) => {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const handleRating = (rating) => setRating(rating);

    const textStyle = {
        lineHeight: '1',
        margin: '0',
        color,
        fontSize: `${size / 1.5}px`,
    }

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star 
                        key={i}  
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1} 
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}   
                        onHoverOut={() => setTempRating(0)} 
                        color={color}  
                        size={size}
                    />
                ))}
            </div>
            <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    );
}

StarRating.propTypes = {
    maxRating: PropTypes.number,
    defaultRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
}

export default StarRating;
