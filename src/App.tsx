import React from 'react';
import logo from './logo.svg';
import { Garage } from './features/garage/Garage';
import { Tiles } from '@rebass/layout'
import { Box, Flex } from 'rebass'


function App() {
  return (
    <Flex flexWrap='wrap'>
    <Box>
      <Tiles columns={[2, null, 4]}>
        <Garage />
        <Garage />
        <Garage />
        <Garage />
        <Garage />
        <Garage />

      </Tiles>

    </Box>
    </Flex>
  );
}

export default App;
