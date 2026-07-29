import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // For now, we can toggle this or check an AuthService
  const isAuthenticated = false; // Change to true to test allowing access

  if (isAuthenticated) {
    return true;
  } else {
    // Redirect to home or login if not authenticated
    router.navigate(['/']);
    return false;
  }
};