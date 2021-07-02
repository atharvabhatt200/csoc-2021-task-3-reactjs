import 'izitoast/dist/css/iziToast.min.css';

export function displaySuccessToast(message) {
    const iziToast = require('izitoast');
    iziToast.success({
        title: 'Success',
        message: message
    });
}

export function displayErrorToast(message) {
    const iziToast = require('izitoast');
    iziToast.error({
        title: 'Error',
        message: message
    });
}

export function displayInfoToast(message) {
    const iziToast = require('izitoast');
    iziToast.info({
        title: 'Info',
        message: message
    });
}