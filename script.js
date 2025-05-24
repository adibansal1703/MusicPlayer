const musicPlayer = document.getElementById("disc")
const slider = document.getElementById("slider")
const musicTiming = document.getElementById("duration")
const previousBtn = document.getElementById("previous")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const audio = document.getElementById("audio")
const musicArray = ["music0.mp3", "music1.mp3", "music2.mp3", "music3.mp3", "music4.mp3", "music5.mp3"]
let musicNum = Math.floor(Math.random() * musicArray.length)

function playMusic() {
    if (audio.paused) {
        audio.src = `music${musicNum}.mp3`
        audio.play()
        musicPlayer.classList.add("onBtn")
        playBtn.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"
    }
    else {
        audio.pause()
        playBtn.innerHTML = "<i class=\"fa-solid fa-play\"></i>"
        musicPlayer.classList.remove("onBtn")
    }
}
playBtn.addEventListener("click", playMusic)
nextBtn.addEventListener("click", playNextMusic)
previousBtn.addEventListener("click", playPreviousMusic)

function playNextMusic() {
    musicNum = (musicNum + 1) % musicArray.length
    audio.src = `music${musicNum}.mp3`
    audio.play()
    musicPlayer.classList.add("onBtn")
    playBtn.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"
}

function playPreviousMusic() {
    musicNum = (musicNum - 1 + musicArray.length) % musicArray.length
    audio.src = `music${musicNum}.mp3`
    audio.play()
    musicPlayer.classList.add("onBtn")
    playBtn.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"
}

audio.ontimeupdate = () =>{
    const current = Math.floor(audio.currentTime)
    const minutes = Math.floor(current/60)
    const seconds = current % 60
    musicTiming.textContent = `${minutes}:${seconds<10?'0'+seconds:seconds}`
    slider.value = current
    slider.max = Math.floor(audio.duration)
}
slider.addEventListener("input",()=>{
    audio.currentTime = slider.value
})
// slider.onloadedmetadata = ()=>{
//     slider.value = Math.floor(audio.duration)
// }
audio.onended = ()=>{
    playNextMusic()
}