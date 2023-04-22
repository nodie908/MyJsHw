class SuperStoreItem {
  name = "";
  price = 0;
  description = "";
  image = null;
  view = null;
  expanded = false;

  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;

    // Создаем элемент на странице
    this.view = document.createElement("div");
    this.view.classList.add("super-store-item");

    // Создаем заголовок элемента с названием и ценой
    let header = document.createElement("h3");
    header.textContent = this.name + " - " + this.price + " руб.";
    this.view.append(header);

    // Создаем кнопку "В корзину"
    let button = document.createElement("button");
    button.textContent = "В корзину";
    button.onclick = this.buy;
    this.view.append(button);

    // Добавляем обработчик события для переключения отображения элемента
    this.view.onclick = this.toggle;
  }

  sync() {
    // Синхронизируем данные элемента на странице с данными объекта
    let header = this.view.querySelector("h3");
    header.textContent = this.name + " - " + this.price + " тг.";

    let description = this.view.querySelector(".description");
    if (description) {
      description.textContent = this.description;
    }

    let img = this.view.querySelector("img");
    if (img) {
      img.src = this.image;
    }
  }

  setImage(url) {
    this.image = url;
    let img = document.createElement('img');
    img.src = this.image;
    img.width = 300;
    img.height = 300;
    this.view.prepend(img);
  }


  expand() {
    // Развертываем элемент, добавляя описание товара
    let description = document.createElement("p");
    description.classList.add("description");
    description.textContent = this.description;
    this.view.append(description);
    this.expanded = true;
  }

  collapse() {
    // Сворачиваем элемент, удаляя описание товара
    let description = this.view.querySelector(".description");
    if (description) {
      this.view.removeChild(description);
      this.expanded = false;
    }
  }

  toggle(ev) {
    // Обработчик события клика на элементе, переключает отображение
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  buy(ev) {
    // Обработчик события клика на кнопке "В корзину"
    ev.stopPropagation();
    alert("Вы добавили в корзину " + this.name);
  }
}



let item1 = new SuperStoreItem(
  "Бензопила Makita BS-2300M",
  250000,
  "Мощная бензопила // Tип двигателя: бензиновый // Длина шины: 38 см // Объем двигателя:	45.2 куб.см // Вес: 7 кг"
);
item1.setImage("pila.jpg");
item1.sync();
document.body.appendChild(item1.view);
item1.view.addEventListener('click', (ev) => {
  item1.toggle(ev);
});


let item2 = new SuperStoreItem(
  "Генератор Makita G12000R-TGR",
  200000,
  "Мощный бензиновый генератор // Тип электростанции: бензиновая // Тип запуска: ручной // Bремя автономной работы: 10 ч //Инверторный: Да"
);


item2.setImage("makita.jpeg");
item2.sync();
document.body.appendChild(item2.view);
item2.view.addEventListener('click', (ev) => {
  item2.toggle(ev);
});


let item3 = new SuperStoreItem("Отбойный молоток Makita HM 1214 C",
  200000,
  "Отбойный молоток для всех видов работ // Макс. энергия удара: 72.8 Дж // Мощность: 2 кВт // Частота ударов: 870 уд/мин");
item3.setImage("molot.png");
item3.sync();
document.body.appendChild(item3.view);

item3.view.addEventListener('click', (ev) => {
  item3.toggle(ev);
});

