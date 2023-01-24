import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseCar_make, chooseCar_color, chooseCar_model, chooseTotal_cost } from '../../redux/slices/RootSlice';
import { Input } from '../sharedComponents/sharedcomponents';
import { Button } from '@material-ui/core';
import { server_calls } from '../API';

interface CarFormProps {
    id?: string;
    data?: string;
}

interface CarState {
    car_make: string;
    car_color: string;
    car_model: string;
    total_cost: string;
}

export const CarForm = (props: CarFormProps) => {

    const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
    const store = useStore();
    const car_make = useSelector<CarState>(state => state.car_make);
    const { register, handleSubmit } = useForm({})
    // const [selectionModel, setSelectionModel] = useState<any>([]);


    const onSubmit = (data: any, event: any) => {
        console.log(props.id)
        if (props.id!) {
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout(() => { window.location.reload() }, 1000);
            event.target.reset();
        } else {
            dispatch(chooseCar_make(data.car_make));
            dispatch(chooseCar_color(data.car_color));
            dispatch(chooseCar_model(data.car_model));
            dispatch(chooseTotal_cost(data.total_cost));
            server_calls.create(store.getState());
            setTimeout(() => { window.location.reload() }, 1000)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="car_make">Car Make</label>
                    <Input {...register('car_make')} name="car_make" placeholder='Car Make' />
                </div>
                <div>
                    <label htmlFor="car_model">Car Model</label>
                    <Input {...register('car_model')} name="car_model" placeholder='Car Model' />
                </div>
                <div>
                    <label htmlFor="car_color">Car Color</label>
                    <Input {...register('car_color')} name="car_color" placeholder='Car color' />
                </div>
                <div>
                    <label htmlFor="total_cost">Total Cost</label>
                    <Input {...register('total_cost')} name="total_cost" placeholder='Total Cost' />
                </div>
                {/* <CarForm id={selectionModel!} /> */}

                {/* match to elesql */}
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
};