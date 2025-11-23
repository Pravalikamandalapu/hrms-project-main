import React, { useEffect, useState } from 'react';
import api from '../services';

export default function Employees(){
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:''});
  const [msg, setMsg] = useState('');

  async function load(){
    try{
      const res = await api.get('/employees');
      setEmployees(res.data || []);
    }catch(e){
      setMsg(e.response?.data?.message || e.message);
    }
  }

  useEffect(()=>{ load(); }, []);

  async function create(e){
    e.preventDefault();
    try{
      await api.post('/employees', form);
      setForm({ first_name:'', last_name:'', email:'', phone:''});
      await load();
      setMsg('Employee created');
    }catch(e){
      setMsg(e.response?.data?.message || e.message);
    }
  }

  async function remove(id){
    try{
      await api.delete(`/employees/${id}`);
      await load();
      setMsg('Employee deleted');
    }catch(e){
      setMsg(e.response?.data?.message || e.message);
    }
  }

  return (
    <div>
      <h3>Employees</h3>
      <form onSubmit={create}>
        <input placeholder="First name" value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})} /><br/>
        <input placeholder="Last name" value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})} /><br/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /><br/>
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} /><br/>
        <button type="submit">Add</button>
      </form>

      <div style={{marginTop:12}}>{msg}</div>

      <div style={{marginTop:12}}>
        {employees.map(emp=>(
          <div key={emp.id} className="card" style={{padding:8, margin:6}}>
            <strong>{emp.first_name} {emp.last_name}</strong><br/>{emp.email} | {emp.phone}
            <div><button onClick={()=>remove(emp.id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
