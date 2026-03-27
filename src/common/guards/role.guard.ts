import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());
    
    if (!roles || roles.length === 0) {
      return true;
    }
    
    const req = context.switchToHttp().getRequest();
    const user = req['user'];
    
    console.log('RolesGuard - User:', user);
    console.log('RolesGuard - Roles:', roles);
    
    if (!user || !user.role) {
      console.log('RolesGuard - No user or role');
      throw new UnauthorizedException('User role not found');
    }

    if (!roles.includes(user.role)) {
      console.log('RolesGuard - Role not allowed:', user.role);
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
