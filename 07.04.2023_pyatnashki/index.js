let btn = document.getElementById('start');
let table = document.getElementById('table');

function mixElments() {

	let tr = document.querySelectorAll('tr');
	let uniqValues = [];
	for (let r = 0; r < 4; r++) {
		for (let c = 0; c < 4; c++) {
			if (tr[r].childNodes[c].classList.contains("empty")) continue;
			let b;
			do {
				b = getRandom(1, 16);
			}
			while (uniqValues.indexOf(b) !== -1);
			tr[r].childNodes[c].textContent = b;
			uniqValues.push(b);
		}
	}
}

function getRandom(min, max) {
	let a = Math.floor(Math.random() * (max - min) + min);
	return a;
}

function changePosition(ev) {
	let elemTar = ev.target;
	let elemRow = elemTar.parentElement;

	let row = elemRow.rowIndex;
	let col = elemTar.cellIndex;
	let emptyCell;

	// условие для перемещения фишки вправо
	if (elemTar.nextSibling && elemTar.nextSibling.classList.contains("empty")) {
		emptyCell = elemTar.nextSibling;
		elemTar.replaceWith(emptyCell);
		emptyCell.after(elemTar);
	} else
		// условие для перемещения фишки влево
		if (elemTar.previousSibling && elemTar.previousSibling.classList.contains("empty")) {
			emptyCell = elemTar.previousSibling;
			elemTar.replaceWith(emptyCell);
			emptyCell.before(elemTar);
		} else
			// условие для перемещения фишки вниз
			if (elemRow.nextElementSibling && elemRow.nextElementSibling.children[col].classList.contains("empty") && row < 3) {
				emptyCell = elemRow.nextElementSibling.children[col];
				elemTar.replaceWith(emptyCell);
				elemRow.nextElementSibling.children[col].before(elemTar);
				//              тут есть проблема: ^^^^^^^
			} else// условие для перемещения фишки вверх
				if (elemRow.previousElementSibling && elemRow.previousElementSibling.children[col].classList.contains("empty")) {
					emptyCell = elemRow.previousElementSibling.children[col];
					elemTar.replaceWith(emptyCell);
					elemRow.previousElementSibling.children[col].after(elemTar);
				}

	// checkGameOver();
}

table.onclick = changePosition;

btn.onclick = mixElments;