const loginForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const iconShowPassword = document.querySelector(".show-password");

loginForm.addEventListener("submit", function (event) {
    const userData = localStorage.getItem(email.value);
    event.preventDefault();
    if (userData) {
        const user = JSON.parse(userData);
        if (email.value === user.email && password.value === user.password) {
            alert("Đăng nhập thành công");
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "index.html";
        } else {
            alert("Email hoặc mật khẩu không đúng");
        }
    } else {
        alert("Email hoặc mật khẩu không đúng");
    }
});

iconShowPassword.addEventListener("click", function () {
    password.type = password.type === "password" ? "text" : "password";
});
