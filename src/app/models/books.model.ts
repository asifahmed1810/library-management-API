import { model, Schema } from "mongoose";



const bookSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author :{
        type:String,
        required:true,
        trim: true
    },
    genre:{
        type:String,
        required:true,
        enum:['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    } ,
    isbn :{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        trim:true
    },
    copies:{
        type:Number,
        require:[true,'Number of copies are required'],
        min:[0, 'Copies can not be negative']
    },
    available:{
        type:Boolean,
        require:true,

    }


},
{
    versionKey:false,
    timestamps:true
})

const Books=model('Books',bookSchema)