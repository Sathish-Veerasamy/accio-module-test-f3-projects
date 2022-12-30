
async function getIp(){

 await fetch("https://api.ipify.org/?format=json")
  .then((data)=>
  {
    return data.json();
  }).then((res)=>{
    let ip=document.getElementById("ID");
    ip.textContent=res.ip;
    
  })
}
function LoadPage(){
  window.location.href="./mainpage.html";
}

