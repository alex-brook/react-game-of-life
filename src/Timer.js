import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timerID = setInterval(
            this.props.onTick,
            this.props.tickSpeed
        );
    }

    componentDidUpdate() {
        clearInterval(this.timerID);
        this.timerID = setInterval(
            this.props.onTick,
            this.props.tickSpeed
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <span>{this.props.ticks} generations</span>
        );
    }
}