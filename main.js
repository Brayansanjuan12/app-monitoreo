
document.addEventListener("DOMContentLoaded", () => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    let audio;
    let audioEnabled = false;

    function enviarOrdenAMockAPI(orden, usuario, fechaHora) {
        const url = `https://662c6b2f0547cdcde9de4777.mockapi.io/Voz`;

        const data = {
            "Orden": orden,
            "Usuario": usuario,
            "Fecha-Hora": fechaHora
        };

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al enviar orden al MOCKAPI');
                }
            })
            .catch(error => {
                console.error('Error al enviar orden al MOCKAPI:', error);
                throw error;
            });
    }

    function obtenerFechaHoraActual() {
        const ahora = new Date();
        const options = { timeZone: 'America/Mexico_City' };
        const formatter = new Intl.DateTimeFormat('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: options.timeZone
        });
        const fechaHora = formatter.format(ahora);
        return fechaHora.replace(/\//g, '-').replace(',', '');
    }

    function actualizarUltimaOrdenYEnviarMockAPI(mensaje, orden, usuario) {
        const mensajeCompleto = `${usuario} ${mensaje}`;
        actualizarUltimaOrden(mensajeCompleto);
        enviarOrdenAMockAPI(orden, usuario, obtenerFechaHoraActual());
    }

    function actualizarUltimaOrden(mensaje) {
        document.getElementById('inputUltimaOrden').value = mensaje;
    }

    function initializeRecognition() {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.interimResults = true;

        recognition.addEventListener("result", (e) => {
            const text = Array.from(e.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");

            if (e.results[0].isFinal) {
                if (text.includes("enciende el foco de la sala")) {
                    const sala = document.getElementById('sala').querySelector('img');
                    sala.src = 'img/foc1-on.png';
                    console.log("Comando 'enciende el foco de la sala' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("enciende el foco de la sala", "Brian enciende el foco de la sala", "Brian");
                } else if (text.includes("apaga el foco de la sala")) {
                    const sala = document.getElementById('sala').querySelector('img');
                    sala.src = 'img/foc1.png';
                    console.log("Comando 'apaga el foco de la sala' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("apaga el foco de la sala", "Brian apaga el foco de la sala", "Brian");
                } else if (text.includes("apaga el foco de la recámara")) {
                    const recamara = document.getElementById('recamara').querySelector('img');
                    recamara.src = 'img/foc7.png';
                    console.log("Comando 'apaga el foco de la recámara' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("apaga el foco de la recámara", "Brian apaga el foco de la recámara", "Brian");
                } else if (text.includes("enciende el foco de la recámara")) {
                    const recamara = document.getElementById('recamara').querySelector('img');
                    recamara.src = 'img/foc7-on.png';
                    console.log("Comando 'enciende el foco de la recámara' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("enciende el foco de la recámara", "Brian enciende el foco de la recámara", "Brian");
                } else if (text.includes("enciende los focos del jardín")) {
                    const focosJardin = document.querySelectorAll('#jardin img');
                    focosJardin.forEach(foco => {
                        foco.src = 'img/focjar-on.png';
                    });
                    console.log("Comando 'enciende los focos del jardín' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("enciende los focos del jardín", "Brian enciende los focos del jardín", "Brian");
                } else if (text.includes("apaga los focos del jardín")) {
                    const focosJardin = document.querySelectorAll('#jardin img');
                    focosJardin.forEach(foco => {
                        foco.src = 'img/foc5.png';
                    });
                    console.log("Comando 'apaga los focos del jardín' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("apaga los focos del jardín", "Brian apaga los focos del jardín", "Brian");
                } else if (text.includes("abre las cortinas")) {
                    const cortinas = document.querySelectorAll('.card[id="corinas"] img');
                    cortinas.forEach(cortina => {
                        cortina.src = 'img/curtains1.png';
                    });
                    console.log("Comando 'abre las cortinas' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("abre las cortinas", "Brian abre las cortinas", "Brian");
                } else if (text.includes("cierra las cortinas")) {
                    const cortinas = document.querySelectorAll('.card[id="corinas"] img');
                    cortinas.forEach(cortina => {
                        cortina.src = 'img/curtains.png';
                    });
                    console.log("Comando 'cierra las cortinas' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("cierra las cortinas", "Brian cierra las cortinas", "Brian");
                } else if (text.includes("enciende las cámaras de seguridad")) {
                    const camarasSeguridad = document.querySelectorAll('.card[id="camara"] img');
                    camarasSeguridad.forEach(camara => {
                        camara.src = 'img/camara33.png';
                    });
                    console.log("Comando 'enciende las cámaras de seguridad' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("enciende las cámaras de seguridad", "Brian enciende las cámaras de seguridad", "Brian");
                } else if (text.includes("apaga las cámaras de seguridad")) {
                    const camarasSeguridad = document.querySelectorAll('.card[id="camara"] img');
                    camarasSeguridad.forEach(camara => {
                        camara.src = 'img/camara34.png';
                    });
                    console.log("Comando 'apaga las cámaras de seguridad' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("apaga las cámaras de seguridad", "Brian apaga las cámaras de seguridad", "Brian");
                } else if (text.includes("activa la alarma de la casa")) {
                    const alarma = document.getElementById('alarma').querySelector('img');
                    alarma.src = 'img/alarm.png';
                    console.log("Comando 'activa la alarma de la casa' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("activa la alarma de la casa", "Brian activa la alarma de la casa", "Brian");
                    audio = new Audio('alarma.mp3');
                    audio.play();
                } else if (text.includes("apaga la alarma de la casa")) {
                    const alarma = document.getElementById('alarma').querySelector('img');
                    alarma.src = 'img/alarm1.png';
                    console.log("Comando 'apaga la alarma de la casa' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("apaga la alarma de la casa", "Brian apaga la alarma de la casa", "Brian");
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                } else if (text.includes("enciende el ventilador")) {
                    const ventilador = document.getElementById('ventilador');
                    ventilador.querySelector('img').src = 'img/ventilador-on.png';
                    ventilador.classList.add('encendido');
                    console.log("Comando 'enciende el ventilador' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("enciende el ventilador", "Brian enciende el ventilador", "Brian");
                } else if (text.includes("apaga el ventilador")) {
                    const ventilador = document.getElementById('ventilador');
                    ventilador.querySelector('img').src = 'img/ventilador-off.png';
                    ventilador.classList.remove('encendido');
                    console.log("Comando 'apaga el ventilador' ejecutado correctamente.");
                    actualizarUltimaOrdenYEnviarMockAPI("apaga el ventilador", "Brian apaga el ventilador", "Brian");
                }
            }
        });
    }

    function startRecognition() {
        if (!recognition) {
            initializeRecognition();
        }
        recognition.start();
    }

    function stopRecognition() {
        if (recognition) {
            recognition.stop();
        }
    }

    document.body.addEventListener("click", () => {
        audioEnabled = true;
        startRecognition();
    });

    startRecognition();
});

