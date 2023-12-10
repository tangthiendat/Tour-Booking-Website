const registerForm = document.querySelector("#register-form");
const password = document.querySelector("#password");
const userName = document.querySelector("#username");
const confirmPassword = document.querySelector("#confirm-password");
const agree = document.querySelector("#agree");

const iconShowPassword = document.querySelector(".show-password");
const iconShowConfirmPassword = document.querySelector(".show-confirm-password");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (confirmPassword.value !== password.value) {
        alert("Mật khẩu không khớp");
    } else if (!agree.checked) {
        alert("Hãy đồng ý các điều khoản và điều kiện");
    } else {
        const user = {
            username: userName.value,
            email: email.value,
            password: password.value,
        };
        localStorage.setItem(email.value, JSON.stringify(user));
        alert("Đăng ký thành công");
        window.location.href = "login.html";
    }
});

iconShowPassword.addEventListener("click", function () {
    password.type = password.type === "password" ? "text" : "password";
});

iconShowConfirmPassword.addEventListener("click", function () {
    confirmPassword.type = confirmPassword.type === "password" ? "text" : "password";
});
