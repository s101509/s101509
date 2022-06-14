
function rnaTranscription(words){
    let dna = "";
    for(let word of words){
        if (word == "G"){
            dna += "C"
        }else if(word == "C"){
            dna += "G"
        }else if(word == "T"){
            dna += "A"
        }else if(word == "A"){
            dna += "U"
        }
    }
    return dna;
}