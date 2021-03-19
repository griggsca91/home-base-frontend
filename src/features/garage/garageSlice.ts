import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import dayjs from "dayjs"

enum DoorState {
    Opened = "Opened",
    Closed = "Closed",
    Unknown = "Unknown"
}

interface SensorState {
    lastUpdated?: number
    error?: string
}

interface GarageState {
  doorState: DoorState;
  sensorState: SensorState;
}

const initialState: GarageState = {
    doorState: DoorState.Unknown,
    sensorState: {}
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
      doorOpen: state => {
        state.doorState = DoorState.Opened
        state.sensorState.lastUpdated = Date.now()
      },
      doorClose: state => {
        state.doorState = DoorState.Closed
        state.sensorState.lastUpdated = Date.now()
      }
  },
});

export const { doorOpen, doorClose } = garageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDoorState = (state: RootState) => {
    return state.garage.doorState.toString();
}

export const selectLastUpdated = (state: RootState) => {
    const lastUpdated = state.garage.sensorState.lastUpdated
    if (lastUpdated) {
        const d = dayjs(lastUpdated)
        return d.format("MMM D, YYYY h:mm:ss A")
    }
    return "Unknown"
}


export default garageSlice.reducer;
