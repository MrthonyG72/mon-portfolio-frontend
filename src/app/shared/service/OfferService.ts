import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base/BaseService';
import { IService } from '../models/IService';

@Injectable({
    providedIn: "root"
})
export class OfferService {

    private baseService = inject(BaseService);
    
    getAllOfferByUserId(id:number): IService[]{
        return [] as IService[]
    }
}