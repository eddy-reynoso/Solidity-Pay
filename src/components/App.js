import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./App.css";
import Web3 from "web3";
import FavoriteNumber from "../abis/FavoriteNumber.json";

const App = () => {
    const [ethereumAccount, setEthereumAccount] = useState("0x0");
    const [favoriteNumberContract, setFavoriteNumberContract] = useState({});
    const [favoriteNumber, setFavoriteNumber] = useState(-1);

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

        const favoriteNumberData = FavoriteNumber.networks[networkId];

        if (favoriteNumberData) {
            const favoriteNumberContract = new web3.eth.Contract(
                FavoriteNumber.abi,
                favoriteNumberData.address
            );
            setFavoriteNumberContract({ ...favoriteNumberContract });
            console.log("ETHEREUM ACCOUNT", accounts[0]);
            let favoriteNumberResponse = await favoriteNumberContract.methods
                .getFavoriteNumber()
                .call({ from: accounts[0] });
            console.log("FAVORITE NUMBER", favoriteNumberResponse);
            setFavoriteNumber(favoriteNumberResponse);
        }
    };

    const handleChangeFavoriteNumber = (event) => {
        setFavoriteNumber(event.target.value);
    };
    const handleFavoriteNumberSubmit = () => {
        console.log("NEW FAV", favoriteNumber);

        favoriteNumberContract.methods
            .setFavoriteNumber(favoriteNumber)
            .send({ from: ethereumAccount })
            .on("transactionHash", (hash) => {
                console.log("SET NEW FAV NUMBER> HASH:", hash);
            });
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
                            <input
                                value={favoriteNumber}
                                onChange={handleChangeFavoriteNumber}
                            />
                            <button onClick={handleFavoriteNumberSubmit}>
                                Submit
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
