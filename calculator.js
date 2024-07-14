function calculator(a, b, operator) {
    let result;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case 'x':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
        case '%':
            result = a % b;
            break;
        default:
            result = 'Invalid operator';
            break;
    }
     return result;
}
let a = 78;
let b = 3;
console.log("Sum: " + calculator(a, b, '+'));          
console.log("Subtract: " + calculator(a, b, '-')); 
console.log("Multiplication: " + calculator(a, b, 'x'));
console.log("Division: " + calculator(a, b, '/'));    
console.log("Remainder: " + calculator(a, b, '%'));