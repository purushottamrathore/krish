import Swal from "sweetalert2";

function alertErrorMessage(message) {

  Swal.fire('Oops...', message, 'error');
}

function alertSuccessMessage(message) {

  Swal.fire('', message, 'success');
}

export { alertErrorMessage,alertSuccessMessage };