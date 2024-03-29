
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const StoresDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.storeName}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.address}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.phoneNumber}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.openingHours}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.menu}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.seatingCapacity}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="storeName" header="Store Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="address" header="Address" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="phoneNumber" header="Phone Number" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="openingHours" header="Opening Hours" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="menu" header="Menu" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="seatingCapacity" header="Seating Capacity" body={pTemplate5} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default StoresDataTable;