import * as express from "express-serve-static-core";

declare global{
    namespace Express{
        interface Request{
            customFeild?:string;
        }
    }
}