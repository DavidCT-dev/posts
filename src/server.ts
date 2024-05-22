import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import indexRoutes from './routes/indexRoutes';
import mongoose from 'mongoose';
import compression from 'compression';
import PostRoutes from './routes/PostRoutes';
import UserRoutes from './routes/UserRoutes';
class Server {
  public app: express.Application
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    
    // this.app.use(express.static(path.join(__dirname, 'public')));
    // this.app.use('/api/v1', routes);
    // this.app.use('/api/v1/auth', authRoutes);
    // this.app.use('/api/v1/users', userRoutes);
    // this.app.use('/api/v1/posts', postRoutes);
    // this.app.use('/api/v1/comments', commentRoutes);
    // this.app.use('/api/v1/likes', likeRoutes);
    // this.app.use('/api/v1/dislikes', dislikeRoutes);
  }

  config(){
    const MONGO_URI = 'mongodb://127.0.0.1/restapit'
    mongoose.connect(MONGO_URI || process.env.MONGODB_URL).then(db=>{console.log('DB in connected')});
    // settings
    this.app.set('port', process.env.PORT || 3000);
    // middlewares
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }
  routes(){
    this.app.use(indexRoutes);
    this.app.use('/api/posts',PostRoutes);
    this.app.use('/api/users',UserRoutes);
  }
  
  start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is running on port ${this.app.get('port')}`);
    });
  }
}
const server = new Server()
server.start()