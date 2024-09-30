import { Injectable } from '@angular/core'
import { Utils } from '@nativescript/core'

declare const com: any


@Injectable({
    providedIn: 'root',
})
export class TTSService {


    helloJava: any;

    constructor() {
        const context = Utils.android.getApplicationContext();
        this.helloJava = new com.example.HelloJava(context);

        console.log(
            this.helloJava.getString()
        );
    }

    speakEnglish() {

        this.helloJava.speakEnglish("text me maybe");
    }

    speakJapanese(text: string) {

        this.helloJava.speakJapanese(text);
    }
}