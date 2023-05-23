document.addEventListener('DOMContentLoaded', function () {
    const colorForm = document.getElementById('color-form');
    const colorList = document.getElementById('color-list');

    loadColorsFromCookies();

    colorForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const colorName = document.getElementById('color-name').value;
        const colorType = document.getElementById('color-type').value;
        const colorCode = document.getElementById('color-code').value;

        if (!validateColorName(colorName)) {
            alert('Введите корректное название цвета (только буквы).');
            return;
        }

        if (!validateColorCode(colorType, colorCode)) {
            alert('Введите корректный код цвета.');
            return;
        }

        if (isColorNameExists(colorName)) {
            alert('Цвет с таким названием уже существует.');
            return;
        }

        const newColor = {
            name: colorName,
            type: colorType,
            code: colorCode
        };

        addColorToList(newColor);

        saveColorsToCookies();

        colorForm.reset();
    });

    function loadColorsFromCookies() {
        const cookies = document.cookie.split(';');

        cookies.forEach(function (cookie) {
            const cookieParts = cookie.split('=');
            const cookieName = decodeURIComponent(cookieParts[0]);
            const cookieValue = decodeURIComponent(cookieParts[1]);

            if (cookieName === 'colors') {
                const colors = JSON.parse(cookieValue);
                colors.forEach(function (color) {
                    addColorToList(color);
                });
            }
        });
    }

    function saveColorsToCookies() {
        const colors = [];

        const colorItems = colorList.querySelectorAll('li');
        Array.from(colorItems).forEach(function (colorItem) {
            const color = {
                name: colorItem.dataset.name,
                type: colorItem.dataset.type,
                code: colorItem.dataset.code
            };

            colors.push(color);
        });

        const colorsString = JSON.stringify(colors);

        // Установка цветов в куки на 3 часа
        const expires = new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString();
        document.cookie = 'colors=' + encodeURIComponent(colorsString) + '; expires=' + expires + '; path=/';
    }

    function addColorToList(color) {
        const colorItem = document.createElement('li');
        colorItem.textContent = `Color: ${color.name}. Color type: ${color.type}`;
        colorItem.dataset.name = color.name;
        colorItem.dataset.type = color.type;
        colorItem.dataset.code = color.code;

        if (color.type === 'RGB') {
            colorItem.style.backgroundColor = `rgb(${color.code})`;
        } else if (color.type === 'RGBA') {
            colorItem.style.backgroundColor = `rgba(${color.code})`;
        } else if (color.type === 'HEX') {
            colorItem.style.backgroundColor = color.code;
        }

        colorList.appendChild(colorItem);
    }

    // Проверка корректности названия цвета
    function validateColorName(name) {
        const regex = /^[А-Яа-яA-Za-z]+$/;
        return regex.test(name);
    }

    // Проверка корректности кода цвета
    function validateColorCode(type, code) {
        if (type === 'RGB') {
            const regex = /^\d{1,3},\d{1,3},\d{1,3}$/;
            return regex.test(code);
        } else if (type === 'RGBA') {
            const regex = /^\d{1,3},\d{1,3},\d{1,3},(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
            return regex.test(code);
        } else if (type === 'HEX') {
            const regex = /^#[0-9A-Fa-f]{6}$/;
            return regex.test(code);
        }

        return false;
    }

    // Проверка наличия цвета с заданным названием
    function isColorNameExists(name) {
        const colorItems = colorList.querySelectorAll('li');

        for (let i = 0; i < colorItems.length; i++) {
            if (colorItems[i].dataset.name.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }

        return false;
    }
});
