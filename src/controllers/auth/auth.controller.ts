import Express, { Router } from "express";
const router: Router = Express.Router();
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getAuthToken, getUser } from "./auth.services.js";
import { AuthenticatedRequest, cookieJwtAuth } from "../../middleware/cookieJwtAuth.js";
import multer from "multer";
const upload = multer();

type DecodeToken = {
   id: number,
   role_id: number,
   username: string,
   iat: number,
   exp: number,
} & JwtPayload

function generateAccessToken(id: number, username: string, role_id: number) {
   if (!process.env.SECRET_KEY) {
      return ""
   }

   const payload = {
      id: id,
      username: username,
      role_id: role_id,
   }
   return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
   
}

router.get('/', cookieJwtAuth, (req, res) => {
   console.log(req.cookies.token);
   const decode = jwt.decode(req.cookies.token) as DecodeToken

   if (decode) {
      console.log({
         id: decode.id,
         role_id: decode.role_id,
         username: decode.username
      });
   }

   
   
})

router.post("/", upload.any(),async (req, res) => {
   const { username, password } = req.body;
   
   const user = await getAuthToken(username)

   if (user?.password !== password || user?.username !== username) {
      return res.status(403).json({
         error: "invalid login"
      })
   } 

   if (!user) {
      return res.status(404).json({
         message: "User not found"
      })
   }
   
   try {  

      const token = generateAccessToken(user.id, user.username, user.role_id)

      // res.setHeader('Set-Cookie', token)
      res.status(200).json({ 
         data: {
            id: user.id,
            username: user.username,
            role_id: user.role_id,
            token: token
         },
         message: "success"
      })
      


   } catch (error) {
      console.error("Error occurred during authentication:", error);
      res.status(500).json({ error: "Internal server error" });
   }
})

export default router;