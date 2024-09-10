import Swal from "sweetalert2";

export const swalAlert = (title,icon="info" , text="") => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText:"Ok"
       })
}

