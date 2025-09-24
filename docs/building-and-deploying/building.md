---
sidebar_position: 1
---

# Building

lttle.cloud provides automatic image building for your applications using [Nixpacks](https://nixpacks.com), eliminating the need to manually create and manage Docker images. When you specify a `build` configuration in your machine or app resources, the CLI automatically builds and pushes container images to lttle.cloud's registry during deployment.

## How Building Works

When you run `lttle deploy`, the CLI:

1. **Detects Resources**: Scans your deployment files for machines or apps with `build` configurations
2. **Builds Images**: Uses Nixpacks or Docker to build container images locally
3. **Pushes Images**: Automatically pushes built images to lttle.cloud's private registry
4. **Updates Resources**: Replaces the `build` configuration with the pushed image reference
5. **Deploys**: Proceeds with normal deployment using the built images

## Build Configuration

The `build` field supports three modes:

### Auto Build

The simplest option - automatically detects your application type and builds accordingly:

```yaml
machine:
  name: my-app
  build: auto
  resources:
    cpu: 1
    memory: 256
```

### Options Build

Provides more control over the build process:

```yaml
machine:
  name: my-app
  build:
    options:
      dir: ./backend       # Build directory (default: ".")
      name: my-backend     # Image name (default: auto-generated)
      tag: v1.0.0         # Image tag (default: "latest")
      image: custom/name   # Full image reference (overrides name/tag)
  resources:
    cpu: 1
    memory: 256
```

| Property | Type     | Default | Description                                    |
|:---------|:---------|:--------|:-----------------------------------------------|
| `dir`    | `string` | `"."`   | Directory to build from                        |
| `name`   | `string` | *auto*  | Image name (generates UUID if not specified)  |
| `tag`    | `string` | `"latest"` | Image tag                                   |
| `image`  | `string` | *auto*  | Full image reference (overrides all other options) |

### Docker Build

For projects with existing Dockerfiles:

```yaml
machine:
  name: my-app
  build:
    docker:
      context: .                    # Build context (default: ".")
      dockerfile: Dockerfile.prod   # Dockerfile path (default: "Dockerfile")
      name: my-docker-app          # Image name (default: auto-generated)
      tag: production              # Image tag (default: "latest")
      image: myregistry.com/my-app:v1.0.0  # Full image reference (overrides name/tag)
      args:                        # Build arguments
        NODE_ENV: production
        API_VERSION: v2
  resources:
    cpu: 1
    memory: 256
```

| Property     | Type     | Default        | Description                               |
|:-------------|:---------|:---------------|:------------------------------------------|
| `context`    | `string` | `"."`          | Docker build context directory            |
| `dockerfile` | `string` | `"Dockerfile"` | Path to Dockerfile                        |
| `name`       | `string` | *auto*         | Image name (generates UUID if not specified) |
| `tag`        | `string` | `"latest"`     | Image tag                                 |
| `image`      | `string` | *auto*         | Full image reference (overrides all other options) |
| `args`       | `object` | *none*         | Docker build arguments                    |

## Nixpacks Integration

lttle.cloud uses [Nixpacks](https://nixpacks.com) for automatic builds, which provides zero-configuration support for many languages and frameworks.

### Supported Languages

Nixpacks automatically detects and builds applications for:

- **Node.js** - Detects `package.json`, supports npm/yarn/pnpm
- **Python** - Detects `requirements.txt`, `Pipfile`, `pyproject.toml`
- **Go** - Detects `go.mod`, builds static binaries
- **Rust** - Detects `Cargo.toml`, optimized release builds
- **Java** - Detects Maven (`pom.xml`) or Gradle (`build.gradle`)
- **Ruby** - Detects `Gemfile`, supports Bundler
- **PHP** - Detects `composer.json`, includes common extensions
- **Clojure** - Detects `project.clj` or `build.clj` [Learn more](https://nixpacks.com/docs/providers/clojure)
- **C#/.NET** - Detects `.csproj`, `.sln` files
- **Elixir** - Detects `mix.exs`, supports Phoenix
- **And many more** - See [Nixpacks Language Support](https://nixpacks.com/docs/providers) for the complete list

### Language-Specific Examples

#### Node.js Application

```yaml
app:
  name: web-app
  build: auto
  resources:
    cpu: 1
    memory: 512
  expose:
    web:
      port: 3000
      external:
        protocol: https
```

Nixpacks will:
- Detect `package.json`
- Install dependencies with npm/yarn/pnpm
- Build the application if a build script exists
- Start with `npm start` or the `start` script

#### Python Application

```yaml
machine:
  name: api-server
  build: auto
  resources:
    cpu: 1
    memory: 256
  environment:
    PORT: "8000"
```

Nixpacks will:
- Detect `requirements.txt`, `Pipfile`, or `pyproject.toml`
- Install Python and dependencies
- Start with detected entry point or `python main.py`

#### Go Application

```yaml
machine:
  name: go-service
  build:
    options:
      dir: ./cmd/server
  resources:
    cpu: 1
    memory: 128
```

Nixpacks will:
- Detect `go.mod`
- Build a static binary
- Create minimal container image

### Nixpacks Configuration

You can customize Nixpacks behavior with a `nixpacks.toml` file:

```toml
# nixpacks.toml
[variables]
NODE_VERSION = "18"
NPM_CONFIG_PRODUCTION = "false"

[phases.setup]
nixPkgs = ["nodejs-18_x", "yarn"]

[phases.build]
cmds = [
  "yarn install --frozen-lockfile",
  "yarn build"
]

[start]
cmd = "yarn start"
```

Place this file in your project root or build directory. The CLI will automatically detect and use it.

## Build Process

### Local Building

When you run `lttle deploy`, builds happen locally on your machine:

```bash
$ lttle deploy

→ Building image for default/my-app
→ Auto-build using providers: node
→ Pushing image for default/my-app → registry.lttle.cloud/tenant/my-app:abc123
→ Successfully built and pushed image for default/my-app
→ Successfully deployed app: default/my-app
```

### Build Output

Use `--debug-build` to see detailed build information:

```bash
$ lttle deploy --debug-build

→ Building image for default/my-app
→ Generated image reference: registry.lttle.cloud/tenant/my-app:abc123
→ Building image for path: ./
→ Auto-build using providers: node
→ Build summary:
  setup    │ apt-get update && apt-get install -y nodejs npm
  install  │ npm ci
  build    │ npm run build
  start    │ npm start
→ Generated docker file:
  FROM ubuntu:jammy
  # ... dockerfile content ...
→ Docker build output:
  # ... build logs ...
→ Successfully built and pushed image for default/my-app
```

### Build Cache

Builds are cached by default for faster subsequent deployments. Disable caching with:

```bash
lttle deploy --no-build-cache
```

## Common Build Patterns

### Monorepo Applications

Build specific applications within a monorepo:

```yaml
# Frontend app
app:
  name: frontend
  build:
    options:
      dir: ./apps/web
  resources:
    cpu: 1
    memory: 512

---
# Backend API
app:
  name: backend
  build:
    options:
      dir: ./apps/api
  resources:
    cpu: 1
    memory: 256
```

### Multi-Stage Docker Builds

Use Docker builds for complex scenarios:

```yaml
machine:
  name: production-app
  build:
    docker:
      dockerfile: Dockerfile.prod
      args:
        ENVIRONMENT: production
        BUILD_VERSION: "1.2.3"
  resources:
    cpu: 2
    memory: 1024
```

```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
ARG ENVIRONMENT
ARG BUILD_VERSION
ENV NODE_ENV=${ENVIRONMENT}
ENV VERSION=${BUILD_VERSION}
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Custom Build Commands

Override the default start command:

```yaml
machine:
  name: custom-app
  build: auto
  command:
    - node
    - --experimental-modules
    - server.mjs
  resources:
    cpu: 1
    memory: 256
```

## Troubleshooting

### Build Failures

If your build fails:

1. **Check supported languages**: Ensure your project is [supported by Nixpacks](https://nixpacks.com/docs/providers)
2. **Use debug mode**: Run with `--debug-build` to see detailed logs
3. **Verify build directory**: Ensure the `dir` option points to the correct location
4. **Check dependencies**: Make sure all required files (`package.json`, `requirements.txt`, etc.) are present

### Common Issues

**No compatible providers found**:
```
No compatible providers found for auto-build. Check the documentation for auto-build supported targets.
```
- Ensure your project has the required files for language detection
- Consider using Docker build mode instead

**Dockerfile not found**:
```
Dockerfile not found
```
- Verify the `dockerfile` path in Docker build configuration
- Ensure the Dockerfile exists in the specified location

**Build context issues**:
- Make sure the `context` directory exists and contains necessary files
- Check that paths are relative to your deployment file location

### Getting Help

For build-related issues:
- Check the [Nixpacks documentation](https://nixpacks.com/docs) for language-specific guidance
- Use `--debug-build` flag to get detailed build logs
- Verify your project structure matches the expected patterns for your language

## Best Practices

### Image Optimization

- **Use `.dockerignore`**: Exclude unnecessary files from build context
- **Minimize dependencies**: Only install required packages
- **Use specific versions**: Pin language and dependency versions for reproducible builds

### Build Configuration

- **Environment-specific builds**: Use different build configurations for development/production
- **Consistent naming**: Use descriptive names and tags for images
- **Version tagging**: Tag images with version numbers for better tracking

### Security

- **Minimal base images**: Nixpacks uses optimized base images
- **No secrets in builds**: Use environment variables for runtime secrets, not build arguments
- **Regular updates**: Keep dependencies updated for security patches
