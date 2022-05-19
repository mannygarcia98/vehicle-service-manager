async function appointmentFormHandler() {
  const vehicle = document.querySelector("#vehicleApp").value;
  const service = document.querySelector("#service").value;
  const date = document.querySelector("#appointmentDate").value;
  console.log(`${vehicle} ${service} ${date}`);
}

document.querySelector("#submitServiceRequest").addEventListener("click", appointmentFormHandler);
