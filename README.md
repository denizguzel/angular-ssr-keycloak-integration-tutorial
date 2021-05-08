# Angular Server Side Rendering With Keycloak

You can create user and login with keycloak to angular application.

```
Keycloak Admin User and Password: admin
```

### Keycloak Installation

```
$ docker-compose up -d
```

> Keycloak Server listening on http://localhost:8080

> Make sure to create an user to login angular application.

[Keycloak -> Manage -> Users -> Add User](http://localhost:8080/auth/admin/master/console/#/realms/frontend/users)

### Angular Installation

```
$ yarn install
```

### Angular Run Dev Mode

```
$ yarn start
```

### Angular Run Dev SSR Mode

```
$ yarn dev:ssr
```

### Angular Run Prod Mode

```
$ yarn build:ssr
$ yarn serve:ssr
```

> Server listening on http://localhost:4000
