const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Register a new business
const registerBusiness = async (req, res) => {
  const { company_name, email, password, industry, website } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO businesses (company_name, email, password_hash, industry, website)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING business_id, company_name, email`,
      [company_name, email, hashedPassword, industry, website]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      res.status(409).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

// Login business
const loginBusiness = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT business_id, company_name, email, password_hash FROM businesses WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const business = result.rows[0];
    const validPassword = await bcrypt.compare(password, business.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { business_id: business.business_id, role: 'business' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, business: { id: business.business_id, company_name: business.company_name, email: business.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  registerBusiness,
  loginBusiness,
};