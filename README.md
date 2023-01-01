# action-tunnel-server
Distribute action commands from clients to other clients, which are not publicly accessable. This is the middleware, to which the sender and the receiver connect. Therefore, it has to be accessible from both of them.

The sender then sends an action to this server. The receiver instantly gets this message.

## Prequisites
You need to have the following packages installed in your OS:
* NodeJS 16+
* Supervisor (to keep it up running; you can use every other tool for that purpose if you wish)

## Installation
```shell
git clone git@github.com:byWulf/action-tunnel-server.git
```

Create a file named `.env` inside the project directory (where the index.js lies) and fill it with the following content (create random auth token password for better security):
```shell
PORT=3000
AUTH_TOKEN="1234567890"
```

Adjust the `supervisor/action-tunnel-server.ini` file to your needs and move it to `/etc/supervisor.d/` (folder depends on your OS). After that, execute the following commands:
```shell
sudo supervisorctl reread
sudo supervisorctl update
```

Confirm that the process is running successfully:
```shell
sudo supervisorctl status
> action-tunnel-server             RUNNING   pid 1704, uptime 0:00:11
```

## Usage
Use the package `bywulf/action-tunnel-client` in your projects that need to transfer action commands from one to another.

See https://github.com/byWulf/action-tunnel-client for more information.
