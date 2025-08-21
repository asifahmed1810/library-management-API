import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Books } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity must be required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due Date is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.statics.borrowBook=async function(
  bookId:string,
  quantity:number,
  dueDate:Date
){
  const book=await Books.findById(bookId);

  if(!book){
    throw new Error("Book Not Found");
  }

  if(book.copies<quantity){
    throw new Error("Not enough copies available");
  }

  book.copies -= quantity;

  if(book.copies ===0){
    book.available= false
  }

  await book.save();

  const borrow=await this.create({book:bookId, quantity,dueDate});
  return borrow;
};

export const Borrow=model<IBorrow>("Borrow",borrowSchema);
