document.addEventListener('DOMContentLoaded', function () {

    const list_word = ['linux','javascript','fedora','java','ionic','laravel']
    let word_guess = []
    let display_word = []
    let history_letter = []
    let num_attempt = 6
    let capture_letter = document.querySelector('#letter')
    let capture_button = document.querySelector('#button')
    let capture_result = document.querySelector('#result')
    let capture_attempt = document.querySelector('#attempts')


    function prepareGame(){
        let random_position_words = _.random(list_word.length - 1)
        let word_random = list_word[random_position_words]
        word_guess = word_random.split('')

        for (let letter of word_guess) {
            display_word.push('_')
        }
        drawGame()
    }

    function drawGame(){
        capture_result.textContent = display_word.join(' ')
        capture_attempt.textContent = num_attempt   
    }

    function checkLetter(){
        
        let letter_entered = capture_letter.value
        if(letter_entered == ''){
            num_attempt = num_attempt
        }else{
            capture_letter.value = ''
            capture_letter.focus()
    
            for(const[position, letter_guess] of word_guess.entries()){
                if(letter_entered == letter_guess){
                    display_word[position] = letter_guess
                }
            }
    
            if(! word_guess.includes(letter_entered)){ 
    
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                
                if(num_attempt == 6){
                    ctx.beginPath();
                    ctx.moveTo(20,20);
                    ctx.lineTo(20,400);
                    ctx.stroke();
                }
                if(num_attempt == 5){
                    ctx.beginPath();
                    ctx.moveTo(20,20);
                    ctx.lineTo(100,20);
                    ctx.stroke();
                }
                if(num_attempt == 4){
                    ctx.beginPath();
                    ctx.arc(95, 62, 40, 0, 2 * Math.PI);
                    ctx.stroke();  
                }
    
                if(num_attempt == 3){
                    ctx.beginPath();
                    ctx.moveTo(95,95);
                    ctx.lineTo(95,260);
                    ctx.stroke();
                }
    
                if(num_attempt == 2){
                    ctx.beginPath();
                    ctx.moveTo(125,125);
                    ctx.lineTo(70,130);
                    ctx.stroke();
                }
                num_attempt -=1
                history_letter.push(letter_entered)
            }
            endGame()
            drawGame()
        }
    }

    function attemptClickEnter(event){
        if(event.code == 'Enter'){
            checkLetter()
        }
    }

    function endGame(){
        if(!display_word.includes('_')){
            alert("Winner!!")
            location.reload(true)
        }

        if(num_attempt == 0){
            alert("Oops! you have lost, the word was " +  word_guess.join('').toLocaleUpperCase())
            location.reload(true)
        }
    }

    /*Get Event*/
    capture_button.addEventListener('click', checkLetter)
    capture_letter.addEventListener('keyup',attemptClickEnter)

    prepareGame()
});
