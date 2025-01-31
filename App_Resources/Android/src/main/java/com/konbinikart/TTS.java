
package com.konbinikart;

import android.content.Context;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import java.util.Locale;

public class TTS {  
  private TextToSpeech tts;
  private Context context;
  private boolean isInitialized = false;

  public TTS(Context context) {

    this.context = context;

      tts = new TextToSpeech(context, new TextToSpeech.OnInitListener() {
          @Override
          public void onInit(int status) {
              if (status == TextToSpeech.SUCCESS) {
                  isInitialized = true;
                  Log.d("TTSManager", "TTS initialized successfully");
              } else {
                  Log.e("TTSManager", "Initialization failed");
              }
          }
      });
  }

  // Method to speak English text
  public void speakEnglish(String text) {
      Log.e("TTSManager", "test eng");

      if (isInitialized) {
          Log.e("TTSManager", "inited");
          tts.setLanguage(Locale.ENGLISH);
          tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
          Log.e("TTSManager", "done");
      } else {
          Log.e("TTSManager", "not inited");
          Log.e("TTSManager", "TTS not initialized");
      }
  }

  // Method to speak Japanese text
  public void speakJapanese(String text) {
      if (isInitialized) {
          int result = tts.setLanguage(Locale.JAPANESE);
          if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
              Log.e("TTSManager", "Japanese language is not supported on this device");
          } else {
              tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
          }
      } else {
          Log.e("TTSManager", "TTS not initialized");
      }
  }

  // Method to shut down the TTS engine
  public void shutdown() {
      if (tts != null) {
          tts.stop();
          tts.shutdown();
      }
  }
}