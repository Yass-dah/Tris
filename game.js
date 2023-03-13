let turn = 0;
let boxes = new Array(9).fill(0); // 0 = empty  1 = cross   2 = circle
function changeicon(){
    var el = document.getElementsByClassName('icon'); 
    var str = turn%2 == 0 ? '<i class="fa-regular fa-circle is-size-2"></i>' 
                                : '<i class="fa-solid fa-xmark is-size-1"></i>';
    for(i = 0; i < el.length; i++){
        if(boxes[i] == 0)
            el[i].innerHTML = str; 
    }
}

function draw(box){
    document.getElementById(box).children[0].style.color = 'black';
    boxes[box.charAt(1)] = turn%2 == 0 ? 1 : 2;
    changeicon();
    winner = check();
    if(winner == 1)
        w = 'X';
    if(winner == 2)
        w = 'O';
    if(winner){
        document.getElementById('result').innerHTML = '<h2 class="is-size-1">' + w + ' WON!</h2>';
        el = document.getElementsByClassName('icon');
        for(i = 0; i < el.length; i++)
            el[i].setAttribute('onclick', '');
    }
    if(!turn)
        document.getElementById('rtr').disabled = false;
    if(turn == 8){
        document.getElementById('result').innerHTML = '<h2 class="is-size-1">DRAW!</h2>';
        return;
    }
    turn++;
}

function check(){
    var flag = false;
    var str = 'linear-gradient(to right, transparent 47%, black 47% 53%, transparent 53%)';
    p = turn%2 == 0 ? 1 : 2;
    for(i = 0; i < 3; i++){
        if(boxes[3*i] == p && boxes[1+(3*i)] == p && boxes[2+(3*i)] == p){
            if(i == 0){
                el = document.getElementsByClassName('leftc');
                el[0].style.background = str;
            }
            else if(i == 1){
                el = document.getElementsByClassName('middlec');
                el[0].style.background = str;
            }
            else{
                el = document.getElementsByClassName('rightc');
                el[0].style.background = str;
            }
            return p;
        }
    }
    str = 'linear-gradient(180deg, transparent 47%, black 47% 53%, transparent 53%)'
    for(i = 0; i < 3; i++){
        if(boxes[0+i] == p && boxes[3+i] == p && boxes[6+i] == p){
            if(i == 0){
                el = document.getElementsByClassName('top');
                for(j = 0; j < 3; j++)
                    el[j].style.background = str;
            }
            else if(i == 1){
                el = document.getElementsByClassName('middle');
                for(j = 0; j < 3; j++)
                    el[j].style.background = str;
            }
            else{
                el = document.getElementsByClassName('bottom');
                for(j = 0; j < 3; j++)
                    el[j].style.background = str;
            }
            return p;
        }
    }
    str = 'linear-gradient(38deg, transparent 47%, black 47% 53%, transparent 53%)';
    if(boxes[0]==p && boxes[4]==p && boxes[8]==p){
        document.getElementById('b0').style.background = str;
        document.getElementById('b4').style.background = str;
        document.getElementById('b8').style.background = str;
        return p;
    }
    str = 'linear-gradient(-38deg, transparent 47%, black 47% 53%, transparent 53%)';
    if(boxes[2]==p && boxes[4]==p && boxes[6]==p){
        document.getElementById('b2').style.background = str;
        document.getElementById('b4').style.background = str;
        document.getElementById('b6').style.background = str;
        return p;
    }
}

function reset(){
    turn = 0;
    boxes.fill(0);
    var el = document.getElementsByClassName('icon');
    for(i = 0; i < el.length; i++){
        el[i].children[0].style.color = 'white';
        el[i].innerHTML = '<i class="fa-solid fa-xmark is-size-1"></i>';
        el[i].style.background = 'none';
    }
    el = document.getElementsByClassName('column');
    for(i = 0; i < el.length; i++)
        el[i].style.background = 'none';
    document.getElementById('rtr').disabled = true;
    document.getElementById('result').innerHTML = '';
    el = document.getElementsByClassName('icon');
    for(i = 0; i < el.length; i++)
        el[i].setAttribute('onclick', 'draw("b' + i + '")');
}