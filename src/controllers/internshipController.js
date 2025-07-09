const pool = require('../config/db');

// ✅ Create a new internship listing (only for business users)
const createInternship = async (req, res) => {
  const { title, description, location, start_date, end_date } = req.body;
  const businessId = req.business?.business_id;

  if (!businessId) {
    return res.status(403).json({ error: 'Only business users can post internships' });
  }

  try {
    // 🔍 Check for duplicates
    const existing = await pool.query(
      `SELECT 1 FROM internship_listings 
       WHERE business_id = $1 AND title = $2 AND start_date = $3 AND end_date = $4`,
      [businessId, title.trim(), start_date, end_date]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Internship already exists' });
    }

    // ✅ Insert new internship
    const result = await pool.query(
      `INSERT INTO internship_listings 
        (business_id, title, description, location, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [businessId, title.trim(), description, location, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Internship creation error:', err);

    if (err.code === '23505') {
      return res.status(409).json({ error: 'Internship already exists (DB constraint)' });
    }

    res.status(500).json({ error: 'Failed to create internship listing' });
  }
};

// ✅ Fetch all internship listings (with business info)
const getAllInternships = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        il.listing_id,
        il.title,
        il.description,
        il.location,
        il.start_date,
        il.end_date,
        il.created_at,
        b.company_name,
        b.industry,
        b.website
      FROM internship_listings il
      JOIN businesses b ON il.business_id = b.business_id
      ORDER BY il.created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Internship fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
};

// ✅ Fetch a single internship by ID (with business info)
const getInternshipById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT il.*, b.company_name, b.industry, b.website
       FROM internship_listings il
       JOIN businesses b ON il.business_id = b.business_id
       WHERE il.listing_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch internship' });
  }
};


module.exports = {
  createInternship,
  getAllInternships,
  getInternshipById,
};
