window.onload = ()=>{

    fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    const ip = data.ip;
    const useripaddress= document.getElementById('ipaddy');
    useripaddress.innerHTML=`${ip}`;
})
.catch(error=>console.log(error));

const button = document.getElementById('btn-getstarted');
button.addEventListener('click',geo);

function geo(){
    console.log("geo");
    fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    const ip2 = data.ip;
    console.log("ipfetch done");

    fetch(`https://ipinfo.io/${ip2}/geo`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        const homepage = document.getElementById('homepage');
        homepage.style.display = 'none';
        const secondpage = document.getElementById('secondpage');
        secondpage.style.display='block';
    
        const newip = document.getElementById('ipaddy2');
        console.log(newip);
        newip.innerHTML = `${ip2} `;
        
        const long = document.getElementById('longspan');
        const lat = document.getElementById('latspan');
        const city = document.getElementById('cityspan');
        const region = document.getElementById('regionspan');
        const org = document.getElementById('orgspan');
        const hostname = document.getElementById('hostnamespan');
        let loc = data.loc.split(",");
        long.innerHTML=`${loc[1]}`;
        lat.innerHTML=`${loc[0]}`;
        city.innerHTML=`${data.city}`;
        region.innerHTML=`${data.region}`;
        org.innerHTML=`${data.org}`;
        hostname.innerHTML=`${data.hostname}`

        const map =document.getElementById('map');
        map.src=`https://maps.google.com/maps?q=${loc[0]}, ${loc[1]}&z=15&output=embed`;

        const timezone = document.getElementById('timezone');
        const datetime = document.getElementById('datetime');
        const pincode = document.getElementById('pincode');

        timezone.innerHTML=`${data.timezone}`;
        console.log(data.timezone);
        let properdatetime = new Date().toLocaleString("en-US",{ timeZone: `${data.timezone}` });
       console.log(properdatetime);
        datetime.innerHTML=`${properdatetime}`;
        pincode.innerHTML=`${data.postal};`

        search(data);


        function search(data){


fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
.then(response=>response.json())
.then(office=>{

    const message = document.getElementById('pinfound');
    //console.log(office[0].Message);
    message.innerHTML=`${office[0].Message}`;
    console.log(office);
    console.log(office[0].PostOffice[0]);
    const searchresult = document.getElementById('searchresult');
    display(office[0].PostOffice);
    
    function display(arr){
        const results = arr.length;
        console.log(results);
        for(let i=0;i<results;i++){

           const newdiv =  document.createElement('div');
           newdiv.classList.add('result');
           newdiv.innerHTML=`<h3>Name : ${arr[i].Name} </h3>
           <h3>Branch : ${arr[i].BranchType} </h3>
           <h3>Delivery ${arr[i].DeliveryStatus}</h3>
           <h3>District : ${arr[i].District}</h3>
           <h3>Division : ${arr[i].Division}</h3>`
           searchresult.appendChild(newdiv);
           
            

        }
    }
})
.catch(error=>console.log(error));
  

        }
        
        
    
    })
    .catch(error=>console.log(error));
    
    
})
    .catch(error => console.log(error));

    
}

const searchterm = document.getElementById('search');
searchterm.addEventListener('keyup',e=>{

    let key = e.target.value;
    console.log(key);
});
}
    





// btn.addEventListener('click',geo);

// function geo(){
// console.log("geo");
//     const homepage = document.getElementById('homepage');
//     // homepage.style.display = 'none';

// }