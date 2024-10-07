import { createClient } from "redis";
import { envFile } from "./envFile";

export const client= createClient({ url: envFile.RADIS_URL })
              .on("error",err=>console.log(err,'Redis Client Error'))
              
      


