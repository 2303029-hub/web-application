# Fashion Hub — Dockerized E-commerce Website

A simple fashion-store website based on the supplied Webpro project. It includes the existing product/category pages and images, plus a browser-side shopping cart, demo checkout, and user registration/login backed by MySQL.

## Technology
- PHP 8.2 + Apache
- MySQL 8
- Docker and Docker Compose

## Run locally with Docker

1. Install and start Docker Desktop.
2. Open a terminal in this project folder.
3. (Recommended) Copy `.env.example` to `.env` and replace both passwords with strong values.
4. Build and start the containers:

   ```bash
   docker compose up --build -d
   ```

5. Open **http://localhost:8080** in your browser.
6. Test registration at `http://localhost:8080/Signup.html`, then sign in at `http://localhost:8080/login.html`.

## Useful Docker commands

```bash
docker compose ps
docker compose logs -f
docker compose logs -f web
docker compose logs -f db
docker compose down
docker compose down -v
```

`docker compose down` stops and removes containers but keeps the database volume.
`docker compose down -v` also deletes the database volume and all registered users.

## Push the project to GitHub

Create an empty repository on GitHub, then run these commands from this folder:

```bash
git init
git add .
git commit -m "Initial commit: Dockerized Fashion Hub e-commerce app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/fashion-hub-ecommerce.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Do not commit `.env` or real passwords.

## Architecture

Browser → Apache/PHP web container → MySQL database container

The MySQL data is stored in the named Docker volume `mysql_data`, so it survives normal container restarts.

## Scope and security note

This is a learning/demo project. It demonstrates product browsing, add-to-cart, quantity tracking, cart removal, demo checkout, registration, password hashing, login verification, Git version control, and Docker deployment. It does not process real payments or implement a production-ready checkout, inventory, or order-management system. Before public deployment, add CSRF protection, stronger session/cookie settings, input/output hardening, HTTPS, and managed secrets.
