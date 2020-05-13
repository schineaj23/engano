class Engano {
    multiple_choice() {
        var correct = ["Muy bien", "Excelente"];
        for(var i=0;i<I.length;i++){
            for(var j=0;j<I[i][3].length;j++) {
                var Feedback = I[i][3][j][1];
                if(correct.indexOf(Feedback) > -1) {
                    var id = 'Q_' + i + '_'+ j + '_Btn';
                    console.debug(i + ' ' + id + ' ' + Feedback);
                    document.getElementById(id).click();
                }   
            }
            ChangeQ(1);
        }
    }

    match_card() {
        for(var i=0;i<DragEx.RightItems.length;i++){
            var left_card = DragEx.GetLeftItemByOrigPos(DragEx.RightItems[i].OrigPos);
            var right_card = DragEx.GetRightItemByOrigPos(DragEx.RightItems[i].OrigPos);
            var right_card_data = document.getElementById("R_"+DragEx.RightItems[i].OrigPos).innerHTML;
            console.debug(right_card_data);
            console.debug(left_card);
            console.debug(right_card);
            DraggingCard = right_card;
            var point = DragEx.GetDockPoint(left_card.OrigPos, right_card.Card);
            Slide(right_card.OrigPos, point);
            DragEx.HandleDrop(right_card.OrigPos);
            right_card.MatchedWith = left_card.OrigPos;
        }
    }

    sentence() {
        var correct_order = function() { // sort card array in tag order
            A = new Array();
            B = new Array();
            for(var i=0;i<DC.length;i++) {
                A.push(DC[i].tag);
                B[A[i]-1]=i;
            }
            C = new Array();
            for(var i=0;i<B.length;i++) {
                C.push(DC[B[i]]);
                console.debug(C[i]); //debug
            }
            return C;
        }
        var Cards = correct_order();
        var OtherCard = L[0];
        for(var i=0;i<Cards.length;i++) {
            (i==0) ? Cards[0].SetL(OtherCard.GetL() + 5) : Cards[i].SetL(Cards[i-1].GetR() + 5);
            var NewT = Math.floor(Math.max(((OtherCard.GetH() - Cards[i].GetH()) / 2) + OtherCard.GetT()), OtherCard.GetT());
            Cards[i].SetT(NewT);
        }
        document.getElementById("CheckButton1").click();
    }

    gap_fill() {
        for(var q=0;q<I.length;q++) {
            var input = document.getElementById("Gap"+q);
            var answer = I[q][1][0][0];
            if(input.nodeName == "SELECT") {
                var selection;
                for(var i=0;i<input.children.length;i++) {
                    if(input.children[i].text == answer.toLowerCase()){
                        selection = i;
                        break;
                    }
                }
                input.selectedIndex = selection;
            } else  {
                input.focus();
                input.value = answer.toUpperCase();
            }
            console.debug("Q "+ q + " " + answer);
        }
        CheckAnswers();
    }

    crossword() {
        for(var i=0;i<L.length;i++) {
            for(var j=0;j<L[i].length;j++) {
                var cell = document.getElementById("L_" + i + "_" + j);
                if(cell == null) continue;
                cell.textContent = L[i][j];
                G[i][j] = L[i][j];
            }
        }
        CheckAnswers();
    }

    match_selection() {
        var question_table = document.getElementById("MatchItems");
        for(var i=0;i<JsonEx.LeftItems.length;i++) {
            var selector = question_table.children[i].children[1].children[0];
            for(var j=0;j<selector.children.length;j++) {
                if(selector.children[j].value == i){
                    selector.selectedIndex = j;
                    break;
                }
            }
        }
        CheckAnswers();
    }

    constructor() {
        var cool = "\n _______  __    _  _______  _______  __    _  _______ \n|       ||  |  | ||       ||   _   ||  |  | ||       |\n|    ___||   |_| ||    ___||  |_|  ||   |_| ||   _   |\n|   |___ |       ||   | __ |       ||       ||  | |  |\n|    ___||  _    ||   ||  ||       ||  _    ||  |_|  |\n|   |___ | | |   ||   |_| ||   _   || | |   ||       |\n|_______||_|  |__||_______||__| |__||_|  |__||_______|";
        console.error(cool);
        var types = ["CrosswordGrid", "QuizQuestions", "ExerciseContainer JMatchDrag", "GapSpan", "MatchTable", "ExerciseContainer JMixDrag"];
        for(var i=0;i<types.length;i++) {
            var selection = document.getElementsByClassName(types[i]);
            if(selection.length == 0) continue;

            switch(i) {
                case 0:
                    console.info("Engano: Crossword Found");
                    this.crossword();
                    break;
                case 1:
                    console.info("Engano: Multiple Choice Found");
                    this.multiple_choice();
                    break;
                case 2:
                    console.info("Engano: Matching Cards Found");
                    this.match_card();
                    break;
                case 3:
                    console.info("Engano: Gap Fill Found");
                    this.gap_fill();
                    break;
                case 4:
                    console.info("Engano: Matching Selection Found");
                    this.match_selection();
                    break;
                case 5:
                    console.info("Engano: Sentence Construction Found");
                    break;
                default:
                    console.error("Engano: Input does not match type");
                    break;
            }
        }
    }
}
new Engano();
