
const math = {};

math.add = (num1, num2) => num1 + num2;

math.subtract = (num1, num2) => num1 - num2;

math.divide = (num1, num2) => num1/num2;

math.multiply = (num1, num2) => num1*num2;

math.coerce = (str) => {
    const num = parseInt(str, 10);
    if(!isNaN(num)) {
        return num;
    }
    return false;
};

module.exports = math;