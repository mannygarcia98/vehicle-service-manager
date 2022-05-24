async function logout() {
  const response = await fetch("/api/login/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/");
}

document.querySelector("#logout").addEventListener("click", logout);
