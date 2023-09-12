import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"

export interface AuthenticatedRequest extends Request {
   payload?: JwtPayload
}

export const cookieJwtAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
   try {
      if (process.env.SECRET_KEY) {
         const header = req.headers['authorization'];
         console.log("test", header);
         
         if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const authToken = bearer[1];
            jwt.verify(authToken, process.env.SECRET_KEY, (err, payload) => {
               if (err) {
                  return res.status(403).json({
                     message: err
                  })
               }
               req.payload = payload as JwtPayload;
               next();
            })
            
         } else {
            res.sendStatus(403)
         }
      
      } else {
         res.status(500).json({
            error: "Internal server error"
         })
      }

   } catch (err) {
      res.clearCookie('token');
      res.redirect("/")
   }
}