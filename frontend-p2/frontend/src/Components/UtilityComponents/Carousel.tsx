import React from 'react';
import { Box } from '@mui/material';

// Array containing image paths for carousel items
const carouselItems = [
  '/images/baseball.jpg',
  '/images/basketball.jpg',
  '/images/soccer.jpg',
  '/images/hockey.jpg',
  '/images/football.jpg'
];

const Carousel: React.FC = () => {
  return (
    <Box 
      className="carousel-container" // Container for the entire carousel
      sx={{ 
        height: '100%', 
        width: '100%',
      }}
    >
      <div className="carousel-slider"> {/* Slider wrapper for all slides */}
        {carouselItems.map((item, index) => (
          <div key={index} className="carousel-slide"> {/* Individual slide */}
            <img src={item} alt={`carousel-item-${index}`} /> {/* Image for each slide */}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Carousel;
