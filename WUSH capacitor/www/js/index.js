const { Plugins, AppState } = Capacitor; //plugins
const { App } = Plugins;
// import { speak, stop, getSupportedLanguages, getSupportedVoices, isLanguageSupported } from './tts.js';

import { tts } from './tts.js';

const sight_preview = document.getElementById('sight_preview')



async function open_link(link) {
    await Browser.open({
        url: link
    });
}

App.addListener('backButton', function () { console.log('Back button'); back() })

window.onload = maininitalizer();

function maininitalizer() { //Runs after 'Device ready'
    if (localStorage.getItem("APPname_cfg")) {
        config.load()
    }
    /*   
        Ui.initialize()

        setTimeout(() => {
            navigator.splashscreen.hide();//hide splashscreen
            window.addEventListener('resize', function () { size_check() })//App is resized by split screen or dex
            properties.first_start = false;//App is startedned up
        }, 300);

        post({ phone: 'phone phones home' }, 'post/test')
    */
    //size_check()
}

/* General properties */
let properties = {
    exit: false,
}


/* Local configuration */
let config = {
    data: { //Loacal app data
        usecount: 0,
        animation: true,
        theme: "dark",
        accent_color: -1,
    },
    save: async function () { //Save the config file
        console.warn('Configuration is being saved')
        localStorage.setItem("APPname_cfg", JSON.stringify(config.data))
        console.table(config.data)
    },
    load: function () { //Load the config file
        console.warn('Configuration is being loaded')
        config.data = JSON.parse(localStorage.getItem("APPname_cfg"))
        console.table(config.data)
    },
    delete: function () { //Does not delete the file itself. Just sets it to empty
        localStorage.clear("APPname_cfg")
        console.log('config deleted: ')
        console.table(config.data)
    },
}

let prototype_camera_functionality = {
    state:null,
    start:function(){
        if (navigator.mediaDevices.getUserMedia) {//Media devices
            //Get video stream from default webcam
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
                console.log('Stream started: ', stream)
                sight_preview.srcObject = stream;//video stream

                //
                //return stream;

            }).catch(function (err0r) {
                console.warn('Stream failed', err0r);
                return err0r
            });
        }
    },
    stop:function(){
        var stream = sight_preview.srcObject;
        var tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }

        stream.srcObject = null;
    }
}

/* Navigation buttons */
document.getElementById('Begin_sight_btn').addEventListener('click', Begin_sight)
document.getElementById('stopsightbtn').addEventListener('click', Stop_sight)
document.getElementById('setting_btn').addEventListener('click', Setting_menu)

function Begin_sight() { //go to sight
    //prepare for sight
    document.getElementById('home_view').style.display = "none";
    document.getElementById('setting_menu').style.display = "none";
    document.getElementById('sight_view').style.display = "block";
    prototype_camera_functionality.start();
    tts.speak();
}

function Stop_sight() {
    Go_to_home();
    prototype_camera_functionality.stop();
    tts.stop();
    //stop sight operations
}

function Setting_menu() { // goes to the setting menu
    // go to settings
    document.getElementById('home_view').style.display = "none";
    document.getElementById('setting_menu').style.display = "flex";
    document.getElementById('sight_view').style.display = "none";
}

function Go_to_home() { //return to home screen
    document.getElementById('home_view').style.display = "block";
    document.getElementById('setting_menu').style.display = "none";
    document.getElementById('sight_view').style.display = "none";
}



async function back() { // called when back button pressed
    if (document.getElementById('sight_view').style.display == "block") {
        Go_to_home();
    } else if (document.getElementById('setting_menu').style.display == "flex") {
        Go_to_home();
    } else {
        exit_strategy();
    }
}

function exit_strategy() { //when called twice exits the app
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