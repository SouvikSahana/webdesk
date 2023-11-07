async function addData(id){
    // console.log(id)
    const response=await fetch(`/getitem/${id}`)
    const data=await response.json()
// console.log(data)
    //adding data to template
            document.getElementById("product-name").textContent = data.product_name;
            document.getElementById("product-detail").textContent = data.product_detail;
            document.getElementById("company-name").textContent = `By ${data.company_name}`;
            document.getElementById("warranty").textContent = data.warranty;
            document.getElementById("mrp").textContent = `MRP: ₹${data.mrp}`;
            document.getElementById("price").textContent = `Price: ₹${data.price}`;
            document.getElementById("count").textContent = `In Stock: ${data.count}`;


            const imagesContainer = document.getElementById("images");
            // Assuming images is an array of image URLs
            data.images.forEach((imageUrl) => {
                const arrayBufferView = new Uint8Array(imageUrl.image.data);
                const blob = new Blob([arrayBufferView], { type: "image/png" }); 
                const urlCreator = window.URL || window.webkitURL;
                const imgUrl = urlCreator.createObjectURL(blob);
                const img = document.createElement("img");
                img.src = imgUrl;
                img.setAttribute('class',"image")
                imagesContainer.appendChild(img);
            });
            let slides = document.getElementsByTagName("img");
            for (i = 1; i <= slides.length; i++) {
                slides[i].style.display = "none";  
             }
            
}


const urlParams= new URLSearchParams(window.location.search)
const id=urlParams.get("id")
addData(id)



//sliding images
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByTagName("img");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}