import React from "react";
import Square from "./Square";
import './Board.css'



class Board extends React.Component {
    renderSquare(i,index) {
        return (
            <Square
                key={index}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    drawBoard(m, n) {
        let board = new Array(m);
        for (let i = 0; i < m; i++) {
            let row = new Array(n);

            for (let j = 0; j < n; j++) {
                row.push(i*n+j)
            }
            board.push(row)
        }
        return (
            <div>
                {board.map(((row,index) => {
                    const div = <div key={index} className="board-row">
                        {
                            row.map((value,index)=>{
                                return this.renderSquare(value,index)
                            })
                        }
                    </div>
                    return div;
                }))}
            </div>
        );

    }

    render() {
        return (
            <div>
                {this.drawBoard(this.props.boardX,this.props.boardY)}
            </div>
        );
    }


}
export default Board
