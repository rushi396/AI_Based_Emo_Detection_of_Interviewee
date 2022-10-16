console.log("Emotion Detection System");

async function sendTheFieToServer(event) {
    event.preventDefault();
    file=document.getElementById('file').files[0];




    console.log(file);

    if(!!file){
        console.log("file found");


        let fileToBeSend=new FormData();
        fileToBeSend.append("file",file);

        try {
            let response=await fetch("/savethefile",{
                method:"POST",
                body:fileToBeSend
            });
            console.log(response);
            let result=await response.json();
            console.log(result);
            window.alert(result.response);
            document.getElementById('filename').innerText="Upload Your file Here";

        } catch (error) {
            console.log(error);
        }
    }else{
        window.alert("Please Select the file first");
    }



    console.log("File is submitted to Javascript");
}



function renderFileName(event) {
    file=document.getElementById('file').files[0];
    filename=document.getElementById('filename');
    console.log(file);
    if(!!file){
        console.log("file found");
        filename.innerText=file.name;
    }else{
        filename.innerText="Upload Your file Here";
    }

}



