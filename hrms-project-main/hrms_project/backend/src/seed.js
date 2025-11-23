// Simple seed: creates an organisation and admin user (password: adminpass)
const bcrypt = require('bcrypt');
const sequelize = require('./db');
const Organisation = require('./models/organisation');
const User = require('./models/user');
(async () => {
  await sequelize.sync({ force: true });
  const org = await Organisation.create({ name: 'Demo Organisation' });
  const hash = await bcrypt.hash('adminpass', 10);
  const user = await User.create({ email: 'admin@example.com', password_hash: hash, name: 'Admin', organisation_id: org.id });
  console.log('Seeded. Admin credentials: admin@example.com / adminpass');
  process.exit(0);
})();
