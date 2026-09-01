# Project Core Directives & "Trojan Horse" Strategy

This project adheres to strict client requirements while maintaining a modern developer experience (DX). ALWAYS follow these architectural rules.

## 1. Client Requirements (The Output)
- **Server Specs:** Linux, DirectAdmin, Apache, PHP 8.1, MariaDB 10.6.13. (Hardware: 8 Cores CPU, 8192 MB RAM, 20 GB SSD).
- **Strict Constraint:** NO PHP/Backend Frameworks (e.g., Laravel, CodeIgniter). NO Headless CMS (e.g., Strapi, Supabase).
- **Delivery:** Pure HTML5/CSS3/JS for the frontend, and pure Native Modern PHP (OOP, PDO) for the backend.
- **Custom CMS:** Built from scratch.

## 2. The "Trojan Horse" Architecture (Our Vibe Code)
We maintain modern DX while delivering the exact native files the client expects.
- **Frontend (Public Website):** Authored using Vite + Vanilla JS + Tailwind CSS (Multi-Page Application). To guarantee perfect SEO and performance, the built `.html` files will be served as `.php` files (e.g., `product.php`) strictly to inject dynamic `<title>` and `<meta>` tags on the server-side. Content is hydrated via Vanilla JS (fetch API). No heavy JS frameworks (React/Vue) are used here to ensure it passes the client's code inspection.
- **Component Management (HTML Partials):** To avoid code duplication (like Navbar, Footer, Product Cards) across multiple pages, we strictly use **Vite Build-Time HTML Includes** (via Vite plugins). Developers write modular `.html` components in a `components/` directory. During the build process, Vite compiles and merges these components into flat, standard HTML5 files. This provides a React-like developer experience (edit once, update everywhere) while delivering the 100% pure, framework-free HTML5/CSS3/JS output the client strictly demands.
- **Custom CMS (Admin):** Authored as a separate Vite + React SPA. Built into static assets and deployed to `/admin`. It communicates exclusively with the PHP REST API.
- **Backend (API):** Written in pure Native PHP 8.1. Acts strictly as a RESTful API returning JSON. Placed in `/api`. ABSOLUTELY NO HTML mixed inside the API logic files.

## 3. Local Environment
- **Docker:** We strictly use Docker (`docker-compose.yml`) to clone the production environment.
- **Images:** Must use `php:8.1-apache` and `mariadb:10.6.13` to prevent version mismatch issues.

## 4. Security Pillars (Mandatory)
Since we are bypassing BaaS like Supabase, all security must be hand-coded in the PHP API:
1. **SQL Injection:** ALWAYS use PDO + Prepared Statements.
2. **Authentication:** Secure Admin SPA using Session Tokens or JWT stored in HTTP-only cookies.
3. **Sanitization:** Strictly validate all inputs. For file uploads: verify MIME types, limit sizes, and rename files randomly.
4. **Endpoint Protection:** Configure strict CORS to only allow requests from our frontend domains.

## 5. Data Migration (Welding / Industrial Tools)
- **Complexity:** The product catalog is complex (specs, relations, dirty data).
- **Strategy:** Write a dedicated, one-time PHP ETL (Extract, Transform, Load) script to migrate data from the old system to the new MariaDB schema. Do not do a direct SQL import.

## Agent Instructions
- Whenever you write code or propose a plan for this project, you MUST reference this document and ensure you are not violating the "Trojan Horse" strategy or the client's strict server requirements.
- **NO EMOJIS:** Absolutely NO emojis are allowed in any source code, comments, logs, or output files.
