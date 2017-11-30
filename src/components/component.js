import { abstract } from './annotations';

const EventEmitter = require('events');
const engine = require('./bootstrap');
const JQUERY = !!window.jQuery;

const IfangaWebComponents = (window.IfangaWebComponents = {
    events: new EventEmitter(),
    bootstrap: engine.bootstrap,
    registered: {},
});

/**
 * Resolve a component type annotation to the css type
 * @param {string} type         named type
 * @return {null|string}        type or null
 */
const resolveComponentType = (type = '') => {
    switch (type.toLowerCase()) {
        case 'atom':
        case 'a':
            return 'a';
        case 'molecule':
        case 'm':
            return 'm';
        case 'organism':
        case 'o':
            return 'o';
        case 'template':
        case 't':
            return 't';
        default:
            return null;
    }
};

/**
 * @param {string} type
 * @param {string} name
 * @return {Function}
 */
const createComponentBoundary = BoundComponent => {
    try {
        const componentName = BoundComponent.name;
        IfangaWebComponents[componentName] = BoundComponent;
        IfangaWebComponents[componentName].create = (...args) => new BoundComponent(...args);
    } catch (e) {
        throw e;
    }
};

class DOMComponent {
    constructor(node) {
        this._node = node;
    }

    get node() {
        return this._node;
    }

    get $() {
        return JQUERY ? $(this.node) : this.node;
    }
}

class Component {
    constructor(node, className, opts) {
        if (!Array.isArray(opts.modifier)) {
            if (typeof opts.modifier === 'string') {
                opts.modifier = [opts.modifier];
            } else {
                opts.modifier = [];
            }
        }

        this._domNode = new DOMComponent(node);
        this._className = className;
        this.modifier = opts.modifier;
        this.decorator = opts.decorator;
    }

    get node() {
        return this._domNode.$;
    }

    get className() {
        return this._className;
    }

    @abstract
    init() {}
}

// Injectables down below
export { createComponentBoundary, Component, DOMComponent, resolveComponentType };
