// Get references to the input element and the image container
const imageInput = document.getElementById("images");
const imageContainer = document.getElementById("imageContainer");
// const form=document.getElementById("myForm")

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