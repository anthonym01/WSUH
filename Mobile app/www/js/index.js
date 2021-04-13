const remote_host = 'https://';

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

let Ui = {
    initialize: async function () {//start ui logic
        console.warn('Ui initalize')



        
        
        document.getElementById('setting_btn').addEventListener('click', Ui.navigate.setting)
        document.getElementById('Animations_btn').addEventListener('click', Ui.setting.animation.flip)
        document.getElementById('backup_btn').addEventListener('click', function () {
            directory_manager.startup('select-folder')//select folder to place bakcup file
        })
        document.getElementById('restore_btn').addEventListener('click', function () {
            directory_manager.startup('select-file')//select file to restore from
        })

        document.getElementById('set_device').addEventListener('click', function () {
            config.data.theme = "devicebased"
            config.save();
            Ui.setting.set_theme()
            toast('following device theme')
        })
        document.getElementById('set_dark').addEventListener('click', function () {
            config.data.theme = "dark"
            config.save();
            Ui.setting.set_theme()
            toast('Dark theme')
        })
        document.getElementById('set_light').addEventListener('click', function () {
            config.data.theme = "light"
            config.save();
            Ui.setting.set_theme()
            toast('Light theme')
        })
        document.getElementById('hue-1-selec').addEventListener('click', function () {
            hue_selec(-1)
            document.getElementById('hue-1-selec').classList = "accent_blob_active"
            console.log('hue change -1')
        })
        document.getElementById('hue0-selec').addEventListener('click', function () {
            hue_selec(0)
            document.getElementById('hue0-selec').classList = "accent_blob_active"
            console.log('%chue change 0', "color: hsl(0,100%,50%)")
        })
        document.getElementById('hue30-selec').addEventListener('click', function () {
            hue_selec(30)
            document.getElementById('hue30-selec').classList = "accent_blob_active"
            console.log('%chue change 30', "color: hsl(30,100%,50%)")
        })
        document.getElementById('hue60-selec').addEventListener('click', function () {
            hue_selec(60)
            document.getElementById('hue60-selec').classList = "accent_blob_active"
            console.log('%chue change 60', "color: hsl(60,100%,50%)")
        })
        document.getElementById('hue90-selec').addEventListener('click', function () {
            hue_selec(90)
            document.getElementById('hue90-selec').classList = "accent_blob_active"
            console.log('%chue change 90', "color: hsl(90,100%,50%)")
        })
        document.getElementById('hue120-selec').addEventListener('click', function () {
            hue_selec(120)
            document.getElementById('hue120-selec').classList = "accent_blob_active"
            console.log('%chue change 120', "color: hsl(120,100%,50%)")
        })
        document.getElementById('hue150-selec').addEventListener('click', function () {
            hue_selec(150)
            document.getElementById('hue150-selec').classList = "accent_blob_active"
            console.log('%chue change 150', "color: hsl(150,100%,50%)")
        })
        document.getElementById('hue180-selec').addEventListener('click', function () {
            hue_selec(180)
            document.getElementById('hue180-selec').classList = "accent_blob_active"
            console.log('%chue change 180', "color: hsl(180,100%,50%)")
        })
        document.getElementById('hue210-selec').addEventListener('click', function () {
            hue_selec(210)
            document.getElementById('hue210-selec').classList = "accent_blob_active"
            console.log('%chue change 210', "color: hsl(210,100%,50%)")
        })
        document.getElementById('hue240-selec').addEventListener('click', function () {
            hue_selec(240)
            document.getElementById('hue240-selec').classList = "accent_blob_active"
            console.log('%chue change 240', "color: hsl(240,100%,50%)")
        })
        document.getElementById('hue270-selec').addEventListener('click', function () {
            hue_selec(270)
            document.getElementById('hue270-selec').classList = "accent_blob_active"
            console.log('%chue change 270', "color: hsl(270,100%,50%)")
        })
        document.getElementById('hue300-selec').addEventListener('click', function () {
            hue_selec(300)
            document.getElementById('hue300-selec').classList = "accent_blob_active"
            console.log('%chue change 300', "color: hsl(300,100%,50%)")
        })
        document.getElementById('hue330-selec').addEventListener('click', function () {
            hue_selec(330)
            document.getElementById('hue330-selec').classList = "accent_blob_active"
            console.log('%chue change 330', "color: hsl(330,100%,50%)")
        })

        function hue_selec(hue) {
            document.getElementById('hue-1-selec').classList = "accent_blob"
            document.getElementById('hue0-selec').classList = "accent_blob"
            document.getElementById('hue30-selec').classList = "accent_blob"
            document.getElementById('hue60-selec').classList = "accent_blob"
            document.getElementById('hue90-selec').classList = "accent_blob"
            document.getElementById('hue120-selec').classList = "accent_blob"
            document.getElementById('hue150-selec').classList = "accent_blob"
            document.getElementById('hue180-selec').classList = "accent_blob"
            document.getElementById('hue210-selec').classList = "accent_blob"
            document.getElementById('hue240-selec').classList = "accent_blob"
            document.getElementById('hue270-selec').classList = "accent_blob"
            document.getElementById('hue300-selec').classList = "accent_blob"
            document.getElementById('hue330-selec').classList = "accent_blob"
            config.data.accent_color = hue;
            Ui.setting.set_theme();
            config.save();
        }

        //switch positions
        this.setting.animation.setpostition()
        this.setting.set_theme()
    },
    navigate: {//navigation
        lastmain_view: function () {
            switch (config.data.last_view) {//Set view to last view the user used, excluding settings
                case "view_2":
                    Ui.navigate.view_2()
                    break;
                case "view_1":
                    Ui.navigate.view_1()
                    break;
                default:
                    console.warn('Last view error, defaulting');
                    Ui.navigate.view_1()
            }
        },
        setting: function () {
            console.log('Naviagate settings')
            document.getElementById('view_1_btn').classList = "navbtn"
            document.getElementById('view_2_btn').classList = "navbtn"
            document.getElementById('setting_btn').classList = "navbtn_ative"
            document.getElementById('view_1').style.display = "none"
            document.getElementById('view_2').style.display = "none"
            document.getElementById('setting_view').style.display = "block"
        },
        view_1: function () {
            console.log('Naviagate view 1')
            document.getElementById('view_2_btn').classList = "navbtn"
            document.getElementById('view_1_btn').classList = "navbtn_ative"
            document.getElementById('setting_btn').classList = "navbtn"
            document.getElementById('view_1').style.display = "block"
            document.getElementById('view_2').style.display = "none"
            document.getElementById('setting_view').style.display = "none"
            config.data.last_view = "view_1"
        },
        view_2: function () {
            console.log('Naviagate view 2')
            document.getElementById('view_2_btn').classList = "navbtn_ative"
            document.getElementById('view_1_btn').classList = "navbtn"
            document.getElementById('setting_btn').classList = "navbtn"
            document.getElementById('view_1').style.display = "none"
            document.getElementById('view_2').style.display = "block"
            document.getElementById('setting_view').style.display = "none"
            config.data.last_view = "view_2"
        }
    },
    setting: {
        set_theme: function () {//determines which theme to use
            console.log('Set theme')

            //detect device theme and adjust accordingly
            cordova.plugins.ThemeDetection.isAvailable(function (success) {
                console.log(success)
                if (success.value == true) {//theme detection is availible
                    cordova.plugins.ThemeDetection.isDarkModeEnabled(
                        function (success) {//sucesfully detected a theme
                            console.log(success)

                            if (success.value == true) {
                                //System darkmode enabled
                                if (config.data.theme == "devicebased") { set_dark() }
                                document.getElementById('device_theme_btn').style.color = "white"
                                document.getElementById('device_theme_btn').style.backgroundColor = "black"

                            } else {
                                //system darkmode dissabled
                                if (config.data.theme == "devicebased") { set_light() }
                                document.getElementById('device_theme_btn').style.color = "black"
                                document.getElementById('device_theme_btn').style.backgroundColor = "white"
                            }
                        },
                        function (error) {//failed to detect a theme
                            //unable to can, use default
                            console.log(error)
                            set_light()
                        }
                    );
                } else {//theme detection is un-availible
                    document.getElementById('set_device').style.display = "none";
                    document.getElementById('theme_bar').classList = "theme_bar_2";
                }
            }, function (error) {//Theme detection error
                console.log(error)
                set_light()
            });

            if (config.data.theme == "dark") {
                set_dark()
                document.getElementById('dark_theme_btn').classList = "themebtn_active"
                document.getElementById('light_theme_btn').classList = "thembtn"
                document.getElementById('device_theme_btn').classList = "thembtn"
            } else if (config.data.theme == "light") {
                set_light()
                document.getElementById('dark_theme_btn').classList = "thembtn"
                document.getElementById('light_theme_btn').classList = "themebtn_active"
                document.getElementById('device_theme_btn').classList = "thembtn"
            } else if (config.data.theme == "devicebased") {
                document.getElementById('dark_theme_btn').classList = "thembtn"
                document.getElementById('light_theme_btn').classList = "thembtn"
                document.getElementById('device_theme_btn').classList = "themebtn_active"
            } else {
                //thme error
            }

            function set_dark() {
                StatusBar.styleLightContent()
                StatusBar.backgroundColorByHexString('#000000')
                if (properties.first_start = true) { document.getElementById('hue' + config.data.accent_color + '-selec').classList = "accent_blob_active" }
                switch (config.data.accent_color) {
                    case -1:
                        document.getElementById('body').classList = "dark";
                        console.log('Dark inverse theme');
                        break;
                    case 0:
                        document.getElementById('body').classList = "dark _0";
                        console.log('%cdark _0', "color: hsl(0,100%,50%)")
                        break;
                    case 30:
                        document.getElementById('body').classList = "dark _30";
                        console.log('%cdark _30', "color: hsl(30,100%,50%)");
                        break;
                    case 60:
                        document.getElementById('body').classList = "dark _60";
                        console.log('%cdark _60', "color: hsl(60,100%,50%)");
                        break;
                    case 90:
                        document.getElementById('body').classList = "dark _90";
                        console.log('%cdark _90', "color: hsl(90,100%,50%)");
                        break;
                    case 120:
                        document.getElementById('body').classList = "dark _120";
                        console.log('%cdark _120', "color: hsl(120,100%,50%)");
                        break;
                    case 150:
                        document.getElementById('body').classList = "dark _150";
                        console.log('%cdark _150', "color: hsl(150,100%,50%)");
                        break;
                    case 180:
                        document.getElementById('body').classList = "dark _180";
                        console.log('%cdark _180', "color: hsl(180,100%,50%)");
                        break;
                    case 210:
                        document.getElementById('body').classList = "dark _210";
                        console.log('%cdark _210', "color: hsl(210,100%,50%)");
                        break;
                    case 240:
                        document.getElementById('body').classList = "dark _240";
                        console.log('%cdark _240', "color: hsl(240,100%,50%)");
                        break;
                    case 270:
                        document.getElementById('body').classList = "dark _270";
                        console.log('%cdark _270', "color: hsl(270,100%,50%)");
                        break;
                    case 300:
                        document.getElementById('body').classList = "dark _300";
                        console.log('%cdark _300', "color: hsl(300,100%,50%)");
                        break;
                    case 330:
                        document.getElementById('body').classList = "dark _330";
                        console.log('%cdark _330', "color: hsl(330,100%,50%)");
                        break;
                    default:
                        console.error('Theme error :', config.data.accent_color);
                        document.getElementById('body').classList = "dark";
                        config.data.accent_color = -1;
                }
            }

            function set_light() {
                if (properties.first_start = true) { document.getElementById('hue' + config.data.accent_color + '-selec').classList = "accent_blob_active" }
                switch (config.data.accent_color) {
                    case -1:
                        document.getElementById('body').classList = "light";
                        console.log('light inverse theme');
                        StatusBar.styleDefault()
                        StatusBar.backgroundColorByHexString('#ffffff')
                        break;
                    case 0:
                        document.getElementById('body').classList = "light _0";
                        console.log('%clight_0', "color: hsl(0,100%,50%)")
                        StatusBar.backgroundColorByHexString('#ff0000')
                        break;
                    case 30:
                        document.getElementById('body').classList = "light _30";
                        console.log('%clight_30', "color: hsl(30,100%,50%)");
                        StatusBar.backgroundColorByHexString('#ff8000')
                        StatusBar.styleLightContent()
                        break;
                    case 60:
                        document.getElementById('body').classList = "light _60";
                        console.log('%clight_60', "color: hsl(60,100%,50%)");
                        StatusBar.backgroundColorByHexString('#ffff00')
                        StatusBar.styleDefault()
                        break;
                    case 90:
                        document.getElementById('body').classList = "light _90";
                        console.log('%clight_90', "color: hsl(90,100%,50%)");
                        StatusBar.backgroundColorByHexString('#80ff00')
                        StatusBar.styleDefault()
                        break;
                    case 120:
                        document.getElementById('body').classList = "light _120";
                        console.log('%clight_120', "color: hsl(120,100%,50%)");
                        StatusBar.backgroundColorByHexString('#00ff00')
                        StatusBar.styleDefault()
                        break;
                    case 150:
                        document.getElementById('body').classList = "light _150";
                        console.log('%clight_150', "color: hsl(150,100%,50%)");
                        StatusBar.backgroundColorByHexString('#00ff80')
                        StatusBar.styleDefault()
                        break;
                    case 180:
                        document.getElementById('body').classList = "light _180";
                        console.log('%clight_180', "color: hsl(180,100%,50%)");
                        StatusBar.backgroundColorByHexString('#00ffff')
                        StatusBar.styleDefault()
                        break;
                    case 210:
                        document.getElementById('body').classList = "light _210";
                        console.log('%clight_210', "color: hsl(210,100%,50%)");
                        StatusBar.backgroundColorByHexString('#0080ff')
                        StatusBar.styleLightContent()
                        break;
                    case 240:
                        document.getElementById('body').classList = "light _240";
                        console.log('%clight_240', "color: hsl(240,100%,50%)");
                        StatusBar.backgroundColorByHexString('#0000ff')
                        StatusBar.styleLightContent()
                        break;
                    case 270:
                        document.getElementById('body').classList = "light _270";
                        console.log('%clight_270', "color: hsl(270,100%,50%)");
                        StatusBar.backgroundColorByHexString('#8000ff')
                        StatusBar.styleLightContent()
                        break;
                    case 300:
                        document.getElementById('body').classList = "light _300";
                        console.log('%clight_300', "color: hsl(300,100%,50%)");
                        StatusBar.backgroundColorByHexString('#ff00ff')
                        StatusBar.styleLightContent()
                        break;
                    case 330:
                        document.getElementById('body').classList = "light _330";
                        console.log('%clight_330', "color: hsl(330,100%,50%)");
                        StatusBar.backgroundColorByHexString('#ff0080')
                        StatusBar.styleLightContent()
                        break;
                    default:
                        console.error('Theme error :', config.data.accent_color);
                        document.getElementById('body').classList = "light";
                        config.data.accent_color = -1;
                }
            }
        },
        animation: {
            flip: function () {
                console.log('animation switch triggered');
                if (config.data.animation == true) {//turn off the switch
                    config.data.animation = false;
                    toast('animations dissabled');
                    console.log('animations dissabled');
                } else {//turn on the witch
                    config.data.animation = true;
                    toast('animations enabled');
                    console.log('animations enabled');
                }
                config.save();
                Ui.setting.animation.setpostition();
            },
            setpostition: function () {
                if (config.data.animation == true) {
                    document.getElementById('anim').href = "";
                    document.getElementById('Animations_switch_container').className = 'switch_container_active';
                } else {
                    document.getElementById('anim').href = "css/noanime.css";//nomation sheet removes animations
                    document.getElementById('Animations_switch_container').className = 'switch_container_dissabled';
                }
            },
        },
    }
}

let properties = {
    exit: false,
}

async function back() {// called when back button pressed
    exit_strategy();
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
