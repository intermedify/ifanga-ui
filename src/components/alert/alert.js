import { Component } from '../component';
import { inject, registerComponent, ComponentState } from '../annotations';

@registerComponent
@inject([ComponentState])
class Alert extends Component {
    listener = null;
    dismissed = false;

    init() {
        const triggerList = this.node.querySelectorAll('.js-m-alert__action');
        let trigger = null;

        if (triggerList.length > 0) {
            trigger = triggerList[0];
        } else {
            return null;
        }

        trigger.onclick = ev => {
            if (!this.dismissed) {
                this.node.className += ' state-m-alert--dismissed';
                this.dismissed = true;
                ev.stopPropagation();
            }
        };
    }
}

export default Alert;
