import { Component, createComponentBoundary } from '../component';

class Alert extends Component {
    constructor() {
        super();
    }

    attach() {
        console.log(this);
    }
}

createComponentBoundary(Alert, 'a', 'alert');
