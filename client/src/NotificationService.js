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

  static async editEvent(title = "Enter Inputs", description="Enter Desc", location="Enter locale") {
    try {
      const {value: formValues} = await Swal.fire({
        title: "Edit Event...",
        html: `<h3>Title</h3><input id="title" class="swal2-input" placeholder="Title...">`+
              `<h3>Description</h3><input id="description" class="swal2-input" placeholder="Description...">`+
              `<h3>Location</h3><input id="location" class="swal2-input" placeholder="Location...">`,
        focusConfirm: false,
        
        preConfirm: () => {
          
          return[
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("location").value
          ]
        }
      })
      
      if(formValues){
        return {
          title: formValues[0],
          description: formValues[1],
          location: formValues[2]
        }
      }
      else {
        console.log("formValues is false")
      }
    } catch (error) {
      return false
    }
  }
}
