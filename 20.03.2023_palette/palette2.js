
let saturationInput = document.getElementById('saturation');
let lightnessInput = document.getElementById('lightness');
let palette = document.getElementById('palette');

function updateColorPalette() {
    let saturation = saturationInput.value;
    let lightness = lightnessInput.value;

    let colors = [];
    for (let hue = 0; hue <= 360; hue += 20) {
        colors.push(`hsl(${hue},${saturation}%,${lightness}%)`);
    }

    let cells = palette.getElementsByTagName('td');
    for (let i = 0; i <= cells.length; i++) {
        cells[i].style.backgroundColor = colors[i];
    }
}

saturationInput.addEventListener('input', updateColorPalette);
lightnessInput.addEventListener('input', updateColorPalette);

updateColorPalette();

