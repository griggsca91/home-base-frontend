import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  doorClose,
  doorOpen,
  selectDoorState,
  selectLastUpdated
} from './garageSlice';
import styles from './Garage.module.css';
import { Box, Card, Text } from 'rebass'

export function Garage() {
  const doorState = useSelector(selectDoorState);
  const lastUpdated = useSelector(selectLastUpdated)
  const dispatch = useDispatch();

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


        <button
          className={styles.button}
          aria-label="Open Door"
          onClick={() => dispatch(doorOpen())}
        >
          +
          </button>
        <span className={styles.value}>{doorState}</span>
        <button
          className={styles.button}
          aria-label="Close Door"
          onClick={() => dispatch(doorClose())}
        >
          -
          </button>
      </Card>
    </Box>
  );
}
