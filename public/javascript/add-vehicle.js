async function newVehicleHandler() {
  const year = document.querySelector("#newVehicleYear").value;
  const make = document.querySelector("#newVehicleMake").value;
  const model = document.querySelector("#newVehicleModel").value;
  const license_plate = document.querySelector("#newVehicleLicense").value;
  console.log(`${year} ${make} ${model} ${license_plate}`);
}

document.querySelector("#submitNewVehicle").addEventListener("click", newVehicleHandler);
