const env = {
    database: 'restaurantdb',
    username: 'root',
    password: '',
    host: 'localhost',
    port: '27017',
    dialect: 'mongodb',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    bcryptNum: 3  // small number to calculate fast it was slow with us
  };
module.exports = env;