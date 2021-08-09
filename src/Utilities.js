export const getErrors = (amount) => {
    let errors = {};
    if (amount !== "0" && !Number(amount)) {
        errors.type = "NOT A NUMBER";
    }
    if (Number(amount) && Number(amount) < 0) {
        errors.negative = "Number is negative";
    }
    if (amount.includes(".")) {
        let indexOfDecimal = amount.indexOf(".");
        let afterDecimal = amount.length - indexOfDecimal - 1;
        if (afterDecimal > 18) {
            errors.decimal = "Number has too many decimal places";
        }
    }

    return errors;
};

export const getFormattedDate = (date) => {
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = `0${day}`;
    }
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = `0${month}`;
    }
    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

export const getFormattedDateExtraDay = (date) => {
    let day = (date.getDate() + 1).toString();
    if (day.length === 1) {
        day = `0${day}`;
    }
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = `0${month}`;
    }
    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
};
