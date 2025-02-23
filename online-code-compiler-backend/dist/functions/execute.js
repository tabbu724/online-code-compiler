// // Modules
// // const serverless = require('serverless-http')
// import serverless, {Handler} from 'serverless-http'
// import { startServer } from "../app";
// // listen = require('../index')
// // Cache
// let handler: Handler;
// // Handler
// module.exports.handler = async (event: Object, context: Object) => {
//   if (!handler) {
//     const app = startServer()
//     handler = serverless(app, {
//       request: (request: any) => {
//         request.serverless = { event, context }
//         console.log('e,c', event, context);
//       }
//     })
//   }
//   const res = await handler(event, context)
//   return res
// }
//# sourceMappingURL=execute.js.map