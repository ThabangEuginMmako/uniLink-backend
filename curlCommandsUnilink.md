# 📮 UniLink API Testing with cURL

This guide provides all the `curl` commands for testing UniLink backend endpoints, from student registration up to internship posting and retrieval.

---

## 👨‍🎓 Student Authentication

### Register a Student

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Thabang",
  "email": "thabang@example.com",
  "password": "secret123"
}'
```

### Login a Student

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "thabang@example.com",
  "password": "secret123"
}'
```

---

## 🏢 Business Authentication

### Register a Business

```bash
curl -X POST http://localhost:5000/api/business/auth/register \
-H "Content-Type: application/json" \
-d '{
  "company_name": "OpenAI",
  "email": "openai@example.com",
  "password": "securepass123",
  "industry": "AI Research",
  "website": "https://openai.com"
}'
```

### Login a Business

```bash
curl -X POST http://localhost:5000/api/business/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "openai@example.com",
  "password": "securepass123"
}'
```

Save the returned token to use in internship creation below.

---

## 💼 Internship Endpoints

### Create Internship (Business Only, Requires Token)

Replace `<TOKEN>` with your JWT token.

```bash
curl -X POST http://localhost:5000/api/internships \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{
  "title": "Frontend Developer Intern",
  "description": "Work with React and modern frontend tech.",
  "location": "Remote",
  "start_date": "2025-08-01",
  "end_date": "2025-12-31"
}'
```

### Get All Internships

```bash
curl http://localhost:5000/api/internships
```

### Get Internship by ID

```bash
curl http://localhost:5000/api/internships/1
```

---

> 🛠️ More endpoints like internship applications and admin tools will be added as the project progresses.

Maintained by: **Thabang Mmako**
