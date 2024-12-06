import React, { useState } from 'react';
import { Switch, FormControl, FormLabel, Text } from '@chakra-ui/react';

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="toggle-button" mb="0">
          {isChecked ? 'Enabled' : 'Disabled'}
        </FormLabel>
        <Switch
          id="toggle-button"
          isChecked={isChecked}
          onChange={handleToggle}
          colorScheme="teal"  // Optional: Color scheme for the switch
        />
      </FormControl>

      {/* Display the toggle state */}
      <Text mt={4}>Toggle is {isChecked ? 'ON' : 'OFF'}</Text>
    </div>
  );
};

export default ToggleButton;