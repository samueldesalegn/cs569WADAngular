import { CanActivateFn } from '@angular/router';
import { DataService } from './data.service';
import { inject } from '@angular/core';

export const protectGuard: CanActivateFn = (route, state) => {
  const data = inject(DataService);
  const isManager = data.isManager_signal()
  return isManager;
};
