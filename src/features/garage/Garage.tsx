import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  doorClose,
  doorOpen,
  selectDoorState,
  selectLastUpdated
} from './garageSlice';
import styles from './Garage.module.css';
import MoonLoader from 'react-spinners/MoonLoader'
import { Box, Card, Text, Heading } from 'rebass'

const GarageContainer: React.FC = ({ children }) => {
  return (
    <Box width={256}>
      <Card
        sx={{
          p: 1,
          borderRadius: 5,
          borderColor: 'grey',
          borderStyle: 'solid',
          borderWidth: 1
        }}>
        <Heading
          color='primary'>
          Garage Door
        </Heading>
        {children}

      </Card>

    </Box>
  )
}

export function Garage() {
  const doorState = useSelector(selectDoorState);
  const lastUpdated = useSelector(selectLastUpdated)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('lastUpdated', lastUpdated)
    if (lastUpdated && doorState) {
      setLoading(false)
    }
  }, [lastUpdated, doorState])

  if (loading) {
    return (
      <GarageContainer>
        <MoonLoader css={`
  display: block;
  margin: 0 auto;
`} color={"black"} />
      </GarageContainer>
    )
  }

  return (
    <GarageContainer>

      <Text
        fontWeight='bold'
        color='primary'>
        Last Updated: {lastUpdated}
      </Text>

      <Text
        fontWeight='bold'
        color='primary'>
        Door Status: {doorState}
      </Text>
    </GarageContainer>

  );
}
