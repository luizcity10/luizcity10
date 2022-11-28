import connection from "./config/db.js";
import Caixa from "./models/Caixa.js";
import Usuario from "./models/Usuario.js";

const migrate = async () => {
    try {
        const result = await connection.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

migrate();