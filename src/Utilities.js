export const getErrors = (amount) => {
    let errors = {};
    if (amount !== "0" && !Number(amount)) {
        console.log("AMOUNT", amount);
        errors.type = "NOT A NUMBER";
    }
    if (Number(amount) && Number(amount) < 0) {
        errors.negative = "Number is negative";
    }
    if (amount.includes(".")) {
        console.log("HAS decimal");
        let indexOfDecimal = amount.indexOf(".");
        let afterDecimal = amount.length - indexOfDecimal - 1;
        if (afterDecimal > 18) {
            console.log("Number of decimal places", afterDecimal);
            errors.decimal = "Number has too many decimal places";
        }
    }

    console.log("ERRORS", errors);
    return errors;
};
