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

  static async editEvent(
    title = "Enter Inputs",
    description = "Enter Desc",
    location = "Enter locale"
  ) {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit Event...",
        html:
          `<h3>Title</h3><input id="title" class="swal2-input" placeholder="Title...">` +
          `<h3>Description</h3><input id="description" class="swal2-input" placeholder="Description...">` +
          `<h3>Location</h3><input id="location" class="swal2-input" placeholder="Location...">`,
        focusConfirm: false,

        preConfirm: () => {
          return [
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("location").value
          ];
        }
      });

      if (formValues) {
        return {
          title: formValues[0],
          description: formValues[1],
          location: formValues[2]
        };
      } else {
        console.log("formValues is false");
      }
    } catch (error) {
      return false;
    }
  }

  static async editPost(content = "Enter Content") {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit Post",
        html: `<h3>Content</h3><input id="content" class="swal2-input" placeholder="Post...">`,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("content").value];
        }
      });

      if (formValues) {
        return {
          content: formValues[0]
        };
      } else {
        console.log("formValues is false");
      }
    } catch (error) {
      return false;
    }
  }

  static async editPlayer(
    firstName = "firstName",
    lastName = "lastName",
    position = "position",
    grade = "grade",
    jerseyNumber = "jersey",
    city = "city",
    state = "state",
    email = "email",
    phoneNumber = "phone"
  ) {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit Player...",
        html:
          `<h3>First Name</h3><input id="firstName" class="swal2-input" placeholder="First Name...">` +
          `<h3>Last Name</h3><input id="lastName" class="swal2-input" placeholder="Last Name...">` +
          `<h3>Position</h3><input id="position" class="swal2-input" placeholder="Position...">` +
          `<h3>Grade</h3><input id="grade" class="swal2-input" placeholder="Grade...">` +
          `<h3>Jersey Number</h3><input id="jersey" class="swal2-input" placeholder="Jersey Number...">` +
          `<h3>City</h3><input id="city" class="swal2-input" placeholder="City...">` +
          `<h3>State</h3><input id="state" class="swal2-input" placeholder="State...">` +
          `<h3>Email</h3><input id="email" class="swal2-input" placeholder="Email...">` +
          `<h3>Phone Number</h3><input id="phone" class="swal2-input" placeholder="Phone...">`,
        focusConfirm: false,

        preConfirm: () => {
          return [
            document.getElementById("firstName").value,
            document.getElementById("lastName").value,
            document.getElementById("position").value,
            document.getElementById("grade").value,
            document.getElementById("jersey").value,
            document.getElementById("city").value,
            document.getElementById("state").value,
            document.getElementById("email").value,
            document.getElementById("phone").value
          ];
        }
      });

      if (formValues) {
        return {
          firstName: formValues[0],
          lastName: formValues[1],
          position: formValues[2],
          grade: formValues[3],
          jersey: formValues[4],
          city: formValues[5],
          state: formValues[6],
          email: formValues[7],
          phone: formValues[8]
        };
      } else {
        console.log("formValues is false");
      }
    } catch (error) {
      return false;
    }
  }
}
