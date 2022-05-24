const editButton = document.querySelectorAll(".editButton");
let id;

function getId(e) {
  let target = e.target;
  id = target.getAttribute("id");
  // console.log(id);
  return id;
}

async function editFormHandler() {
  const year = document.querySelector("#editYear").value;
  const make = document.querySelector("#editMake").value;
  const model = document.querySelector("#editModel").value;
  const license_plate = document.querySelector("#editLicense").value;
  console.log(`${year} ${make} ${model} ${license_plate} ${id}`);

  if (year && make && model && license_plate) {
    const response = await fetch(`/dashboard/vehicle/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        year,
        make,
        model,
        license_plate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

editButton.forEach((element) => {
  element.addEventListener("click", getId);
});

document.querySelector("#submitVehicleEdit").addEventListener("click", editFormHandler);
