package com.WSUH.sight;


import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.community.speechrecognition.SpeechRecognition;
import com.getcapacitor.community.tts.TextToSpeech;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        registerPlugin(TextToSpeech.class);
        registerPlugin(SpeechRecognition.class);
    }

}
