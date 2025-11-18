apiGet('/products').then(data=>{
  const container = document.getElementById('product-list');
  container.innerHTML = data.map(p=>`
    <div class="card">
      <img src="${p.image}" style="width:100%;height:150px;object-fit:cover;border-radius:6px" />
      <h3 style="margin:10px 0 6px">${p.name}</h3>
      <div class="muted">${p.description.slice(0,80)}...</div>
      <div class="price">₹ ${p.price}</div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <a class="button" href="product.html?id=${p.id}">View</a>
        <button data-id="${p.id}" class="add-btn">Add to cart</button>
      </div>
    </div>
  `).join('');
  container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('add-btn')){
      const id = Number(e.target.dataset.id);
      const cart = getCart();
      const existing = cart.find(x=>x.id===id);
      if(existing) existing.qty++;
      else cart.push({id, qty:1});
      setCart(cart);
      alert('Added to cart');
    }
  });
}).catch(e=>{ console.error(e); document.getElementById('product-list').textContent='Failed to load products' });
