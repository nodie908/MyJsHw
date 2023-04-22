let field = document.querySelector('.field');
let cellSize = 100;

let empty = {
    value: 0,
    top: 0,
    left: 0
};

let cells = [];
cells.push(empty);

function move(index) {  
    let cell = cells[index];
    let leftDiff = Math.abs(empty.left - cell.left);
    let topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    let emptyLeft = empty.left;
    let emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    let isFinished = cells.every(cell => {
        console.log(cell.value, cell.top, cell.left);
        return cell.value === cell.top * 4 + cell.left;
    });

    if (isFinished) {
        alert('Вы выйгралиии!!!!!');
    }
}

let numbers = [...Array(15).keys()]
.sort(() => Math.random() - 0.5);

for (let i = 1; i <= 15; i++) {
    let cell = document.createElement('div');
    let value = numbers[i - 1] + 1;
    cell.className = 'cell';
    cell.innerHTML = value;

    let left = i % 4;
    let top = (i - left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    })


    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
        move(i);
    });
}

function refreshPage(){
    window.location.reload();
} 