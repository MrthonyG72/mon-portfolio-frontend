import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { BaseService } from '../base/BaseService';

@Injectable({
    providedIn: "root"
})
export class UserService {

    private baseService = inject(BaseService);
    getUserById(id:number): IUser{
        return {} as IUser
    }
}