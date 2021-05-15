import { TextToSpeech, TTSOptions } from '@capacitor-community/text-to-speech';


export class TextToSpeechPage{
    public supportedLanguages: string[] = [];
    public supportedVoices: SpeechSynthesisVoice[] = [];
  
    constructor() {}
  
    public ngOnInit(): void {
      TextToSpeech.getSupportedLanguages().then(result => {
        this.supportedLanguages = result.languages;
      });
      TextToSpeech.getSupportedVoices().then(result => {
        this.supportedVoices = result.voices;
      });
    }
  
    public async speak(): Promise<void> {
      const options: TTSOptions = {
        text: this.formGroup.get('text')?.value,
        lang: this.formGroup.get('lang')?.value,
        rate: this.formGroup.get('rate')?.value,
        pitch: this.formGroup.get('pitch')?.value,
        volume: this.formGroup.get('volume')?.value,
        voice: this.formGroup.get('voice')?.value,
        category: this.formGroup.get('category')?.value,
      };
      await TextToSpeech.speak(options);
    }
  
    public async stop(): Promise<void> {
      await TextToSpeech.stop();
    }
  
    public async openInstall(): Promise<void> {
      await TextToSpeech.openInstall();
    }
  }