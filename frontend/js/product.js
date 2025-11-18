const params = new URLSearchParams(window.location.search);
const pid = params.get('id');
if(!pid) document.getElementById('product-details').textContent = 'Missing product id';
apiGet('/products/' + pid).then(p=>{
  const wrap = document.getElementById('product-details');
  wrap.innerHTML = `
    <div class="card product-card">
      <img src="${p.image}" alt="${p.name}" />
      <div class="product-info">
        <h2>${p.name}</h2>
        <div class="price">₹ ${p.price}</div>
        <p class="muted">${p.description}</p>
        <div style="margin-top:12px">
          <input id="qty" type="number" value="1" min="1" style="width:80px;margin-right:8px" />
          <button id="add-to-cart">Add to cart</button>
          <a class="button" href="cart.html" style="margin-left:8px">View cart</a>
        </div>
      </div>
    </div>
  `;
  document.getElementById('add-to-cart').addEventListener('click', ()=>{
    const q = Number(document.getElementById('qty').value) || 1;
    const cart = getCart();
    const existing = cart.find(x=>x.id===p.id);
    if(existing) existing.qty += q; else cart.push({id:p.id, qty:q});
    setCart(cart);
    alert('Added to cart');
  });
}).catch(e=>{ console.error(e); document.getElementById('product-details').textContent='Failed to load product' });
