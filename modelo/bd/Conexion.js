const mysql = require('mysql2');
const dbConfig = require('./Config');

class Conexion {
  constructor() {
    this.pool = mysql.createPool(dbConfig);

    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error('❌ Error al conectar a la base de datos:', err.message);
      } else {
        console.log('✅ Conectado a la base de datos');
        connection.release();
      }
    });
  }

  query(queryString, params) {
    return this.pool.promise().query(queryString, params)
      .then(([results]) => results)
      .catch(err => {
        console.error('❌ Error durante la consulta:', err.message);
        throw err;
      });
  }

  // 🔥 NUEVO: Permitir obtener una conexión (para transacciones)
  async getConnection() {
    try {
      const connection = await this.pool.promise().getConnection();
      return connection;
    } catch (err) {
      console.error('❌ Error al obtener una conexión del pool:', err.message);
      throw err;
    }
  }
}

module.exports = new Conexion();
