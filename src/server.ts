import express, { Express } from 'express';
import morgan from 'morgan';
import { PORT } from './config'
import { routes } from './routes';
import cors from 'cors';
import { verifyToken } from './middlewares';

// TODO: validar que se inicialize la conexion a la bd
export class Server {
  private app: Express;

  constructor(){
    this.app = express();
    this.configuration();
    this.middlewares();
    this.routes();
  }

  configuration(){
    this.app.set('port', PORT || 3000);
  }

  middlewares(){
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(){
    this.app.get('/', (req, res)=>{
      res.status(200).json({
        name:'API'
      })
    });

    this.app.use('/api/habits',verifyToken, routes.habitRoutes);
    this.app.use('/api/users', routes.userRoutes)
  }

  listen(){
    this.app.listen(this.app.get('port'), ()=>{
      console.log(`Server running on port ${this.app.get('port')}`);      
    })
  }

}