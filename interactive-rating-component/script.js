const elems = document.getElementsByTagName('li');
var selected;


Array.from(elems).forEach(v => v.addEventListener('click', function(){
    console.log(`rating${v.innerText}`)
    clearRating();
    document.getElementById(`rating${v.innerText}`).classList.add("selected");
    selected = v.innerText
}));

function clearRating() {
    Array.from(elems).forEach(function(x) {
        document.getElementById(`rating${x.innerText}`).classList.remove("selected");
    })
}

function clearCard() {
    console.log(selected)
    document.getElementById("card-container").innerHTML = "";
    document.getElementById("card-container").innerHTML = 
    
    `<img src="./images/illustration-thank-you.svg" class= "thank-you" alt="" srcset="">
    <p class="thank-you-text">You selected ${selected} out of 5</p>
    
    <h1 class="thank-you-title">Thank you!</h1> 
    
    <p class="description thank-you">We appreciate you taking the time to give a rating. If you ever need more support, 
      don’t hesitate to get in touch!</p>`
}