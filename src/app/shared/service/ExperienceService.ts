import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base/BaseService';
import { IExperience } from './../models/IExperience';

@Injectable({
    providedIn: "root"
})
export class ExperienceService {

    private baseService = inject(BaseService);
    
    getAllExperienceByUserId(id:number): IExperience[]{
        return [] as IExperience[]
    }
}