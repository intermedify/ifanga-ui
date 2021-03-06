import { createComponentBoundary } from './component';

// needed annotations
export function readonly(target, key, descriptor) {
    descriptor.writeable = false;
    return descriptor;
}

export function inject(injectables = []) {
    return function usesInjectables(target) {
        target.__inject = injectables;
    };
}

export function abstract(target, name, descriptor) {
    descriptor.value = () => {
        throw new Error(`${target.constructor.name}.${name} not implemented.`);
    };
}

export function registerComponent(Component) {
    createComponentBoundary(Component);
}

// Single injectables
export const ComponentState = () => void 0;

// Injectables collection
const Injectables = {
    ComponentState,
};

export default Injectables;
