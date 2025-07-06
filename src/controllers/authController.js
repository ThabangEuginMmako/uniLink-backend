const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Register new student
const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO students (name, email, password_hash) VALUES ($1, $2, $3) RETURNING student_id, name, email`,
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
    console.log('✅ Register route hit');

  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      res.status(409).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

// Login student
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT student_id, name, email, password_hash FROM students WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const student = result.rows[0];
    const validPassword = await bcrypt.compare(password, student.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { student_id: student.student_id, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, student: { id: student.student_id, name: student.name, email: student.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
};
