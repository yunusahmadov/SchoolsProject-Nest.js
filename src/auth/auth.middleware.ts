import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtServices: JwtService){}
  use(req: any, res: any, next: () => void) {


    try{
      const check = this.jwtServices.verify(req.headers.authorization.split(' ')[1]);
      next();
    }catch(err){
      res.status(401).send('Un Auth')
    }
    
  }
}
