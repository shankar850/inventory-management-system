# Inventory Management System

[![CI](https://github.com/shankar850/inventory-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/shankar850/inventory-management-system/actions/workflows/ci.yml)

A full-stack inventory management application built with **Angular**, **ASP.NET Core Web API**, **Entity Framework Core** and **SQL Server**, with JWT authentication and role-based access.

> Status: work in progress. Product management, categories and authentication are complete. Orders, stock history and a dashboard are planned.

## Tech stack

- **Frontend:** Angular 22, TypeScript, Reactive Forms, standalone components, signals
- **Backend:** ASP.NET Core Web API (.NET 10), C#
- **Database:** SQL Server with EF Core (code-first migrations)
- **Security:** JWT bearer authentication, role-based authorization (Admin, Staff), PBKDF2 password hashing
- **API docs:** Swagger (Swashbuckle)
- **CI:** GitHub Actions (builds the API, runs unit tests, builds the Angular client)


## Features

- [x] Products: list, add, edit and delete (Angular UI and API)
- [x] Categories: full CRUD in the API and the Angular UI
- [x] DTOs with validation, clear 400 and 409 error responses (duplicate SKU, invalid category)
- [x] JWT login with roles: Admin can do everything, Staff cannot delete
- [x] Angular route guard, HTTP interceptor and role-based UI
- [x] GitHub Actions workflow that builds the solution on every push
- [x] Category add, edit and delete screens (delete is Admin only and blocked while a category has products)
- [x] Unit tests for password hashing, run in CI (controller tests planned)
- [ ] Suppliers, purchase and sales orders, stock movement history
- [ ] Dashboard with low-stock alerts

## API overview

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/Auth/login` | Public |
| GET | `/api/Products`, `/api/Products/{id}` | Logged in |
| POST | `/api/Products` | Logged in |
| PUT | `/api/Products/{id}` | Logged in |
| DELETE | `/api/Categories/{id}` | **Admin only** (409 if the category has products) |
| GET | `/api/Categories`, `/api/Categories/{id}` | Logged in |
| POST | `/api/Categories` | Logged in |
| PUT | `/api/Categories/{id}` | Logged in |

## Run locally

**Prerequisites:** .NET 10 SDK, SQL Server or LocalDB, Node.js (LTS) and the Angular CLI.

### 1. API

```
git clone https://github.com/shankar850/inventory-management-system.git
cd inventory-management-system/InventoryManagementSystem
dotnet user-secrets set "Jwt:Key" "<a long random secret, at least 32 characters>"
dotnet ef database update
dotnet run --launch-profile https
```

Swagger opens at `https://localhost:7292/swagger`.

### 2. Angular client

```
cd inventory-ui
npm install
ng serve
```

Open `http://localhost:4200`.

### Demo accounts (Development only)

| Username | Password | Role |
|---|---|---|
| admin | Admin@123 | Admin |
| staff | Staff@123 | Staff |

These users are created automatically in the Development environment only. The JWT signing key is stored in User Secrets, never in the repository.

## Screenshots

![Login](docs/images/login.png)
![Products](docs/images/products.png)
![Swagger](docs/images/swagger.png)
![Dashboard](docs/images/dashboard.png)

## Project structure

```
InventoryManagementSystem/        ASP.NET Core Web API
  Controllers/                    Auth, Products, Categories
  Model/                          Entities (Product, Category, User)
  DTOs/                           Request models with validation
  Data/                           EF Core DbContext
  Helpers/                        Password hashing
  Migrations/                     Database migrations

inventory-ui/                     Angular client
  src/app/pages/                  Login, product list, product form, category list
  src/app/services/               API and auth services
  src/app/interceptors/           Adds the JWT to requests
  src/app/guards/                 Protects routes
  src/app/models/                 TypeScript interfaces
```