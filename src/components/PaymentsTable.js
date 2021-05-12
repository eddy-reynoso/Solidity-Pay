import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Switch } from "@material-ui/core";

const getColumns = (toggleBeneficiary) => {
    return [
        { field: "id", headerName: "ID", width: 70 },
        { field: "to", headerName: "To", width: 400 },
        { field: "amount", headerName: "Amount", width: 200 },
        { field: "nextDay", headerName: "Date", width: 200 },
        { field: "interval", headerName: "Interval", width: 200 },
        {
            field: "active",
            headerName: "Enabled",
            width: 200,
            renderCell: (params) => {
                return (
                    <Switch
                        checked={params.row.active}
                        onChange={() => toggleBeneficiary(params.row.id)}
                    />
                );
            },
        },
    ];
};

const PaymentsTable = (props) => {
    const { rows, toggleBeneficiary } = props;
    let columns = getColumns(toggleBeneficiary);
    return (
        <div style={{ height: 400, width: "80%", margin: "auto" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
        </div>
    );
};

export default PaymentsTable;
