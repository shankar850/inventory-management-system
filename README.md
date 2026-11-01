# Inventory Management System

[![CI](https://github.com/shankar850/inventory-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/shankar850/inventory-management-system/actions/workflows/ci.yml)

 Built to learn full-stack development with Angular and ASP.NET Core.

A full-stack inventory management application built with **Angular**, **ASP.NET Core Web API**, **Entity Framework Core** and *SQL Server*.

> Status: work in progress. The backend API is under development, and the Angular client comes next.

## Tech stack

- **Backend:** ASP.NET Core Web API (.NET 10), C#
- **Database:** SQL Server with EF Core (code-first migrations)
- **Frontend:** Angular, TypeScript (planned)
- **API docs:** Swagger (Swashbuckle).

## Features

- [x] Product API: create, list, and get by id
- [x] DTOs with validation, separate from database entities
- [x] Update and delete products
- [ ] Categories and suppliers
- [ ] JWT authentication with roles
- [ ] Purchase and sales orders with stock history
- [ ] Angular client and dashboard

## Run the API locally

**Prerequisites:** .NET 10 SDK, SQL Server or LocalDB, Visual Studio 2026 (or the `dotnet` CLI).

1. Clone the repository:
   ```
   git clone https://github.com/shankar850/inventory-management-system.git
   ```
2. Check the connection string in `InventoryManagementSystem/appsettings.json`.
3. Create the database (Package Manager Console):
   ```
   Update-Database
   ```
4. Run the project with the `https` profile.
5. Open Swagger at `https://localhost:7292/swagger`.

## Project structure

```
InventoryManagementSystem/
  Controllers/   API endpoints
  Models/        Database entities
  DTOs/          Request models with validation
  Data/          EF Core DbContext
  Migrations/    Database migrations
```