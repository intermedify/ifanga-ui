import { Component, inject, Injectable } from '../component';

@inject([Injectable.ComponentState])
class Alert extends Component {
    attach() {
        console.log(this);
    }
}
