export const SELECTOR_ATTR = 'ifanga-component';

export const bootstrap = () => {
    const root = document.body;
    const selector = `[${SELECTOR_ATTR}]`;
    let components = [];

    try {
        components = root.querySelectorAll(selector);
    } catch (e) {
        throw new Error('Your browser doesnt support legacy ifanga components! Please upgrade.');
    }

    [...components].forEach((node, index) => {
        const componentId = index + 1;
        const componentName = node.attributes[SELECTOR_ATTR].nodeValue;
        const ComponentInst = new IfangaWebComponents[componentName](node, node.className, {});

        IfangaWebComponents.registered[componentId] = ComponentInst;
        node.setAttribute('ifanga-mem-id', componentId);
    });
};
