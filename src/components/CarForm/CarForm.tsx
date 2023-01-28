import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseMake, chooseVin, chooseModel, chooseYear } from '../../redux/slices/RootSlice';
import { Input } from '../sharedComponents/sharedcomponents';
import { Button } from '@material-ui/core';
import { server_calls } from '../API';

interface CarFormProps {
    id?: string;
    data?: string;
}

interface CarState {
    make: string;
    vin: string;
    model: string;
    year: string;
}

export const CarForm = (props: CarFormProps) => {

    const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
    const store = useStore();
    const make = useSelector<CarState>(state => state.make);
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
            dispatch(chooseMake(data.make));
            dispatch(chooseVin(data.vin));
            dispatch(chooseModel(data.model));
            dispatch(chooseYear(data.year));
            server_calls.create(store.getState());
            setTimeout(() => { window.location.reload() }, 1000)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Make</label>
                    <Input {...register('make')} name="make" placeholder='Car Make' />
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name="model" placeholder='Car Model' />
                </div>
                <div>
                    <label htmlFor="vin">Vin</label>
                    <Input {...register('vin')} name="vin" placeholder='Vin' />
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name="year" placeholder='year' />
                </div>
                {/* <CarForm id={selectionModel!} /> */}

                {/* match to elesql */}
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
};