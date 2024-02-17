let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let small = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create';
let tmp;




//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        small.innerHTML = result;
        small.style.background = "#040";
    } else {
        small.style.background = "#a00d02";
        small.innerHTML = '';
    }
}



let arrayProducts;
if (localStorage.clientData != null) {
    arrayProducts = JSON.parse(localStorage.clientData)
} else {
    arrayProducts = [];
}




//create project
submit.onclick = function () {
    let objProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        small: small.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    //count
    if(title.value != '' &&
     price.value != '' &&
      category.value != ''&&
      objProduct.count < 100){
      if (mood === 'create') {
        if (objProduct.count > 1) {
            for (let i = 0; i < objProduct.count; i++) {
                arrayProducts.push(objProduct);
            }
        } else {
            arrayProducts.push(objProduct);

        }
    } else {
        arrayProducts[tmp] = objProduct;
        mood = 'create';
        submit.innerHTML = 'create'
        count.style.display = 'block'
    }      clearData();

    }
    

    localStorage.setItem('clientData', JSON.stringify(arrayProducts))
    showData();
}



//clear data after add it
function clearData() {
    title.value = '',
        price.value = '',
        taxes.value = '',
        ads.value = '',
        discount.value = '',
        small.innerHTML = '',
        count.value = '',
        category.value = ''
};





//read
function showData() {
    let table = '';
    getTotal();
    for (let i = 0; i < arrayProducts.length; i++) {
        table +=
            `<tr>
    <td>${i+1}</td>
    <td>${arrayProducts[i].title}</td>
    <td>${arrayProducts[i].price}</td>
    <td>${arrayProducts[i].taxes}</td>
    <td>${arrayProducts[i].ads}</td>
    <td>${arrayProducts[i].discount}</td>
    <td>${arrayProducts[i].small}</td>
    <td>${arrayProducts[i].category}</td>
    <td> <button onclick="updateData(${i})">update</button>  </td>
    <td><button onclick="deleteData(${i})">delete</button></td>
    </tr>`
            ;
    }
    document.getElementById('tbody').innerHTML = table;
    let delAll = document.getElementById('deleteAll');
    if (arrayProducts.length > 0) {
        delAll.innerHTML = `
    <button onclick="deleteAll()">Delete All(${arrayProducts.length})</button>
    `
    } else {
        delAll.innerHTML = '';
    }

}
showData();



//update
function updateData(id) {
    title.value = arrayProducts[id].title;
    price.value = arrayProducts[id].price;
    taxes.value = arrayProducts[id].taxes;
    ads.value = arrayProducts[id].ads;
    discount.value = arrayProducts[id].discount;
    getTotal();
    count.style.display = "none";
    category.value = arrayProducts[id].category;
    submit.innerHTML = "Update";
    mood = 'update';
    tmp = id;
    scroll({ top: 0, behavior: "smooth" })
}

//delete 
function deleteData(id) {
    arrayProducts.splice(id, 1);
    localStorage.clientData = JSON.stringify(arrayProducts);
    showData();

}





//deleteAll
function deleteAll() {
    arrayProducts.splice(deleteAll);
    localStorage.clear();
    showData();
}





//search Mood
let searchMood = 'title';

function getSearch(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';


    } search.placeholder = 'search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}





//search data
function searchData(value) {
    let table = '';
    for (let i = 0; i < arrayProducts.length; i++) {

        if (searchMood == 'title') {
            if (arrayProducts[i].title.includes(value.toLowerCase())) {
                table +=
                    `<tr>
    <td>${i}</td>
    <td>${arrayProducts[i].title}</td>
    <td>${arrayProducts[i].price}</td>
    <td>${arrayProducts[i].taxes}</td>
    <td>${arrayProducts[i].ads}</td>
    <td>${arrayProducts[i].discount}</td>
    <td>${arrayProducts[i].small}</td>
    <td>${arrayProducts[i].category}</td>
    <td> <button onclick="updateData(${i})">update</button>  </td>
    <td><button onclick="deleteData(${i})">delete</button></td>
    </tr>`
                    ;
            }

        } else {

            if (arrayProducts[i].category.includes(value.toLowerCase())) {
                table +=
                    `<tr>
        <td>${i}</td>
        <td>${arrayProducts[i].title}</td>
        <td>${arrayProducts[i].price}</td>
        <td>${arrayProducts[i].taxes}</td>
        <td>${arrayProducts[i].ads}</td>
        <td>${arrayProducts[i].discount}</td>
        <td>${arrayProducts[i].small}</td>
        <td>${arrayProducts[i].category}</td>
        <td> <button onclick="updateData(${i})">update</button>  </td>
        <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>`
                    ;
            }

        }


        document.getElementById('tbody').innerHTML = table;

    }

}
