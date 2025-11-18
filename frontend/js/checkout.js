document.addEventListener('DOMContentLoaded', ()=>{
  const cart = getCart();
  if(!cart.length){ document.getElementById('checkout-area').innerHTML='<p>Your cart is empty</p>'; return; }
  Promise.all(cart.map(i=>apiGet('/products/' + i.id))).then(products=>{
    let total = 0;
    const itemsHtml = products.map((p,idx)=>{ total+=p.price*cart[idx].qty; return `<li>${p.name} × ${cart[idx].qty} — ₹${p.price*cart[idx].qty}</li>` }).join('');
    document.getElementById('checkout-area').innerHTML = `
      <div class="card"><h3>Order Summary</h3><ul>${itemsHtml}</ul><p><strong>Total: ₹${total}</strong></p>
      <div style="margin-top:12px"><button id="place-order">Place Order (Simulate)</button></div></div>
    `;
    document.getElementById('place-order').addEventListener('click', ()=>{
      const user = JSON.parse(localStorage.getItem('user')||'null') || { name: 'Guest' };
      apiPost('/orders', { user, items: cart, total }).then(res=>{
        if(res.ok){ localStorage.removeItem('cart'); alert('Order placed. Order id: ' + res.orderId); location.href='index.html'; }
        else alert('Failed: ' + (res.error || 'unknown'));
      }).catch(e=>alert('Error placing order'));
    });
  });
});
