const { Client } = require('pg');

async function saveMetrics(benchmark, metrics) {
  try {
    const client = await getClient();
    const sql = 'INSERT INTO perf(benchmark, data) VALUES($1,$2) RETURNING *';
    const res = await client.query(sql, [benchmark, metrics]);
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
}

async function getClient() {
  const client = new Client();
  await client.connect();
  return client;
}

module.exports = {
  saveMetrics,
};
