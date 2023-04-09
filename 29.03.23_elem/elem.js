
let list = document.getElementById("list");
let addForm = document.getElementById("add-form");
let addInput = document.getElementById("add-input");


function addItem(text) {

    let item = document.createElement("div");
    item.classList.add("item");


    let content = document.createElement("div");
    content.classList.add("item-content");
    content.textContent = text;
    item.appendChild(content);

    let buttons = document.createElement("div");
    buttons.classList.add("item-buttons");

    let upBtn = document.createElement("button");
    upBtn.classList.add("up-btn");
    upBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    buttons.appendChild(upBtn);

    let downBtn = document.createElement("button");
    downBtn.classList.add("down-btn");
    downBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
    buttons.appendChild(downBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    buttons.appendChild(deleteBtn);

    item.appendChild(buttons);


    upBtn.addEventListener("click", () => {
        let prevItem = item.previousElementSibling;
        if (prevItem) {
            list.insertBefore(item, prevItem);
        }
    });

    downBtn.addEventListener("click", () => {
        let nextItem = item.nextElementSibling;
        if (nextItem) {
            list.insertBefore(nextItem, item);
        }
    });

    deleteBtn.addEventListener("click", () => {
        item.remove();
    });

    list.appendChild(item);
}


addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let text = addInput.value.trim();
    if (text) {
        addItem(text);
        addInput.value = "";
    }
});

