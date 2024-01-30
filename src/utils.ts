// The timer usually shows numbers with 2 digits 
export const padNum = (n: number, digits: number = 2) => String(n).padStart(digits, '0')