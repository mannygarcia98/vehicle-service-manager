async function logout() {
  const response = await fetch("/api/login/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/");

  // if (response.ok) {
  //   document.location.replace("/api/login/logins");
  //   console.log("logged out");
  // } else {
  //   alert(response.statusText);
  // }
}

document.querySelector("#logout").addEventListener("click", logout);
