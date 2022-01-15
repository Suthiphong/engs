document.addEventListener("DOMContentLoaded", function() {
    var speech = new SpeechSynthesisUtterance();
    var questionList = [{
        sen_english: "Hello. I'm verry well. Thank you. And you?",
        sen_thai: "Hello. How are you?"
    },{
        sen_english: "My name is Suthiphong Thaisuriya. I'm 25 and I'm Single. I graduated with a Bachelor's Degree in Electrical Power Engineering from Mahanakorn University of Technology in 2022. I am hard-working and target-driven.",
        sen_thai: "Can you tell me a little about your self?"
    }, {
        sen_english: "My major subject study is Electrical Power Engineering.",
        sen_thai: "What is your major subject study?"
    }, {
        sen_english: "I chose to study it because I'm interested in calculation.",
        sen_thai: "Why did you choose to study this major?"
    },{
        sen_english: "It taught me the basic of circuit design and it also taught me how to write a programmable logic control.",
        sen_thai: "How has your education helped with your work?"
    },{
        sen_english: "Yes, I can. I have work as Data Operator Officer at BSA Company. My responsibility were developing applications and designing custom REST APIs Built in PHP and Nodejs for 3 years.",
        sen_thai: "Can you tell me about your previous job experience?"
    },{
        sen_english:"I am a self-confident and a helpful person.",
        sen_thai:"How would you describe your personality?"
    },{
        sen_english: "My greatest strength is that I am fluant in coding.",
        sen_thai:"What is your greatest strength?"
    },{
        sen_english: "My biggest weakness would be that I am not good at English, But I plant to practice more.",
        sen_thai: "What is your biggest weakness?"
    },{
        sen_english: "I am good at multitasking.",
        sen_thai:"Do you have any special skills?"
    },{
        sen_english: "Because I have the experience and I assure you that I well give my best for the job.",
        sen_thai: "Why should we hire you?"
    },{
        sen_english:"I plan to improve myself, and shift from Data Operator Officer to Project Manager.",
        sen_thai: "What's your future plan?"
    },{
        sen_english:"Well, my expectation is in the range of 30,000 to 40,000 baht",
        sen_thai:"What salary are you expecting?"
    }]
    //var questionList = []

    var el_thai = document.getElementById("sen_thai")
    var score = [0,0] 
    var index = 0
    var buttonSend = document.getElementById("btn_Send")
    var buttonSound = document.getElementById("btn_Sound")
    var buttonSoundAns = document.getElementById("btn_SoundAns")
    var score_c = document.getElementById("score_correct")
    var score_w = document.getElementById("score_wrong")

    buttonSound.addEventListener("click", function() {
        sound_speech(questionList[index].sen_english)
    })

    buttonSoundAns.addEventListener("click", function() {
        sound_speech(questionList[index].sen_thai)

    })


    buttonSend.addEventListener("click", function () {
        var getAnswer = document.getElementById("answer").value
        console.log('check value of ', index)
        if(getAnswer == questionList[index].sen_english){
            score[0] = score[0] + 1
        }else {
            score[1] = score[1] + 1
        }
        score_c.textContent = score[0]
        score_w.textContent = score[1]
        if(index != questionList.length){
            index = index + 1
        }
        sound_speech(questionList[index].sen_thai)
        renderQuestion()
    })
    function sound_speech(text="null") {
        speech.lang = "en";
        speech.text = text
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 10;                
        console.log(text)

        window.speechSynthesis.speak(speech);
    }
    function fetchAll() {
        return new Promise((resolve, reject)=> {
            fetch('http://localhost/toeic/getData.php')
            .then(data => data.json())
            .then(js => resolve(js))
        })
    }

     function renderQuestion() {
        document.getElementById("answer").value = ""
        if(index < questionList.length) {
            el_thai.textContent =  questionList[index].sen_thai
        }else{
            end()
        }
    }
    function end() {
        buttonSend.setAttribute("disabled", true)
        document.getElementById("answer").style.display = "none"
        buttonSound.style.display = "none"
        el_thai.textContent =  "End"
    }

    async function main() {
        //var result = await fetchAll()
        //questionList = result
        //console.log(questionList)
        renderQuestion()
        sound_speech(questionList[index].sen_thai)
    }
    main()
})