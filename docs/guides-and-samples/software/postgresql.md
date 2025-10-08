---
sidebar_position: 2
---

# PostgreSQL

PostgreSQL, often simply referred to as PostgreSQL, is a powerful, open-source relational database management system (RDBMS) known for its robustness, extensibility, and standards compliance. It is widely used for storing and managing structured data in various applications, from small-scale projects to large enterprise systems.

:::tip

If you want to skip the explanations, you can find the complete final example in our [GitHub Samples &raquo; PostgreSQL](https://github.com/lttle-cloud/samples/tree/main/postgres) or our [Github Samples &raquo; Next.js App](https://github.com/lttle-cloud/samples/tree/main/nextjs-app) that uses PostgreSQL + Drizzle.

:::

## Custom PostgreSQL Image

Because of the way PostgreSQL works, there were some caveats. In order to address them, we had to:

1. Create a custom PostgreSQL Module to allow the usage of [manual flash mode](../../resources/machines.mdx#manual).
2. Create a custom Docker image that builds & uses that module.

## Deployment

### Creating the deployment configuration

Create a file named `postgresql.lttle.yaml` where we will deploy a volume of 100 MiB and our custom PostgreSQL image with manual flash mode enabled:

```yaml title="postgresql.lttle.yaml"
volume:
  name: pgdata
  namespace: samples
  mode: writeable
  size: 100Mi
---
app:
  name: postgresql
  namespace: samples
  image: ghcr.io/lttle-cloud/postgres:17-flash
  resources:
    cpu: 1
    memory: 256
  mode:
    flash:
      strategy: manual
      timeout: 3
  environment:
    POSTGRES_PASSWORD: password
    POSTGRES_USER: user
    POSTGRES_DB: db
  volumes:
    - name: pgdata
      path: /var/lib/postgresql/data
  expose:
    access:
      port: 5432
      internal: {}
```

### Deploying the application

To deploy the application, run the following command in the directory where you created the `postgresql.lttle.yaml` file:

```plaintext command="lttle deploy postgresql.lttle.yaml"
// lttle-good-output-next-line
Successfully deployed volume: samples/pgdata
// lttle-good-output-next-line
Successfully deployed app: samples/postgresql
```

### Checking the deployment

After the deployment is complete, you can check the status of your application by running:

```plaintext command="lttle app get --ns samples postgresql"
               name: postgresql
          namespace: samples
               mode: flash
  snapshot strategy: manual
    suspend timeout: 3s
              image: ghcr.io/lttle-cloud/postgres:17-flash
               cpus: 1
             memory: 256 MiB
        environment: POSTGRES_DB = db
                     POSTGRES_PASSWORD = password
                     POSTGRES_USER = user
            volumes: samples/pgdata → /var/lib/postgresql/data
       dependencies:
           services: access: tcp://postgresql-access.samples.svc.lttle.local:5432 → :5432
```

### Checking the logs

```plaintext command="lttle machine logs --ns samples postgres"
// lttle-good-output-next-line
The files belonging to this database system will be owned by user "postgres".
// lttle-good-output-next-line
This user must also own the server process.
// lttle-good-output-next-line
The database cluster will be initialized with locale "en_US.utf8".
// lttle-good-output-next-line
The default database encoding has accordingly been set to "UTF8".
// lttle-good-output-next-line
The default text search configuration will be set to "english".
// lttle-good-output-next-line
Data page checksums are disabled.
// lttle-good-output-next-line
fixing permissions on existing directory /var/lib/postgresql/data ... ok
// lttle-good-output-next-line
creating subdirectories ... ok
// lttle-good-output-next-line
selecting dynamic shared memory implementation ... posix
// lttle-good-output-next-line
selecting default "max_connections" ... 100
// lttle-good-output-next-line
selecting default "shared_buffers" ... 128MB
// lttle-good-output-next-line
selecting default time zone ... Etc/UTC
// lttle-good-output-next-line
creating configuration files ... ok
// lttle-good-output-next-line
running bootstrap script ... ok
// lttle-good-output-next-line
performing post-bootstrap initialization ... ok
// lttle-good-output-next-line
syncing data to disk ... ok
// lttle-bad-output-next-line
initdb: warning: enabling "trust" authentication for local connections
// lttle-bad-output-next-line
initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
// lttle-good-output-next-line
Success. You can now start the database server using:
// lttle-good-output-next-line
    pg_ctl -D /var/lib/postgresql/data -l logfile start
// lttle-good-output-next-line
// highlight-next-line
waiting for server to start....2025-10-11 19:14:44.459 UTC [44] LOG:  lttle_pg: init
// lttle-good-output-next-line
2025-10-11 19:14:44.463 UTC [44] LOG:  starting PostgreSQL 17.5 (Debian 17.5-1.pgdg120+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit
// lttle-good-output-next-line
2025-10-11 19:14:44.464 UTC [44] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
// lttle-good-output-next-line
2025-10-11 19:14:44.466 UTC [47] LOG:  database system was shut down at 2025-10-11 19:14:44 UTC
// lttle-good-output-next-line
2025-10-11 19:14:44.469 UTC [44] LOG:  database system is ready to accept connections
// lttle-good-output-next-line
// highlight-next-line
2025-10-11 19:14:44.470 UTC [50] LOG:  lttle_pg: flash ready worker
```

Note:

- `lttle_pg: init` indicates that the PostgreSQL module has initialized successfully.
- `lttle_pg: flash ready worker` indicates that the PostgreSQL module is ready for manual flash operations.

### Connecting to PostgreSQL

To remotely connect to the PostgreSQL instance, you can use the `lttle machine exec` command to open a psql shell and type SQL commands directly:

```plaintext command="lttle machine exec --ns samples postgresql -i -t psql -d db -U user -W"
Password:
psql (17.5 (Debian 17.5-1.pgdg120+1))
Type "help" for help.

db=# select CURRENT_TIME;
    current_time
--------------------
 19:28:34.886504+00
(1 row)

db=#
```

### Removing the deployment

First, we need to delete the app, and then the volume:

```plaintext command="lttle app delete --ns samples postgresql -y"
// lttle-good-output-next-line
App 'postgresql' has been deleted.
```

```plaintext command="lttle volume rm --ns samples pgdata -y"
// lttle-good-output-next-line
Volume 'pgdata' has been deleted.
```
