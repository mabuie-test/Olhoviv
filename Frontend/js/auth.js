const api = window.location.origin + '/api/auth';
const tokenKey = 'sm_token';

document.getElementById('btnLogin')
  .onclick = async () => {
    const u = document.getElementById('u').value;
    const p = document.getElementById('p').value;
    try {
      const r = await fetch(api + '/login', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username:u,password:p})
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error||r.status);
      localStorage.setItem(tokenKey, j.token);
      window.location = 'dashboard.html';
    } catch (e) { alert('Erro login: '+e.message); }
  };

document.getElementById('showReg')
  .onclick = () => {
    document.querySelector('.container > h1').style.display='none';
    document.getElementById('regForm').style.display='block';
  };

document.getElementById('showLogin')
  .onclick = () => {
    document.querySelector('.container > h1').style.display='block';
    document.getElementById('regForm').style.display='none';
  };

document.getElementById('btnReg')
  .onclick = async () => {
    const u = document.getElementById('ru').value;
    const p = document.getElementById('rp').value;
    try {
      const r = await fetch(api + '/register', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username:u,password:p})
      });
      if (!r.ok) throw new Error((await r.json()).error||r.status);
      alert('Registrado com sucesso! Faça login.');
      document.getElementById('showLogin').click();
    } catch (e) { alert('Erro registro: '+e.message); }
  };
