# 💰 Finance Data Processing & Access Control Backend

A robust backend system designed to manage financial records with role-based access control and analytics support. This project demonstrates clean architecture, secure authentication, and scalable backend design.

---

## Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control (RBAC)
* Roles:

  * **Viewer** → Read-only access
  * **Analyst** → View + analytics
  * **Admin** → Full CRUD + user management

---

### Financial Records Management

* Create, update, delete financial records
* Fields:

  * Amount
  * Type (income / expense)
  * Category
  * Date
  * Notes
* Filtering support:

  * By type
  * By category
  * By date range

---

### Dashboard Analytics

* Total income
* Total expenses
* Net balance
* Aggregated financial insights using MongoDB pipelines

---

### User Management

* Create users
* Assign roles
* Update user roles (admin only)
* Manage user status

---

### Additional Features

* Soft delete for records
* Centralized error handling
* Standardized API responses
* Clean layered architecture

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Other:** bcrypt, dotenv, cors

---

## Project Structure

```
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── utils/
├── db/
├── app.js
└── index.js
```

---

## API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Users (Admin only)

* `GET /api/users`
* `PATCH /api/users/:id/role`

### Financial Records

* `POST /api/records` (Admin)
* `GET /api/records` (All roles)
* `PATCH /api/records/:id` (Admin)
* `DELETE /api/records/:id` (Admin)

### Dashboard

* `GET /api/dashboard/summary` (Analyst, Admin)

---

## Environment Variables

Create a `.env` file:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:8000
```

---

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Testing

Use Postman or any API client to test endpoints.

---

## Architecture Overview

This project follows a layered architecture:

```
Route → Controller → Service → Database
```

* **Controllers** handle request/response
* **Services** contain business logic
* **Models** define data schema
* **Middleware** handles authentication and authorization

---

## Security Considerations

* Passwords hashed using bcrypt
* JWT-based authentication
* Role-based authorization
* Sensitive data not exposed in responses

---

## Assumptions

* Users are assigned the default role `viewer` during registration
* Admin privileges are assigned manually or via admin endpoints
* Soft delete is used instead of permanent deletion

---

## Future Improvements

* Pagination & search
* Advanced analytics (monthly trends, category insights)
* Unit & integration tests
* API documentation (Swagger)
* Refresh token mechanism

---

## Author

**Saakshi Baranwal**

---

## Notes

This project focuses on clean backend design, proper access control, and scalable architecture rather than just CRUD functionality.
