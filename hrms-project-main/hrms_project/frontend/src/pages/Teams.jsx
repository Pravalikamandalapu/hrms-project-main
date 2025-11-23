import React, { useEffect, useState } from 'react';
import api from '../services';

export default function Teams(){
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name:'', description:''});
  const [assign, setAssign] = useState({ teamId:'', employeeId:''});
  const [msg, setMsg] = useState('');

  async function load(){
    try{
      const t = await api.get('/teams'); setTeams(t.data || []);
      const e = await api.get('/employees'); setEmployees(e.data || []);
    }catch(e){
      setMsg(e.response?.data?.message || e.message);
    }
  }

  useEffect(()=>{ load(); }, []);

  async function create(e){
    e.preventDefault();
    try{
      await api.post('/teams', form);
      setForm({ name:'', description:''});
      await load();
      setMsg('Team created');
    }catch(e){
      setMsg(e.response?.data?.message || e.message);
    }
  }

  async function assignEmp(){
    try{
      if(!assign.teamId || !assign.employeeId) {
        setMsg('Pick a team and employee first');
        return;
      }
      await api.post(`/teams/${assign.teamId}/assign`, { employeeId: assign.employeeId });
      setMsg('Assigned');
      await load();
    }catch(e){
      setMsg(e.response?.data?.message || e.message);
    }
  }

  async function removeTeam(id){
    try{
      await api.delete(`/teams/${id}`);
      await load();
      setMsg('Team deleted');
    }catch(e){
      setMsg(e.response?.data?.message || e.message);
    }
  }

  return (
    <div>
      <h3>Teams</h3>
      <form onSubmit={create}>
        <input placeholder="Team name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /><br/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} /><br/>
        <button type="submit">Create Team</button>
      </form>

      <div style={{marginTop:12}}>
        <select value={assign.teamId} onChange={e=>setAssign({...assign, teamId: e.target.value})}>
          <option value="">Select team</option>
          {teams.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        <select value={assign.employeeId} onChange={e=>setAssign({...assign, employeeId: e.target.value})}>
          <option value="">Select employee</option>
          {employees.map(emp=> <option key={emp.id} value={emp.id}>{emp.first_name} {emp.last_name}</option>)}
        </select>

        <button onClick={assignEmp}>Assign</button>
      </div>

      <div style={{marginTop:12}}>{msg}</div>

      <div style={{marginTop:12}}>
        {teams.map(t=>(
          <div key={t.id} className="card" style={{padding:8, margin:6}}>
            <strong>{t.name}</strong><br/>{t.description}
            <div><button onClick={()=>removeTeam(t.id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
