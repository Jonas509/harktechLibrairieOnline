/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../common/user-roles.enum';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<UserRole[]>(
      'allowedRoles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    if (request?.currentUser && request.currentUser.roles) {
      const userRole = request.currentUser.roles;
      const permissions = allowedRoles.includes(userRole);
      if (permissions) return true;
    }
    throw new UnauthorizedException('Not authorized to access');
  }
}
