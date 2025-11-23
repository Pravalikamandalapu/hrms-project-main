import React, { useState } from 'react';
import api from '../services';
export default function Login(){
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('adminpass');
  const [msg, setMsg] = useState('');
  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMsg('Logged in');
    }catch(err){
      setMsg(err.response?.data?.message || err.message);
    }
  }
  return (<div className="card">
    <h3>Login</h3>
    <form onSubmit={submit}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button>Login</button>
    </form>
    <div>{msg}</div>
  </div>);
}
