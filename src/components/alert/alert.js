import { Component, createComponentBoundary } from '../component';

class Alert extends Component {
    constructor() {
        super();
    }
}

export default createComponentBoundary(Alert, 'a', 'alert');
