import React from "react";

const Receivers = (props) => {
    let { paymentBeneficiaries, toggleBeneficiary } = props;
    return (
        <div>
            {paymentBeneficiaries.map((pb, index) => {
                return (
                    <div key={pb.id}>
                        <h3>{`Payment Name: ${pb.name}`}</h3>
                        <p>{`ID: ${pb.id}`}</p>
                        <p>{`To: ${pb.to}`}</p>
                        <p>{`Payment Amount: ${pb.amount}`}</p>
                        <p>{`Payment Date: ${pb.nextMonth}/${pb.nextDay}/${pb.nextYear}`}</p>
                        <p>{`Is Active: ${pb.active}`}</p>
                        <button onClick={() => toggleBeneficiary(pb.id)}>
                            Stop payments
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default Receivers;
