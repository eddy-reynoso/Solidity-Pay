import React from "react";
import web3 from "web3";
import { makeStyles } from "@material-ui/core/styles";
import { getFormattedDate } from "../Utilities";

const useStyles = makeStyles((theme) => ({
    information: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",

        alignItems: "center",
        width: "100%",
        marginTop: "50px",
    },
    left: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "33%",
        margin: "auto",
    },
    middle: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "33%",
        margin: "auto",
    },
    right: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "33%",
        margin: "auto",
    },
    headingText: {
        display: "inline",
        margin: "auto",
        marginBottom: "50px",
    },
}));

const UserInformation = (props) => {
    const { ethereumAccount, accountBalance, totalPaymentsAmount } = props;
    const classes = useStyles();
    return (
        <>
            <h2>{`Account ${ethereumAccount}`}</h2>
            <div className={classes.information}>
                <div className={classes.left}>
                    <h3 className={classes.headingText}>{`Balance`}</h3>

                    <p className={classes.headingText}>{`${web3.utils.fromWei(
                        accountBalance,
                        "Ether"
                    )} ETH`}</p>
                </div>
                <div className={classes.middle}>
                    <h3
                        className={classes.headingText}
                    >{`Total Payments Amount`}</h3>
                    <p
                        className={classes.headingText}
                    >{`${totalPaymentsAmount} ETH`}</p>
                </div>
                <div className={classes.right}>
                    <h3 className={classes.headingText}>{`Current Date`}</h3>
                    <p className={classes.headingText}>{` ${getFormattedDate(
                        new Date()
                    )}`}</p>
                </div>
            </div>
        </>
    );
};

export default UserInformation;
