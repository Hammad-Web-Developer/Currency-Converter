let url="https://v6.exchangerate-api.com/v6/d9ba93600b1a6c1b68c2b81c/latest/USD";
let amount=document.querySelector("#amount");
let dropDowns=document.querySelectorAll(".dropdown");
let fromCurr=document.querySelector("#fromdrop");
let toCurr=document.querySelector("#todrop");
let result=document.querySelector(".result");
let btn=document.querySelector("#btn");
for (let select of dropDowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name==="from" && currCode==="USD"){
       newOption.selected="selected";
      } else if(select.name==="to" && currCode==="PKR")  {                                          
        newOption.selected="selected";
       } 
      select.append(newOption);
    }
    select.addEventListener ("change", (evt) =>{
        changeFlag(evt.target);
      });
    }
    let exchangeRate= async ()=>{
    let url=`https://v6.exchangerate-api.com/v6/d9ba93600b1a6c1b68c2b81c/latest/${fromCurr.value}`;
      try {
      let response=await fetch(url);
      if (!response.ok){
        throw new Error("Network response was not ok!");
      }
     let  finalResponse=await response.json();
      let data=finalResponse.conversion_rates[toCurr.value];
      if (data===undefined){
        throw new Error("Currency not found");
      } 
      let finalData=data * amount.value;
      result.innerText=`${amount.value} ${fromCurr.value} = ${finalData} ${toCurr.value}`;
    }catch (error){
      result.innerText=`Error: ${error.message}`;
    } }
    btn.addEventListener ("click", (evt)=> {  
      evt.preventDefault();
      if (!/^\d+(\.\d+)?$/.test(amount.value) || amount.value<=0){
        amount.value="1";
    }
    exchangeRate();
    });
   let changeFlag=(element) =>{
        let currCode=element.value;
        countryCode=countryList[currCode];
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src=newSrc;
    }

