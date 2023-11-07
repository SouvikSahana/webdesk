// Get references to the input element and the image container
const imageInput = document.getElementById("images");
const imageContainer = document.getElementById("imageContainer");
// 

// Add an event listener to the input element
imageInput.addEventListener("change", function () {
    imageContainer.innerHTML = ""; // Clear the previous images
    // Loop through the selected files
    for (const file of imageInput.files) {
        if (file.type.startsWith("image/")) {
            const imgElement = document.createElement("img");
            console.log(file)
            imgElement.src = URL.createObjectURL(file); // Create a URL for the file
            imgElement.classList.add("selected-image");
            imageContainer.appendChild(imgElement);
        }
    }
});

// form.addEventListener("submit",(e)=>{
//     e.preventDefault()
//     const product_name=form.elements.product_name.value
//     const product_detail= form.elements.product_detail.value
//     const company_name=form.elements.company_name.value
//     const warranty= form.elements.warranty.value
//     const mrp=form.elements.mrp.value
//     const price= form.elements.price.value
//     const count= form.elements.count.value

// })
async function insertDataToForm(){
    try{
        const urlParams= new URLSearchParams(window.location.search)
        const id=urlParams.get("id")
        if(id){
            document.title="Update Item"
            document.getElementById("heading").innerText="Update Item"
            const form=document.getElementById("myForm")
            const response=await fetch(`/getitem/${id}`)
            const data=await response.json()
            // console.log(data)
        //injecting data
        form.elements.product_name.value=data.product_name;
        form.elements.product_detail.value=data.product_detail;
        form.elements.company_name.value=data.company_name;
        form.elements.warranty.value= data.warranty;
        form.elements.mrp.value= data.mrp;
        form.elements.price.value=data.price;
        form.elements.count.value=data.count;
        const inp=document.createElement("input")
        inp.setAttribute("id","_id")
        inp.setAttribute("name","_id")
        inp.readOnly=true
        inp.value=id
        form.insertBefore(inp, form.firstChild)

        //injecting images
        const files=[]
        data.images.forEach(async (imageUrl,index) => {
            const imageData = new Uint8Array(imageUrl.image.data);
            const base64Image = 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, imageData));
            // console.log(base64Image);

            fetch(base64Image)
            .then((response) => response.blob())
            .then(async (blob) => {
              const file = new File([blob], `image${index}.png`, { type: "image/png" });
              files.push(file);
        
              if (files.length === data.images.length) {
                const dataTransfer = new DataTransfer();
                files.forEach(async(file) => {
                     dataTransfer.items.add(file);
                });
                // All files have been processed, update the input field
                const imageInput = document.getElementById('images');
                imageInput.files = dataTransfer.files;
                for (const file of imageInput.files) {
                    if (file.type.startsWith("image/")) {
                        const imgElement = document.createElement("img");
                        console.log(file)
                        imgElement.src = URL.createObjectURL(file); // Create a URL for the file
                        imgElement.classList.add("selected-image");
                        imageContainer.appendChild(imgElement);
                    }
                }
              }
            });
        });
        }else{
            console.log("no id")
        }
    }catch(error){
    
    }
}
insertDataToForm()
