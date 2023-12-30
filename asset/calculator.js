export function sum(a,b){
    return a + b;
}

export function subtract(a,b){
    return a - b;
}

export function multiply(a,b){
    return a * b;
}

export function divide(a,b){
    return (b!==0) ? a/b:`Erreur : division par ${a} / ${b} `;
}