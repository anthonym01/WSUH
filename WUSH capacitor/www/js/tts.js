var _textToSpeech = require("@capacitor-community/text-to-speech");

const tts = () => {
  const speak = async () => {
    await _textToSpeech.TextToSpeech.speak({
      text: "Hello Gregory",
      lang: 'en_US',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient'
    });
  };

  const stop = async () => {
    await _textToSpeech.TextToSpeech.stop();
  };

  const getSupportedLanguages = async () => {
    const languages = await _textToSpeech.TextToSpeech.getSupportedLanguages();
  };

  const getSupportedVoices = async () => {
    const voices = await _textToSpeech.TextToSpeech.getSupportedVoices();
  };

  const isLanguageSupported = async lang => {
    const isSupported = await _textToSpeech.TextToSpeech.isLanguageSupported({
      lang
    });
  };

  return {
    speak,
    stop,
    getSupportedLanguages,
    getSupportedVoices,
    isLanguageSupported
  };
};

module.exports = tts;