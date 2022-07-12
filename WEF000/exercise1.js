let PTS = 20
let REB = 12
let AST = 2
let STL = 1.1
let BLK = 1.5
let missedFG = 0.292
let missedFT = 0.814
let TO = 4.2
let GP = 68
let efficiency = (PTS + REB + AST + STL + BLK - missedFG - missedFT - TO) / GP

console.log(efficiency)
