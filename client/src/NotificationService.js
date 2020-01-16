import Swal from "sweetalert2";

export default class NotificationService {
  static async inputData(title = "Enter Inputs") {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html: '<input id="swal-input1" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            // @ts-ignore
            document.getElementById("swal-input1").value
            // @ts-ignore
          ];
        }
      });
      // console.log(formValues)
      // debugger
      if (formValues) {
        return { title: formValues[0] };
      }
    } catch (error) {
      return false;
    }
  }
  static async inputList(title = "Enter Inputs") {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html: '<input id="swal-input1" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            // @ts-ignore
            document.getElementById("swal-input1").value
            // @ts-ignore
          ];
        }
      });
      // console.log(formValues)
      // debugger
      if (formValues) {
        return formValues[0];
      }
    } catch (error) {
      return false;
    }
  }
}
