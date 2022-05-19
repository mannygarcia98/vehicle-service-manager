async function deleteFormHandler() {
  //need to figure out a way to determine which delete button was clicked
  const id = document.querySelector("#id");

  const response = await fetch(`/vehicle/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".delete-vehicle").addEventListener("click", deleteFormHandler);
