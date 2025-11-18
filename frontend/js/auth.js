function getUsers(){ return JSON.parse(localStorage.getItem('users')||'[]'); }
function saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }
function setCurrentUser(user){ localStorage.setItem('user', JSON.stringify(user)); updateUI(); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem('user')||'null'); }
function logout(){ localStorage.removeItem('user'); updateUI(); }
function updateUI(){
  const u = getCurrentUser();
  const link = document.getElementById('login-link');
  if(!link) return;
  if(u){ link.textContent = 'Hi ' + (u.name||u.email) + ' (Logout)'; link.href='#'; link.onclick = (e)=>{ e.preventDefault(); logout(); }; }
  else { link.textContent = 'Login'; link.href = 'login.html'; link.onclick = null; }
}
document.addEventListener('DOMContentLoaded', ()=>{
  updateUI();
  const reg = document.getElementById('register-form');
  if(reg) reg.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(reg);
    const name = fd.get('name'), email = fd.get('email'), password = fd.get('password');
    const users = getUsers();
    if(users.find(x=>x.email===email)){ document.getElementById('msg').textContent='Email exists'; return; }
    users.push({name,email,password});
    saveUsers(users);
    setCurrentUser({name,email});
    location.href = 'index.html';
  });
  const login = document.getElementById('login-form');
  if(login) login.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(login);
    const email = fd.get('email'), password = fd.get('password');
    const users = getUsers();
    const user = users.find(x=>x.email===email && x.password===password);
    if(!user){ document.getElementById('msg').textContent='Invalid credentials'; return; }
    setCurrentUser({name:user.name,email:user.email});
    location.href = 'index.html';
  });
});
