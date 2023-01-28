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
    { field: 'make', headerName: 'Make', flex: 1 },
    { field: 'model', headerName: 'Model', flex: 1 },
    { field: 'vin', headerName: 'Vin', flex: 1 },
    { field: 'year', headerName: 'Year', flex: 1 },
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

            <Button onClick={handleOpen}>Updatedate</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Car {selectionModel}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update Car</DialogContentText>
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