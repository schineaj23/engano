class Engano {
    // psuedo-exception for debugging
    check_progress(iterator) {
        if(iterator+1 > progress.cur_progress) {
            console.error("Engano: Failed to advance on question " + iterator + " Did code fail?");
            console.error("Engano: [DEBUG INFO]\nQ:\t"+iterator+"\nS:\t"+progress.cur_stage+"\nP:\t"+progress.cur_progress);
            return false;
        }
        return true;
    }

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
    vocab(list) {
        for(var i=0;i<card.words.length;i++) {
            var _card = document.getElementsByClassName("translation");
            (list) ? _card[i].children[0].value = card.words[i].foreign.split(',')[0]: _card[i].children[0].value = card.words[i].prim_word;
            card.check();
            screens.tester.next_card();
            if(!this.check_progress(i)) {
                break;
            }
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
        var rows = document.getElementsByClassName("questions_table")[0].children;
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

    grammar() {
        var answer = function(name) { // general answer function
            var elements = document.getElementsByClassName(name);
            for(var k=0;k<elements.length;k++) {
                var options = elements[k].children;
                var correct_answers = new Array();
                for(var j=0;j<options.length;j++) {
                    if(options[j].getAttribute("data-correct") == "true") {
                        correct_answers.push(options[j]);
                    }
                }
                for(var i=0;i<correct_answers.length;i++) {
                    correct_answers[i].click();
                }
            }
            document.getElementsByClassName("next_btn")[0].click();
            document.getElementsByClassName("next_btn")[0].click();
        };

        var identification = function() {
            answer("f-size");
        };

        var multiple_choice = function() {
            answer("fake_options");
        };

        var spelling = function() {
            var answers = screens.grammar_spelling.correct_answers;
            var len = document.getElementsByClassName("sentence f-size")[0].children.length;
            var input_count = -1;
            for(var i=0;i<len;i++) {
                var spelling_input = document.getElementsByClassName("sentence f-size")[0].children[i];
                if(spelling_input.nodeName == "INPUT") {
                    input_count++;
                } else {
                    continue;
                }
                spelling_input.value = answers[input_count];
            }
            document.getElementsByClassName("next_btn")[0].click();
            document.getElementsByClassName("next_btn")[0].click();
        };

        var ordering = function() {
            var initial_length = document.getElementsByClassName("words-origin words-area words-sortable f-size ui-sortable")[0].children.length;
            var words = document.getElementsByClassName("words-origin words-area words-sortable f-size ui-sortable")[0].children;
            var correct_container = document.getElementsByClassName("words-destination words-area words-sortable  f-size ui-sortable")[0];
            for(var i=0;i<initial_length;i++) {
                var node = function() {
                    for(var j=0;j<words.length;j++) {
                        var ret = words[j];
                        if(ret.getAttribute("data-index") == i) {
                            return ret;
                        }
                    }
                };
                correct_container.append(node());
            }
            document.getElementsByClassName("next_btn")[0].click();
            document.getElementsByClassName("next_btn")[0].click();
        };

        for(var j=0;j<progress.max_progress;j++) {
            var stage = progress.cur_stage;
            switch(stage) {
                case "identification":
                    console.info("Engano: Grammar Q " + j + " ID");
                    identification();
                    break;
                case "multiple_choice":
                    console.info("Engano: Grammar Q " + j + " MC");
                    multiple_choice();
                    break;
                case "spelling":
                    console.info("Engano: Grammar Q " + j + " Spelling");
                    spelling();
                    break;
                case "ordering":
                    console.info("Engano: Grammar Q " + j + " Ordering");
                    ordering();
                    break;
                default:
                    console.warn("Engano: Grammar Q " + j + " Invalid");
                    break;
            }
            if(!this.check_progress(j)) {
                break;
            }
        }
    }

    constructor() {
        var cool = "\n _______  __    _  _______  _______  __    _  _______ \n|       ||  |  | ||       ||   _   ||  |  | ||       |\n|    ___||   |_| ||    ___||  |_|  ||   |_| ||   _   |\n|   |___ |       ||   | __ |       ||       ||  | |  |\n|    ___||  _    ||   ||  ||       ||  _    ||  |_|  |\n|   |___ | | |   ||   |_| ||   _   || | |   ||       |\n|_______||_|  |__||_______||__| |__||_|  |__||_______|";
        console.error(cool);
        var types = ["jigsaw", "video_vocab", "gap_fill", "comprehension", "grammar main", "grammar_training", "list_vocab", "grammar"];
        var type = window.location.pathname;
        type = type.split('t/')[1];
        type = type.split('/')[0];
        if(type == "task") { // assigned exercise, type not in url
            var t_type = document.getElementsByClassName("screen_container")[0].children[0].className;
            if(t_type == types[2]) { // extra check for gap fill
                (document.getElementsByClassName("options ui-droppable").length == 1) ? t_type = types[0] : t_type = types[2];
            }
            type = t_type;
        }
        switch(type) {
            case types[0]: // jigsaw
                console.info("Engano: Jigsaw Found");
                this.jigsaw();
                break;
            case types[1]: // video vocab
                console.info("Engano: Video Vocab Found")
                this.vocab(false);
                break;
            case types[2]: // gap fill
                console.info("Engano: Gap Fill Found");
                this.gap_fill();
                break;
            case types[3]: // comprehension
                console.info("Engano: Comprehension Found");
                this.comp();
                break;
            case types[7]:
            case types[4]:
                console.info("Engano: Grammar Test Found");
                this.grammar();
                break;
            case types[5]:
                console.info("Engano: Grammar Training Found");
                this.grammar();
                break;
            case types[6]:
                console.info("Engano: List Vocab Found");
                this.vocab(true);
                break;
            default: // none found
                console.error("Engano: Input does not match type");
                break;
        }
    }
}
new Engano();
