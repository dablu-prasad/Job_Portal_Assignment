// import userModel from "../models/userModel";
// import { 
//     GraphQLObjectType,
//      GraphQLID,
//       GraphQLString,
//        GraphQLSchema,
//         GraphQLList,
//         GraphQLNonNull
//      } from "graphql"

// //Client Type
// const ClientType = new GraphQLObjectType({
//     name: "User",
//     fields: () => ({
//         id: { type: GraphQLID },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         dateOfBirth:{type:GraphQLString},
//         mobile: { type: GraphQLString },
//         description:{ type: GraphQLString }
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         clients: {
//             type: new GraphQLList(ClientType),
//             resolve(parent, args) {
//                 return userModel.find();
//             }
//         },
//         client: {
//             type: ClientType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 return userModel.findById(args.id);
//             }
//         }
//     }
// })

// //Mutation
// const mutation =new GraphQLObjectType({
//     name:"Mutation",
//     fields:{
//         addUser:{
//             type:ClientType,
//             args:{
//                 firstName:{type:GraphQLNonNull(GraphQLString)},
//                 lastName:{type:GraphQLNonNull(GraphQLString)},
//                 dateOfBirth:{type:GraphQLNonNull(GraphQLString)},
//                 mobile:{type:GraphQLNonNull(GraphQLString)},
//                 description:{type:GraphQLNonNull(GraphQLString)},
//             },
//             resolve(parent,args){
//                 const user=new userModel({
//                     firstName:args.firstName,
//                     lastName:args.lastName,
//                     dateOfBirth:args.dateOfBirth, 
//                     mobile:args.mobile, 
//                     description:args.description, 
//                 }) 
//                 return user.save();
//             }
//         },
//         deleteUser:{
//             type:ClientType,
//             args:{
//                 id:{type:GraphQLNonNull(GraphQLID)},
//             },
//             resolve(parent,args){
//                 return userModel.findByIdAndDelete(args.id)
//             }
//         },
//         updateUser:{
//             type:ClientType,
//             args:{
//                 id:{type:GraphQLNonNull(GraphQLID)},
//                 firstName:{type:GraphQLString},
//                 lastName:{type:GraphQLString},
//                 dateOfBirth:{type:GraphQLString},
//                 mobile:{type:GraphQLString},
//                 description:{type:GraphQLString},
//             },
//             resolve(parent,args){
//                 return userModel.findByIdAndUpdate(
//                     args.id,
//                   {
//                     $set:{
//                         firstName:args.firstName,
//                 lastName:args.lastName,
//                 dateOfBirth:args.dateOfBirth,
//                 mobile:args.mobile,
//                 description:args.description,
//                     }
//                   },
//                   {new:true}
//                 )
//             }
//         }
//     }
// })
// export default new GraphQLSchema({
//     query: RootQuery,
//     mutation
// })