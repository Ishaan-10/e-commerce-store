import React from 'react'

export default function IndividualCartItem({item}) {
    console.log(item)
    const tax = helper(item)
  return (
    <div>
        <h4>{item.name}</h4>
        <div style={{padding:"0px 0px 0px 10px",margin:"5px 0px"}}>
        <h5>Price = {item.price*item.qty}</h5>
        {tax.firsttype != 0 && <h5>Tax {tax.firsttype} = {tax.firstValue}</h5>}
        <h5>Tax {tax.secondtype} = {tax.secondValue}</h5>
        <h5>Total Price = {parseInt(tax.secondValue) + parseInt(tax.firstValue) + parseInt(item.price)}</h5>
        </div>
    </div>
  )
}
const helper = (item) =>{
    let price = parseInt(item.price)
    if(item.type=="Product"){
        const firsttype = determineProductTax(item.price)
        const firstValue = calculateProductTax(item.price*item.qty).toFixed(2)
        const secondtype = "PC"
        const secondValue = 200*item.qty
        return {firsttype,firstValue,secondValue,secondtype,price}
    }else{
        const firsttype = determineServiceTax(item.price)
        const firstValue = calculateServiceTax(item.price*item.qty).toFixed(2)
        const secondtype = "SC"
        const secondValue = 100*item.qty
        price+= parseInt(secondValue) + parseInt(firstValue);
        return {firsttype,firstValue,secondValue,secondtype,price}
    }
}
function determineProductTax(price) {
    if (price > 1000 && price <= 5000) {
      return "PA";
    } else if (price > 5000) {
      return "PB";
  } else {
    return 0;
  }
}
function determineServiceTax(price) {
    if (price > 1000 && price <= 8000) {
      return "SA";
    } else if (price > 8000) {
      return "SB";
  } else {
    return 0;
  }
}

function calculateProductTax(price) {
    if (price > 1000 && price <= 5000) {
      return price * 0.12;
    } else if (price > 5000) {
      return price * 0.18;
    } else {
      return 0; // Flat tax for products
    }
  }
  
  function calculateServiceTax(price) {
    if (price > 1000 && price <= 8000) {
      return price * 0.10;
    } else if (price > 8000) {
      return price * 0.15;
    } else {
      return 0; // Flat tax for services
    }
  }