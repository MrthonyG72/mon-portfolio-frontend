import { inject } from '@angular/core/primitives/di';
import { ILocation } from './../models/ILocation';
import { BaseService } from '../base/BaseService';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class LocationService {

    private baseService = inject(BaseService);
    
    getAllLocationByUserId(id:number): ILocation[]{
        return [] as ILocation[]
    }
}