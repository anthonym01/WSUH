(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const TextToSpeech = core.registerPlugin('TextToSpeech', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.TextToSpeechWeb()),
});

class TextToSpeechWeb extends core.WebPlugin {
    constructor() {
        super();
        this.speechSynthesis = null;
        if ('speechSynthesis' in window) {
            this.speechSynthesis = window.speechSynthesis;
        }
    }
    async speak(options) {
        if (!this.speechSynthesis) {
            this.throwUnsupportedError();
        }
        await this.stop();
        const speechSynthesis = this.speechSynthesis;
        const utterance = this.createSpeechSynthesisUtterance(options);
        return new Promise((resolve, reject) => {
            utterance.onend = () => {
                resolve();
            };
            utterance.onerror = (event) => {
                reject(event);
            };
            speechSynthesis.speak(utterance);
        });
    }
    async stop() {
        if (!this.speechSynthesis) {
            this.throwUnsupportedError();
        }
        this.speechSynthesis.cancel();
    }
    async getSupportedLanguages() {
        const voices = this.getSpeechSynthesisVoices();
        const languages = voices.map(voice => voice.lang);
        const filteredLanguages = languages.filter((v, i, a) => a.indexOf(v) == i);
        return { languages: filteredLanguages };
    }
    async getSupportedVoices() {
        const voices = this.getSpeechSynthesisVoices();
        return { voices };
    }
    async isLanguageSupported(options) {
        const result = await this.getSupportedLanguages();
        const isLanguageSupported = result.languages.includes(options.lang);
        return { supported: isLanguageSupported };
    }
    async openInstall() {
        this.throwUnimplementedError();
    }
    createSpeechSynthesisUtterance(options) {
        const voices = this.getSpeechSynthesisVoices();
        const utterance = new SpeechSynthesisUtterance();
        const { text, lang, rate, pitch, volume, voice } = options;
        if (voice) {
            utterance.voice = voices[voice];
        }
        if (volume) {
            utterance.volume = volume >= 0 && volume <= 1 ? volume : 1;
        }
        if (rate) {
            utterance.rate = rate >= 0.1 && rate <= 10 ? rate : 1;
        }
        if (pitch) {
            utterance.pitch = pitch >= 0 && pitch <= 2 ? pitch : 2;
        }
        if (lang) {
            utterance.lang = lang;
        }
        utterance.text = text;
        return utterance;
    }
    getSpeechSynthesisVoices() {
        if (!this.speechSynthesis) {
            this.throwUnsupportedError();
        }
        if (!this.supportedVoices || this.supportedVoices.length < 1) {
            this.supportedVoices = this.speechSynthesis.getVoices();
        }
        return this.supportedVoices;
    }
    throwUnsupportedError() {
        throw this.unavailable('SpeechSynthesis API not available in this browser.');
    }
    throwUnimplementedError() {
        throw this.unimplemented('Not implemented on web.');
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TextToSpeechWeb: TextToSpeechWeb
});

exports.TextToSpeech = TextToSpeech;


},{"@capacitor/core":2}],2:[function(require,module,exports){
(function (global){(function (){
/*! Capacitor: https://capacitorjs.com/ - MIT License */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const createCapacitorPlatforms = (win) => {
    const defaultPlatformMap = new Map();
    defaultPlatformMap.set('web', { name: 'web' });
    const capPlatforms = win.CapacitorPlatforms || {
        currentPlatform: { name: 'web' },
        platforms: defaultPlatformMap,
    };
    const addPlatform = (name, platform) => {
        capPlatforms.platforms.set(name, platform);
    };
    const setPlatform = (name) => {
        if (capPlatforms.platforms.has(name)) {
            capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
        }
    };
    capPlatforms.addPlatform = addPlatform;
    capPlatforms.setPlatform = setPlatform;
    return capPlatforms;
};
const initPlatforms = (win) => (win.CapacitorPlatforms = createCapacitorPlatforms(win));
const CapacitorPlatforms = /*#__PURE__*/ initPlatforms((typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {}));
const addPlatform = CapacitorPlatforms.addPlatform;
const setPlatform = CapacitorPlatforms.setPlatform;

const legacyRegisterWebPlugin = (cap, webPlugin) => {
    var _a;
    const config = webPlugin.config;
    const Plugins = cap.Plugins;
    if (!config || !config.name) {
        // TODO: add link to upgrade guide
        throw new Error(`Capacitor WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."`);
    }
    // TODO: add link to upgrade guide
    console.warn(`Capacitor plugin "${config.name}" is using the deprecated "registerWebPlugin()" function`);
    if (!Plugins[config.name] || ((_a = config === null || config === void 0 ? void 0 : config.platforms) === null || _a === void 0 ? void 0 : _a.includes(cap.getPlatform()))) {
        // Add the web plugin into the plugins registry if there already isn't
        // an existing one. If it doesn't already exist, that means
        // there's no existing native implementation for it.
        // - OR -
        // If we already have a plugin registered (meaning it was defined in the native layer),
        // then we should only overwrite it if the corresponding web plugin activates on
        // a certain platform. For example: Geolocation uses the WebPlugin on Android but not iOS
        Plugins[config.name] = webPlugin;
    }
};

exports.ExceptionCode = void 0;
(function (ExceptionCode) {
    /**
     * API is not implemented.
     *
     * This usually means the API can't be used because it is not implemented for
     * the current platform.
     */
    ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
    /**
     * API is not available.
     *
     * This means the API can't be used right now because:
     *   - it is currently missing a prerequisite, such as network connectivity
     *   - it requires a particular platform or browser version
     */
    ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(exports.ExceptionCode || (exports.ExceptionCode = {}));
class CapacitorException extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
const getPlatformId = (win) => {
    var _a, _b;
    if (win === null || win === void 0 ? void 0 : win.androidBridge) {
        return 'android';
    }
    else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
        return 'ios';
    }
    else {
        return 'web';
    }
};

const createCapacitor = (win) => {
    var _a, _b, _c, _d, _e;
    const cap = win.Capacitor || {};
    const Plugins = (cap.Plugins = cap.Plugins || {});
    const capPlatforms = win.CapacitorPlatforms;
    const defaultGetPlatform = () => getPlatformId(win);
    const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
    const defaultIsNativePlatform = () => getPlatformId(win) !== 'web';
    const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
    const defaultIsPluginAvailable = (pluginName) => {
        const plugin = registeredPlugins.get(pluginName);
        if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
            // JS implementation available for the current platform.
            return true;
        }
        if (getPluginHeader(pluginName)) {
            // Native implementation available.
            return true;
        }
        return false;
    };
    const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) ||
        defaultIsPluginAvailable;
    const defaultGetPluginHeader = (pluginName) => { var _a; return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find(h => h.name === pluginName); };
    const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
    const handleError = (err) => win.console.error(err);
    const pluginMethodNoop = (_target, prop, pluginName) => {
        return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
    };
    const registeredPlugins = new Map();
    const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
        const registeredPlugin = registeredPlugins.get(pluginName);
        if (registeredPlugin) {
            console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
            return registeredPlugin.proxy;
        }
        const platform = getPlatform();
        const pluginHeader = getPluginHeader(pluginName);
        let jsImplementation;
        const loadPluginImplementation = async () => {
            if (!jsImplementation && platform in jsImplementations) {
                jsImplementation =
                    typeof jsImplementations[platform] === 'function'
                        ? (jsImplementation = await jsImplementations[platform]())
                        : (jsImplementation = jsImplementations[platform]);
            }
            return jsImplementation;
        };
        const createPluginMethod = (impl, prop) => {
            var _a, _b;
            if (pluginHeader) {
                const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find(m => prop === m.name);
                if (methodHeader) {
                    if (methodHeader.rtype === 'promise') {
                        return (options) => cap.nativePromise(pluginName, prop.toString(), options);
                    }
                    else {
                        return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
                    }
                }
                else if (impl) {
                    return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
                }
            }
            else if (impl) {
                return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
            }
            else {
                throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, exports.ExceptionCode.Unimplemented);
            }
        };
        const createPluginMethodWrapper = (prop) => {
            let remove;
            const wrapper = (...args) => {
                const p = loadPluginImplementation().then(impl => {
                    const fn = createPluginMethod(impl, prop);
                    if (fn) {
                        const p = fn(...args);
                        remove = p === null || p === void 0 ? void 0 : p.remove;
                        return p;
                    }
                    else {
                        throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, exports.ExceptionCode.Unimplemented);
                    }
                });
                if (prop === 'addListener') {
                    p.remove = async () => remove();
                }
                return p;
            };
            // Some flair ✨
            wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
            Object.defineProperty(wrapper, 'name', {
                value: prop,
                writable: false,
                configurable: false,
            });
            return wrapper;
        };
        const addListener = createPluginMethodWrapper('addListener');
        const removeListener = createPluginMethodWrapper('removeListener');
        const addListenerNative = (eventName, callback) => {
            const call = addListener({ eventName }, callback);
            const remove = async () => {
                const callbackId = await call;
                removeListener({
                    eventName,
                    callbackId,
                }, callback);
            };
            const p = new Promise(resolve => call.then(() => resolve({ remove })));
            p.remove = async () => {
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            };
            return p;
        };
        const proxy = new Proxy({}, {
            get(_, prop) {
                switch (prop) {
                    // https://github.com/facebook/react/issues/20030
                    case '$$typeof':
                        return undefined;
                    case 'addListener':
                        return pluginHeader ? addListenerNative : addListener;
                    case 'removeListener':
                        return removeListener;
                    default:
                        return createPluginMethodWrapper(prop);
                }
            },
        });
        Plugins[pluginName] = proxy;
        registeredPlugins.set(pluginName, {
            name: pluginName,
            proxy,
            platforms: new Set([
                ...Object.keys(jsImplementations),
                ...(pluginHeader ? [platform] : []),
            ]),
        });
        return proxy;
    };
    const registerPlugin = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
    // Add in convertFileSrc for web, it will already be available in native context
    if (!cap.convertFileSrc) {
        cap.convertFileSrc = filePath => filePath;
    }
    cap.getPlatform = getPlatform;
    cap.handleError = handleError;
    cap.isNativePlatform = isNativePlatform;
    cap.isPluginAvailable = isPluginAvailable;
    cap.pluginMethodNoop = pluginMethodNoop;
    cap.registerPlugin = registerPlugin;
    cap.Exception = CapacitorException;
    cap.DEBUG = !!cap.DEBUG;
    cap.isLoggingEnabled = !!cap.isLoggingEnabled;
    // Deprecated props
    cap.platform = cap.getPlatform();
    cap.isNative = cap.isNativePlatform();
    return cap;
};
const initCapacitorGlobal = (win) => (win.Capacitor = createCapacitor(win));

const Capacitor = /*#__PURE__*/ initCapacitorGlobal(typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {});
const registerPlugin = Capacitor.registerPlugin;
/**
 * @deprecated Provided for backwards compatibility for Capacitor v2 plugins.
 * Capacitor v3 plugins should import the plugin directly. This "Plugins"
 * export is deprecated in v3, and will be removed in v4.
 */
const Plugins = Capacitor.Plugins;
/**
 * Provided for backwards compatibility. Use the registerPlugin() API
 * instead, and provide the web plugin as the "web" implmenetation.
 * For example
 *
 * export const Example = registerPlugin('Example', {
 *   web: () => import('./web').then(m => new m.Example())
 * })
 *
 * @deprecated Deprecated in v3, will be removed from v4.
 */
const registerWebPlugin = (plugin) => legacyRegisterWebPlugin(Capacitor, plugin);

/**
 * Base class web plugins should extend.
 */
class WebPlugin {
    constructor(config) {
        this.listeners = {};
        this.windowListeners = {};
        if (config) {
            // TODO: add link to upgrade guide
            console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
            this.config = config;
        }
    }
    addListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listenerFunc);
        // If we haven't added a window listener for this event and it requires one,
        // go ahead and add it
        const windowListener = this.windowListeners[eventName];
        if (windowListener && !windowListener.registered) {
            this.addWindowListener(windowListener);
        }
        const remove = async () => this.removeListener(eventName, listenerFunc);
        const p = Promise.resolve({ remove });
        Object.defineProperty(p, 'remove', {
            value: async () => {
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            },
        });
        return p;
    }
    async removeAllListeners() {
        this.listeners = {};
        for (const listener in this.windowListeners) {
            this.removeWindowListener(this.windowListeners[listener]);
        }
        this.windowListeners = {};
    }
    notifyListeners(eventName, data) {
        const listeners = this.listeners[eventName];
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }
    hasListeners(eventName) {
        return !!this.listeners[eventName].length;
    }
    registerWindowListener(windowEventName, pluginEventName) {
        this.windowListeners[pluginEventName] = {
            registered: false,
            windowEventName,
            pluginEventName,
            handler: event => {
                this.notifyListeners(pluginEventName, event);
            },
        };
    }
    unimplemented(msg = 'not implemented') {
        return new Capacitor.Exception(msg, exports.ExceptionCode.Unimplemented);
    }
    unavailable(msg = 'not available') {
        return new Capacitor.Exception(msg, exports.ExceptionCode.Unavailable);
    }
    async removeListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(listenerFunc);
        this.listeners[eventName].splice(index, 1);
        // If there are no more listeners for this type of event,
        // remove the window listener
        if (!this.listeners[eventName].length) {
            this.removeWindowListener(this.windowListeners[eventName]);
        }
    }
    addWindowListener(handle) {
        window.addEventListener(handle.windowEventName, handle.handler);
        handle.registered = true;
    }
    removeWindowListener(handle) {
        if (!handle) {
            return;
        }
        window.removeEventListener(handle.windowEventName, handle.handler);
        handle.registered = false;
    }
}

const WebView = /*#__PURE__*/ registerPlugin('WebView');

exports.Capacitor = Capacitor;
exports.CapacitorException = CapacitorException;
exports.CapacitorPlatforms = CapacitorPlatforms;
exports.Plugins = Plugins;
exports.WebPlugin = WebPlugin;
exports.WebView = WebView;
exports.addPlatform = addPlatform;
exports.registerPlugin = registerPlugin;
exports.registerWebPlugin = registerWebPlugin;
exports.setPlatform = setPlatform;


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
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
    console.log(imageUrl);

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

},{"@capacitor-community/text-to-speech":1}]},{},[3]);
