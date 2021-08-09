import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const WrappedSnackBar = (props) => {
    const { isSnackbarOpen, onSnackbarOpen, snackbarMessage } = props;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={() => onSnackbarOpen(false)}
            message={snackbarMessage}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => onSnackbarOpen(false)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );
};

export default WrappedSnackBar;
