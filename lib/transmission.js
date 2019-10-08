const Transmission = require("transmission-promise");
const transmission = new Transmission(require("../transmission.json"));

module.exports = transmission;
