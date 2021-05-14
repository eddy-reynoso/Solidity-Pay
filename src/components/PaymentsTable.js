import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Switch, Chip, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const getColumns = (toggleBeneficiary) => {
    return [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Payment Name", width: 180 },
        { field: "category", headerName: "Category", width: 180 },

        { field: "to", headerName: "To", width: 350 },
        { field: "amount", headerName: "Amount", width: 180 },
        {
            field: "nextDay",
            headerName: "Next Payment Date",
            width: 180,
            valueGetter: (params) => {
                return `${params.row.nextMonth}/${params.row.nextDay}/${params.row.nextYear}`;
            },
        },
        {
            field: "interval",
            headerName: "Interval",
            width: 180,
            valueGetter: (params) => {
                let interval = params.row.interval;
                switch (interval) {
                    case "86400": {
                        return "Daily";
                    }
                    case "604800": {
                        return "Weekly";
                    }
                    case "2592000": {
                        return "Monthly";
                    }
                    case "31536000": {
                        return "Yearly";
                    }
                    default: {
                        return "";
                    }
                }
            },
        },
        {
            field: "active",
            headerName: "Enabled",
            width: 180,
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

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
        backgroundColor: "rgb(245,246,248)",
        marginBottom: "20px",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const PaymentsTable = (props) => {
    const classes = useStyles();

    const { rows, toggleBeneficiary } = props;
    const [chipData, setChipData] = React.useState([
        { key: 0, label: "Bills", enabled: false },
        { key: 1, label: "Payroll", enabled: false },
        { key: 2, label: "Birthday Gifts", enabled: false },
        { key: 3, label: "Enabled", enabled: false },
        { key: 4, label: "Disabled", enabled: false },
    ]);

    const toggleChipEnabled = (key) => {
        let chipDataCopy = [...chipData];
        chipDataCopy[key] = {
            ...chipDataCopy[key],
            enabled: !chipDataCopy[key].enabled,
        };

        setChipData([...chipDataCopy]);
    };

    const getFilteredRows = (rows) => {
        let filters = chipData
            .filter((chip) => {
                if (chip.enabled) {
                    return true;
                }
                return false;
            })
            .map((filteredChip) => filteredChip.label);
        if (filters.length > 0) {
            return rows.filter((row) => {
                if (filters.includes(row.category)) {
                    return true;
                }
                if (filters.includes("Enabled") && row.active) {
                    return true;
                }
                if (filters.includes("Disabled") && !row.active) {
                    return true;
                }
            });
        }
        return rows;
    };

    let columns = getColumns(toggleBeneficiary);
    let filteredRows = getFilteredRows(rows);
    return (
        <>
            <h2>Payments</h2>
            <Paper component="ul" className={classes.root}>
                {chipData.map((data) => {
                    return (
                        <li
                            key={data.key}
                            onClick={() => toggleChipEnabled(data.key)}
                        >
                            <Chip
                                clickable
                                label={data.label}
                                className={classes.chip}
                                color={data.enabled ? "primary" : "secondary"}
                            />
                        </li>
                    );
                })}
            </Paper>
            <div style={{ height: 400 }}>
                <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
            </div>
        </>
    );
};

export default PaymentsTable;
