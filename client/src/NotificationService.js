import Swal from "sweetalert2";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

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
            document.getElementById("swal-input1").value,
            // @ts-ignore
          ];
        },
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
            document.getElementById("swal-input1").value,
            // @ts-ignore
          ];
        },
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

  static async editEvent(event) {
    try {
      debugger;
      const { value: formValues } = await Swal.fire({
        title: "Edit Event...",
        html:
          `<h3>Title</h3><input id="title" value="${event.title}" class="swal2-input" placeholder="Title..." required>` +
          `<h3>Description</h3><input id="description" value="${event.description}" class="swal2-input" placeholder="Description..." required>` +
          `<h3>Location</h3><input id="location" class="swal2-input" value="${event.location ||
            ""}" placeholder="Location..." required>` +
          `<h3>Date</h3><input id="date" type="date" value="${formatDate(
            event.date
          )}" class="swal2-input" placeholder="Date..." required>`,
        focusConfirm: false,

        preConfirm: () => {
          return [
            // @ts-ignore
            document.getElementById("title").value,
            // @ts-ignore
            document.getElementById("description").value,
            // @ts-ignore
            document.getElementById("location").value,
            // @ts-ignore
            document.getElementById("date").value,
          ];
        },
      });

      if (formValues) {
        return {
          _id: event._id,
          title: formValues[0],
          description: formValues[1],
          location: formValues[2],
          date: formValues[3],
        };
      } else {
        console.log("formValues is false");
      }
    } catch (error) {
      return false;
    }
  }

  // @ts-ignore
  static async editPost(content = "Enter Content") {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit Post",
        html: `<h3>Content</h3><input id="content" class="swal2-input" placeholder="Post...">`,
        focusConfirm: false,
        preConfirm: () => {
          // @ts-ignore
          return [document.getElementById("content").value];
        },
      });

      if (formValues) {
        return {
          content: formValues[0],
        };
      } else {
        console.log("formValues is false");
      }
    } catch (error) {
      return false;
    }
  }

  static async editPlayer(
    // @ts-ignore
    firstName = "firstName",
    // @ts-ignore
    lastName = "lastName",
    // @ts-ignore
    position = "position",
    // @ts-ignore
    grade = "grade",
    // @ts-ignore
    jerseyNumber = "jersey",
    // @ts-ignore
    homeCity = "city",
    // @ts-ignore
    homeState = "state",
    // @ts-ignore
    email = "email",
    // @ts-ignore
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
          `<h3>City</h3><input id="homeCity" class="swal2-input" placeholder="City...">` +
          `<h3>State</h3><input id="homeState" class="swal2-input" placeholder="State...">` +
          `<h3>Email</h3><input id="email" class="swal2-input" placeholder="Email...">` +
          `<h3>Phone Number</h3><input id="phoneNumber" class="swal2-input" placeholder="Phone...">`,
        focusConfirm: false,

        preConfirm: () => {
          return [
            // @ts-ignore
            document.getElementById("firstName").value,
            // @ts-ignore
            document.getElementById("lastName").value,
            // @ts-ignore
            document.getElementById("position").value,
            // @ts-ignore
            document.getElementById("grade").value,
            // @ts-ignore
            document.getElementById("jersey").value,
            // @ts-ignore
            document.getElementById("homeCity").value,
            // @ts-ignore
            document.getElementById("homeState").value,
            // @ts-ignore
            document.getElementById("email").value,
            // @ts-ignore
            document.getElementById("phoneNumber").value,
          ];
        },
      });

      if (formValues) {
        return {
          firstName: formValues[0],
          lastName: formValues[1],
          position: formValues[2],
          grade: formValues[3],
          jerseyNumber: formValues[4],
          homeCity: formValues[5],
          homeState: formValues[6],
          email: formValues[7],
          phoneNumber: formValues[8],
        };
      } else {
        console.log("formValues is false");
      }
    } catch (error) {
      return false;
    }
  }
}
