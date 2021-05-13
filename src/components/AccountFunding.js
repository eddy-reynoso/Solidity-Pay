import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: { display: "flex", paddingBottom: "20px" },
    left: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    middle: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    right: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}));
const AccountFunding = (props) => {
    const classes = useStyles();
    const {
        amountToFund,
        handleChangeAmountToFund,
        amountToWithdraw,
        handleChangeAmountToWithdraw,
        fundAccount,
        withdrawFromAccount,
        accountBalance,
    } = props;
    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <OutlinedInput
                    value={amountToFund}
                    onChange={handleChangeAmountToFund}
                    type="number"
                    variant="outlined"
                    inputProps={{ min: 0 }}
                    endAdornment={
                        <InputAdornment position="end">ETH</InputAdornment>
                    }
                />
                <Button
                    onClick={fundAccount}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Fund Account
                </Button>
            </div>
            <div className={classes.middle}>
                <p>Account Balance</p>
                <p>{`${accountBalance}`}</p>
            </div>
            <div className={classes.right}>
                <OutlinedInput
                    value={amountToWithdraw}
                    onChange={handleChangeAmountToWithdraw}
                    type="number"
                    variant="outlined"
                    inputProps={{ min: 0 }}
                    endAdornment={
                        <InputAdornment position="end">ETH</InputAdornment>
                    }
                />
                <Button
                    onClick={withdrawFromAccount}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Withdraw From Account
                </Button>
            </div>
        </div>
    );
};

export default AccountFunding;
