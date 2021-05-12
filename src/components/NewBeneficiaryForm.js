import React, { useState } from "react";
import { getFormattedDate } from "../Utilities";

const NewBeneficiaryForm = (props) => {
    const {
        newBeneficiary,
        handleSetNewBeneficiary,
        handleSubmitNewBeneficiary,
    } = props;
    return (
        <div>
            <label>Payment Name</label>
            <input
                id="paymentName"
                value={newBeneficiary.paymentName}
                onChange={(e) => handleSetNewBeneficiary(e)}
                type="text"
            />

            <label>To Address</label>
            <input
                id="to"
                value={newBeneficiary.to}
                onChange={(e) => handleSetNewBeneficiary(e)}
                type="text"
            />

            <label>Payment Amount</label>
            <input
                id="paymentAmount"
                value={newBeneficiary.paymentAmount.unformatted}
                onChange={(e) => handleSetNewBeneficiary(e)}
                type="number"
                min={0}
            />
            <p>{`Amount in Wei: ${newBeneficiary.paymentAmount.formatted}`}</p>

            <label htmlFor="paymentDate">Payment date:</label>

            <input
                type="date"
                id="paymentDate"
                name="Payment Date"
                value={newBeneficiary.paymentDate}
                min={getFormattedDate(new Date())}
                max="2022-12-31"
                onChange={(e) => handleSetNewBeneficiary(e)}
            ></input>

            <div className="radio" id="b">
                <label>
                    <input
                        type="radio"
                        value="daily"
                        id="interval"
                        checked={newBeneficiary.interval === "daily"}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                    />
                    Daily
                </label>
            </div>
            <div className="radio">
                <label>
                    <input
                        type="radio"
                        value="weekly"
                        id="interval"
                        checked={newBeneficiary.interval === "weekly"}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                    />
                    Weekly
                </label>
            </div>
            <div className="radio">
                <label>
                    <input
                        type="radio"
                        value="monthly"
                        id="interval"
                        checked={newBeneficiary.interval === "monthly"}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                    />
                    Monthly
                </label>
            </div>

            <div className="radio">
                <label>
                    <input
                        type="radio"
                        value="yearly"
                        id="interval"
                        checked={newBeneficiary.interval === "yearly"}
                        onChange={(e) => handleSetNewBeneficiary(e)}
                    />
                    Yearly
                </label>
            </div>
            <button onClick={handleSubmitNewBeneficiary}>Submit</button>
        </div>
    );
};

export default NewBeneficiaryForm;
