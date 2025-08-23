import express ,{Application, Request, Response} from 'express'
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';
import { errorHandler } from './app/middleware/errorHandler';
import corsMiddleware from "cors";



const app:Application=express();


app.use(express.json())
app.use(corsMiddleware({origin:"https://library-management-api-nu-nine.vercel.app"}))

app.use('/api',bookRoutes)
app.use('/api/borrow',borrowRoutes)


app.get('/',(req:Request , res:Response)=>{
    res.send('Welcome To Library Management app')
} )

app.use(errorHandler)


export default app;

function cors(p0: { origin: string; }): any {
    throw new Error('Function not implemented.');
}
