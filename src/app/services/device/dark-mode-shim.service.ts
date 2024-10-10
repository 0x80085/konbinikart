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
    }

    getMode(): string {
        
        const mode = com.konbinikart.DarkModeShim.getMode(this.context);
        return mode;
    }
}