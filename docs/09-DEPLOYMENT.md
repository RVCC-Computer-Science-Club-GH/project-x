# 09 - Deploying to Production

## What is Deployment?

Deployment means moving your code from your computer to a live server.

Users can then access it on the internet.

| Stage | Where It Runs | Who Uses It |
|-------|---------------|-----------|
| **Development** | Your computer | Just you |
| **Staging** | Test server | QA team |
| **Production** | Live server | Real users |

## Before You Deploy

Make sure:

✅ All tests pass
```bash
npm run test
```

✅ Code has no type errors
```bash
npm run typecheck
```

✅ Code passes linting
```bash
npm run lint
```

✅ Feature is reviewed and approved (pull request merged)

## Deployment Process

### Step 1: Build Your Application

Building means converting source code into a runnable application.

TypeScript gets compiled to JavaScript.

React components get compiled to HTML/CSS/JavaScript.

#### Build Backend
```bash
npm run build -w apps/server
```

Creates compiled Files in `dist/` folder.

#### Build Frontend
```bash
npm run export:web -w apps/client
```

Creates static files in `dist-web/` folder.

### Step 2: Create Docker Images

Docker images package your app with dependencies.

```bash
# Build backend image
docker build -f apps/server/Dockerfile -t pathster-backend:v1.0.0 .

# Build frontend image  
docker build -f apps/client/Dockerfile -t pathster-client:v1.0.0 .
```

An image is a template. Containers are started from images.

### Step 3: Push to Registry

A registry stores Docker images (like GitHub stores code).

Popular registries:
- Docker Hub
- GitHub Container Registry
- AWS ECR
- Google Container Registry

```bash
# Tag the image
docker tag pathster-backend:v1.0.0 registry.example.com/pathster-backend:v1.0.0

# Push to registry
docker push registry.example.com/pathster-backend:v1.0.0
```

Now the image lives on the internet.

### Step 4: Deploy to Server

Your cloud provider (AWS, Heroku, DigitalOcean) pulls the image and runs it.

This depends on your platform. Example for Heroku:

```bash
heroku deploy pathster-backend:v1.0.0
```

Example for AWS:

```bash
aws deploy --image pathster-backend:v1.0.0
```

### Step 5: Verify It Works

After deployment, test the live application:

```bash
curl https://api.pathster.rvcc.edu/health
```

Should return:
```json
{"status":"ok"}
```

Visit the website:

```
https://pathster.rvcc.edu
```

Should load without errors.

## Environment Variables

Production needs different settings than development.

### Development Settings
```
API_URL=http://localhost:3000
DEBUG=true
LOG_LEVEL=verbose
```

### Production Settings
```
API_URL=https://api.pathster.rvcc.edu
DEBUG=false
LOG_LEVEL=error
```

Set these on the deployment server, not in code.

Example, on Heroku:
```bash
heroku config:set API_URL=https://api.pathster.rvcc.edu
```

## Monitoring After Deployment

After deploying, watch for problems.

### Check Logs

Look for errors or warnings:

```bash
docker logs pathster-backend
```

Or on Heroku:

```bash
heroku logs --tail
```

## Updating Your Deployment

When you fix a bug or add a feature:

1. **Fix the code**
2. **Test it**
3. **Commit to git**
4. **Build a new Docker image with higher version:**
   ```bash
   docker build -f apps/server/Dockerfile -t pathster-backend:v1.0.1 .
   ```
5. **Push the new image**
   ```bash
   docker push registry.example.com/pathster-backend:v1.0.1
   ```
6. **Update the deployment**
   ```bash
   heroku deploy pathster-backend:v1.0.1
   ```

## Version Numbers

Use semantic versioning: `MAJOR.MINOR.PATCH`

| Version | When to Use | Example Change |
|---------|-----------|-----------------|
| `1.0.0` → `2.0.0` | Breaking changes | Remove old API endpoints |
| `1.0.0` → `1.1.0` | New features | Add new search function |
| `1.0.0` → `1.0.1` | Bug fixes | Fix typo in response |

## Continuous Deployment

Professional teams automate deployment:

1. Developer pushes code to GitHub
2. GitHub runs tests automatically
3. If tests pass, code deploys automatically
4. Website updates without manual work

This uses "CI/CD" (Continuous Integration / Continuous Deployment).

## Debugging Production Issues

### Issue: "Internal Server Error"

Check logs:
```bash
docker logs pathster-backend | tail -20
```

Look for stack trace.

### Issue: "Page loads slowly"

Check performance:
```bash
# View raw logs
docker logs pathster-backend

# Look for slow queries or API calls
```

### Issue: "Database connection failed"

Check environment variables:
```bash
heroku config

# Should show DATABASE_URL
```

Check the database is running.

### Issue: "Out of memory"

Increase container resources:
```bash
heroku scale web=2x
# Run on larger container
```

## Rollback (Go Back to Previous Version)

If deployed version has critical bug:

```bash
# Deploy previous version
docker push registry.example.com/pathster-backend:v1.0.0
heroku deploy pathster-backend:v1.0.0

# You're back to working version while you fix the bug
```

## Safety Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] Linting passes
- [ ] Code reviewed and approved
- [ ] New environment variables documented
- [ ] Database migrations run
- [ ] Team is aware of deployment
- [ ] Rollback plan is ready

## Deployment Environments

### Staging

A copy of production, but for testing.

Team tests features here first.

### Production

The real website. Users are here.

Changes affect everyone.

Deploy carefully.

## Common Platforms

| Platform | Good For | Cost |
|----------|----------|------|
| **Heroku** | Getting started quickly | Cheap to free tier |
| **AWS** | Enterprise scale | Varies |
| **DigitalOcean** | Simplicity | Affordable |
| **Google Cloud** | High capacity | Varies |
| **Azure** | Microsoft shops | Varies |

## Monitoring and Alerts

Set up monitoring so you know immediately if something breaks:

```bash
# Example with Datadog
docker run -it datadog/agent:latest \
  -e DD_API_KEY=your_key \
  heroku logs --tail > /dev/null
```

If CPU usage spikes or errors increase, get an alert.

## Key Takeaways

✅ **Build first**: Compile code to production format  
✅ **Docker images**: Package with dependencies  
✅ **Push to registry**: Store images publicly  
✅ **Deploy**: Run image on server  
✅ **Test**: Make sure it works  
✅ **Monitor**: Watch for problems  
✅ **Update**: Deploy new versions with version numbers  

## Next Steps

Learn how to contribute effectively:

- **[10-CONTRIBUTING.md](10-CONTRIBUTING.md)** — Guidelines for team members
