import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: "auto",
        borderRadius: "4px",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const AppModal = (props) => {
    const classes = useStyles();

    const { body, open, handleModalClose } = props;
    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
            onBackdropClick={handleModalClose}
        >
            <div className={classes.paper}>{body}</div>
        </Modal>
    );
};

export default AppModal;
