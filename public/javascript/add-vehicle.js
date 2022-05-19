async function newVehicleHandler() {
  const year = document.querySelector("#newVehicleYear").value;
  const make = document.querySelector("#newVehicleMake").value;
  const model = document.querySelector("#newVehicleModel").value;
  const license_plate = document.querySelector("#newVehicleLicense").value;
  console.log(`${year} ${make} ${model} ${license_plate}`);

  const response = await fetch(`/vehicle`, {
    method: "POST",
    body: JSON.stringify({
      year,
      make,
      model,
      license_plate,
    }),
    header: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    alert("vehicle added");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#submitNewVehicle").addEventListener("click", newVehicleHandler);
