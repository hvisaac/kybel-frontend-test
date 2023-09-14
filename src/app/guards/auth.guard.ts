import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const AuthorizationGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.validatePermissions()
}
