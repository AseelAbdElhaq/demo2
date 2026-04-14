document.addEventListener("DOMContentLoaded", function () {
    const changeTextButton = document.getElementById("changeTextButton");
    const paragHome = document.getElementById("paragHome");

    if (changeTextButton && paragHome) {
        const originalText = paragHome.innerHTML;
        const newText = "Spring Boot helps developers build applications faster and more easily with very little configuration.";
        let isChanged = localStorage.getItem("textChanged") === "true";

        function updateHomeText() {
            paragHome.classList.add("fade-out");

            setTimeout(function () {
                if (isChanged) {
                    paragHome.innerHTML = newText;
                    changeTextButton.textContent = "Back to Original";
                } else {
                    paragHome.innerHTML = originalText;
                    changeTextButton.textContent = "Change Overview Text";
                }

                paragHome.classList.remove("fade-out");
                localStorage.setItem("textChanged", isChanged);
            }, 250);
        }

        if (isChanged) {
            paragHome.innerHTML = newText;
            changeTextButton.textContent = "Back to Original";
        }

        changeTextButton.addEventListener("click", function () {
            isChanged = !isChanged;
            updateHomeText();
        });
    }

    const formCore = document.getElementById("formCore");
    const resultCore = document.getElementById("resultCore");

    if (formCore && resultCore) {
        formCore.addEventListener("submit", function (e) {
            e.preventDefault();

            const selectedAnswer = document.querySelector('input[name="ioc"]:checked');

            resultCore.classList.remove("success-message", "error-message", "warning-message", "show-message");

            if (!selectedAnswer) {
                resultCore.textContent = "Please select an answer first.";
                resultCore.classList.add("warning-message");
            } else if (selectedAnswer.value === "correct") {
                resultCore.textContent = "Correct! IoC stands for Inversion of Control.";
                resultCore.classList.add("success-message");
            } else {
                resultCore.textContent = "Wrong answer. Try again.";
                resultCore.classList.add("error-message");
            }

            setTimeout(function () {
                resultCore.classList.add("show-message");
            }, 10);
        });
    }

    const videoHome = document.getElementById("videoHome");

    if (videoHome) {
        videoHome.addEventListener("play", function () {
            console.log("Video started playing.");
        });
    }

    const titleHome = document.getElementById("titleHome");

    if (titleHome) {
        titleHome.addEventListener("mouseover", function () {
            titleHome.classList.add("title-hover");
        });

        titleHome.addEventListener("mouseout", function () {
            titleHome.classList.remove("title-hover");
        });
    }

    const quizForm = document.getElementById("quizForm");
    const quizResult = document.getElementById("quizResult");
    const resetQuizButton = document.getElementById("resetQuizButton");

    if (quizForm && quizResult && resetQuizButton) {
        quizForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const answers = {
                q1: "b",
                q2: "c",
                q3: "b",
                q4: "a",
                q5: "c"
            };

            let score = 0;
            let totalQuestions = Object.keys(answers).length;

            quizResult.classList.remove("quiz-success", "quiz-medium", "quiz-low", "show-quiz-result");

            for (let key in answers) {
                const selected = document.querySelector(`input[name="${key}"]:checked`);

                if (!selected) {
                    quizResult.textContent = "Please answer all questions before submitting the quiz.";
                    quizResult.classList.add("quiz-low");

                    setTimeout(function () {
                        quizResult.classList.add("show-quiz-result");
                    }, 10);

                    return;
                }

                if (selected.value === answers[key]) {
                    score++;
                }
            }

            if (score === totalQuestions) {
                quizResult.innerHTML = `Excellent! Your score is ${score} / ${totalQuestions}. You got all answers correct.`;
                quizResult.classList.add("quiz-success");
            } else if (score >= 3) {
                quizResult.innerHTML = `Good job! Your score is ${score} / ${totalQuestions}. Keep reviewing Spring concepts.`;
                quizResult.classList.add("quiz-medium");
            } else {
                quizResult.innerHTML = `Your score is ${score} / ${totalQuestions}. Try again and review the lessons.`;
                quizResult.classList.add("quiz-low");
            }

            setTimeout(function () {
                quizResult.classList.add("show-quiz-result");
            }, 10);
        });

        resetQuizButton.addEventListener("click", function () {
            quizForm.reset();
            quizResult.textContent = "";
            quizResult.classList.remove("quiz-success", "quiz-medium", "quiz-low", "show-quiz-result");
        });
    }
});