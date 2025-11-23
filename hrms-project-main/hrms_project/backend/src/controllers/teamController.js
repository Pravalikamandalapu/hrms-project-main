const Team = require('../models/team');
const Employee = require('../models/employee');
const EmployeeTeam = require('../models/employeeTeam');
const Log = require('../models/log');
exports.list = async (req, res) => {
  const orgId = req.user.orgId;
  const teams = await Team.findAll({ where: { organisation_id: orgId }});
  res.json(teams);
};
exports.create = async (req, res) => {
  const orgId = req.user.orgId;
  const { name, description } = req.body;
  const team = await Team.create({ name, description, organisation_id: orgId });
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'team_created', meta: { teamId: team.id }});
  res.status(201).json(team);
};
exports.update = async (req, res) => {
  const orgId = req.user.orgId;
  const team = await Team.findOne({ where: { id: req.params.id, organisation_id: orgId }});
  if (!team) return res.status(404).json({ message: 'Not found' });
  const { name, description } = req.body;
  await team.update({ name, description });
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'team_updated', meta: { teamId: team.id }});
  res.json(team);
};
exports.remove = async (req, res) => {
  const orgId = req.user.orgId;
  const team = await Team.findOne({ where: { id: req.params.id, organisation_id: orgId }});
  if (!team) return res.status(404).json({ message: 'Not found' });
  await team.destroy();
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'team_deleted', meta: { teamId: req.params.id }});
  res.json({ message: 'deleted' });
};
exports.assign = async (req, res) => {
  const orgId = req.user.orgId;
  const team = await Team.findOne({ where: { id: req.params.teamId, organisation_id: orgId }});
  if (!team) return res.status(404).json({ message: 'Team not found' });
  const { employeeId } = req.body;
  const emp = await Employee.findOne({ where: { id: employeeId, organisation_id: orgId }});
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  await team.addEmployee(emp);
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'assigned_employee_to_team', meta: { employeeId, teamId: team.id }});
  res.json({ message: 'assigned' });
};
exports.unassign = async (req, res) => {
  const orgId = req.user.orgId;
  const team = await Team.findOne({ where: { id: req.params.teamId, organisation_id: orgId }});
  if (!team) return res.status(404).json({ message: 'Team not found' });
  const { employeeId } = req.body;
  const emp = await Employee.findOne({ where: { id: employeeId, organisation_id: orgId }});
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  await team.removeEmployee(emp);
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'unassigned_employee_from_team', meta: { employeeId, teamId: team.id }});
  res.json({ message: 'unassigned' });
};
