let qrCode;
let isGenerated = false;

function toggleMode() {
    $('body').toggleClass('dark-mode');
    if ($('body').hasClass('dark-mode')) {
        $('body').css({
            'background-image': "url('night.png')",
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-attachment': 'fixed'
        });
    } else {
        $('body').css('background-image', "url('day.jpg')");
    }
}

function generateQRCode() {
    const qrText = $('#qrText').val();
    const qrColor = $('#qrColor').val();
    if (!qrText) {
        alert("Please enter URL or text");
        return;
    }

    const qrContainer = $('#qrContainer');
    qrContainer.empty();

    qrCode = new QRCode(qrContainer[0], {
        text: qrText,
        width: 228,
        height: 228,
        colorDark: qrColor,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });


    setTimeout(() => {
        const qrImage = qrContainer.find('img');
        if (qrImage.length) {
            qrImage.css({
                'padding': '15px',
                'border-radius': '15px',
                'background-color': 'white'
            });
        }
    }, 100);

    $('#qrButton').text('Download QR Code');
    isGenerated = true;
}

function downloadQR() {
    const qrImage = $('#qrContainer img');
    if (!qrImage.length) return;

    const link = $('<a>')

        .attr('href', qrImage.attr('src'))
        .attr('download', 'qrcode.png')
        .appendTo('body');
    link[0].click();
    link.remove();
}


function handleButtonClick() {
    if (isGenerated) {
        downloadQR();
    } else {
        generateQRCode();
    }
}

function resetButton() {
    $('#qrButton').text('Generate QR Code');
    isGenerated = false;
}

$(document).ready(function () {
    const qrButton = $('#qrButton');
    const qrText = $('#qrText');
    const toggle = $('#toggle');

    qrButton.on('click', handleButtonClick);
    qrText.on('input', resetButton);
    toggle.on('change', toggleMode);
});