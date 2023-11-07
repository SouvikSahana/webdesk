const itemContainer=document.getElementById("itemContainer")
const productTemplate = document.getElementById('productTemplate');
const productContainer = document.getElementById('productContainer');
const searchInput= document.getElementById("search-input")
var  productData=[]

async function getItemData(){
    const response=await fetch("/getitems")
    const data=await response.json()

    //serach feature
    // console.log(data)
    productData.push(...data)
    data.forEach(product => {
        const clone = document.importNode(productTemplate.content, true);

        //setting up id to div.container
        clone.querySelector(".container").setAttribute("id",product._id)
        
        clone.querySelector('#companyName').textContent = product.company_name;
        clone.querySelector('#count').textContent = product.count || "Out of Stock";
        clone.querySelector('#countUnit').textContent = product.count?"Units":"";
        clone.querySelector('#mrp').textContent = product.mrp;
        clone.querySelector('#price').textContent = product.price;
        // clone.querySelector('#productDetail').textContent = product.product_detail;
        clone.querySelector('#productName').textContent = product.product_name;
        clone.querySelector('#warranty').textContent = product.warranty || "No warrenty";


        try{
            const arrayBufferView = new Uint8Array(product.images[0].image.data);
        const blob = new Blob([arrayBufferView], { type: "image/png" }); 
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        clone.querySelector("#image").src=imageUrl
        }catch(error){
            clone.querySelector("#image").src="../adminpage/warranty.jpg"
        }
        

        productContainer.appendChild(clone);
    });
}
getItemData()

async function redirectItem(a){
        // console.log(a.id)
        window.location.assign("../productitem?id="+a.id)
}

searchInput.addEventListener("input",(e)=>{
    const sortedTextData= e.target.value.toUpperCase()
    
    const data=productData.filter((product)=>{
        if(product.product_name.toUpperCase().search(sortedTextData)>=0 || product.company_name.toUpperCase().search(sortedTextData)>=0 || product.product_detail.toUpperCase().search(sortedTextData)>=0){
            document.getElementById(product._id).style.display="block"
            return product._id
        }else{
            document.getElementById(product._id).style.display="none"
        }
    })
    if(data.length==3){
        productContainer.style.maxWidth="1050px" 
    }else if(data.length==2){
        productContainer.style.maxWidth="700px" 
    }else if(data.length==1){
        productContainer.style.maxWidth="350px" 
    }
    else{
        productContainer.style.maxWidth="1300px"
    }
})
searchInput.addEventListener("change",(e)=>{

})
function clearSearchField(){
    searchInput.value=""
   productData.filter((product)=>{
    document.getElementById(product._id).style.display="block"
    })
    productContainer.style.maxWidth="1300px"
}