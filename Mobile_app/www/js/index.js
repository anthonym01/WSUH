const remote_host = 'https://';//remote host address

var app = {// Application Constructor
    initialize: function () {// deviceready Event Handler
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
        document.addEventListener("backbutton", this.onBackKeyDown, false)
        document.addEventListener("pause", this.onPause, false)
        document.addEventListener("resume", this.onResume, false)
        document.addEventListener("menubutton", this.onMenu, false)
    },
    onDeviceReady: function () {
        //this.receivedEvent('deviceready')
        console.log('Device is Ready...')
        maininitalizer();
    },
    onBackKeyDown: function () {
        console.warn('"Back button" event triggered')
        back();
    },
    onPause: function () {
        console.warn('"pause" event triggered')
        config.save()
    },
    onResume: function () {
        console.warn('"Resume" event triggered')
        if (config.data.theme == "devicebased") { Ui.setting.set_theme() }
    },
    onMenu: function () {
        console.warn('"Menu button" event triggered')
    },
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id)
        var listeningElement = parentElement.querySelector('.listening')
        var receivedElement = parentElement.querySelector('.received')

        listeningElement.setAttribute('style', 'display:none;')
        receivedElement.setAttribute('style', 'display:block;')

        console.log('Received Event: ' + id)
    },
};
app.initialize()

function maininitalizer() {//Runs after 'Device ready'
    if (localStorage.getItem("APPname_cfg")) {
        config.load()
    }
    
    Ui.initialize()

    setTimeout(() => {
        navigator.splashscreen.hide();//hide splashscreen
        window.addEventListener('resize', function () { size_check() })//App is resized by split screen or dex
        properties.first_start = false;//App is startedned up
    }, 300);

    post({ phone: 'phone phones home' }, 'post/test')

    //size_check()
}


/* Local configuration */
let config = {
    data: {//Loacal app data
        usecount: 0,
        animation: true,
        theme: "dark",
        accent_color: -1,
    },
    save: async function () {//Save the config file
        console.warn('Configuration is being saved')
        localStorage.setItem("APPname_cfg", JSON.stringify(config.data))
        console.table(config.data)
    },
    load: function () {//Load the config file
        console.warn('Configuration is being loaded')
        config.data = JSON.parse(localStorage.getItem("APPname_cfg"))
        console.table(config.data)
    },
    delete: function () {//Does not delete the file itself. Just sets it to empty
        localStorage.clear("APPname_cfg")
        console.log('config deleted: ')
        console.table(config.data)
    },
}


/* Navigation buttons */
document.getElementById('Begin_sight_btn').addEventListener('click',Begin_sight)
document.getElementById('setting_btn').addEventListener('click',Setting_menu)
function Begin_sight(){//go to sight
    //prepare for sight
    document.getElementById('home_view').style.display="none";
    document.getElementById('setting_menu').style.display="none";
    document.getElementById('sight_view').style.display="block";
}

function Setting_menu() { // goes to the setting menu
    // go to settings
    document.getElementById('home_view').style.display="none";
    document.getElementById('setting_menu').style.display="flex";
    document.getElementById('sight_view').style.display="none";
}

function Go_to_home(){//return to home screen
    document.getElementById('home_view').style.display="block";
    document.getElementById('setting_menu').style.display="none";
    document.getElementById('sight_view').style.display="none";
    stop_sight()
}


/* SIght manaement */
function stop_sight(){//suspend sight operations
    console.log('Stopping sight operations')
}


/* General properties */
let properties = {
    exit: false,
}

async function back() {// called when back button pressed
    if(document.getElementById('sight_view').style.display=="block"){
        Go_to_home();
    }else if(document.getElementById('setting_menu').style.display=="flex"){
        Go_to_home();
    }else{
        exit_strategy();
    }
}

function exit_strategy() {//when called twice exits the app
    console.warn('Exit strategy triggered')
    if (properties.exit == true) {
        close()
    } else {
        properties.exit = true;
        toast("Press back button again to exit", 2000)
        setTimeout(() => { properties.exit = false }, 2000)
    }
}

function close() {// Close the app 
    console.trace('App closure triggered via')
    if (navigator.app) {
        navigator.app.exitApp()
    } else if (navigator.device) {
        navigator.device.exitApp()
    } else {
        window.close()
    }
}

async function size_check() {// Check screen size (physical/app size)
    console.log('Sizecheck fired');
    if (typeof (window.plugins) != 'undefined') {
        window.plugins.screensize.get(function (result) {//Check device screen size
            console.log(result);
            if (result.diameter < 3) {//watch size screen
                document.getElementById('stylesheet').href = "css/watch.css"
                console.warn('Set watch screen scale with size: ', result.diameter);
            } else if (result.diameter > 7) {//tablet size screen
                document.getElementById('stylesheet').href = "css/tablet.css"
                console.warn('Set tablet screen scale with size: ', result.diameter);
            } else {//phone size screen
                document.getElementById('stylesheet').href = "css/phone.css"
                console.warn('Set phone screen scale with size: ', result.diameter);
            }
            //toast('Screensize: '+result.diameter,5000);
        }, function (err) { console.log('Screen data error: ', err) });
    } else {
        console.error('Screensize plugin failed completely, device may not be ready');
    }
}

async function toast(text, durration_in_ms, position_top_right_left_bottom, offset_in_px) {//Produce toast messages
    if (position_top_right_left_bottom == undefined) { position_top_right_left_bottom = 'bottom' }//default the position
    if (durration_in_ms == undefined) { durration_in_ms = 4000 }//default the duration
    if (offset_in_px == undefined) { offset_in_px = -160 }//default the offset
    window.plugins.toast.showWithOptions({ message: text, duration: durration_in_ms, position: position_top_right_left_bottom, addPixelsY: offset_in_px })
}
