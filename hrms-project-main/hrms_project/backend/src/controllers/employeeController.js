const Employee = require('../models/employee');
const Log = require('../models/log');
exports.list = async (req, res) => {
  const orgId = req.user.orgId;
  const employees = await Employee.findAll({ where: { organisation_id: orgId }});
  res.json(employees);
};
exports.get = async (req, res) => {
  const orgId = req.user.orgId;
  const emp = await Employee.findOne({ where: { id: req.params.id, organisation_id: orgId }});
  if (!emp) return res.status(404).json({ message: 'Not found' });
  res.json(emp);
};
exports.create = async (req, res) => {
  const orgId = req.user.orgId;
  const { first_name, last_name, email, phone } = req.body;
  const emp = await Employee.create({ first_name, last_name, email, phone, organisation_id: orgId });
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'employee_created', meta: { employeeId: emp.id, first_name }});
  res.status(201).json(emp);
};
exports.update = async (req, res) => {
  const orgId = req.user.orgId;
  const emp = await Employee.findOne({ where: { id: req.params.id, organisation_id: orgId }});
  if (!emp) return res.status(404).json({ message: 'Not found' });
  const { first_name, last_name, email, phone } = req.body;
  await emp.update({ first_name, last_name, email, phone });
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'employee_updated', meta: { employeeId: emp.id }});
  res.json(emp);
};
exports.remove = async (req, res) => {
  const orgId = req.user.orgId;
  const emp = await Employee.findOne({ where: { id: req.params.id, organisation_id: orgId }});
  if (!emp) return res.status(404).json({ message: 'Not found' });
  await emp.destroy();
  await Log.create({ organisation_id: orgId, user_id: req.user.userId, action: 'employee_deleted', meta: { employeeId: req.params.id }});
  res.json({ message: 'deleted' });
};
