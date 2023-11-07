const itemContainer=document.getElementById("itemContainer")
const productTemplate = document.getElementById('productTemplate');
const productContainer = document.getElementById('productContainer');

async function getItemData(){
    const response=await fetch("/getitems")
    const data=await response.json()
    data.forEach(product => {
        const clone = document.importNode(productTemplate.content, true);
    // console.log(product._id)
    const deleteId=document.createElement("div")
    deleteId.setAttribute("id",product._id)

        clone.querySelector(".visible").setAttribute("id",product._id)

        clone.querySelector('#companyName').textContent = product.company_name;
        clone.querySelector('#count').textContent = product.count || "Out of Stock";
        clone.querySelector('#countUnit').textContent = product.count?"Units":"";
        clone.querySelector('#mrp').textContent = product.mrp;
        clone.querySelector('#price').textContent = product.price;
        clone.querySelector('#productDetail').textContent = product.product_detail;
        clone.querySelector('#productName').textContent = product.product_name;
        clone.querySelector('#warranty').textContent = product.warranty || "No warrenty";

        clone.querySelector('#productName').appendChild(deleteId)

        try{
            const arrayBufferView = new Uint8Array(product.images[0].image.data);
        const blob = new Blob([arrayBufferView], { type: "image/png" }); 
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        clone.querySelector("#image").src=imageUrl
        }catch(error){
            clone.querySelector("#image").src="./warranty.jpg"
        }
        

        productContainer.appendChild(clone);
    });
}
getItemData()

async function deleteItem(a){
    const isUserWantDelete=confirm("You want to delet this item?")
    if(isUserWantDelete){
        const divId=a.querySelector('div').id
        console.log(divId)
        const response=await fetch("/deleteitem/"+divId)
        const data=await response.json()
        if(data.message){
            alert(data.message)
        }
    }
}

async function updateItem(item){
    window.location.assign("../additem?id="+item.id)
}