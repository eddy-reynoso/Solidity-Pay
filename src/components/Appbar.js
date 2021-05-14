import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "2%",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    leftButton: {
        padding: "10px",
    },
    middleButton: {
        padding: "10px",
    },

    rightButton: { padding: "10px" },
}));
const Appbar = (props) => {
    const classes = useStyles();
    const { ethereumAccount, handleModalOpen } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        One Pay
                    </Typography>
                    <div className={classes.leftButton}>
                        <Button
                            onClick={() => handleModalOpen("new")}
                            variant="contained"
                            color="secondary"
                            size="large"
                        >
                            New Payment
                        </Button>
                    </div>
                    <div className={classes.middleButton}>
                        <Button
                            onClick={() => handleModalOpen("fund")}
                            variant="contained"
                            color="secondary"
                            size="large"
                        >
                            Deposit
                        </Button>
                    </div>

                    <div className={classes.rightButton}>
                        <Button
                            onClick={() => handleModalOpen("withdraw")}
                            variant="contained"
                            color="secondary"
                            size="large"
                        >
                            Withdrawal
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Appbar;

/*

*/
