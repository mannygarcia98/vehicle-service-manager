async function editFormHandler() {
  //need a way to get id of vehicle thats being edited
  const year = document.querySelector("#editYear").value;
  const make = document.querySelector("#editMake").value;
  const model = document.querySelector("#editModel").value;
  const license_plate = document.querySelector("#editLicense").value;
  console.log(`${year} ${make} ${model} ${license_plate}`);
}

document.querySelector("#submitVehicleEdit").addEventListener("click", editFormHandler);
