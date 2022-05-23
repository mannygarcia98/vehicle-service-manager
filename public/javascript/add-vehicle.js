async function newVehicleHandler() {
  const year = document.querySelector("#newVehicleYear").value;
  const make = document.querySelector("#newVehicleMake").value;
  const model = document.querySelector("#newVehicleModel").value;
  const license_plate = document.querySelector("#newVehicleLicense").value;
  const owner_id = document.querySelector("#owner_id").innerHTML;
  // const owner_id =;
  console.log(`${year} ${make} ${model} ${license_plate} ${owner_id}`);

  const response = await fetch(`/dashboard/vehicle`, {
    method: "POST",
    body: JSON.stringify({
      year,
      make,
      model,
      license_plate,
      owner_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
    // console.log("ok");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#submitNewVehicle").addEventListener("click", newVehicleHandler);
