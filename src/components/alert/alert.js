import { Component } from '../component';
import { inject, registerComponent, ComponentState } from '../annotations';

@registerComponent
@inject([ComponentState])
class Alert extends Component {
    attach() {
        console.log(this);
    }
}

export default Alert;
