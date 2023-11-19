import { CanActivateFn } from '@angular/router';
import { BannedService } from './banned.service';
import { inject } from '@angular/core';

export const banGuard: CanActivateFn = (route, state) => {
  const ban_service = inject(BannedService);
  const breed = route.paramMap.get('breed');

  if (breed) {
    const is_banned = ban_service.isBanned(breed);

    if (
      is_banned &&
      !confirm('Are you sure you want to visit this banned breed?')
    ) {
      return false;
    }

    return true;
  }

  return true;
};
