import React from 'react';
import Timer from './Timer'

export default class Taskbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <input
                    type="checkbox"
                    id="random"
                    checked={this.props.randomStart}
                    onChange={this.props.onCheck}
                />
                <label for="random">random start</label>
                &ensp;&ensp;&ensp;&ensp;
                <button onClick={this.props.onStart}>New</button>
                &ensp;&ensp;&ensp;&ensp;
                <button onClick={this.props.paused ? this.props.onUnPause : this.props.onPause}>
                    {this.props.paused ? 'Unpause' : 'Pause'}
                </button>
                &ensp;&ensp;&ensp;&ensp;
                <input 
                    type="range"
                    id="speed"
                    min="50"
                    max="250"
                    step="10"
                    value={this.props.tickSpeed}
                    onChange={this.props.onChangeTickSpeed}
                />
                <label for="speed">update every {this.props.tickSpeed} ms</label>
                &ensp;&ensp;&ensp;&ensp;
                <Timer
                    onTick={this.props.onTick}
                    ticks={this.props.ticks}
                    tickSpeed={this.props.tickSpeed}
                />
            </div>
        );
    }
}