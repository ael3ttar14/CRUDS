let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCategory = document.getElementById('productCategory');
let productDesc = document.getElementById('productDesc');
let addBtn = document.getElementById('addBtn');
let updateBtn = document.getElementById('updateBtn');
let productList = [];
let currentIndex = null;

if(localStorage.getItem('products')){
    productList = JSON.parse(localStorage.getItem('products'));
    showProducts();
}

function addProduct(){

    if(!validateProductName())
    {
        let error = document.getElementById("error");
        error.classList.replace("d-none","d-block");}
else 
    {
        let product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    };
    productList.push(product);
    localStorage.setItem('products', JSON.stringify(productList));
    showProducts();
    clearForm();
    showToast('Product Added!');
            error.classList.replace("d-block","d-none");


    }
}
function clearForm(){
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
}

function showProducts(list = productList){
    let temp = '';
    for(let i=0;i<list.length;i++){
        temp += `<tr class="new-row">
            <td>${i+1}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
            <td>${list[i].desc}</td>
            <td>
                <button onclick="setFormForUpdate(${i})" class="btn btn-warning btn-sm action-btn" data-bs-toggle="tooltip" data-bs-title="Edit Product">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </td>
            <td>
                <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm action-btn" data-bs-toggle="tooltip" data-bs-title="Delete Product">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`;
    }
    document.getElementById('tableBody').innerHTML = temp;
}

function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem('products', JSON.stringify(productList));
    showProducts();
    showToast('Product Deleted!');
}

function searchProducts(term){
    let matchedProducts = [];
    for(let i=0;i<productList.length;i++){
        if(productList[i].name.toLowerCase().includes(term.toLowerCase())){
            matchedProducts.push(productList[i]);
        }
    }
    showProducts(matchedProducts);
}

function setFormForUpdate(index){
    currentIndex = index;
    addBtn.classList.replace("d-block","d-none");
    updateBtn.classList.replace("d-none","d-block");
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productDesc.value = productList[index].desc;
    window.scrollTo({top:0,behavior:'smooth'});
}

function returnAdd(){
    addBtn.classList.replace("d-none","d-block");
    updateBtn.classList.replace("d-block","d-none");
}

function updateProduct(){
    let product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    };
    productList.splice(currentIndex,1,product);
    localStorage.setItem('products', JSON.stringify(productList));
    showProducts();
    clearForm();
    returnAdd();
    showToast('Product Updated!');
}

let scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function(){
    if(document.body.scrollTop>200 || document.documentElement.scrollTop>200){
        scrollTopBtn.style.display="block";
    } else {
        scrollTopBtn.style.display="none";
    }
};
scrollTopBtn.onclick = function(){
    window.scrollTo({top:0,behavior:'smooth'});
};

function showToast(message,duration=3000){
    let toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(()=>{toast.classList.remove('show');},duration);
}

function validateProductName(){

    let regex= /^[A-Z][a-z]{3,8}$/;
    return regex.test(productName.value);

}