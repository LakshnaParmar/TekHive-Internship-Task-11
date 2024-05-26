let cards = document.getElementById("cards");

let cardsData = [{
    id : "one",
    name: "T-shirt",
    price:  300,
    dosc : "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    img : "img-3.jpg"
},
{
    id : "two",
    name: "Men suit",
    price:  800,
    dosc : "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    img : "img-4.jpg"
},
{
    id : "three",
    name: "Cap",
    price:  200,
    dosc : "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    img : "img-11.png"
},
{  id : "four",
name: "shoes",
price:  600,
dosc : "Lorem ipsum dolor sit amet, consectetur adipisicing.",
img : "img-6.png"},
];

let basket = JSON.parse(localStorage.getItem("data")) || []

let generatCard = () => {
    return (cards.innerHTML = cardsData.map((x)=>{
        let {id, name, price, dosc, img} = x
        let search = basket.find((x) => x.id === id ) || []
        return `
        <div id=product-id-${id} class="item">
     <img width="219" src="${img}">
     <div class="detail">
         <h3>${name}</h3>
         <p>${dosc}</p>
         <div class="price-quantity">
         <h2>$ ${price}</h2>
         <div class="button">
             <i onclick="decrement(${id})" class="fa-solid fa-minus"></i> 
         <div id=${id} class="quantity">
         ${search.item === undefined ? 0: search.item}
         </div>
         <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
         </div>
     </div>
     </div>
     </div>
     `;
    })
     .join(""));
};

generatCard();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    
    if(search === undefined){
        basket.push({
            id : selectedItem.id,
            item : 1,
        });
    }else {
        search.item += 1;
    }
//    console.log(basket);
   update(selectedItem.id);

   localStorage.setItem("data",JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    
    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0);
    //    console.log(basket);

   localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};
 let calculation = () => {
    let cardsIcon = document.getElementById("amount")
    cardsIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y , 0);
 }
  
 calculation() 