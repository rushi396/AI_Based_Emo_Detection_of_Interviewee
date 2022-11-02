async function getResult(event) {
    event.preventDefault();
    let input=document.getElementById('input');
    if (input.value=="") {
        window.alert("Please Enter Your Text First");
    } else {
        window.alert("please Wait We are going to Perform some Machine Learning Task.......");
        try {
            let response=await fetch("/getresult",{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    input_text:input.value
                })
            });
            let result=await response.json();
            console.log(result);
            window.alert("result is fetched and shown below")
            document.getElementById('default').innerHTML=`
            <img src="https://images.unsplash.com/photo-1542865763-0339b28c4a34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="">
            <h2 style="color: royalblue">${result.data}</h2>
            <h3>Based on the input, we have tried to predict the emotion behind the input text</h3>
            
            `
        } catch (error) {
            console.log(error);
        }
    }
}