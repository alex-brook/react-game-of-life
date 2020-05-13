export default class GameOfLifeModel {
    // Immutable class to model game of life.
    constructor(width, height, {grid = null, random = false}) {
        //console.log(grid);
        this.width = width;
        this.height = height;
        this.size = width * height; 

        if(grid) {
            this.grid = grid;
        } else if(!grid && random) {
            this.grid = Array.from(
                Array(width * height),
                _ => {return Math.round(Math.random())}
            );
        } else if(!grid && !random) {
            this.grid = new Array(width * height).fill(0);
        }
    }

    getIndex(y, x) {
        return y * this.width + x;
    }

    getCoords(i) {
        const y = Math.floor(i / this.width);
        const x = i - (y * this.width);
        return {
            y: y,
            x: x
        };
    }

    neighbours(i) {
        const {y, x} = this.getCoords(i);
        let neighbourCount = 0;
        for(let scanY = Math.max(0, y-1); scanY <= Math.min(this.height-1, y+1); scanY++) {
            for(let scanX = Math.max(0, x-1); scanX <= Math.min(this.width-1, x+1); scanX++) {
                if(scanY !== y || scanX !== x) {
                    neighbourCount += this.grid[this.getIndex(scanY, scanX)];
                }
            }
        }
        return neighbourCount;
    }

    next() {
        const newGrid = this.grid.map((c, i) => {
            return this.neighbours(i) === 3 || c === 1 && this.neighbours(i) === 2 ? 1 : 0;
        });
        return new GameOfLifeModel(this.width, this.height, {grid: newGrid});
    }

    setCell(y, x) {
        const newGrid = Object.assign([...this.grid], {[this.getIndex(y, x)] : 1});
        return new GameOfLifeModel(this.width, this.height, {grid: newGrid})
    }
}