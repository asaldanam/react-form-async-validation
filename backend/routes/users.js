var express = require('express');
var router = express.Router();

const regex = {
	email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

class User {
  user;

  constructor() {
    this.user = {}
  }

  setUser(user) {
    this.user = user;
  }

  getUserState(config) {
    const required = (value) => 
      value
      && config?.createMode 
      && 'El campo es requerido'
      || null;

    const pattern = (value, pattern, msg) => {
      if (value?.length > 0) {
        const patternMatch = pattern.test(String(field).toLowerCase());
        return !patternMatch && msg || null;
      }
      return false;
    }
  
    const state = {
      fields: {
        email: {
          disabled: false,
          error: 
            pattern(this.user.email, regex.email, 'El email no es válido') || 
            required(this.user.email)				
        },
        name: {
          disabled: false,
          error: 
            required(this.user.name),
        },
        surname: {
          disabled: false,
          error: 
            required(this.user.surname),
        },
      }
    };

    const fieldsState = Object.values(state.fields);
    const isValid = fieldsState.every(field => !field.error)

    console.log({fieldsState});
    return { state };
  }
}

const user = new User();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('vital check');
});

/* POST validate users. */
router.post('/create:validate', function(req, res, next) {
  try {
    const values = req.body.values;
    user.setUser(values);
    const { state } = user.getUserState()
    setTimeout(() => res.send(state), 1000)
  } catch(err) {
    console.log(err);
    res.status(500).send({
      message: 'Something broke!',
      detail: err,
    });
  }
});

/* POST create users. */
router.post('/create', function(req, res, next) {
  try {
    // user.setUser(values);
    const values = req.body.values;
    const { state } = user.getUserState({createMode: true});
    setTimeout(() => res.send(state), 1000);
  } catch(err) {
    console.log(err);
    res.status(500).send({
      message: 'Something broke!',
      detail: err,
    });
  }
});

module.exports = router;
