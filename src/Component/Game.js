// @flow
import * as React from 'react';
import Board from "./Board";
import './Board.css'


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardX: this.props.boardX,
            boardY: this.props.boardY,
            rule: this.props.rule,
            winner:null,
            history:[{
                squares: Array(this.props.boardY * this.props.boardX)
                    .fill(null),
                position: {
                    x:0,
                    y:0,
                }
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    calculateWinner(squares,next,position) {
        console.log(this)

        let res1 = this.calculateOnLine(squares,next,position,0);
        let res2 = this.calculateOnLine(squares,next,position,1);
        let res3 = this.calculateOnLine(squares,next,position,2);
        let res4 = this.calculateOnLine(squares,next,position,3);

        if(res1 || res2 || res3 || res4){
            return next;
        }
        return null;
    }

    calculateOnLine(squares,next,position,direction){
        let p = JSON.parse(JSON.stringify(position));
        //conect count
        let count = 1;
        //compare row
        if(direction===0){
            while(p.y < this.state.boardY){
                p.y++;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            p = JSON.parse(JSON.stringify(position))
            while(p.y > 0){
                p.y--;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            if (count>=this.state.rule){

                return true;
            }
        } else
        //compare column
        if(direction===1){
            while(p.x < this.state.boardX){
                p.x++;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            p = JSON.parse(JSON.stringify(position))
            while(p.x > 0){
                p.x--;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            if (count>=this.state.rule){
                return true;
            }
        } else
        //compare leftOblique
        if(direction===2){
            while(p.x < this.state.boardX && p.y < this.state.boardY){
                p.x++;
                p.y++;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            p = JSON.parse(JSON.stringify(position))
            while(p.x > 0 && p.y > 0){
                p.x--;
                p.y--;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            if (count>=this.state.rule){

                return true;
            }
        }
        //compare rightOblique
        if(direction===3){
            while(p.x > 0 && p.y < this.state.boardY){
                p.x--;
                p.y++;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            p = JSON.parse(JSON.stringify(position))
            while(p.x < this.state.boardX && p.y > 0){
                p.x++;
                p.y--;
                let index = this.calculateIndex(p);
                if(squares[index] && squares[index]===next){
                    count++;
                }else break;
            }
            if (count>=this.state.rule){

                return true;
            }
        }
        return null;
    }

    calculateIndex(position){
        return (position.x-1)*this.state.boardY+position.y-1
    }

    calculatePosition(i,boardX,boardY) {
        let x = Math.floor(i/boardY)+1;
        let y = i%boardY+1;
        console.log(x,y)
        return {x,y};
    }


    handleClick(i) {
        if(this.state.winner){
            return;
        }
        console.log(i)
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        let next = this.state.xIsNext ? 'X' : 'O';
        const position = this.calculatePosition(i,this.props.boardX,this.props.boardY);

        //获胜者
        let winner = this.calculateWinner(squares,next,position);
        if(squares[i]){
            //围棋提子逻辑，即在一个有子的格子点击，提起此棋子
            // squares[i] = null;
            // this.setState({
            //     winner:winner,
            //     history: history.concat([{
            //         squares: squares,
            //         position: position,
            //     }]),
            //     stepNumber: history.length,
            // });

            return;
        }

        squares[i] = next;

        this.setState({
            winner:winner,
            history: history.concat([{
                squares: squares,
                position: position,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

    }
    jumpTo(step) {
        this.setState({
            winner:null,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.state.winner;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    {' '+step.position.x+' '+step.position.y}
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i)=>this.handleClick(i)}
                        boardX={this.props.boardX}
                        boardY={this.props.boardY}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    };
};

