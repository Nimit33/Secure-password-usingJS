const passDisplay=document.querySelector("[data-passDisplay]")
const passLength=document.querySelector("[data-passLength]")
const passSlider=document.querySelector("[data-passSlider]")
const upperCase=document.querySelector("[data-upperCase]")
const lowerCase=document.querySelector("[data-lowerCase]")
const numbers=document.querySelector("[data-numbers]")
const symbols=document.querySelector("[data-symbols]")
const strength=document.querySelector("[data-strength]")
const passGenerate=document.querySelector("[data-passGenerate]")
const check=document.querySelector("[data-check]")
const copyMsg=document.querySelector("[data-copyMsg]")
const copyBtn=document.querySelector("[data-copyBtn]")
const symbols2 = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';



let password="";
let passwordLength=0;
handleSlider();
let checkCount=0;
check.innerText=checkCount;
strength.innerText="Poor";
strength.style.backgroundColor="#f00";

function handleSlider(){
    passSlider.value=passwordLength;
    passLength.innerText=passwordLength;
}

passSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
    calcStrength();
})


upperCase.addEventListener('change',(e)=>{
    if(upperCase.checked){
    checkCount++;
    }
    else if(!upperCase.checked){
        checkCount--;
    }
    check.innerText=checkCount;
    calcStrength();

})

lowerCase.addEventListener('change',(e)=>{
    if(lowerCase.checked){
    checkCount++;
    }
    else if(!lowerCase.checked){
        checkCount--;
    }
    check.innerText=checkCount;
    calcStrength();

})

numbers.addEventListener('change',(e)=>{
    if(numbers.checked){
    checkCount++;
    }
    else if(!numbers.checked){
        checkCount--;
    }
    check.innerText=checkCount;
    calcStrength();

})

symbols.addEventListener('change',(e)=>{
    if(symbols.checked){
    checkCount++;
    }
    else if(!symbols.checked){
        checkCount--;
    }
    check.innerText=checkCount;
    calcStrength();

})

function calcStrength(){
    if(checkCount==4 && passwordLength>=10){
        strength.innerText="Excellent";
        strength.style.backgroundColor="#0f0";
    }
    else if(checkCount>=3 && passwordLength>=8){
        strength.innerText="Good";
        strength.style.backgroundColor="#0f0";
    }
    else if(checkCount>=2 && passwordLength>=6){
        strength.innerText="Average";
        strength.style.backgroundColor="#ff0";
    }
    else{
        strength.innerText="Poor";
        strength.style.backgroundColor="#f00";
    }
}

function generateNumber(){
    return Math.floor(Math.random()*9);
}

function generateLowerCase(){
    return String.fromCharCode(Math.floor(Math.random()*(123-97))+97);
}
function generateUpperCase(){
    return String.fromCharCode(Math.floor(Math.random()*(91-65))+65);
}
function generateSymbol(){
    const temp=Math.floor(Math.random()*(symbols2.length));
    return symbols2.charAt(temp);
}

passGenerate.addEventListener('click',()=>{
    if(passDisplay.value){
        passDisplay.value="";
        password="";
    }
    if(numbers.checked){
        password=password+generateNumber();
    }
    if(lowerCase.checked){
        password=password+generateLowerCase();
    }
    if(upperCase.checked){
        password=password+generateUpperCase();
    }
    if(symbols.checked){
        password=password+generateSymbol();
    }
    let temp=password.length;
    for(let i=temp;i<passwordLength;i++){
        password=password+generateLowerCase();
    }
    var tempPass=password;
    password=shuffle(tempPass);
    passDisplay.value=password;
    })

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passDisplay.value);
        copyMsg.innerText = "copied";
        passDisplay.value="";

    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    // copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.innerText="";
        password="";
        // copyMsg.classList.remove("active");
    },2000);

}
copyBtn.addEventListener('click',()=>{
    if(passDisplay.value){
        copyContent();
    }
    })

function shuffle(tempPass){
    let arr=tempPass.split("");
    for(let i=0;i<arr.length/2;i++){
        let j=Math.floor(Math.random()*arr.length);
        let temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }

    return arr.join("");

}


calcStrength();
console.log(checkCount);




