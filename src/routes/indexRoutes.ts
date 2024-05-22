import {Response, Request, Router} from "express";

class IndexRoutes {
  
  router: Router;
  
  constructor(){
    this.router = Router();
    this.routes();
  }

  routes(){
    this.router.get('/', (req: Request, res: Response) => {
      res.send('API: /api/posts');
    });
  
  }

}
const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;