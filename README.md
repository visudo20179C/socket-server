# socket-io server

This is the socket-io server for the connect four project that I wrote in VueJS.

It's mostly comprised of the `app.js` file and uses Express as the web server.

The server has a CORS rule in place so only requests coming from origin `https://connect-four.visudo.me/` are accepted.

You can change this to any other host, including wildcards such as `*` for **all** hosts.

## Production 

In Production the server needs a valid CA SSL Cert, i.e. you can't use a self-signed cert.

There are sereval ways to do this, but I used [certbot](https://certbot.eff.org/) to generate an CA SSL cert on my Ubuntu 16.04 machine.

You also need a dedicated host and correctly configured DNS for this to work.

## Development

This is node.js at it's core. You can run the server simply by:

```
node app.js
```

If you want to debug socket-io specifically, you should run the server with the following `DEBUG` option:

```
DEBUG=socket-io* node app.js
```

## Contributing

This is a personal project, but I'm always open to contributions/feedback if you have any to provide.
