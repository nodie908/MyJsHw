const rates = {
  USD: 450,
  EUR: 500,
  RUB: 5.6,
};

const fileInput = document.getElementById('file-input');
const convertButton = document.getElementById('convert-button');
const regex = /(\d+(\.\d{1,2})?)[\s]*(USD|\$|EUR|€|руб|RUB|₽)/gi;

function convertCurrency() {
  if (fileInput.files.length === 0) {
    alert('Необходимо выберать файл для конвертации');
    return;
  }

  let file = fileInput.files[0];
  let fileName = file.name.replace(/\.[^/.]+$/, '') + '_converted';
  let fileExtension = file.name.split('.').pop();
  let fileReader = new FileReader();

  fileReader.onload = function (event) {
    let fileCont = event.target.result;
    fileCont = fileCont.replace(regex, function (match, p1, p2, p3) {
      let amount = parseFloat(p1);
      let currency = p3;

      if (currency === '€') currency = 'EUR';
      if (currency === '₽' || currency === 'руб' ) currency = 'RUB';
      if (currency === '$') currency = 'USD';

      const convertedAmount = (amount * rates[currency]).toFixed(2);
      return `${convertedAmount} ₸`;
    });

    let blob = new Blob([fileCont], { type: file.type });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  fileReader.readAsText(file);
}

convertButton.addEventListener('click', convertCurrency);
