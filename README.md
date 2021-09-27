# @mjakubec/jwt-verify

Simple express middleware to authorize JSON Web Tokens and authorize users.

Install with: ``npm install @mjakubec/jwt-verify`` 

Provides `isUserLoggedIn` property (`true` or `false`) on `res.locals` object.

Furthermore, it decodes the values in JWT and provides them as `tokenValues` property on `res.locals` object so that you can see contents of the token.

## Usage

Let's say that the JWT contains `role` value which can be set to either `admin` or `user`

```js
const express = require('express');
const app = express();
const JWTVerify = require('@mjakubec/jwt-verify');

app.use('*', JWTVerify('super_secret_string_for_JWT'));

app.get('/', (req, res) => {
  if (res.locals.isUserLoggedIn) {
    if (res.locals.tokenValues.role === 'admin') { 
      res.send('Hey there, admin!')
    } else if (res.locals.tokenValues.role === 'user' ) {
      res.send('Hello, logged in user.')
    }
  } else {
    res.send('Begone, you heathen.')
  }
})

app.listen(3000);
```

In this case, if the user provides a valid JWT, they can access the restricted content which firther differentiates between user roles. 