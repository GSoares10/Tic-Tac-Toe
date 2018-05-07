import { eval_pos } from './main0.js';
import { get_move } from './main0.js';

let diff = 3;

document.getElementById("clear").addEventListener('click', function clear_all(form) {
    let step = 0;
    for (let i = 0; i < 9; i++){
        let position = "a" + i;
        form[position].value = "";
    }
});

document.getElementById("b0","b1","b2","b3","b4","b5","b6","b7","b8").input.addEventListener('click', function clickit(field) {
    if (step === -1) {
        alert("Reset e jogue novamente.");
        return;
    }
    position = field.name.substring(1,2,1);
    position = 'a'+position
    if (field.form[position].value !== "") {
       alert("Não pode mover para cá!");
        return;
    }
    field.form[position].value = "X";
    if (eval_pos(field.form)) {
        field.form.output.value = "Você Venceu! :D";
        step = -1;
        return;
    }
    position = get_move(field.form);
    field.form.output.value = 'Você moveu para '+position.substring(1,2,1);
    if (position === "") {
        field.form.output.value = "Não houve vencedor.";
        step = -1;
        return;
    }
    field.form[position].value = "O";
    if (eval_pos(field.form)) {
        field.form.output.value = "Você perdeu! :(";
        step = -1;
    }
});

const f = function(a) {
    if (a === "") {
        return ".";
    }else{
        return a;
    }
}


export const camp_move = function(form,player,weight,depth) {
    let cost;
    let bestCost = -2;
    let position;
    let newPlayer;
    if (player === 'X'){
        newPlayer = 'O';
    }else{
        newPlayer = 'X';
    }
    if (depth === diff){
        return 0;
    }
    if (eval_pos(form)){
        return 1;
    }
    for (let i = 0; i < 9; i++) {
        position = 'a'+i;
        if (form[position].value !== ""){
            continue;
            form[position].value = player;
            cost = comp_move(form,newPlayer, -weight, depth+1);
            if (cost > bestCost) {
                bestCost = cost;
                if (cost === 1){
                    i = 9;
                }
                form[position].value = "";
            }
            if(bestCost === -2){
                bestCost = 0;
                return (-bestCost);
            }
        }
    }
}

document.getElementById("a0","a1","a2","a3","a4","a5","a6","a7","a8").addEventListener('click', function(field){
        return alert("Clique no botão!");  
});

document.getElementById("Pc1").input.addEventListener('click', function Pc1(form) {
    if (!step++){
        this.form.a4.value = 'O';
    }
});