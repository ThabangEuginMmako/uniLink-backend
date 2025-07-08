-- Drop all tables (be careful: this deletes data!)
DROP TABLE IF EXISTS audit_logs, feedback, messages, applications, internship_listings, admins, businesses, students CASCADE;

-- Students table
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,               -- unique emails
  password_hash TEXT NOT NULL,
  cv_url TEXT,
  skills TEXT,
  education TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Businesses table
CREATE TABLE businesses (
  business_id SERIAL PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,               -- unique emails
  password_hash TEXT NOT NULL,
  industry VARCHAR(100),
  website TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins table
CREATE TABLE admins (
  admin_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,               -- unique emails
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'moderator' CHECK (role IN ('moderator', 'superadmin', 'admin'))
);

-- Internship Listings table
CREATE TABLE internship_listings (
  listing_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(business_id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(100),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (end_date IS NULL OR end_date >= start_date),
  CONSTRAINT unique_business_listing UNIQUE (business_id, title, start_date, end_date)  -- 🚫 prevents duplicate postings
);

-- Applications table
CREATE TABLE applications (
  application_id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  listing_id INTEGER NOT NULL REFERENCES internship_listings(listing_id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE feedback (
  feedback_id SERIAL PRIMARY KEY,
  application_id INTEGER UNIQUE NOT NULL REFERENCES applications(application_id) ON DELETE CASCADE,
  feedback_text TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5)
);

-- Messages table
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL,    -- Could add FK constraint if you want to restrict sender to known users
  receiver_id INTEGER NOT NULL,
  message_body TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs table
CREATE TABLE audit_logs (
  log_id SERIAL PRIMARY KEY,
  actor_id INTEGER NOT NULL,  -- Could link to students/admins/businesses depending on design
  action_type VARCHAR(100) NOT NULL,
  target_table VARCHAR(100) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
