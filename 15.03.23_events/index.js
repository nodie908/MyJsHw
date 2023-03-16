// function justInform(target){
//     if (!target.srcElement.clickcounter){
//         target.srcElement.clickcounter = 1;
//     }
//     target.srcElement.textContent = `Clicked ${target.srcElement.clickcounter}`;
//     target.srcElement.clickcounter++;

// }

// function changeColor(target){
//     // setTimeout( () => {console.log('just did');},1000)
//     console.log(target);{
//         if(target.srcElement.style.background == "black" &&
//         target.srcElement.style.color == "white"){
//         target.srcElement.style.background = "white";
//         target.srcElement.style.color = "black"
//     }else{
//         target.srcElement.style.background = "black";
//         target.srcElement.style.color = "white" 
//     }
//     }
// }

function changeBodyColor(){
    let color = prompt('Введите цвет на английском для фона страницы или в формате "#FA8072": ');
    document.body.style.backgroundColor = color;
}

function changeH1Color(){
    let color = prompt('Введите цвет на английском для заголовка: ');
    zagolovok.style.background = color;
}

function fontChange(){
    let fontSize = prompt("Введите размер шрифта для текста в формате (18px) ");
    abzac.style.fontSize = fontSize ;
}

function addToUl(){
    let newLi = prompt('Введите новый элеиент для списка');
    let node = document.createElement('li');
    node.appendChild(document.createTextNode(newLi));
    document.querySelector('ul').appendChild(node);

}

let fun1 = document.getElementById('touch1');
fun1.addEventListener  ('click', changeBodyColor);

let fun2 = document.getElementById('touch2');
fun2.addEventListener  ('click', changeH1Color);

let fun3 = document.getElementById('touch3');
fun3.addEventListener  ('click', fontChange);

let fun4 = document.getElementById('touch4');
fun4.addEventListener  ('click', addToUl);

