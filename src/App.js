import React from 'react';
import Taskbar from './Taskbar';
import Grid from './Grid';
import GameOfLifeModel from './GameOfLifeModel';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.initialState = {
      gameWidth: 200,
      gameHeight: 100,
      resolution: 6,
      tickSpeed: 100,
      randomStart: true,
      ticks: 0,
      paused: false,
    };
    this.initialState.game = Object.freeze(new GameOfLifeModel(
      this.initialState.gameWidth,
      this.initialState.gameHeight,
      { random: this.initialState.randomStart }
    ));
    this.state = this.initialState;
  }

  onMove = (event) => {
    const y = Math.round((event.clientY - event.target.offsetTop) / this.state.resolution);
    const x = Math.round((event.clientX - event.target.offsetLeft) / this.state.resolution);
    this.setState(state => {
      return {
        game: state.game.setCell(y, x)
      }
    });
  }

  onCheckboxChange = () => {
    this.setState(state => {
      return {
        randomStart: !state.randomStart
      };
    });
  }

  onChangeTickSpeed = (event) => {
    event.persist();
    this.setState({ tickSpeed: event.target.valueAsNumber });
  }

  onTick = () => {
    if(!this.state.paused) {
      this.setState(state => {
        return {
          game: state.game.next(),
          ticks: state.ticks + 1,
        };
      });
    }
  }

  onPause = () => {
    this.setState({ paused: true });
  }

  onUnPause = () => {
    this.setState({ paused: false });
  }

  onStart = () => {
    this.setState(state => {
      return {
        game: Object.freeze(new GameOfLifeModel(
          state.gameWidth,
          state.gameHeight,
          { random: state.randomStart }
        )),
        ticks: 0
      };
    });
  }
  
  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Taskbar
          ticks={this.state.ticks}
          tickSpeed={this.state.tickSpeed}
          paused={this.state.paused}
          randomStart={this.state.randomStart}
          onChangeTickSpeed={this.onChangeTickSpeed}
          onStart={this.onStart}
          onTick={this.onTick}
          onPause={this.onPause}
          onUnPause={this.onUnPause}
          onCheck={this.onCheckboxChange}
        />     
        <Grid
          resolution={this.state.resolution}
          game={this.state.game}
          onMouseMove={this.onMove}
          onPause={this.onPause}
          onUnPause={this.onUnPause}
        />
      </div>
    );
  }
}
