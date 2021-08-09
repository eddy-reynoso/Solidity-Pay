import React from "react";
import AppModal from "./AppModal";
import FundAccount from "./FundAccount";
import WithdrawFromAccount from "./WithdrawFromAccount";
import NewBeneficiaryForm from "./NewBeneficiaryForm";

const Modals = (props) => {
    const {
        amountToFund,
        handleChangeAmountToFund,
        fundAccount,
        accountBalance,
        amountToWithdraw,
        handleChangeAmountToWithdraw,
        withdrawFromAccount,
        newBeneficiary,
        handleSetNewBeneficiary,
        handleSubmitNewBeneficiary,
        handleSetNewDate,
        handleModalClose,
        fundModalOpen,
        withdrawModalOpen,
        paymentModalOpen,
    } = props;
    return (
        <>
            <AppModal
                body={
                    <FundAccount
                        amountToFund={amountToFund}
                        handleChangeAmountToFund={handleChangeAmountToFund}
                        fundAccount={fundAccount}
                        accountBalance={accountBalance}
                    />
                }
                open={fundModalOpen}
                handleModalClose={handleModalClose}
            />

            <AppModal
                body={
                    <WithdrawFromAccount
                        amountToWithdraw={amountToWithdraw}
                        handleChangeAmountToWithdraw={
                            handleChangeAmountToWithdraw
                        }
                        withdrawFromAccount={withdrawFromAccount}
                        accountBalance={accountBalance}
                    />
                }
                open={withdrawModalOpen}
                handleModalClose={handleModalClose}
            />

            <AppModal
                body={
                    <NewBeneficiaryForm
                        newBeneficiary={newBeneficiary}
                        handleSetNewBeneficiary={handleSetNewBeneficiary}
                        handleSubmitNewBeneficiary={handleSubmitNewBeneficiary}
                        handleSetNewDate={handleSetNewDate}
                    />
                }
                open={paymentModalOpen}
                handleModalClose={handleModalClose}
            />
        </>
    );
};

export default Modals;
