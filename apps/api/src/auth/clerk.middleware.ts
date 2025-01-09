import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ClerkMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization')?.split(' ')[1];
      
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // Verify the JWT token
      const decodedToken: any = jwt.decode(token);
      
      if (!decodedToken?.sid || !token) {
        throw new UnauthorizedException('Invalid token format');
      }

      // Verify the session using both sessionId and token
      await clerkClient.sessions.verifySession(decodedToken.sid, token);

      // If verification successful, set the user info
      req['user'] = {
        clerkId: decodedToken.sub, // sub claim contains the user ID
      };

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid session');
    }
  }
}
