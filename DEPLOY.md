# Oracle VM Deploy

Target:

- Public IP: `161.118.230.251`
- App path: `/var/www/assesments`
- Frontend: Nginx static files
- Backend: PM2 + Bun on `127.0.0.1:4000`
- Database: repo `docker-compose.yml` Postgres

## 1. Install packages

Ubuntu:

```bash
sudo apt update
sudo apt install -y nginx git unzip curl docker.io docker-compose-plugin nodejs npm
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
sudo npm install -g pm2
sudo usermod -aG docker "$USER"
```

Log out and back in so Docker group applies.

## 2. Clone and build

```bash
sudo mkdir -p /var/www
sudo chown "$USER":"$USER" /var/www
git clone <REPO_URL> /var/www/assesments
cd /var/www/assesments
git checkout dpeloyment
bun install
docker compose up -d db
```

Create `server/.env`:

```env
NODE_ENV=production
PORT=4000
CLIENT_ORIGIN=http://161.118.230.251
DATABASE_URL=postgresql://buddy:buddy@localhost:5433/buddyscript?schema=public
JWT_SECRET=replace-with-at-least-32-random-characters
COOKIE_SECURE=false
CLOUDINARY_CLOUD_NAME=zqrnrwtq
CLOUDINARY_API_KEY=856623161773669
CLOUDINARY_API_SECRET=N2BVm8j7qn_lsFl-cmus3FCPDe8
```

Build and migrate:

```bash
cd /var/www/assesments
bun --filter client build
cd server
bun prisma generate
bun run prisma:deploy
bun run build
cd ..
```

## 3. Start backend

```bash
pm2 start ecosystem.config.cjs
pm2 startup
```

Run command printed by `pm2 startup`, then:

```bash
pm2 save
```

## 4. Enable Nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/buddyscript
sudo ln -sf /etc/nginx/sites-available/buddyscript /etc/nginx/sites-enabled/buddyscript
sudo nginx -t
sudo systemctl reload nginx
```

Oracle security list / NSG must allow inbound TCP `80`.

Check:

```bash
curl http://127.0.0.1:4000/api/health
curl http://161.118.230.251/api/health
```
