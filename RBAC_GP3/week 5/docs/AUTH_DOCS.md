# 🔐 Authentication Documentation

## 📌 Project
**Financial Domain Internal Chatbot with Role-Based Access Control (RBAC)**

This document explains the authentication mechanism used in the system, including JWT-based security and role-based access enforcement.

---

## 1️⃣ Authentication Flow

### 🔹 End-to-End Authentication Flow

Login Request
↓
Credential Validation
↓
JWT Token Issued
↓
Client Sends Request with JWT
↓
Token Verification
↓
RBAC Permission Check
↓
Access Granted

---

## 2️⃣ API Endpoints

--------------------------------------------------------------
| Method | Endpoint       | Description                      |
|--------|----------------|----------------------------------|
| POST   | `/auth/login`  | Authenticate user and issue JWT  |
| POST   | `/auth/logout` | Logout user and invalidate token |
| GET    | `/auth/me`     | Fetch authenticated user details |
| POST   | `/auth/refresh`| Generate new access token        |
--------------------------------------------------------------

### 🔹 Endpoint Description

- **/auth/login** – Verifies credentials and returns JWT  
- **/auth/logout** – Ends active session  
- **/auth/me** – Returns user profile and role  
- **/auth/refresh** – Renews expired access token  

---

## 3️⃣ JWT Token Structure

JWT tokens consist of three parts:

HEADER.PAYLOAD.SIGNATURE
### 🔹 Header
Contains token type and algorithm.

### 🔹 Payload
Contains user identity, role, department, and expiration time.

### 🔹 Signature
Ensures token integrity and prevents tampering.

---

## 4️⃣ RBAC Permission Matrix
-------------------------------------------------------------------
| Role            | Login | Logout | View Profile | Refresh Token |
|-----------------|------ |--------|--------------|---------------|
| C-Level         | ✅   | ✅     |   ✅         | ✅           |
| Department Head | ✅   | ✅     |   ✅         | ✅           |
| Employee        | ✅   | ✅     |   ✅         | ❌           |
| Guest           | ✅   | ❌     |   ❌         | ❌           |
-------------------------------------------------------------------

## 5️⃣ Security Considerations

- **Token Expiration:** Short-lived access tokens reduce risk  
- **Password Hashing:** Passwords are securely hashed (e.g., bcrypt)  
- **HTTPS Enforcement:** All auth APIs require HTTPS  

---

## ✅ Conclusion

This authentication design ensures secure user login, controlled API access, and role-based authorization. Combined with RBAC, it provides enterprise-level security for the chatbot system.


