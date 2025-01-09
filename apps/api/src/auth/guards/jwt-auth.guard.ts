// jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa'; // Changed this line
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private jwksClient;

  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    super();

    const jwksUri = this.configService.get<string>('CLERK_JWKS_ENDPOINT');
    console.log('JWKS URI:', jwksUri);

    this.jwksClient = jwksClient({
      jwksUri,
      cache: true,
      rateLimit: true,
      requestHeaders: {},
      timeout: 30000
    });
  }

   async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      console.log('Verifying token:', token.substring(0, 20) + '...');

      const decoded = jwt.decode(token, { complete: true });
      if (!decoded || !decoded.header.kid) {
        console.log('Invalid token format:', decoded);
        throw new UnauthorizedException('Invalid token format');
      }

      console.log('Decoded token header:', decoded.header);

      const signingKey = await this.jwksClient.getSigningKey(decoded.header.kid);
      const publicKey = signingKey.getPublicKey();

      console.log('Public key retrieved successfully');

      const payload = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
      });

      console.log('Token verified successfully:', payload);

      // Set both the user and clerkId in the request
      request.user = payload;
      request.clerkId = payload.sub; // Add this line - this is the important change!

      return true;
    } catch (error) {
      console.error('JWT verification error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}