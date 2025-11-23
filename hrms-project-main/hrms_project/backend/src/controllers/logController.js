const Log = require('../models/log');
exports.list = async (req, res) => {
  const orgId = req.user.orgId;
  const logs = await Log.findAll({ where: { organisation_id: orgId }, order: [['createdAt','DESC']]});
  res.json(logs);
};
