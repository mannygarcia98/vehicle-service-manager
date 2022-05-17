async function newVehicleHandler() {
  const year = document.querySelector("#newVehicleYear").value;
  const make = document.querySelector("#newVehicleMake").value;
  const model = document.querySelector("#newVehicleModel").value;
  const license_plate = document.querySelector("#newVehicleLicense");
}

document.querySelector("#submitnewVehicle").addEventListener("click", newVehicleHandler);
