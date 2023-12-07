function signUp(e) {
    event.preventDefault();    
    let userName = document.querySelector("#username");    
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let confirm_password = document.querySelector("#confirm-password");
    var user = {
        username : userName.value,
        email : email.value,
        password : password.value,
        confirm_password : confirm_password.value,
    };
    var json = JSON.stringify(user);
    localStorage.setItem(email.value, json);
    alert("Đăng ký thành công");
}

function login(e) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let user1 = localStorage.getItem(email);
    let data = JSON.parse(user1);
    if (user1 == null) {
        alert("Vui lòng nhập email để đăng nhập");
    }else if (email == data.email && password == data.password) {
        alert("Đăng nhập thành công");
        window.location.href = "index.html";
    }else
        alert("Đăng nhập thất bại");
}