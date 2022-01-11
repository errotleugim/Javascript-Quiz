const scores = document.getElementById('highscores');
const scoreboard = document.getElementById('scoreboard');
var startquiz = document.getElementById('startquiz');

//Function to show high scores. Can't seem to make it hide them back.
scores.addEventListener("click", function() {
  if (scoreboard.style.display = "none") {
    scoreboard.style.display = "block";
  } else if (scoreboard.style.display = "block") {
    scoreboard.style.display= "none";
  }
});
//This makes the main quiz div visible.
startquiz.addEventListener("click", function() {
  if (container.style.display = "none") {
    container.style.display = "block";
  }else {container.style.display = "none";
}
});

(function() {
  var questions = [{
    question: "Commonly used data types do NOT include:",
    choices: ["Fonts", "Boolean","integer" , "float", "string"],
    correctAnswer: 0
   }, 
   //{
  //   question: "The condition of an if/else statement is enclosed within:",
  //   choices: ["Curly Brackets {}", "Square brackets []", "Parenthesis ()", 'Single Quotes', "Double Quotes"],
  //   correctAnswer: 0
  // }, {
  //   question: "Arrays in JavaScript can be used to store:",
  //   choices: [72, 99, 108, 134, 156],
  //   correctAnswer: 0
  // }, {
  //   question: "Strings must be enclosed within what?",
  //   choices: [4, 5, 6, 7, 8],
  //   correctAnswer: 3
  // }, {
  //   question: "What is 8*8?",
  //   choices: [20, 30, 40, 50, 64],
  //   correctAnswer: 4
  // },{
  //   question: "Coding is hard?",
  //   choices: [2, 5, 10, 15, 20],
  //   correctAnswer: 2
  //  },
  // {
  //   question: "Coding is hard?",
  //   choices: [2, 5, 10, 15, 20],
  //   correctAnswer: 2
  // },{
  //   question: "Coding is hard?",
  //   choices: [2, 5, 10, 15, 20],
  //   correctAnswer: 2
  // }
];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
 
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        scoreboard.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = document.getElementById('scoreboard');
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    var name = prompt("who dis")
    score.append(name + ' got ' + numCorrect + '/' +
                 questions.length );
    return score;
  }
})();
