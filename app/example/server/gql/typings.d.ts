// declare module '*.graphql' {
//   import { DocumentNode } from 'graphql';

//   const value: {
//     [key: string]: DocumentNode
//   }

//   export default value
// }

declare module "*.graphql" {
  const content: string
  export default content
}
