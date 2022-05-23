// Signup Form
async function signupFormHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector("#fname-signup").value.trim();
  const last_name = document.querySelector("#lname-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // validation check for all filled forms to then post user
  if (first_name && last_name && email && password) {
    const response = await fetch("/api/login/signup", {
      method: "post",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // check the response status
    if (response.ok) {
      document.location.replace("/api/login/logins");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#signinSubmit").addEventListener("click", signupFormHandler);
