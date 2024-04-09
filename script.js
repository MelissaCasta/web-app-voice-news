// Esperar a que el contenido del DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencia a los elementos del DOM
    const startRecognitionButton = document.getElementById("startRecognition");
    const resultOutput = document.getElementById("result");
    const vozElement = document.getElementById("IHC");
    let nuevaVentana; // Variable para almacenar la referencia a la nueva ventana del navegador
  
    // Verificar si el navegador soporta el reconocimiento de voz
    if (!('webkitSpeechRecognition' in window)) {
      // Deshabilitar el botón si el navegador no soporta el reconocimiento de voz
      startRecognitionButton.disabled = true;
      // Mostrar un mensaje de error al usuario
      resultOutput.textContent = "Su navegador no soporta el reconocimiento de voz.";
    } else {
      // Crear una instancia de reconocimiento de voz
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false; // El reconocimiento no es continuo
      recognition.interimResults = false; // No se muestran resultados intermedios
      recognition.lang = "es-ES"; // Establecer el idioma del reconocimiento
  
      // Evento cuando se inicia el reconocimiento de voz
      recognition.onstart = function() {
        startRecognitionButton.textContent = "Escuchando...";
      };
  
      // Evento en caso de error durante el reconocimiento de voz
      recognition.onerror = function(event) {
        startRecognitionButton.textContent = "Comenzar Reconocimiento";
        resultOutput.textContent = "Error durante el reconocimiento: " + event.error;
      };
  
      // Evento cuando finaliza el reconocimiento de voz
      recognition.onend = function() {
        startRecognitionButton.textContent = "Comenzar Reconocimiento";
      };
  
      // Evento cuando se obtienen resultados del reconocimiento de voz
      recognition.onresult = function(event) {
        // Obtener el texto reconocido
        const result = event.results[0][0].transcript;
        resultOutput.textContent = "La orden identificada es: " + result;
  
        // Enviar el resultado del reconocimiento a una API mock
        const comando = {
          comando: result
        };
  
        fetch('https://6614d0222fc47b4cf27d170b.mockapi.io/comandos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comando)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
  
        // Procesar diferentes comandos según el texto reconocido
        if (result.includes("aumentar tamaño")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize + 5) + "px";
          console.log("Tamaño aumentado.");
        } else if (result.includes("disminuir tamaño")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize - 5) + "px";
          console.log("Tamaño disminuido.");
        } else if (result.includes("nueva ventana")) {
          nuevaVentana = window.open("https://online.kadasofsolutions.com/my/courses.php", "_blank");
          console.log("Nueva ventana abierta.");
        } else if (result.includes("cerrar ventana")) {
          nuevaVentana && nuevaVentana.close();
          console.log("Ventana cerrada.");
        } else if (result.includes("cerrar navegador")) {
          window.close();
          console.log("Navegador cerrado.");
        } else if (result.includes("aumentar tamaño IHC")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize + 5) + "px";
          console.log("Tamaño de IHC aumentado.");
        } else if (result.includes("disminuir tamaño IHC")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize - 5) + "px";
          console.log("Tamaño de IHC disminuido.");
        }
      };
  
      // Evento clic para iniciar el reconocimiento de voz
      startRecognitionButton.addEventListener("click", function () {
        recognition.start();
      });
    }
  });
  