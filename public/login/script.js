const form =document.getElementById("myForm")

form.addEventListener("submit",async (event)=>{
    event.preventDefault()
    const username=form.elements.username.value
    const password=form.elements.password.value

    const data={username,password}
    const options={
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }
    const response=await fetch("/signin",options)
    const responseData=await response.json()
    if(responseData.message){
        alert(responseData.message)
        form.elements.username.value="";
        form.elements.password.value=""
    }
    console.log(responseData)
})