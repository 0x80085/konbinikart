import { Injectable } from '@angular/core'
import { Utils } from '@nativescript/core'

declare const com: any

@Injectable({
    providedIn: 'root',
})
export class DarkModeShimService {

    context: any;

    constructor() {
        this.context = Utils.android.getApplicationContext();
        console.log('DarkModeShim ctor');
    }

    getMode(): string {
        console.log(com.konbinikart.DarkModeShim.getMode(this.context));
        
        return com.konbinikart.DarkModeShim.getMode(this.context);
    }
}