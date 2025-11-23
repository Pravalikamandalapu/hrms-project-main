const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Organisation = require('../models/organisation');
const User = require('../models/user');
const Log = require('../models/log');
exports.register = async (req, res) => {
  try {
    const { orgName, adminName, email, password } = req.body;
    if (!orgName || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const org = await Organisation.create({ name: orgName });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash: hash, name: adminName, organisation_id: org.id });
    const token = jwt.sign({ userId: user.id, orgId: org.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
    await Log.create({ organisation_id: org.id, user_id: user.id, action: 'organisation_created', meta: { orgName }});
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, orgId: user.organisation_id }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
    await Log.create({ organisation_id: user.organisation_id, user_id: user.id, action: 'login', meta: { email }});
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
