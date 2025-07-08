const pool = require('../config/db');

const createInternship = async (req, res) => {
  const { title, description, location, start_date, end_date } = req.body;

  // Extract business_id from decoded token (set by businessAuth middleware)
  const businessId = req.business?.business_id;

  if (!businessId) {
    return res.status(403).json({ error: 'Only business users can post internships' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO internship_listings 
        (business_id, title, description, location, start_date, end_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [businessId, title, description, location, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Internship creation error:', err);
    res.status(500).json({ error: 'Failed to create internship listing' });
  }
};

module.exports = {
  createInternship,
};

