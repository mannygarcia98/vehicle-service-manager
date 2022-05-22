async function deleteFormHandler(e) {
  let target = e.target;
  id = target.getAttribute("id");
  console.log(id);
  const response = await fetch(`/dashboard/vehicle/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

const deleteButton = document.querySelectorAll(".fa-trash");

deleteButton.forEach((element) => {
  element.addEventListener("click", deleteFormHandler);
});
