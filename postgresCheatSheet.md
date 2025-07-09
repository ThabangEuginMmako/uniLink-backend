# 📘 UniLink PostgreSQL Developer Cheatsheet

This cheat sheet helps you manage and inspect your PostgreSQL database for the UniLink internship system.

---

## ✅ Database Connection

```bash
PGPASSWORD=1234 psql -U unilink_user -d unilink -h 127.0.0.1
```

---

## 📋 View Tables

```sql
\dt
```

---

## 🔍 View Table Data

```sql
SELECT * FROM students;
SELECT * FROM businesses;
SELECT * FROM internship_listings;
SELECT * FROM applications;
```

---

## 🎯 Filter Specific Data

```sql
-- Find a student by email
SELECT * FROM students WHERE email = 'thabang@example.com';

-- Get internships by business ID
SELECT * FROM internship_listings WHERE business_id = 1;

-- Applications by student
SELECT * FROM applications WHERE student_id = 2;
```

---

## ➕ Insert Test Data

```sql
INSERT INTO students (name, email, password_hash)
VALUES ('Tester', 'test@example.com', 'hashed_pw_here');
```

---

## ✏️ Update Data

```sql
UPDATE students
SET skills = 'Node.js, Express, PostgreSQL'
WHERE student_id = 1;
```

---

## ❌ Delete Data

```sql
-- Delete by listing ID
DELETE FROM internship_listings WHERE listing_id = 1;

-- Delete test businesses
DELETE FROM businesses WHERE email LIKE '%test%';
```

---

## 📊 Analysis Queries

```sql
-- Count applications per internship
SELECT listing_id, COUNT(*) FROM applications GROUP BY listing_id;

-- Check for duplicate emails
SELECT email, COUNT(*) FROM students GROUP BY email HAVING COUNT(*) > 1;
```

---

## 🧠 Useful Extras

```sql
-- Toggle pretty output
\x

-- View table structure
\d students

-- Exit the console
\q
```

---

> ⚠️ Pro tip: Always BACK UP your database before running mass UPDATE or DELETE commands.

---

Maintained by: **Thabang Mmako**
Project Repo: [https://github.com/ThabangEuginMmako/uniLink-backend](https://github.com/ThabangEuginMmako/uniLink-backend)
