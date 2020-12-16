# NTTB Proxy

## Running the application
```bash
$ npm run start
```

## Instructions
* When you navigate to `http://localhost:5050` you see the file stored in `public/index.html`
* When you navigate to `http://localhost:5050/style.css` you see the file stored in `public/style.css`
* When you navigate to `http://localhost:5050/sb/api/buffer/sbdis01.json` you get ***proxied*** to `https://www.nttb-ranglijsten.nl/sb/api/buffer/sbdis01.json` (another server)

