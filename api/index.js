//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen( 3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const dietas = ["gluten free","paleolithic", "vegetarian", "lacto ovo vegetarian","vegan","pescatarian","paleo","primal","whole 30", "fodmap friendly", "fruitarian", "dairyFree"];
    dietas.forEach(async (element) => await Diet.create({name: element}));
    console.log('Tipos de dieta pre-cargadas')
  });
});
