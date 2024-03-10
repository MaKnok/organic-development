import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockAuthGuard implements CanActivate {
canActivate(): Observable<boolean> {
    return of(true);
 }
}

// This function is used to create an instance of the MockAuthGuard
export function mockAuthGuardFactory(): MockAuthGuard {
    return new MockAuthGuard();
}