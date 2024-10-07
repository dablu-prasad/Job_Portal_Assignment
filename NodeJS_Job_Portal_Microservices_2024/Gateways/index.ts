import gateway from 'fast-gateway'
import { envFile } from './config/envFile';
const server = gateway({
  routes: [{
    prefix: '/v1/api/admin',
    target: envFile.ADMIN_GRAPHQL_URL_PORT
  },
  {
    prefix: '/v1/api/user',
    target: envFile.USER_GRAPHQL_URL_PORT
  }
]
})
server.start(envFile.PORT)
console.log(`Gateway Service running at ${envFile.COMMON_PORT}`);
console.log(`Admin Service running at ${envFile.COMMON_PORT}/v1/api/admin/graphql`);
console.log(`User Service running at ${envFile.COMMON_PORT}/v1/api/user/graphql`);