// global variables:
var audioTank = new Audio("assets/audio/Tank.mp3");
var audioRush = new Audio("assets/audio/Rush.mp3");
var audioSpaceCowboy = new Audio("assets/audio/Space_Cowboy.mp3");


var intervalId;
var timeCount;
let numCorrect;
let numWrong;
let unansweredCount;
let game;

function Countdown(options) {
    var timer,
        instance = this,
        seconds = options.seconds || 10,
        updateStatus = options.onUpdateStatus || function() {},
        counterEnd = options.onCounterEnd || function() {};

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds === 0) {
            counterEnd();
            instance.stop();
        }
        seconds--;
    }

    this.start = function() {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
    };

    this.stop = function() {
        clearInterval(timer);
    };
}
var myCounter = new Countdown({
    seconds: 15, // number of seconds to count down
    onUpdateStatus: function(sec) { $('#time').html("time left: " + sec); }, // callback for each second
    onCounterEnd: function() {
        myCounter.stop();
        alert('TIME UP!');
        collectScore();
        game = false;
        $('.questionContainer').hide();
    }
});

$(document).ready(function() {
    numCorrect = 0;
    numWrong = 0;
    unansweredCount = 0;
    $('.questionContainer').hide();
    $('.endGame').hide();
    $('.resetBtn').hide();


    // game = true;
    // while (game = true) {
    let questions = [{
            question: "Where is Jet Black from?",
            answers: {
                a: "Mars",
                b: "Ganymede",
                c: "Earth",
                d: "Jupiter"
            },
            correctAnswer: "Ganymede"
        },
        {
            question: "What is Spike's weapon of choice?",
            answers: {
                a: "Austria .45",
                b: "Jericho 941",
                c: "Walther P99",
                d: "Glock 30"
            },
            correctAnswer: "Jericho 941"
        },
        {
            question: "What is Spike's alias given to him by his nomadic Native American ally?",
            answers: {
                a: "Laughing Bull",
                b: "Swimming Bird",
                c: "Star Warrior",
                d: "Space Cowboy"
            },
            correctAnswer: "Swimming Bird"
        }
    ];

    function gamePlay() {
        audioTank.play();
        $('.startBtn').on('click', function() {
            $('button').remove('.startBtn');
            myCounter.start();
            audioTank.pause();
            audioRush.play();
            $('.questionContainer').show();






            $('.submitBtn').on('click', function() {
                myCounter.stop();
                collectScore();
            });

        });
    }
    gamePlay();

    // $('.submitBtn').on('click', function() {
    //     myCounter.stop();
    //     collectScore();
    // });

    function collectScore() {
        var Q1 = $('input:radio[name="q1"]:checked').val();
        var Q2 = $('input:radio[name="q2"]:checked').val();
        var Q3 = $('input:radio[name="q3"]:checked').val();

        if (Q1 == undefined) {
            unansweredCount++;
        } else if (Q1 == "Ganymede") {
            numCorrect++;
        } else {
            numWrong++;
        }

        if (Q2 == undefined) {
            unansweredCount++;
        } else if (Q2 == "Jericho 941") {
            numCorrect++;
        } else {
            numWrong++;
        }

        if (Q3 == undefined) {
            unansweredCount++;
        } else if (Q3 == "Swimming Bird") {
            numCorrect++;
        } else {
            numWrong++;
        }


        showResults();
    }



    function showResults() {
        audioRush.pause();
        $('.questionContainer').hide();
        $('#endGame').show();
        audioSpaceCowboy.play;
        $("#correct").html(numCorrect);
        $("#wrong").html(numWrong);

        // $('.resetBtn').show();
        // $('.resetBtn').on('click', function() {
        //     gamePlay();
    });
}
});