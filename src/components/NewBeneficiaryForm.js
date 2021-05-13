import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {},
    firstRow: {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "20px",
    },
    secondRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "50px",
    },
    paymentName: { flex: 1 },
    receiversAddress: { flex: 1 },
    paymentAmount: { flex: 1 },
    paymentDate: { flex: 1, minWidth: 250 },
    interval: { flex: 1 },
    category: { flex: 1 },
    textField: { minWidth: 300 },
    submitContainer: {
        display: "flex",
        justifyContent: "center",
    },
    recurringPaymentHeader: { paddingBottom: "20px" },
}));

const NewBeneficiaryForm = (props) => {
    const classes = useStyles();

    const {
        newBeneficiary,
        handleSetNewBeneficiary,
        handleSubmitNewBeneficiary,
        handleSetNewDate,
    } = props;
    return (
        <div>
            <h2 className={classes.recurringPaymentHeader}>
                New Recurring Payment
            </h2>
            <div className={classes.firstRow}>
                <div className={classes.paymentName}>
                    <InputLabel htmlFor="paymentName">Payment Name</InputLabel>
                    <TextField
                        id="paymentName"
                        value={newBeneficiary.paymentName}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                        type="text"
                        variant="outlined"
                        className={classes.textField}
                        placeholder="Enter Payment Name"
                    />
                </div>
                <div className={classes.receiversAddress}>
                    <InputLabel htmlFor="to">Receivers Address</InputLabel>
                    <TextField
                        id="to"
                        value={newBeneficiary.to}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                        type="text"
                        variant="outlined"
                        className={classes.textField}
                        placeholder="Enter Receiver's Address"
                    />
                </div>
                <div className={classes.paymentAmount}>
                    <InputLabel htmlFor="paymentAmount">Amount</InputLabel>
                    <OutlinedInput
                        id="paymentAmount"
                        value={newBeneficiary.paymentAmount.unformatted}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                        type="number"
                        variant="outlined"
                        inputProps={{ min: 0 }}
                        endAdornment={
                            <InputAdornment position="end">ETH</InputAdornment>
                        }
                        className={classes.textField}
                    />
                </div>
            </div>
            <div className={classes.secondRow}>
                <div className={classes.paymentDate}>
                    <InputLabel htmlFor="paymentDate">Payment date</InputLabel>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            id="paymentDate"
                            name="Payment Date"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            value={newBeneficiary.paymentDate}
                            onChange={handleSetNewDate}
                            minDate={newBeneficiary.paymentDate}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            className={classes.textField}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={classes.category}>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={newBeneficiary.category}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                        variant="outlined"
                        className={classes.textField}
                    >
                        <MenuItem name="category" value="bills">
                            Bills
                        </MenuItem>
                        <MenuItem name="category" value="birthdays">
                            Birthdays
                        </MenuItem>
                        <MenuItem name="category" value="payroll">
                            Payroll
                        </MenuItem>
                    </Select>
                </div>

                <div className={classes.interval}>
                    <InputLabel htmlFor="interval">Interval</InputLabel>
                    <Select
                        labelId="interval-label"
                        id="interval"
                        name="interval"
                        value={newBeneficiary.interval}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                        variant="outlined"
                        className={classes.textField}
                    >
                        <MenuItem name="interval" value="daily">
                            Daily
                        </MenuItem>
                        <MenuItem name="interval" value="weekly">
                            Weekly
                        </MenuItem>
                        <MenuItem name="interval" value="monthly">
                            Monthly
                        </MenuItem>
                        <MenuItem name="interval" value="yearly">
                            Yearly
                        </MenuItem>
                    </Select>
                </div>
            </div>
            <div className={classes.submitContainer}>
                <Button
                    onClick={handleSubmitNewBeneficiary}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Submit New Reccuring Payment
                </Button>
            </div>
        </div>
    );
};

export default NewBeneficiaryForm;
