function renderCart(){
  const cart = getCart();
  const container = document.getElementById('cart-items');
  if(!cart.length){ container.innerHTML = '<p>Your cart is empty</p>'; document.getElementById('cart-summary').innerHTML=''; return; }
  Promise.all(cart.map(i=>apiGet('/products/' + i.id))).then(products=>{
    let total = 0;
    const list = products.map((p,idx)=>{
      const qty = cart[idx].qty;
      total += p.price * qty;
      return `
        <div class="card" style="display:flex;gap:12px;align-items:center">
          <img src="${p.image}" style="width:120px;height:80px;object-fit:cover;border-radius:6px" />
          <div style="flex:1">
            <h4 style="margin:0">${p.name}</h4>
            <div class="muted">₹ ${p.price} × ${qty}</div>
          </div>
          <div>
            <button data-decrease="${p.id}">-</button>
            <button data-increase="${p.id}">+</button>
            <button data-remove="${p.id}">Remove</button>
          </div>
        </div>
      `;
    }).join('');
    container.innerHTML = list;
    const summary = document.getElementById('cart-summary');
    summary.innerHTML = `<div class="card"><h3>Total: ₹ ${total}</h3><div style="margin-top:10px"><a class="button" href="checkout.html">Checkout</a></div></div>`;
    container.addEventListener('click', (e)=>{
      const id = e.target.dataset.decrease || e.target.dataset.increase || e.target.dataset.remove;
      if(!id) return;
      const idx = cart.findIndex(x=>x.id==id);
      if(idx<0) return;
      if(e.target.dataset.decrease){ cart[idx].qty = Math.max(1, cart[idx].qty-1); }
      else if(e.target.dataset.increase){ cart[idx].qty = cart[idx].qty+1; }
      else if(e.target.dataset.remove){ cart.splice(idx,1); }
      setCart(cart);
      renderCart();
    });
    updateCartCount();
  }).catch(e=>{ console.error(e); container.textContent='Failed to load cart items' });
}
document.addEventListener('DOMContentLoaded', renderCart);
