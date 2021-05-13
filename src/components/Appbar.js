import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

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
}));
const Appbar = (props) => {
    const classes = useStyles();
    const { ethereumAccount } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        One Pay
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        {`Wallet Public Address ${ethereumAccount}`}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Appbar;
