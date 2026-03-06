import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base/BaseService';
import { ISocial } from './../models/ISocial';

@Injectable({
    providedIn: "root"
})
export class SocialService {

    private baseService = inject(BaseService);

    getAllSocialByUserId(id:number): ISocial[]{
        return [] as ISocial[]
    }
}