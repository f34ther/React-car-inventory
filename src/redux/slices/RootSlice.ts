import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        car_make: 'Car Make',
        car_color: 'Car Color',
        car_model: 'Car Model',
        total_cost: 'Total Cost',
    },
    reducers: {
        chooseCar_make: (state, action) => { state.car_make = action.payload },
        chooseCar_color: (state, action) => { state.car_color = action.payload },
        chooseCar_model: (state, action) => { state.car_color = action.payload },
        chooseTotal_cost: (state, action) => { state.total_cost = action.payload },
    }
});

export const reducer = rootSlice.reducer;
export const { chooseCar_make, chooseCar_color, chooseCar_model, chooseTotal_cost } = rootSlice.actions;