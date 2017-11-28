const EventEmitter = require('events');

const JQUERY = !!window.jQuery;

const IfangaWebComponents = (window.IfangaWebComponents = {
    classMap: {},
    classList: [],
    events: new EventEmitter(),
});

class DOMComponent {
    constructor(node) {
        this._node = node;
    }

    get node() {
        return this._node;
    }

    get $() {
        return JQUERY ? $(this.node) : node;
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
    }

    get node() {
        return this._domNode;
    }

    get className() {
        return this._className;
    }

    attach() {}
    detach() {}
}

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
const createComponentBoundary = (BoundComponent, type, name, opts = {}) => {
    try {
        const componentName = BoundComponent.name;
        const componentType = resolveComponentType(type);
        const className = componentType ? `${componentType}-${name}` : name;

        IfangaWebComponents[componentName] = BoundComponent;
        IfangaWebComponents.classMap[className] = IfangaWebComponents[componentName];
        IfangaWebComponents.classList.push(className);

        return node => new BoundComponent(node, className, opts);
    } catch (e) {
        throw e;
    }
};

export { createComponentBoundary, Component, DOMComponent, resolveComponentType };
