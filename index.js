import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
            <button id={props.idValue} className="square" onClick={props.onClick}>
                {props.value}
            </button>
            );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            status: '',

        };
    }
    renderSquare(i) {
        return (
                <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    idValue={i}
                    />
                );
    }

    render() {
        return (
                <div>
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                    <h3>This game was developed by Safoh Sassa in Oct/2017</h3>
                </div>
                );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
        
    }

    handleClick(i) {
        $("#btn-0").show();
        $('ol').show();
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
       
        if (calculateWinner(squares) || squares[i]) {
            if (squares[i] !== 'X' || squares[i] !== 'O')
                if (!calculateWinner(squares))
                    alert('This cell is already clicked. Please click on an empty cell.');
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });

    }

    jumpTo(step) {
        if (step !== 0) {
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0
            });
        } else
        {
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                history: [
                    {
                        squares: Array(9).fill(null)
                    }
                ]
            });
            $('#btn-1').remove();
            $('#btn-2').remove();
            $('#btn-3').remove();
            $('#btn-4').remove();
            $('#btn-5').remove();
            $('#btn-6').remove();
            $('#btn-7').remove();
            $('#btn-8').remove();
            $('#btn-9').remove();
            $('ol').hide();
        }
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                    'Go to move #' + move :
                    'New Game';
            if (move !== 0)
            {
            return (
                    <li key={move}>
                        <button id={'btn-' + move} onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                    
                    );
        }
        else
        {
            return (
                    <li key={move}>
                        <button id={'btn-' + move} onClick={() => this.jumpTo(move) }>{desc}</button>
                    </li>
                    
                    );
            
        }
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            if (this.state.stepNumber !== 9)
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            else
                status = "Equality";
        }

        return (
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                            />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                    
                </div>
                
                );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            GameOver(lines[i]);

            return squares[a];
        }
    }
    return null;
}

function GameOver(lines) {
    for (let i = 0; i <= lines.length; i++) {
        var button = lines[i];
        $('#' + button).css("color", "#1BF40B");
    }

    function clr() {
        $("#btn-0").click();
        $("#btn-0").hide();
        for (let i = 0; i <= lines.length; i++) {
            var button = lines[i];
            $('#' + button).css("color", "#000000");
        }
    }
    setTimeout(clr, 2000);


}