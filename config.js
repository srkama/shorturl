const util = require("util");

let defaultConfig = {
    env: "dev",
    http: {
        port: "3005"
    },
    db: 'mongodb://127.0.0.1:27017',
    cache: '',
};

let productionConfig = Object.assign({}, defaultConfig);

productionConfig.http.port = "3080";
productionConfig.env = "prod";

configToExport =
    process.env.NODE_ENV === "prod" ? productionConfig : defaultConfig;

module.exports = configToExport;
