# 🎓 School Management System

A modern **School Management Application** designed to efficiently manage students, teachers, classes, and subjects within a school environment.  
The system is built using **.NET Web API** for the backend and **Angular** for the frontend, following clean architecture and RESTful design principles.

---

## 🚀 Features

### 👨‍🎓 Student Management
- Register and manage students
- View student profiles and enrollment details
- Assign students to classes

### 🏫 Class Management
- Create and manage school classes
- Assign students to classes
- View class lists and related information

### 👩‍🏫 Teacher Management
- Register and manage teachers
- Assign subjects to teachers
- View teacher-class-subject relationships

### 📚 Subject Management
- Create and manage subjects
- Assign subjects to teachers
- Link subjects to specific classes

---

## 🧱 System Architecture

The application follows a **client-server architecture**:

- **Frontend:** Angular (SPA)
- **Backend:** .NET Web API
- **Communication:** RESTful APIs (JSON)
- **Authentication:** JWT-based authentication (optional / extendable)
- **Database:** SQL Server

---

## 🛠 Tech Stack

### Backend
   .NET 8 Web API
- C#
- Entity Framework Core
- RESTful API architecture
- Dependency Injection
- Repository & Service pattern

### Frontend
- Angular
- TypeScript
- HTML5 / CSS3
- Bootstrap / Angular Material
- RxJS

### Database
- SQL Server
- Entity Relationships (Students, Teachers, Classes, Subjects)

---

## 📂 Project Structure

### Backend (.NET Web API)

### Frontend (Angular)


## 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (Admin / Teacher)
- Secure API endpoints

## ⚙️ Setup Instructions

### Backend Setup
1. Clone the repository
2. Open the solution in Visual Studio
3. Update `appsettings.json` with your database connection string
4. Run database migrations
5. Start the API

### Frontend Setup
1. Navigate to the Angular project folder
2. Install dependencies:
   ```bash
   npm install