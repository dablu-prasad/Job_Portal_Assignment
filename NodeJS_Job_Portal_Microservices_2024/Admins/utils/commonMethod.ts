import  bcrypt from 'bcryptjs';
import { envFile } from '../config/envFile';
import jwt from 'jsonwebtoken';
import mongoose, { ObjectId } from 'mongoose';
import amqp from 'amqplib';

// Hash Password
export const hashedPassword =async (password:string)=>bcrypt.hash(password, 10);
//Compare Password
export const matchPassword =async(password:string,comparePassword:string)=>bcrypt.compare(password, comparePassword)
// Generate JWT token
 export const token =async(_id:mongoose.Types.ObjectId,email:string,userName:string)=>jwt.sign(
    {
      id: _id,
      email: email,
      userName:userName,
    },
    envFile.SECRET_KEY,
    { expiresIn: '1h' }
  );
// sent data in Queue in RabbitMQ
 export const sentQueueRabbitMQ=async(queueName:string,data:any) =>{
     // Create a connection to the RabbitMQ server
     const connection = await amqp.connect("amqp://localhost");
     // Create a channel
     const channel = await connection.createChannel();
     const queue = queueName
     const msg = JSON.stringify(data)
     await channel.assertQueue(queue, { durable: false, })
     await channel.sendToQueue(queue, Buffer.from(msg))
     console.log(`sent ${msg} to ${queue}`)
     // 5. Close the connection and exit
     setTimeout(() => {
       channel.close();
       connection.close();
     }, 500);
 }
 // Consume data from Queue in RabbitMQ
 export const consumeDataFromRabbitMQ=async(queueName:string)=>{
   // Create a connection to the RabbitMQ server
   const connection = await amqp.connect('amqp://localhost')
   //create a channel
   const channel = await connection.createChannel()
   //Declear the same queue 
   const queue = queueName
   await channel.assertQueue(queue, { durable: false })
   console.log(`[*] Waiting for message in %s. To exit press CTRL+C`, queue)
   channel.consume(queue, (msg: any) => {
     console.log("[x] Received %s", msg.content.toString())
     const data=msg.content.toString()
     return data;     
   })
 }