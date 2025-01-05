// src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as clerk from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private clerk;

  constructor() {
    this.clerk = clerk.createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionToken = req.headers.authorization?.split(' ')[1];
      
      if (!sessionToken) {
        throw new UnauthorizedException('No token provided');
      }

      const sessionId = sessionToken.split('_')[1]; // Extract session ID from token
      const session = await this.clerk.sessions.verifySession(sessionId, sessionToken);
      req['user'] = session;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}