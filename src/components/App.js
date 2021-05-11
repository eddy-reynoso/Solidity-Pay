import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";
import Web3 from "web3";

const App = () => {
    const [ethereumAccount, setEthereumAccount] = useState("0x0");

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
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

                            <h1>Hello, World!</h1>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
