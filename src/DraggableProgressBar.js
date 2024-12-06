import React, { useState } from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from '@chakra-ui/react';

const DraggableProgressBar = ({ onChangeTxt, name, value, sliderTxt }) => {

  return (
    <>
      <Box width="100%" margin="0 auto" textAlign="center">
        <Slider
          aria-label="progress-slider"
          defaultValue={50}
          min={0}
          max={100}
          value={value}
          onChange={(value) => onChangeTxt(name, value)}
          height="20px"
        >
          <SliderTrack
            backgroundSize="cover"
            backgroundPosition="center"
            height="10px"
            bg={'#FE545641'}
          ><SliderFilledTrack bg="#FE5454" />
          </SliderTrack>
          <SliderThumb
            boxSize="25px"
            bg={'#FE5454'}
            border={'0'}
            _focus={{ boxShadow: 'none' }}
            _active={{ border: 'none' }}
          />
        </Slider>
        <Text my={'1rem'} fontSize={14} color={'black'} fontWeight={'normal'}>{sliderTxt}</Text>
      </Box>
    </>
  );
};

export default DraggableProgressBar;
