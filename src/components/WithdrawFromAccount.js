import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import web3 from "web3";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "space-around",
        height: "100%",
        flexDirection: "column",
    },
    input: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBottom: "20px",
    },
    button: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    headline: {
        fontSize: "40px",
    },
    balance: {
        fontSize: "75px",
        margin: "auto",
        textAlign: "center",
        paddingBottom: "20px",
    },
}));
const WithdrawFromAccount = (props) => {
    const classes = useStyles();
    const {
        amountToWithdraw,
        handleChangeAmountToWithdraw,
        withdrawFromAccount,
        accountBalance,
    } = props;
    return (
        <div className={classes.container}>
            <div>
                <h2 className={classes.headline}>Your Account Balance</h2>
                <h2 className={classes.balance}>
                    {`${web3.utils.fromWei(accountBalance, "Ether")}
                     ETH`}
                </h2>
            </div>
            <div className={classes.input}>
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
            </div>
            <div className={classes.button}>
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

export default WithdrawFromAccount;
