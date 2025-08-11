import express, { Request, Response } from "express"
import { Books } from "../models/book.model";

export const bookRoutes=express.Router();

bookRoutes.post("/create-book",async(req:Request, res:Response)=>{
    try {
        const body=req.body
        const book=await Books.create(body)

       

        res.status(201).json({
            success:true,
            message:"Book created successfully ",
            data:book
        })
        
    } catch (error:any) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message,
            error
        })
    }
})
