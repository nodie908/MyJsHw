let a = '';
let b = '';
let sign = ''; // sign of operation
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = ''; // sign of operation
    finish = false;
    out.textContent = '0';

}


document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('C')) {
        clearAll();
        return;
    }

    out.textContent = '';
    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a.substr(0, 15);
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b.substr(0, 15);
        }
        else {
            b += key;
            out.textContent = b.substr(0, 15);
        }
        console.log(a, b, sign);
        return;
    }

    if (action.includes(key)) {
        sign = key;
        console.log(a, b, sign);
        out.textContent = sign;

        return;
    }



    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.textContent = "error";
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;

        out.textContent = a.toString().substr(0, 15);
        return;
    }

    if (key === '.') {
        if (!a.includes('.')) {
            a += key;
            out.textContent = a;
        } else if (a.includes('.')) {
            a = a;
            out.textContent = a;
        }
        else if (!b.includes('.')) {
            b += key;
            out.textContent = b;
        } else if (a.includes('.')) {
            b = b;
            out.textContent = b;
        }
        return;
    }

    if (key === 'del') {
        if (b === '') {
            a = a.slice(0, -1);
            out.textContent = a;
            console.log(a, b, sign);
        } else {
            b = b.slice(0, -1);
            out.textContent = b;
            console.log(a, b, sign);
        }
        return;
        console.log(a, b, sign);
    }

}
