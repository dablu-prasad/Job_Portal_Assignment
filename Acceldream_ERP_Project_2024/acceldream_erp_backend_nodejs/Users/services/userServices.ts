import { client } from "../config/radis_connection";
import { envFile } from "../config/envFile";
import { commonMessage } from "../utils/commonMessage";

export const createModel=async(modelName:any,data:any)=>{
    const Model=modelName
    return await new Model(data).save()
}

export const find=async(key:string,modelName:any,data:any)=>{ 
    let getUser;  
    let cacheKey=`${key}_${data._id||data.email||data.userId}`
    getUser = await client.get(cacheKey);
        if (getUser && key!=commonMessage.commonRadisCacheKey.USER_REGISTOR_DETAIL_BY_KEY) {
          return JSON.parse(getUser);
        } else {
           getUser = await modelName.findOne(data)
          await client.set(cacheKey, JSON.stringify(getUser), { 'EX': envFile.RADIS_EXPIRY_TIME });
          return getUser
        }
}

export const findAll=async(key:string,modelName:any,data:any)=>{ 
  let getUser;  
  let cacheKey=`findAll_${key}_${data._id||data.email||data.userId}`
  getUser = await client.get(cacheKey);
      if (getUser && key!=commonMessage.commonRadisCacheKey.USER_REGISTOR_DETAIL_BY_KEY) {
        return JSON.parse(getUser);
      } else {
         getUser = await modelName.find(data)
        await client.set(cacheKey, JSON.stringify(getUser), { 'EX': envFile.RADIS_EXPIRY_TIME });
        return getUser
      }
}

export const findByIdAndUpdate =async(modelName:any,id:any,updateData:any)=>{ 
    return await modelName.findByIdAndUpdate(id, updateData, {new: true});
}

export const findById=async(modelName:any,id:any)=>{
  return await modelName.findById(id)
}

export const findOneAndDelete=async(modelName:any,data:any)=>{ 
  return await modelName.findOneAndDelete(data);
}
