import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "web3";
import OnePay from "../abis/OnePay.json";
import { getErrors, getFormattedDateExtraDay } from "../Utilities";
import { useWeb3React } from "@web3-react/core";
import NewBeneficiaryForm from "./NewBeneficiaryForm";
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import PaymentsTable from "./PaymentsTable";
import AccountFunding from "./AccountFunding";

import Appbar from "./Appbar";
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "rgb(245,246,248)",
        margin: 0,
        minHeight: "100vh",
    },
    content: {
        width: "80%",
        margin: "auto",
    },
}));

const theme = createMuiTheme({
    status: {
        danger: orange[500],
    },
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const defaultForm = {
    paymentName: "",
    to: "",
    paymentAmount: {
        unformatted: "0",
        formatted: "0",
    },
    paymentDate: getFormattedDateExtraDay(new Date()),
    interval: "daily",
    category: "bills",
};

const App = () => {
    let classes = useStyles();

    const { active, error, activate } = useWeb3React();

    const [ethereumAccount, setEthereumAccount] = useState("0x0");

    const [amountToFund, setAmountToFund] = useState("0");
    const [amountToWithdraw, setAmountToWithdraw] = useState("0");

    const [formattedAmountToFund, setFormattedAmountToFund] = useState("0");
    const [formattedAmountToWithdraw, setFormattedAmountToWithdraw] = useState(
        "0"
    );

    const [smartContract, setSmartContract] = useState({});

    const [accountBalance, setAccountBalance] = useState("0");
    const [paymentBeneficiaries, setPaymentBeneficiaries] = useState([]);

    const [newBeneficiary, setNewBeneficiary] = useState({
        ...defaultForm,
    });
    useEffect(() => {
        loadweb3();
        loadBlockchainData();
    }, []);

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.on && !active && !error) {
            ethereum.on("BalanceChanged", () => {
                console.log("BALNCED CHANGED");
            });
        }
    }, [active, error, activate]);

    useEffect(() => {
        if (Object.keys(getErrors(amountToFund)).length === 0) {
            setFormattedAmountToFund(web3.utils.toWei(amountToFund.toString()));
        } else {
            setFormattedAmountToFund("Error");
        }
    }, [amountToFund]);

    useEffect(() => {
        if (Object.keys(getErrors(amountToWithdraw)).length === 0) {
            setFormattedAmountToWithdraw(
                web3.utils.toWei(amountToWithdraw.toString())
            );
        } else {
            setFormattedAmountToWithdraw("Error");
        }
    }, [amountToWithdraw]);

    useEffect(() => {
        if (
            Object.keys(getErrors(newBeneficiary.paymentAmount.unformatted))
                .length === 0
        ) {
            let newBeneficiaryCopy = { ...newBeneficiary };
            newBeneficiaryCopy.paymentAmount.formatted = web3.utils.toWei(
                newBeneficiary.paymentAmount.unformatted.toString()
            );

            setNewBeneficiary({ ...newBeneficiaryCopy });
        } else {
            let newBeneficiaryCopy = { ...newBeneficiary };
            newBeneficiaryCopy.paymentAmount.formatted = "Error";

            setNewBeneficiary({ ...newBeneficiaryCopy });
        }
    }, [newBeneficiary.paymentAmount.unformatted]);

    const loadweb3 = async () => {
        if (window.ethereum) {
            window.web3 = new web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new web3(window.web3.currentProvider);
        } else {
            window.alert("Non ethereum browser");
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setEthereumAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();

        const OnePayData = OnePay.networks[networkId];

        if (OnePayData) {
            const OnePayContract = new web3.eth.Contract(
                OnePay.abi,
                OnePayData.address
            );

            watchEvents(OnePayContract, accounts[0]);
            setSmartContract(OnePayContract);
            console.log("ONE PAY DATA DOT ADDRESS", OnePayData.address);

            let contractBalance = await OnePayContract.methods
                .getSmartContractBalance()
                .call();
            console.log("CONTRACT BALANCE", contractBalance);

            let userBalance = await OnePayContract.methods
                .getUserBalance()
                .call({ from: accounts[0] });
            console.log("USER BALANCE", userBalance);
            setAccountBalance(userBalance);
            let address = await OnePayContract.methods.getAddress().call();
            console.log("Address: ", address);

            let paymentBeneficiaries = await OnePayContract.methods
                .getBeneficiaries()
                .call({ from: accounts[0] });
            console.log("RETRIEVED PAYMENT BENE", paymentBeneficiaries);
            setPaymentBeneficiaries([...paymentBeneficiaries]);

            console.log("PAYMENT BENIFICIARIES", paymentBeneficiaries);
        }
    };

    const watchEvents = async (OnePayContract, account) => {
        OnePayContract.events.BalanceChanged({}, (error, data) => {
            if (error) {
                console.log("ERROR", error);
            } else {
                console.log("SET NEW ACCOUNT BALANCE", data);
                setAccountBalance(data.returnValues._newBalance);
            }
        });

        OnePayContract.events.BeneficionariesChanged(
            {},
            async (error, data) => {
                if (error) {
                    console.log("ERROR", error);
                } else {
                    console.log("DATA", data);

                    let paymentBeneficiaries = await OnePayContract.methods
                        .getBeneficiaries()
                        .call({ from: account });
                    setPaymentBeneficiaries([...paymentBeneficiaries]);
                }
            }
        );
    };

    const fundAccount = async () => {
        await smartContract.methods.fundAccount().send({
            from: ethereumAccount,
            value: formattedAmountToFund,
        });
    };

    const withdrawFromAccount = async () => {
        console.log("WITHDRAW THIS MUCH", amountToWithdraw);
        await smartContract.methods
            .withdrawFromAccount(formattedAmountToWithdraw)
            .send({
                from: ethereumAccount,
            });
    };

    const handleChangeAmountToFund = (event) => {
        let textInput = event.target.value;
        setAmountToFund(textInput);
    };

    const handleChangeAmountToWithdraw = (event) => {
        let textInput = event.target.value;
        setAmountToWithdraw(textInput);
    };

    const dispersePayments = async () => {
        await smartContract.methods
            .dispersePayments()
            .send({ from: ethereumAccount });
    };

    const handleSetNewBeneficiary = (event) => {
        if (event.target.id === "paymentName") {
            setNewBeneficiary({
                ...newBeneficiary,
                paymentName: event.target.value,
            });
        }

        if (event.target.id === "paymentAmount") {
            let newBeneficiaryCopy = { ...newBeneficiary };
            newBeneficiaryCopy.paymentAmount.unformatted = event.target.value;
            setNewBeneficiary({ ...newBeneficiaryCopy });
        }

        if (event.target.id === "to") {
            setNewBeneficiary({
                ...newBeneficiary,
                to: event.target.value,
            });
        }

        if (event.target.id === "paymentDate") {
            console.log("NEW DATE", event.target.value);
            setNewBeneficiary({
                ...newBeneficiary,
                paymentDate: event.target.value,
            });
        }
        if (event.target.name === "interval") {
            setNewBeneficiary({
                ...newBeneficiary,
                interval: event.target.value,
            });
        }
        if (event.target.name === "category") {
            setNewBeneficiary({
                ...newBeneficiary,
                category: event.target.value,
            });
        }
    };

    const handleSubmitNewBeneficiary = async () => {
        console.log("newBeneficiary.paymentDate", newBeneficiary.paymentDate);
        await smartContract.methods
            .addNewBeneficiary(
                newBeneficiary.paymentName,
                newBeneficiary.to,
                newBeneficiary.paymentAmount.formatted,
                new Date(newBeneficiary.paymentDate).getDate(),
                new Date(newBeneficiary.paymentDate).getMonth() + 1,
                new Date(newBeneficiary.paymentDate).getFullYear(),
                newBeneficiary.interval
            )
            .send({
                from: ethereumAccount,
            });
        setNewBeneficiary({ ...defaultForm });
    };

    const toggleBeneficiary = async (id) => {
        let deletePayment = await smartContract.methods
            .toggleBeneficiary(id)
            .send({ from: ethereumAccount });
        console.log("DELETE PAYMENT", deletePayment);
    };

    const handleSetNewDate = (date) => {
        console.log("Unformatted DATE", date);

        console.log("NEW DATE", getFormattedDateExtraDay(date));
        setNewBeneficiary({
            ...newBeneficiary,
            paymentDate: getFormattedDateExtraDay(date),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Appbar ethereumAccount={ethereumAccount} />
                <div className={classes.content}>
                    <h2>{`Account Funding`}</h2>
                    <AccountFunding
                        amountToFund={amountToFund}
                        handleChangeAmountToFund={handleChangeAmountToFund}
                        amountToWithdraw={amountToWithdraw}
                        handleChangeAmountToWithdraw={
                            handleChangeAmountToWithdraw
                        }
                        fundAccount={fundAccount}
                        withdrawFromAccount={withdrawFromAccount}
                        accountBalance={accountBalance}
                    />

                    <NewBeneficiaryForm
                        newBeneficiary={newBeneficiary}
                        handleSetNewBeneficiary={handleSetNewBeneficiary}
                        handleSubmitNewBeneficiary={handleSubmitNewBeneficiary}
                        handleSetNewDate={handleSetNewDate}
                    />
                    <PaymentsTable
                        rows={paymentBeneficiaries}
                        toggleBeneficiary={toggleBeneficiary}
                    />
                    <button onClick={dispersePayments}>
                        Disperse Payemnts
                    </button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
