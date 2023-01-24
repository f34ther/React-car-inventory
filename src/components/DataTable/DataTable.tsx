import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../custom-hooks';
import { server_calls } from '../API';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { CarForm } from '../CarForm';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'car_make', headerName: 'Car Make', flex: 1 },
    { field: 'car_color', headerName: 'Car Color', flex: 1 },
    { field: 'car_model', headerName: 'Car Model', flex: 1 },
    { field: 'total_cost', headerName: 'Total Cost', flex: 1 },
    // match to elesql

];

interface gridData {
    data: {
        id?: string
    }
}

export const DataTable = () => {

    let { contactData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({ data: {} });
    const [selectionModel, setSelectionModel] = useState<any>([]);


    let handleOpen = () => {
        setOpen(true)
    };
    let handleClose = () => {
        setOpen(false)
    };

    let deleteData = () => {
        server_calls.delete(selectionModel);
        getData();
        setTimeout(() => { window.location.reload(); }, 1000)
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>Car Inventory</h2>

            <DataGrid rows={contactData} columns={columns} pageSize={5} checkboxSelection={true}
                onSelectionModelChange={(item) => {
                    setSelectionModel(item)
                }}
            />

            <Button onClick={handleOpen}>Downdate</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Leftdate Car {selectionModel}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Rightdate Car</DialogContentText>
                    <CarForm id={selectionModel!} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Ne'r Mind</Button>
                    <Button onClick={handleClose} color="primary">Done</Button>
                </DialogActions>
            </Dialog>

        </div>
    )

}