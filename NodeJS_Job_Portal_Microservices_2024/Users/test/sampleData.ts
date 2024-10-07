export const clients=[
    {
        id:'1',
        name:'Tony Stark',
        email:'tonysharm11@gmail.com',
        mobile:8897890909
    },
    {
        id:'2',
        name:'Tony Stark2',
        email:'tonysharm12@gmail.com',
        mobile:8897890908
    },
    {
        id:'3',
        name:'Tony Stark3',
        email:'tonysharm13@gmail.com',
        mobile:8897890920
    },
    {
        id:'4',
        name:'Tony Stark4',
        email:'tonysharm14@gmail.com',
        mobile:8897890912
    },
    {
        id:'5',
        name:'Tony Stark5',
        email:'tonysharm15@gmail.com',
        mobile:8897890909
    },
    {
        id:'6',
        name:'Tony Stark6',
        email:'tonysharm16@gmail.com',
        mobile:8897890989
    }
]

// for add users in Grapql

// Docs
// mutation{
//   addUser(firstName:"Dablu",lastName:"Prasad",dateOfBirth:"12/09/2024",mobile:"8896365088",description:"I am working in capgemini"){
//    firstName,
//     lastName,
//     dateOfBirth,
//     mobile,
//     description
//   }
// }
// ​
// {
//   "data": {
//     "addUser": {
//       "firstName": "Dablu",
//       "lastName": "Prasad",
//       "dateOfBirth": "12/09/2024",
//       "mobile": "8896365088",
//       "description": "I am working in capgemini"
//     }
//   }
// }


// deletae the user

// mutation{
//     deleteUser(id:"66f527d64e1796b45b2572ba"){
//      firstName,
//     }
//   }

// list of user by id

// {
//     client(id:"1"){
//      name 
//     }
//     }

// list of user

// {
//     clients{
//      name,
//     }
//     }


//     const getUser= await client.get('userByEmailId');
// if(getUser)
// {
//     return JSON.parse(getUser)
// } else{
  
//     await client.set('userByEmailId', JSON.stringify(existingUser), {'EX':3600});            
//      return existingUser; 
// }