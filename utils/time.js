// middleware utilizing dayjs to timestamp posts
const dayjs = require("dayjs");

let getTime = dayjs().format('MMM D, YYYY') + ' at ' + dayjs().format('h:mm A')

module.exports = getTime;