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
            <div>
                <h2 className={classes.headline}>Your Account Balance</h2>
                <h2 className={classes.balance}>
                    {`${web3.utils.fromWei(accountBalance, "Ether")}
                     ETH`}
                </h2>
            </div>
            <div className={classes.input}>
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
            </div>
            <div className={classes.button}>
                <Button
                    onClick={fundAccount}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Fund Account
                </Button>
            </div>
        </div>
    );
};

export default AccountFunding;
