const formatCurrency = function (amount, locale = "vi-VN") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
};

const isExistedInCart = function (item, arrCart) {
    let myIndex = -1;
    arrCart.forEach((itemCart, index) => {
        if (item.id === itemCart.id) {
            myIndex = index;
        }
    });
    return myIndex;
};

const loadShoppingCart = function () {
    let updatedCart = [];
    const selectItem = (event) => {
        const linkClicked = event.target;
        const itemInfo = linkClicked.parentElement.previousElementSibling;

        if (typeof Storage !== undefined) {
            if (localStorage.getItem("loggedInUser")) {
                const quantityInput = linkClicked.previousElementSibling;
                if (quantityInput.value) {
                    let newItem = {
                        id: itemInfo.children[0].textContent,
                        name: itemInfo.children[1].textContent,
                        price: itemInfo.children[4].textContent,
                        quantity: quantityInput.valueAsNumber,
                    };
                    //Kt cartItems co trong local storage chua => chua co thi tao moi
                    if (JSON.parse(localStorage.getItem("cartItems")) === null) {
                        updatedCart.push(newItem);
                        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                        window.location.reload();
                    } else {
                        const updatedCart = JSON.parse(localStorage.getItem("cartItems"));
                        const index = isExistedInCart(newItem, updatedCart);
                        //Sp ton tai trong cart => update so luong
                        if (index >= 0) {
                            console.log(updatedCart[index]);
                            updatedCart[index].quantity += quantityInput.valueAsNumber;
                        } else {
                            updatedCart.push(newItem);
                        }
                        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                    }
                    alert("Thêm vào giỏ hàng thành công");
                    window.location.reload();
                } else {
                    alert("Vui lòng chọn số lượng vé trước khi đặt");
                }
            } else {
                alert("Bạn cần đăng nhập để đặt tour du lịch.");
            }
        } else {
            alert("Local storage is not working on your browser");
        }
    };
    const attachingEvent = (event) => event.addEventListener("click", selectItem);
    const add2CartLinks = document.querySelectorAll(".book-now");
    let arrCartLinks = Array.from(add2CartLinks);
    arrCartLinks.forEach(attachingEvent);

    const navShopping = document.querySelector(".nav__shopping");
    navShopping.addEventListener("click", function () {
        if (localStorage.cartItems === undefined) {
            alert("Giỏ hàng trống. Hãy về trang tour du lịch để đặt vé.");
        } else {
            window.location.href = "cart.html";
        }
    });

    if (localStorage.cartItems != undefined) {
        const numberOrderedItems = document.querySelector(".nav__shopping .item-quantity");
        let numberOfItems = 0;
        let customerCart = JSON.parse(localStorage.getItem("cartItems"));
        customerCart.forEach((item) => {
            numberOfItems++;
        });
        numberOrderedItems.textContent = numberOfItems;
        if (numberOfItems === 0) {
            numberOrderedItems.classList.add("hidden");
        } else {
            numberOrderedItems.classList.remove("hidden");
        }
    }
};

const deleteCart = function (event) {
    let updatedCart = [];
    let customerCart = JSON.parse(localStorage.getItem("cartItems"));
    customerCart.forEach((item) => {
        if (item.id != event.parentElement.children[0].textContent) {
            updatedCart.push(item);
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.location.reload();
};

const showCart = function () {
    if (localStorage.cartItems == undefined) {
        alert("Giỏ hàng trống. Hãy về trang tour du lịch để đặt vé.");
        window.location.href = "product.html";
    } else {
        let customerCart = JSON.parse(localStorage.getItem("cartItems"));

        const cart = document.querySelector(".cart");
        const tblBody = document.querySelector(".payment-info tbody");
        let cartRows = (paymentRows = "");

        let total = (amountPaid = 0);
        let subTotal = 0;
        if (customerCart[0] === null) {
            document.querySelector(".payment").style.visibility = "hidden";
        } else {
            document.querySelector(".payment").style.visibility = "visible";
            customerCart.forEach((item) => {
                subTotal = Number(item.quantity) * Number(item.price.replace(/\D/g, ""));
                total += subTotal;

                cartRows += `<div class="cart-item">
                    <div class="place-img">
                        <img src="./images/products/product-${item.id}.jpg" alt="product-${item.id}" />
                    </div>

                    <div class="place-info">
                        <p class="product-id" hidden>${item.id}</p>
                        <h1 class="place-name">${item.name}</h1>
                        <p class="quantity">${item.quantity} vé x ${formatCurrency(item.price.replace(/\D/g, ""))}</p>
                        <h3 class="total">${formatCurrency(subTotal)}</h3>
                        <i class="fa-solid fa-trash icon-delete" onclick="deleteCart(this)" ;></i>
                    </div>
                </div>`;
            });
        }
        cart.innerHTML = cartRows;

        paymentRows += `<tr><td>Tổng:</td><td>${formatCurrency(total)}</td></tr>`;
        paymentRows += `<tr><td>VAT (10%):</td><td>${formatCurrency(Math.floor(total * 0.1))}</td></tr>`;
        paymentRows += `<tr><td>Tổng tiền:</td><td>${formatCurrency(Math.floor(total * 1.1))}</td></tr>`;
        tblBody.innerHTML = paymentRows;
    }
};
