import { Injectable } from '@angular/core'
import { Utils } from '@nativescript/core'

declare const com: any

@Injectable({
    providedIn: 'root',
})
export class TTSService {

    tts: any;

    constructor() {
        const context = Utils.android.getApplicationContext();
        this.tts = new com.konbinikart.TTS(context);
        
        console.log('TTS ctor');
        console.log(this.tts);
        
    }

    speakEnglish() {
        this.tts.speakEnglish("text me maybe");
    }

    speakJapanese(text: string) {
        this.tts.speakJapanese(text);
    }
}