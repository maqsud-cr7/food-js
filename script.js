/* const user = {
    name:"Вася",
    surname: "Васильев",
    get fullName() {
        return `${this.name} ${this.surname}` 
    },
    set fullName(value) {
        let arr = value.split(" ")
        this.name = arr[0];
        this.surname = arr[1];
    }
}

console.log(user.fullName);
user.fullName = "Петя Петров"
console.log(user.fullName); */


// Создаем основной объект Бургеров 
const product = {
    plainBurger: {
        name: "Гамбургер простой",
        kcall: 400,
        price: 10000,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        kcall: 500,
        price: 20500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        kcall: 700,
        price: 31900,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}

// Создаем объект ингредиентов
const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30
    }
}

// ---------- Подключаемся к кнопкам + и -  -------------
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
// console.log(btnPlusOrMinus);
// перебираем все кнопки + и - 
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    // элемента.closest("селектор") - возвращает указанного родителя элемента
    const parent = element.closest(".main__product")
    // hasAttribute("name") - возвращает true если атрибут есть
    // setAttribute("name", "value") - устанавливает атрибут со значением
    // removeAttribute("name") - удаляет атрибут
    // getAttribute("name") - возвращает значение из атрибута
    const parentId = parent.getAttribute("id"); // получаем значение атрибута id
    const elementData = element.getAttribute("data-symbol") // получаем знак + или -
    if (elementData == "+" && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementData == "-" && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    const out = parent.querySelector(".main__product-num") // в секции подключаемся к полю кол-во товара
    const price = parent.querySelector(".main__product-price span") // в секции подключаемся к стоимости товара
    const kcall = parent.querySelector(".main__product-kcall span") // в секции подключаемся к колориям товара
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

// ------ чекбоксы ингредиентов --------
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener("click", function () {
        addExtraProduct(this)
    })
}

// функция работы чекбокса
function addExtraProduct(element) {
    const parent = element.closest(".main__product");
    const parentId = parent.getAttribute("id"); // получаем значение атрибута id
    const elAtr = element.getAttribute("data-extra")
    product[parentId][elAtr] = element.checked;
    if (product[parentId][elAtr] === true) {
        product[parentId].price += extraProduct[elAtr].price
        product[parentId].kcall += extraProduct[elAtr].kcall
    } else {
        product[parentId].price -= extraProduct[elAtr].price
        product[parentId].kcall -= extraProduct[elAtr].kcall
    }
    const price = parent.querySelector(".main__product-price span") // в секции подключаемся к стоимости товара
    const kcall = parent.querySelector(".main__product-kcall span") // в секции подключаемся к колориям товара
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

// кнопка "Заказать"
const addCart = document.querySelector('.addCart');
// поключаемся к модальному окну
const receipt = document.querySelector('.receipt');
// подключение к форме чека 
const receiptWindow = document.querySelector('.receipt__window');
// описание чека
const receiptOut = document.querySelector('.receipt__window-out');
// кнопка чека
const receiptBtn = document.querySelector('.receipt__window-btn');

//--- Вывод стоимости заказа
let totalName = "" // вывод выбранных продуктов
let totalPrice = 0 // вывод общей стоимости
let totalKcall = 0 // вывод общей коллорийности 
const arrayProduct = []; // выбранная продукция

/* let a = { name: "Вася"}
let b = a;
console.log(a);
console.log(b);
b.name = "Петя"
console.log(a);
console.log(b);
 */
addCart.addEventListener("click", function () {
    for (const key in product) {
        // po - объект продукта
        const po = product[key]
        if (po.amount > 0) {
            //добавляем выбранный продукт в массив
            arrayProduct.push(po)
            //перебор ключей продукта
            for (const infoKey in po) {
                // проверяем наличие дополнительных ингредиентов
                if (po[infoKey] === true) {
                    // "\n" - символ переноса строки
                    po.name = po.name + "\n" + extraProduct[infoKey].name
                }
            }
        }
        po.price = po.Summ
        po.kcall = po.Kcall
    }
    //Перебираем выбранные товары
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += "\n" + el.name + "\n"
    }
    receiptOut.innerHTML = `Вы купили: \n${totalName}\nКаллорийность: ${totalKcall}\nСтоимость покупки: ${totalPrice}`
    console.log(arrayProduct);
    receipt.style.display = "flex";
    setTimeout(() => {
        receipt.style.opacity = "1";
        receiptWindow.style.top = "0";
    }, 100);
    document.body.style.overflow = "hidden";

    const out = document.querySelectorAll(".main__product-num") // в секции подключаемся к полю кол-во товара
    const price = document.querySelectorAll(".main__product-price span") // в секции подключаемся к стоимости товара
    const kcall = document.querySelectorAll(".main__product-kcall span") // в секции подключаемся к колориям товара
    for (let i = 0; i < out.length; i++) {
        out[i].innerHTML = "0";
        price[i].innerHTML = 0;
        kcall[i].innerHTML = 0;     
    }
})

receiptBtn.addEventListener("click", function () {
    location.reload()
})
console.dir(document); // DOM
console.dir(window); // BOM

// Анимированный логотип с помошью рекурсии
const logoTime = document.querySelector(".header__timer-extra")

function logoTimer() {
    logoTime.innerHTML++
    if (logoTime.innerHTML < 50) {
        speed = setTimeout(() => logoTimer(), 10);
    } else if (logoTime.innerHTML < 75) {
        speed = setTimeout(() => logoTimer(), 50);
    } else if (logoTime.innerHTML < 100) {
        speed = setTimeout(() => logoTimer(), 100);
    }
    if (logoTime.innerHTML == 100) {
        clearTimeout(speed)
    }
}
logoTimer() 

const productInfo = document.querySelectorAll(".main__product-info");

for (let i = 0; i < productInfo.length; i++) {
    productInfo[i].addEventListener("dblclick", function () {
        dblclick(this);
    })
}

function dblclick(element) {
    const parent = element.closest(".main__product-info");
    const img = parent.querySelector(".main__product-img");
    const close = document.querySelector(".view__close");
    const viewImg = document.querySelector(".view img");
    const attribute = img.getAttribute("src");
    viewImg.removeAttribute("src");
    viewImg.setAttribute("src", attribute);
    const view = document.querySelector(".view");
    view.classList.add("active");
    close.addEventListener("click", () => {
        const view = document.querySelector(".view");
        view.classList.remove("active");
    })
}