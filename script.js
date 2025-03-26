const video = document.getElementById("camera")
const button = document.getElementById("capturar")
const buttonBW = document.getElementById("capturarBW")
const canva = document.getElementById("foto")
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")
const album = document.getElementById("album")

let mediaStream;
let photoCount = 0;

async function startCamera() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({video: true})
        video.srcObject = mediaStream
    } catch (erro) {
        alert('ERRO AO ABRIR CAMERA')
    }
}

function stopCamera() {
    if (mediaStream) {
        let tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
}

button.addEventListener('click', function() {
    const contexto = canva.getContext('2d')
    canva.width = video.videoWidth;
    canva.height = video.videoHeight
    contexto.drawImage(video, 0, 0, canva.width, canva.height)
    canva.style.display = 'block'
    addPhotoToAlbum(canva);
});

buttonBW.addEventListener('click', function() {
    const contexto = canva.getContext('2d')
    canva.width = video.videoWidth;
    canva.height = video.videoHeight
    contexto.filter = 'grayscale(100%)';
    contexto.drawImage(video, 0, 0, canva.width, canva.height)
    canva.style.display = 'block'
    addPhotoToAlbum(canva);
});

function addPhotoToAlbum(canvas) {
    if (photoCount < 8) {
        const img = new Image();
        img.src = canvas.toDataURL();
        img.alt = 'Foto capturada';
        album.appendChild(img);
        photoCount++;
    } else {
        alert("Álbum cheio! Limite de 8 fotos atingido.");
    }
}

startButton.addEventListener('click', startCamera);
stopButton.addEventListener('click', stopCamera);
