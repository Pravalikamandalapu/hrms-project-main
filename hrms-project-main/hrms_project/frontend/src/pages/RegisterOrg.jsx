import React, { useState } from 'react';
import api from '../services';
export default function RegisterOrg(){
  const [orgName, setOrgName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.post('/auth/register', { orgName, adminName, email, password });
      localStorage.setItem('token', res.data.token);
      setMsg('Registered & logged in');
    }catch(err){
      setMsg(err.response?.data?.message || err.message);
    }
  }
  return (<div className="card">
    <h3>Register Organisation</h3>
    <form onSubmit={submit}>
      <input placeholder="Organisation name" value={orgName} onChange={e=>setOrgName(e.target.value)} /><br/>
      <input placeholder="Admin name" value={adminName} onChange={e=>setAdminName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button>Register</button>
    </form>
    <div>{msg}</div>
  </div>);
}
