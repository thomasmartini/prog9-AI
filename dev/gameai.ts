/// <reference path="knight.ts" />


class GameAI {
    public static moveKnight(king: King, knight: Knight[], gameState: GameState) {
        const startTimestamp = performance.now();

        const searchDepth = 4;
        const { bestMove, horseIndex } = GameAI.evaluateMoves(searchDepth, knight, gameState, king);

        knight[horseIndex].setPosition(bestMove);
        gameState.knightPositions[horseIndex] = bestMove;

        const endTimestamp = performance.now();
        console.log("AI move took " + (endTimestamp - startTimestamp) + " milliseconds.");
    }

    private static evaluateMoves(searchDepth: number, knight: Knight[], gameState: GameState, king: King) {
        let minEval = Infinity;
        let bestMove: [number, number] = [0, 0];
        let horseIndex = 0;

        knight.forEach((horse, i) => {
            const moves = horse.getMoves(gameState.knightPositions[i]);
            moves.forEach((move) => {
                const newGameState = gameState.copy();
                newGameState.knightPositions[i] = move;
                const currentEvaluation = GameAI.minimax(searchDepth - 1, newGameState, true, searchDepth, king, knight);
                if (currentEvaluation < minEval) {
                    minEval = currentEvaluation;
                    bestMove = move;
                    horseIndex = i;
                }
            });
        });

        return { bestMove, horseIndex };
    }

    private static minimax(depth: number, newGameState: GameState, isMax: boolean, maxDepth: number, king: King, knights: Knight[]): number {
        const scoring = newGameState.getScore();
        if (depth === 0 || scoring[1]) return scoring[0];

        if (isMax) {
            let maxEvaluation = -Infinity;
            const kingMoves = king.getMoves(newGameState.kingPos);
            for (const move of kingMoves) {
                const clonedState = newGameState.copy();
                clonedState.kingPos = move;
                const currentEvaluation = GameAI.minimax(depth - 1, clonedState, false, maxDepth, king, knights);
                maxEvaluation = Math.max(maxEvaluation, currentEvaluation);
            }
            return maxEvaluation;
        } else {
            let minEvaluation = Infinity;
            knights.forEach((horse, i) => {
                const clonedState = newGameState.copy();
                const horseMoves = horse.getMoves(newGameState.knightPositions[i]);
                for (const move of horseMoves) {
                    clonedState.knightPositions[i] = move;
                    const currentEvaluation = GameAI.minimax(depth - 1, clonedState, true, maxDepth, king, knights);
                    minEvaluation = Math.min(minEvaluation, currentEvaluation);
                }
            });
            return minEvaluation;
        }
    }
}