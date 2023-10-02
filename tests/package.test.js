const config = require("./testConfig.js");
const conn = require("../db/conexion.js");
const helper = require("../helpers.js");
const { api, base_url, closeConexion, server } = config;

beforeAll(async () => {
  await conn.query("delete from packages");
  await conn.query("alter table packages auto_increment=1");
});

describe("Endopoint GET packages", () => {
  test("deberia obtener todos los datos", async () => {
    await api
      .post(`${base_url}packages`)
      .send({ nombre_paquete: "paquete1", codigo: helper.code })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api
      .get(`${base_url}get`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

});


afterAll(async () => {
    server.close();
    closeConexion
})
