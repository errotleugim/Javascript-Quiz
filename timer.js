 var start = document.getElementById('startquiz');

function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        
        seconds = parseInt(timer % 60, 10);
        
        display.textContent = seconds;
  
        if (--timer < 0) {
            timer = duration;
        }
        
    }, 1000);
  }
  
 start.addEventListener("click",function () {
    var oneMinute = 60 ,
        display = document.querySelector('#time');
    startTimer(oneMinute, display);
  });
  
//End game function. Also broken.
// function gameover () {
//     var timer = document.querySelector('#time');
//     if (timer.textContent = 0) {
//         alert("You lost");
//     }
// }

// gameover();