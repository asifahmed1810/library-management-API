import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes=express.Router();

borrowRoutes.post('/', async(req:Request , res:Response)=>{
    try {
        const {book,quantity,dueDate}=req.body;

        const borrow=await (Borrow as any).borrowBook(book,quantity,dueDate)

        res.status(201).json({
            success:true,
            message:"Book borrowed successfully",
            data:borrow
        })
        
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message:'Borrow request failed',
            error:error.message
        })
        
    }

})

borrowRoutes.get('/',async(req:Request , res:Response)=>{
    try {
        const summary=await Borrow.aggregate([
            {
                $group:{
                    _id:"$book",
                    totalQuantity:{$sum:"$quantity"},
                }
            },
            {
                $lookup:{
                    from:"books",
                    localField:"_id",
                    foreignField:"_id",
                    as:"book",
                }
            },
            {$unwind:"$book"},
            {
                $project:{
                    _id:0,
                    book:{
                        title:"$book.title",
                        isbn:"$book.isbn",
                    },
                    totalQuantity:1,
                }
            }
        ]);
        res.status(201).json({
            success:true,
            message:"Borrowed books summary retrieved successfully",
            data:summary
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"Failed to get borrowed books summary",
            error: error.message
        })
        
    }

})