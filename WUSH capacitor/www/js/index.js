//import { App } from '@capacitor/app';
//const App = require('@capacitor/app');
const { Plugins, AppState } = Capacitor;
const { App, SpeechRecognition, Camera, CameraResultType } = Plugins;
const _textToSpeech = require("@capacitor-community/text-to-speech");
const TextToSpeech = _textToSpeech.TextToSpeech;


const sight_preview = document.getElementById('sight_preview')

App.addListener('backButton', function () { console.log('Back button'); back() })

window.onload = maininitalizer();

function maininitalizer() {
    if (localStorage.getItem("APPname_cfg")) {
        config.load()
    }

    /*if (!SpeechRecognition.hasPermission()) {
        SpeechRecognition.requestPermission();
    }*/
}

/* General properties */
let properties = {
    exit: false,
}


/* Local configuration */
let config = {
    data: {
        usecount: 0,
        animation: true,
        theme: "dark",
        accent_color: -1,
    },
    save: async function () {
        console.warn('Configuration is being saved')
        localStorage.setItem("APPname_cfg", JSON.stringify(config.data))
        console.table(config.data)
    },
    load: function () {
        console.warn('Configuration is being loaded')
        config.data = JSON.parse(localStorage.getItem("APPname_cfg"))
        console.table(config.data)
    },
    delete: function () {
        localStorage.clear("APPname_cfg")
        console.log('config deleted: ')
        console.table(config.data)
    },
}

let prototype_camera_functionality = {
    state: null,
    start: function () {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
                console.log('Stream started: ', stream)
                sight_preview.srcObject = stream;


                return stream;

            }).catch(function (err0r) {
                console.warn('Stream failed', err0r);
                return err0r
            });
        }
    },
    stop: function () {
        var stream = sight_preview.srcObject;
        var tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }

        stream.srcObject = null;
    }
}

async function takepicture() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    imageElement.src = imageUrl;

}

/* Navigation buttons */
document.getElementById('Begin_sight_btn').addEventListener('click', Begin_sight)
document.getElementById('stopsightbtn').addEventListener('click', Stop_sight)
document.getElementById('setting_btn').addEventListener('click', Setting_menu)

function Begin_sight() {

    document.getElementById('home_view').style.display = "none";
    document.getElementById('setting_menu').style.display = "none";
    document.getElementById('sight_view').style.display = "block";
    //prototype_camera_functionality.start();

    
    speech.methods.speak('Start sight');

    takepicture()

    

    //speech.methods.speak("Good day and welcome to We So. Speech Recognition will now begin.");
    //speech.methods.startSpeechRecognition("Good day and welcome to We So Speech Recognition will now begin.");
}

function Stop_sight() {
    //prototype_camera_functionality.stop();
    //speech.methods.stopSpeechRecognition();
    Go_to_home();
}

function Setting_menu() {
    document.getElementById('home_view').style.display = "none";
    document.getElementById('setting_menu').style.display = "flex";
    document.getElementById('sight_view').style.display = "none";
}

function Go_to_home() {
    document.getElementById('home_view').style.display = "block";
    document.getElementById('setting_menu').style.display = "none";
    document.getElementById('sight_view').style.display = "none";
}

async function back() {
    if (document.getElementById('sight_view').style.display == "block") {
        Go_to_home();
    } else if (document.getElementById('setting_menu').style.display == "flex") {
        Go_to_home();
    } else {
        exit_strategy();
    }
}

function exit_strategy() {
    console.warn('Exit strategy triggered')
    if (properties.exit == true) {
        App.exitApp()
    } else {
        properties.exit = true;
        toast("Press back button again to exit", 2000)
        setTimeout(() => {
            properties.exit = false
        }, 2000)
    }
}

const speech = {
    data() {
        return {
            speechSentence: null,
            activatedSpeechRecognition: false,
            speechRecognitionListener: null,
            stopSpeechRecognitionListener: null
        }
    },
    methods: {
        startSpeechRecognition(speechSentence) {
            this.speechSentence = speechSentence;

            SpeechRecognition.hasPermission().then(permission => {
                if (permission.permission) {
                    this.activateSpeechRecognition();
                } else {
                    this.requestSpeechRecognitionPermission(true);
                }
            }).catch(() => {
                this.requestSpeechRecognitionPermission(true);
            })
        },
        requestSpeechRecognitionPermission(launch) {
            SpeechRecognition.requestPermission().then(() => {
                if (launch) {
                    this.activateSpeechRecognition();
                }
            }).catch(() => {

            });
        },
        activateSpeechRecognition() {
            this.activatedSpeechRecognition = true;

            this.speak(this.speechSentence);

            this.speechRecognitionListener = SpeechRecognition.addListener('speech-recognition-result', (res) => {
                if (this.speechSentence.results) {
                    this.speechSentence.results.forEach(item => {
                        if (item.matchings.some(match => res.matches[0].toLowerCase().includes(match))) {
                            document.getElementById('stopsightbtn').innerHTML = item.phrase;
                            this.speak(item.phrase);
                            item.callback();
                            this.stopSpeechRecognition();
                        }
                    })
                }
            });
            this.stopSpeechRecognitionListener = SpeechRecognition.addListener('speech-recognition-stopped', () => {
                this.stopSpeechRecognition()
            });
            SpeechRecognition.start({
                language: "en-US",
                maxResults: 1000,
                prompt: "Hey Let's Begin",
                partialResults: true,
                popup: true,
            }).then(res => {

            }).catch(() => {
                this.stopSpeechRecognition();
                this.speak("We are sorry, there is a problem on our part. Please bear with us. Thank you.");
            });
        },
        stopSpeechRecognition() {
            this.activatedSpeechRecognition = false;
            if (this.speechRecognitionListener) {
                this.speechRecognitionListener.remove();
            }
            if (this.stopSpeechRecognitionListener) {
                this.stopSpeechRecognitionListener.remove();
            }
            SpeechRecognition.stop();
        },
        async speak(text) {
            await TextToSpeech.speak({
                text: text,
                lang: 'en_US',
                rate: 1.0,
                pitch: 1.0,
                volume: 1.0,
                category: 'ambient',
            });
        }
    }
};
