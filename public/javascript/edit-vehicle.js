async function editFormHandler() {
  //need a way to get id of vehicle thats being edited
  const year = document.querySelector("#editYear").value;
  const make = querySelector("#editMake").value;
  const model = querySelector("#editModel").value;
  const license_plate = document.querySelector("#editLicense").value;
}

document.querySelector("#submitVehicleEdit").addEventListener("click", editFormHandler);
