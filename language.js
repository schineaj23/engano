class Engano {
    // jigsaw
    jigsaw() {
        var transcript = document.getElementsByClassName("transcript")[0].children;
        var box = document.getElementsByClassName("options ui-droppable")[0];
        for(var i=0;i<transcript.length;i++) {
            var parent = transcript[i];
            var pos = parent.getAttribute("data-position");
            var node = function() {
                for(var j=0;j<box.children.length;j++) {
                    var ret = box.children[j];
                    if(ret.getAttribute("data-position") == pos) {
                        return ret;
                    }
                }
            };
            parent.appendChild(node());
        }
        document.getElementsByClassName("submit_btn")[0].click();
        document.getElementsByClassName("submit_btn")[0].click();
    }

    // vocab
    vocab() {
        var cards = document.getElementsByClassName("card_container")[0].children;
        for(var i=0;i<card.words.length;i++) {
            var _card = document.getElementsByClassName("translation");
            _card[i].children[0].value = card.words[i].prim_word;
            card.check();
            screens.tester.next_card();
        }   
    }

    // gap fill
    gap_fill() {
        var answers = screens.gap_fill.submodule.get_answers();
        var transcript = document.getElementsByClassName("transcript")[0];
        for(var i=0;i<answers.length;i++) {
            var input = transcript.children[i];
            input.value = answers[i].original;
        }
        document.getElementsByClassName("submit_btn")[0].click();
        document.getElementsByClassName("submit_btn")[0].click();
    }

    // comprehension
    comp() {
        var rows = document.getElementsByClassName("questions_table")[0].children
        for(var i=0;i<rows.length;i++) {
            var questions = rows[i].children;
            for(var j=0;j<questions.length;j++) {
                var question = questions[j].children;
                var options = question[1].children;
                for(var k=0;k<options.length;k++) {
                    var correct = null;
                    if(options[k].getAttribute('data-correct') == 1) {
                        correct = options[k].children[0];
                        correct.click();
                        break;
                    }
                }
            }
        }
    }

    constructor() {
        var cool = "\n _______  __    _  _______  _______  __    _  _______ \n|       ||  |  | ||       ||   _   ||  |  | ||       |\n|    ___||   |_| ||    ___||  |_|  ||   |_| ||   _   |\n|   |___ |       ||   | __ |       ||       ||  | |  |\n|    ___||  _    ||   ||  ||       ||  _    ||  |_|  |\n|   |___ | | |   ||   |_| ||   _   || | |   ||       |\n|_______||_|  |__||_______||__| |__||_|  |__||_______|";
        console.error(cool);
        var types = ["jigsaw", "video_vocab", "gap_fill", "comprehension"];
        var type = window.location.pathname;
        type = type.split('t/')[1];
        type = type.split('/')[0];
        switch(type) {
            case types[0]: // jigsaw
                console.info("Engano: Jigsaw Found");
                this.jigsaw();
                break;
            case types[1]: // video vocab
                console.info("Engano: Vocab Found")
                this.vocab();
                break;
            case types[2]: // gap fill
                console.info("Engano: Gap Fill Found");
                this.gap_fill();
                break;
            case types[3]: // comprehension
                console.info("Engano: Comprehension Found");
                this.comp();
                break;
            default: // none found
                console.error("Engano: Input does not match type");
                break;
        }
    }
}
new Engano();
