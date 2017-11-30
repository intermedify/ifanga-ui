import { Component } from '../component';
import { inject, registerComponent, ComponentState } from '../annotations';

@registerComponent
@inject([ComponentState])
class Alert extends Component {
    listener = null;
    dismissed = false;

    init() {
        this.node.onclick = ev => {
            if (!this.dismissed) {
                this.node.className += ' state-m-alert--dismissed';
                this.dismissed = true;
                ev.stopPropagation();
            }
        };
    }
}

export default Alert;
