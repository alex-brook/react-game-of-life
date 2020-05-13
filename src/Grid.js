import React from 'react';

export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mouseDown: false
        }
    }

    componentDidUpdate() {
        const ctx = this.refs.canvas.getContext('2d');
        this.drawGame(ctx);
    }

    drawGame = (ctx) => {
        const resolution = this.props.resolution;
        const height = this.props.game.height;
        const width = this.props.game.width;
        const game = this.props.game;

        let i = 0;
        for(let y=0; y < resolution * height; y += resolution){
            for (let x=0; x < resolution * width; x += resolution) {
                const alive = game.grid[i] === 1;
                ctx.fillStyle = alive ? 'green' : 'black';
                ctx.fillRect(x, y, resolution, resolution);
                i++;
            }
        }
    };

    onDown = () => {
        this.setState({
            mouseDown: true
        });
        this.props.onPause();
    }

    onUp = () => {
        this.setState({
            mouseDown: false
        });
        this.props.onUnPause();
    }

    onMove = (event) => {
        event.persist();
        if (this.state.mouseDown) {
            this.props.onMouseMove(event);
        }
    }

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={this.props.resolution * this.props.game.width} 
                    height={this.props.resolution * this.props.game.width}
                    onMouseDown={this.onDown}
                    onMouseUp={this.onUp}
                    onMouseMove={this.onMove}
                />
            </div>
        );
    }
}