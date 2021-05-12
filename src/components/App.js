import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";
import web3 from "web3";
import OnePay from "../abis/OnePay.json";
import { getErrors } from "../Utilities";
import { useWeb3React } from "@web3-react/core";

const App = () => {
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

            watchEvents(OnePayContract);
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
        }
    };

    const watchEvents = async (OnePayContract) => {
        console.log("WATCHING");
        OnePayContract.events.BalanceChanged({}, (error, data) => {
            if (error) {
                console.log("ERROR", error);
            } else {
                console.log("DATA", data);
                setAccountBalance(data.returnValues._newBalance);
            }
        });
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

    const addNewBeneficiary = async () => {
        await smartContract.methods
            .addNewBeneficiary(
                "Payment 1",
                "0xD5e95d34eeeCA2aa93a5e1e45b84eBa824c11265",
                "100",
                12,
                5,
                2021,
                "monthly"
            )
            .send({
                from: ethereumAccount,
            });
    };

    const getBeneficiary = async () => {
        let currentMonth = await smartContract.methods.getCurrentMonth().call();
        let currentYear = await smartContract.methods.getCurrentYear().call();

        let payment = await smartContract.methods.payments(2).call();

        console.log("PAYMENT", payment);
        let currentDay = await smartContract.methods.getCurrentDay().call();

        console.log("currentDay", currentDay);
        console.log("currentMonth", currentMonth);
        console.log("currentYear", currentYear);

        let dispersePayments = await smartContract.methods
            .dispersePayments()
            .send({ from: ethereumAccount });

        console.log("dispersePayments", dispersePayments);
    };

    return (
        <div>
            <Navbar account={ethereumAccount} />
            <div className="container-fluid mt-5">
                <div className="row">
                    <main
                        role="main"
                        className="col-lg-12 ml-auto mr-auto"
                        style={{ maxWidth: "600px" }}
                    >
                        <div className="content mr-auto ml-auto">
                            <a
                                href="http://www.dappuniversity.com/bootcamp"
                                target="_blank"
                                rel="noopener noreferrer"
                            ></a>

                            <h1>
                                {" "}
                                {`Your account Balance: ${web3.utils.fromWei(
                                    accountBalance,
                                    "ether"
                                )}`}
                            </h1>
                            <input
                                value={amountToFund}
                                onChange={handleChangeAmountToFund}
                                type="number"
                                min={0}
                            />
                            <button onClick={fundAccount}>Fund Account</button>

                            <p>{`Amount to deposit in Wei: ${formattedAmountToFund}`}</p>

                            <input
                                value={amountToWithdraw}
                                onChange={handleChangeAmountToWithdraw}
                                type="number"
                                min={0}
                            />
                            <button onClick={withdrawFromAccount}>
                                Withdraw From Account
                            </button>
                            <p>{`Amount to withdraw in Wei: ${formattedAmountToWithdraw}`}</p>
                            <button onClick={addNewBeneficiary}>
                                Add new Beneficiary
                            </button>
                            <button onClick={getBeneficiary}>
                                Get Beneficiary
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
