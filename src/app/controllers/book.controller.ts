import express, { Request, Response } from "express"
import { Books } from "../models/book.model";

export const bookRoutes=express.Router();

bookRoutes.post("/books",async(req:Request, res:Response)=>{
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


bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;

    // Build the filter object
    const query: any = {};
    if (filter) {
      query.genre = filter; // filter by genre
    }

    // Sorting order
    const sortOrder = sort === "desc" ? -1 : 1;

    // Fetch books from DB
    const books = await Books.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: (error as Error).message,
    });
  }
});


bookRoutes.get("/books/:bookId",async(req:Request, res:Response)=>{
    const bookId=req.params.bookId;
    const book=await Books.findById(bookId);

    res.status(201).json({
        success:true,
        message:"Books retrieved successfully",
        book
    })
})

bookRoutes.patch("/books/:bookId",async(req:Request,res:Response)=>{
  

    const bookId=req.params.bookId;
    const Updatebody=req.body;
    const book=await Books.findByIdAndUpdate(bookId,Updatebody,{new:true});

    res.status(201).json({
        success:true,
        message:"Book updated successfully",
        book
    })

})

bookRoutes.delete("/books/:bookId",async(req:Request, res:Response)=>{
    const bookId=req.params.bookId;
    const book=await Books.findByIdAndDelete(bookId);
    res.status(201).json({
        success:true,
        message:"Book deleted successfully",
        data:null
    })
})