const API_BASE = 'http://localhost:5000/api';
async function apiGet(url){ const res = await fetch(API_BASE + url); if(!res.ok) throw new Error('API error'); return res.json(); }
async function apiPost(url, body){ const res = await fetch(API_BASE + url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }); return res.json(); }
function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
function setCart(c){ localStorage.setItem('cart', JSON.stringify(c)); updateCartCount(); }
function updateCartCount(){ const el = document.getElementById('cart-count'); if(el) el.textContent = getCart().reduce((s,i)=>s+i.qty,0); }
document.addEventListener('DOMContentLoaded', updateCartCount);
