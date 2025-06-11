document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form Handling (Example) ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            // Basic form validation check (more robust validation can be added)
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (fullName === '' || email === '' || message === '') {
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = '#ffe6e6';
                formMessage.style.borderColor = '#ff3333';
                formMessage.style.color = '#cc0000';
                formMessage.textContent = 'Please fill in all required fields.';
                return; // Stop form submission
            }

            // Simulate form submission success
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#e6ffe6';
            formMessage.style.borderColor = '#8bc34a';
            formMessage.style.color = '#3f51b5';
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';

            contactForm.reset(); // Clear the form

            // In a real application, you'd send this data to a server using fetch()
            /*
            fetch(this.action, {
                method: this.method,
                body: new FormData(this)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Display success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Display error message
            });
            */
        });
    }

    // --- Vocabulary Quiz ---
    const quizData = [
        {
            question: "Which word means 'to begin'?",
            options: ["Finish", "Start", "End", "Stop"],
            correctAnswer: "Start"
        },
        {
            question: "What is a synonym for 'happy'?",
            options: ["Sad", "Joyful", "Angry", "Tired"],
            correctAnswer: "Joyful"
        },
        {
            question: "Choose the antonym for 'fast'.",
            options: ["Quick", "Rapid", "Slow", "Speedy"],
            correctAnswer: "Slow"
        }
    ];

    let currentQuizQuestionIndex = 0;
    let userScore = 0;

    const quizDisplay = document.getElementById('quizDisplay');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const resetQuizBtn = document.getElementById('resetQuizBtn');
    const quizResult = document.getElementById('quizResult');

    function displayQuizQuestion() {
        if (quizDisplay && quizData.length > 0) {
            const q = quizData[currentQuizQuestionIndex];
            // Using template literals as required
            quizDisplay.innerHTML = `
                <div class="question-card">
                    <p class="question-text">${q.question}</p>
                    <div class="options-container">
                        ${q.options.map((option, index) => `
                            <label>
                                <input type="radio" name="quizOption" value="${option}" id="option${index}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
            // Show next/reset buttons after starting
            startQuizBtn.style.display = 'none';
            nextQuestionBtn.style.display = 'inline-block';
            resetQuizBtn.style.display = 'inline-block';
            quizResult.textContent = ''; // Clear previous result

            // Add event listeners to the newly created radio buttons
            document.querySelectorAll('input[name="quizOption"]').forEach(radio => {
                radio.addEventListener('change', checkAnswerAndPrepareNext); // Use 'change' event for radio buttons
            });
        }
    }

    // New function to handle checking answer and preparing for next question
    function checkAnswerAndPrepareNext() {
        checkAnswer(); // Check the answer immediately when an option is selected
        // Optionally, you can add a short delay before enabling the 'Next Question' button
        // or just rely on the user clicking the 'Next Question' button explicitly.
        // For now, checkAnswer will mark it correct/incorrect.
        // The setTimeout for goToNextQuestion is now triggered by clicking 'Next Question' button.
    }


    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="quizOption"]:checked');
        if (!selectedOption) {
            quizResult.textContent = 'Please select an answer!';
            quizResult.style.color = '#cc0000';
            return;
        }

        const userAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuizQuestionIndex].correctAnswer;

        // Ensure the answer is checked only once per question
        if (selectedOption.hasAttribute('data-checked')) {
            return; // Already checked this question
        }
        selectedOption.setAttribute('data-checked', 'true'); // Mark as checked

        // Conditional branching
        if (userAnswer === correctAnswer) {
            userScore++;
            quizResult.textContent = 'Correct!';
            quizResult.style.color = '#8BC34A';
        } else {
            quizResult.textContent = `Incorrect. The correct answer was "${correctAnswer}".`;
            quizResult.style.color = '#cc0000';
        }

        // Disable options after answer
        document.querySelectorAll('input[name="quizOption"]').forEach(radio => radio.disabled = true);

        // Save progress to localStorage
        localStorage.setItem('quizScore', userScore);
        localStorage.setItem('currentQuizQuestionIndex', currentQuizQuestionIndex);
    }

    function goToNextQuestion() {
        currentQuizQuestionIndex++;
        if (currentQuizQuestionIndex < quizData.length) {
            displayQuizQuestion();
        } else {
            quizDisplay.innerHTML = `<h2>Quiz Complete!</h2><p>You scored ${userScore} out of ${quizData.length}.</p>`;
            nextQuestionBtn.style.display = 'none';
            resetQuizBtn.style.display = 'inline-block';
            quizResult.textContent = '';
            // Clear progress from localStorage when quiz is finished
            localStorage.removeItem('currentQuizQuestionIndex');
            localStorage.removeItem('quizScore');
        }
    }

    function resetQuiz() {
        currentQuizQuestionIndex = 0;
        userScore = 0;
        localStorage.removeItem('quizScore');
        localStorage.removeItem('currentQuizQuestionIndex');
        displayQuizQuestion(); // Display the first question to restart
        quizResult.textContent = ''; // Clear quiz result message
        nextQuestionBtn.style.display = 'none'; // Hide next until start
        resetQuizBtn.style.display = 'none'; // Hide reset until start
        startQuizBtn.style.display = 'inline-block'; // Show start button again
        quizDisplay.innerHTML = ''; // Clear content from display
    }

    // Event listeners for main quiz buttons
    if (startQuizBtn) { // Ensure elements exist on the page
        startQuizBtn.addEventListener('click', () => {
            // Check localStorage for previous progress
            const savedScore = localStorage.getItem('quizScore');
            const savedIndex = localStorage.getItem('currentQuizQuestionIndex');

            if (savedScore !== null && savedIndex !== null && parseInt(savedIndex) < quizData.length) { // Ensure saved index is valid
                userScore = parseInt(savedScore);
                currentQuizQuestionIndex = parseInt(savedIndex);
                // Optionally, confirm with user if they want to resume
                if (confirm(`Resume quiz from where you left off? Score: ${userScore}, Question: ${currentQuizQuestionIndex + 1}`)) {
                    displayQuizQuestion();
                } else {
                    resetQuiz(); // User chose to restart
                }
            } else {
                currentQuizQuestionIndex = 0; // Start from beginning if no saved progress or invalid
                userScore = 0;
                displayQuizQuestion();
            }
        });
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            // Check the answer if it hasn't been checked by a radio button 'change' event yet
            // (This is a fallback/redundancy in case user clicks next without selecting)
            checkAnswer();
            // Add a small delay before going to next question to allow user to read feedback
            setTimeout(goToNextQuestion, 1500);
        });
    }

    if (resetQuizBtn) {
        resetQuizBtn.addEventListener('click', resetQuiz);
    }

    // --- Vocabulary Flashcards ---
    const flashcardData = [
        { term: "Fluent", definition: "Able to express oneself easily and articulately." },
        { term: "Acquire", definition: "To get or obtain something." },
        { term: "Proficient", definition: "Skilled in doing something." },
        { term: "Cognition", definition: "The mental action or process of acquiring knowledge and understanding through thought, experience, and the senses." },
        { term: "Subtle", definition: "So delicate or precise as to be difficult to analyze or describe." }
    ];

    let currentFlashcardIndex = 0;
    const flashcardDisplay = document.getElementById('flashcardDisplay');
    const loadFlashcardBtn = document.getElementById('loadFlashcardBtn');
    const revealFlashcardBtn = document.getElementById('revealFlashcardBtn');
    const nextFlashcardBtn = document.getElementById('nextFlashcardBtn');

    function displayFlashcard() {
        if (flashcardDisplay && flashcardData.length > 0) {
            const card = flashcardData[currentFlashcardIndex];
            flashcardDisplay.innerHTML = `
                <div class="flashcard">
                    <div class="front">${card.term}</div>
                    <div class="back">${card.definition}</div>
                </div>
            `;
            // Re-select the flashcard element after it's been re-rendered
            const currentCardElement = flashcardDisplay.querySelector('.flashcard');
            if (currentCardElement) { // Ensure element exists before adding listener
                currentCardElement.addEventListener('click', flipFlashcard);
            }

            loadFlashcardBtn.style.display = 'none';
            revealFlashcardBtn.style.display = 'inline-block';
            nextFlashcardBtn.style.display = 'none'; // Hide next until revealed
        }
    }

    function flipFlashcard() {
        const cardElement = flashcardDisplay.querySelector('.flashcard');
        if (cardElement) {
            cardElement.classList.toggle('flipped');
            revealFlashcardBtn.style.display = 'none'; // Hide reveal once flipped
            nextFlashcardBtn.style.display = 'inline-block'; // Show next after flip
        }
    }

    if (loadFlashcardBtn) {
        loadFlashcardBtn.addEventListener('click', displayFlashcard);
    }
    if (revealFlashcardBtn) {
        revealFlashcardBtn.addEventListener('click', flipFlashcard);
    }
    if (nextFlashcardBtn) {
        nextFlashcardBtn.addEventListener('click', () => {
            currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcardData.length; // Loop through flashcards
            displayFlashcard();
        });
    }

});