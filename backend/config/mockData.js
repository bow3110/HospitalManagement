const pool = require('./database');

const createMockData = async () => {
  await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', ['patient1', 'password123']);
  console.log('Mock data created');
};

createMockData();
