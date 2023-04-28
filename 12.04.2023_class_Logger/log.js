/*

logLevel = 1;
function _log(level, args) {
    if (logLevel >= level) {
        let logInfo = [...arguments].slice(1);
        console.log(...logInfo);
    }
}

// Error, Info, Warning, Debug, Trace

function logE(args) {
    _log(0, ...arguments);
}

function logI(args) {
    _log(1, ...arguments);
}

function logW(args) {
    _log(2, ...arguments);
}

function logD(args) {
    _log(3, ...arguments);
}

function logT(args) {
    _log(4, ...arguments);
}



let btn = document.getElementById('button');

btn.onclick = ev => {
    logI(ev.target);
    let newColor = prompt('Введите цвет');
    logD(newColor);
    let myList = document.querySelectorAll('li');
    logD(myList);
    for (let i=0; i<myList.length; i++) {
        logT(i, myList[i]);
        myList[i].style.backgroundColor = newColor;
    }

};

*/

class Logger {
    static ERROR = 0;
    static WARNING = 1;
    static INFO = 2;
    static DEBUG = 3;
    static TRACE = 4;

    constructor(logLevel = Logger.INFO, logElementId = null) {
        this.logLevel = logLevel;
        if (logElementId) {
            this.logElement = document.getElementById(logElementId);
        }
    }

    _log(level, ...args) {
        if (this.logLevel >= level) {
            let logTime = new Date().toISOString().slice(11, -1);
            let logLevelString = ['[E]', '[W]', '[I]', '[D]', '[T]'][level];
            let logString = `${logLevelString} ${logTime} ${args.join(' ')}`;
            console.log(logString);
            if (this.logElement) {
                let logElementItem = document.createElement('li');
                logElementItem.innerText = logString;
                switch (level) {
                    case Logger.ERROR:
                        logElementItem.style.color = 'red';
                        break;
                    case Logger.WARNING:
                        logElementItem.style.color = 'orange';
                        break;
                    case Logger.INFO:
                        logElementItem.style.color = 'blue';
                        break;
                    case Logger.DEBUG:
                        logElementItem.style.color = 'green';
                        break;
                    case Logger.TRACE:
                        logElementItem.style.color = 'gray';
                        break;
                    default:
                        logElementItem.style.color = 'black';
                }
                this.logElement.appendChild(logElementItem);
            }
        }
    }

    e(...args) {
        this._log(Logger.ERROR, ...args);
    }

    w(...args) {
        this._log(Logger.WARNING, ...args);
    }

    i(...args) {
        this._log(Logger.INFO, ...args);
    }

    d(...args) {
        this._log(Logger.DEBUG, ...args);
    }

    t(...args) {
        this._log(Logger.TRACE, ...args);
    }

    setLevel(level) {
        this.logLevel = level;
    }

    setERROR() {
        this.logLevel = Logger.ERROR;
    }

    setWARNING() {
        this.logLevel = Logger.WARNING;
    }

    setINFO() {
        this.logLevel = Logger.INFO;
    }

    setDEBUG() {
        this.logLevel = Logger.DEBUG;
    }

    setTRACE() {
        this.logLevel = Logger.TRACE;
    }
}


const logger = new Logger(Logger.DEBUG);

logger.e('Error message');
logger.w('Warning message');
logger.i('Informational message');
logger.d('Debug message');
logger.t('Trace message');

logger.setLevel(Logger.WARNING);

logger.e('Error message');
logger.w('Warning message');
logger.i('Informational message');
logger.d('Debug message');
logger.t('Trace message');

const logElement = document.getElementById('log');
const loggerWithElement = new Logger(Logger.TRACE, logElement.id);

loggerWithElement.e('Error message');
loggerWithElement.w('Warning message');
loggerWithElement.i('Informational message');
loggerWithElement.d('Debug message');
loggerWithElement.t('Trace message');
