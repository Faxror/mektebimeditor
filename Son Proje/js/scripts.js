


function runPythonCode() {
  var code = document.getElementById('code-editor').value;
  var output = document.getElementById('output');
  var mycanvas = document.getElementById('mycanvas');
  var loadingSpinner = document.getElementById('loading-spinner');
  var spinnerDuration = 3000; // Spinner'ın gösterileceği süre, örneğin 3000 milisaniye = 3 saniye
  var timeoutDuration = 5000; // Örneğin, 5000 milisaniye = 5 saniye

  loadingSpinner.style.display = 'block'; // Show the spinner
  output.innerHTML = ''; // Clear the output area

  Sk.pre = "output";
  Sk.configure({ output: outf, read: builtinRead });

  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {}) || (sk.color = 'white') ).target = 'mycanvas';


  

  
  // Beyaz bir dikdörtgen çizerek canvas'ın arka plan rengini beyaz yapma
 
 
  

  // Spinner'ın gösterilmesi
  setTimeout(function() {
    loadingSpinner.style.display = 'none'; // Hide the spinner after the specified duration
    //output.innerHTML = ''; // Clear the output area
    code.innerHTML = '';
    var executionPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code, true);
    });

    // Zaman aşımını ayarlayan fonksiyon
    var timeoutPromise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject('Execution timed out'); // Zaman aşımı durumunda reject ile hata fırlatılır
      }, timeoutDuration - spinnerDuration); // Spinner süresi kadar azaltarak timeout'u ayarla
    });

    // Yürütme ve zaman aşımı sözleşmesini birleştirme
    Promise.race([executionPromise, timeoutPromise])
      .then(function(mod) {
        console.log('Success');
        code.innerHTML = '';
      })
      .catch(function(err) {
        console.error('Error:', err.toString()); // Display errors in the console
      });
  }, spinnerDuration);
}

function outf(text) { 
  var mypre = document.getElementById("output"); 
  mypre.innerHTML = mypre.innerHTML + text; 
} 
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
          throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}


const correctAnswers = [
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  "print('ssas')",
  // Diğer soruların doğru cevapları
];

let currentQuestion = 0;


document.getElementById("code-editor").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkAnswer();
    debugger; // bu satıra bir konsol logu ekleyerek de kontrol yapabilirsiniz
    if (currentQuestion < correctAnswers.length + 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        alert("Tebrikler! Tüm soruları tamamladınız.");
    }
}

});
function checkAnswer() {
  const userAnswer = document.getElementById("code-editor").value.trim();
  var output = document.getElementById('output');
  var spinnerDuration = 3000;
  console.log("Kullanıcının Cevabı:", userAnswer);
  userAnswer.value = '';
  const correctAnswersForCurrentQuestion = [
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    "print('ssas')",
    // Diğer doğru cevaplar
  ];
  var isWrongAnswer = false; 
   // Kullanıcının cevabının doğru cevaplardan biriyle eşleşip eşleşmediğini kontrol et
   if (correctAnswersForCurrentQuestion.includes(userAnswer)) {
    console.log("Doğru Cevap");
  } else {
    output.innerHTML  = "Opsss, sanırım bir hata yaptın.";
    console.log("Doğru Cevap değil");

    // Eğer kullanıcı hatalı cevap verdiyse, flag'i ayarla
    isWrongAnswer = true;
  }

  runPythonCode();

   // Doğru veya yanlış cevaba bakılmaksızın işlemleri gerçekleştir
  setTimeout(function () {
    // Flag kontrolü ekleyerek, eğer hatalı cevap verilmişse işlemleri gerçekleştirme
    if (!isWrongAnswer) {
      if (currentQuestion < correctAnswersForCurrentQuestion.length) {
        currentQuestion++;
        showQuestion(currentQuestion);
      } else {
        alert("Tebrikler! Tüm soruları tamamladınız.");
      }
    }

    // Flag'i sıfırla
    isWrongAnswer = false;
  }, spinnerDuration);
}


function showQuestion(questionIndex) {
  document.querySelectorAll(".question").forEach((question) => {
    question.classList.remove("active");
  });

  const currentQuestionElement = document.getElementById(`question${questionIndex}`);
  currentQuestionElement.classList.add("active");

  document.getElementById("progress-text").textContent = `${questionIndex }/10`;

  document.getElementById("code-editor").value = "";

  // Output temizlenmiyor ve runPythonCode'u çağırma
 
}



// Diğer fonksiyonlar aynı kalır


function updateProgressText() {
  const progressText = document.getElementById('progress-text');
  progressText.textContent = `${currentQuestion}/10`; // Güncellenmiş ilerleme metni
}

function prevQuestion() {
  if (currentQuestion > 1) {
    currentQuestion--;
    showQuestion(currentQuestion);
    updateProgressText();
  }
}

function nextQuestion() {
  if (currentQuestion < 10) {
    currentQuestion++;
    showQuestion(currentQuestion);
    updateProgressText();
  }
}




document.getElementById('code-editor').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Prevent default behavior of Enter key
    //runPythonCode(); // Call the runPythonCode function when Enter is pressed
    console.log("çalıştım");
  }
});


document.getElementById('code-editor').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Enter tuşunun varsayılan davranışını engelle
    //runPythonCode(); // Python kodunu çalıştıran fonksiyon
  }
});

window.onload = function() {
  var loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.style.display = 'none'; // Hide the spinner when the page loads
};

// Remove redundant event listener
// This was causing an issue where runPythonCode is triggered after the 10th question
// without checking for Enter key press

document.getElementById('code-editor').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    this.style.overflowY = 'auto';
    if (!event.shiftKey) {
      event.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
      this.value = this.value.substring(0, start) + "\n" + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 1;
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
      var popup = document.getElementById('popup');
      popup.style.display = 'block';

      function closePopup() {
        popup.style.display = 'none';
      }
    });
	
	function closePopup() {
      var popup = document.getElementById('popup');
      popup.style.display = 'none';
    }
	
	function clearCodeEditor() {
    document.getElementById('code-editor').value = 'sa'; // textarea içeriğini temizle
}

