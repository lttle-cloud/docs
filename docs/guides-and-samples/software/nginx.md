---
sidebar_position: 1
---

# Nginx

Nginx is a high-performance web server, reverse proxy, and load balancer known for its speed, scalability, and reliability. It is widely used to serve static content, handle HTTP requests, and manage traffic for web applications.

## Serving static files

This guide walks you through deploying a simple static website with [Nginx](https://nginx.org/) on [lttle.cloud](https://lttle.cloud), from basic setup to adding flash mode for cost-efficient serverless hosting.

:::tip

If you want to skip the explanations, you can find the complete final example in our [GitHub Samples &raquo; Nginx &raquo; Custom Nginx Server with Dockerfile](https://github.com/lttle-cloud/samples/tree/main/nginx/custom-dockerfile).

:::

### Creating the static site

Create a file named `index.html` with any content you like, for example:

```bash
echo "Hello from Nginx via lttle.cloud! (custom dockerfile)" > index.html
```

Or you can use any static site generator or framework to create a more complex static site.

### Nginx configuration

Create a file named `nginx.conf` with the following content that uses sendfile syscal and usage of pre-compressed gzip files to reduce memory and cpu usage:

```nginx title="nginx.conf" {5-8,13-16}
server {
    listen      80;
    server_name _;

    # Use linux sendfile syscall to speed up file transfers
    # and reduce mem & cpu usage
    sendfile            on;
    sendfile_max_chunk  1m;

    root /usr/share/nginx/html/;

    location / {
        # Try to serve pre-compressed file first, then fall back to regular file
        # to reduce mem & cpu usage
        gzip_static on;
        gzip_comp_level 6;
    }
}
```

### Docker image

Create a file named `Dockerfile` with the following content and make sure to pre-compress all static files with gzip:

```dockerfile title="Dockerfile" {6-7,9-11}
FROM nginx:latest

# Our custom nginx config file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Our static website
COPY ./index.html /usr/share/nginx/html/index.html

# Compress all build files with gzip
# But keep original files as well
RUN find . -type f -exec gzip -9 -k \{\} \;
```

### Deployment

Now that everything is setup, we can deploy our app, check the deployment and then remove it.

#### Deployment configuration

Create a file named `nginx-custom-dockerfile.lttle.yaml` with the following content:

```yaml title="nginx-custom-dockerfile.lttle.yaml"
app:
  name: nginx-custom-dockerfile
  namespace: samples
  build:
    docker:
      dockerfile: dockerfile
      context: .
  resources:
    # Nginx is very lightweight, so we can use minimal resources
    # Make sure to allocate enough cpu and memory for your static site(s) needs
    cpu: 1
    memory: 64
  expose:
    # We expose a public HTTPS endpoint that
    # proxies to the Nginx server on port 80
    public:
      # When there are no more active connections to our service
      # It will be safe to snapshot & sleep our machine
      connection-tracking: connection-aware
      port: 80
      external:
        protocol: https
  mode:
    flash:
      strategy:
        # We snapshot and save the state of the container
        # After it has listened on port 80
        listen-on-port: 80
```

#### Deploying

To deploy the application, run the following command in the directory where you created the `nginx.lttle.yaml` file:

```plaintext command="lttle deploy nginx-custom-dockerfile.lttle.yaml"
// lttle-green-output-next-line
Building and pushing image for samples/nginx-custom-dockerfile
// lttle-green-output-next-line
Built image eu.registry.lttle.cloud/your-tenant/f6a1db28-2d0a-4a09-bf0e-915970223be6:latest
// lttle-green-output-next-line
Pushing image eu.registry.lttle.cloud/your-tenant/f6a1db28-2d0a-4a09-bf0e-915970223be6:latest
// lttle-green-output-next-line
Pushed image for samples/nginx-custom-dockerfile → eu.registry.lttle.cloud/your-tenant/f6a1db28-2d0a-4a09-bf0e-915970223be6:latest
// lttle-good-output-next-line
Successfully deployed app: samples/nginx-custom-dockerfile
```

#### Checking the deployment

After the deployment is complete, you can check the status of your application by running:

```plaintext command="lttle app get --ns samples nginx-custom-dockerfile"
               name: nginx-custom-dockerfile
          namespace: samples
               mode: flash
  snapshot strategy: listen on port 80
    suspend timeout: 10s
              image: eu.registry.lttle.cloud/your-tenant/f6a1db28-2d0a-4a09-bf0e-915970223be6:latest
               cpus: 1
             memory: 64 MiB
           services: public: https://nginx-custom-dockerfile--samples--public--your-tenant.eu.lttle.host → :80
```

If you want to see it live, you can

- Deploy and change `your-tenant` to your actual tenant name and then click the link in the `services` section above
- Or you can visit our deployment of this sample at: [https://nginx-custom-dockerfile--samples--public--aifrim.eu.lttle.host/](https://nginx-custom-dockerfile--samples--public--aifrim.eu.lttle.host/)

#### Checking the logs

You can view the logs of your application by running:

```plaintext command="lttle app logs --ns samples nginx-custom-dockerfile -f"
// lttle-good-output-next-line
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
// lttle-good-output-next-line
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/\
// lttle-good-output-next-line
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
// lttle-good-output-next-line
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
// lttle-good-output-next-line
10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
// lttle-good-output-next-line
/docker-entrypoint.sh: Ignoring /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh.gz
// lttle-good-output-next-line
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
// lttle-good-output-next-line
/docker-entrypoint.sh: Ignoring /docker-entrypoint.d/15-local-resolvers.envsh.gz
// lttle-good-output-next-line
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
// lttle-good-output-next-line
/docker-entrypoint.sh: Ignoring /docker-entrypoint.d/20-envsubst-on-templates.sh.gz
// lttle-good-output-next-line
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
// lttle-good-output-next-line
/docker-entrypoint.sh: Ignoring /docker-entrypoint.d/30-tune-worker-processes.sh.gz
// lttle-good-output-next-line
/docker-entrypoint.sh: Configuration complete; ready for start up
// lttle-bad-output-next-line
2025/10/11 17:38:32 [notice] 1#1: using the "epoll" event method
// lttle-bad-output-next-line
2025/10/11 17:38:32 [notice] 1#1: nginx/1.29.2
// lttle-bad-output-next-line
2025/10/11 17:38:32 [notice] 1#1: built by gcc 14.2.0 (Debian 14.2.0-19)
// lttle-bad-output-next-line
2025/10/11 17:38:32 [notice] 1#1: OS: Linux 6.1.0+
// lttle-bad-output-next-line
2025/10/11 17:38:32 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1024:4096
// lttle-bad-output-next-line
2025/10/11 17:38:32 [notice] 1#1: start worker processes
// lttle-bad-output-next-line
2025/10/11 17:38:32 [notice] 1#1: start worker process 23
```

#### Removing the deployment

```plaintext command="lttle app delete --ns samples nginx-custom-dockerfile -y"
// lttle-good-output-next-line
App 'nginx-custom-dockerfile' has been deleted.
```
