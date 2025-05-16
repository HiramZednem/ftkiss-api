import express, { Express } from 'express';
import morgan from 'morgan';
import { PORT } from './config'
import { routes } from './routes';
import cors from 'cors';
import { verifyToken } from './middlewares';
import { prisma } from './db/db';
import { MailService } from './services/mail.service';

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

    this.app.use('/api/habits', verifyToken, routes.habitRoutes);
    this.app.use('/api/users', routes.userRoutes)
    this.app.use('/api/habit-logs', verifyToken, routes.habitLogRoutes);
  }

  async listen() {
    try {
      await prisma.$connect();
      console.log('✅ Database connection established');

      MailService.getInstance();
      console.log('📨 MailService initialized');
  
      this.app.listen(this.app.get('port'), ()=>{
        console.log(`🚀 Server running on port ${this.app.get('port')}`);      
      })
    } catch(error: any) {
      console.error('❌ Error during server initialization:', error);
      process.exit(1);
    }
  }

}