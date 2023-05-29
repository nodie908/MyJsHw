const log = console.log;

$(document).ready(function () {
    let downloadStr = $('.download-str');
    let formInputs = $('input[required]');
    let totalInputs = formInputs.length;
    let showPercent = $('.show-percent');
    let filledInputs = totalInputs;

    formInputs.on('blur', function () {
        filledInputs = 0;
        formInputs.each(function () {
            if ($(this).val() !== "") {
                filledInputs++;
            }
        });

        let progressPercent = (filledInputs / totalInputs) * 100;
        if (progressPercent > 100) progressPercent = 100;
        downloadStr.width(progressPercent + '%');

        showPercent.text(progressPercent.toFixed(0) + '%');
    });
});
