let index=0;
let songName = document.querySelector("#song-name")
let songArtist = document.querySelector("#song-artist")
let songImage = document.querySelector(".song-img")
let playPauseImage = document.querySelector("#play-pause")
let volumeRange = document.querySelector("#volume-range")
let songRange = document.querySelector("#song-duration")
let playlistImg =  document.querySelector("#playlist-img")
let playlist =  document.querySelector(".playlist")
let playlistSong =  document.querySelectorAll(".playlist-song")
let volSvg = document.querySelector("#vol-svg")
let isPlaying = false;
let track = document.createElement("audio")
let songs = [
    {
        name: "Dil Leke",
        path:"Dil Leke.mp3",
        image:"DilLeke.jpg",
        singer: "Shaan, Shreya Ghoshal",
         theme: ["#1e97a7", "#203a43", "#2c5364", "#1a0033"]
    },
    {
        name: "Kya Batayein",
        path:"Kya Batayein.mp3",
        image:"KyaBatayein.jpg",
        singer: "Samyak, Abhijeet Ch.",
        theme: ["#2a9d8f", "#264653", "#1b3a4b", "#0b132b"]
    },
    {
        name: "Labon Ko",
        path:"Labon Ko.mp3",
        image:"LabonKo.jpg",
        singer: "KK",
        theme: ["#3a0ca3", "#7209b7", "#560bad", "#240046"]
    },
    {
        name: "Main Hoon Na",
        path:"Main Hoon Na.mp3",
        image:"MainHoonNa.jpg",
        singer: "Sonu Nigam, Shreya Ghoshal",
        theme: ["#d62828", "#9d0208", "#6a040f", "#370617"]
    },
    {
        name: "Pal Pal Dil Ke Paas",
        path:"Pal Pal Dil Ke Paas.mp3",
        image:"PalPalDil.jpg",
        singer: "Kishore Kumar",
        theme: ["#ffd166", "#f4a261", "#e76f51", "#7f5539"]
    },
    {
        name: "Panna Ki Tamanna",
        path:"Panna Ki Tamanna.mp3",
        image:"PannaKiTammna.jpg",
        singer:"Kishore Kumar, Lata Mangeshkar, R.D.Burman",
        theme: ["#6a994e", "#a7c957", "#386641", "#1b4332"]
    },
    {
        name: "Ranjheya Ve",
        path:"Ranjheya Ve.mp3",
        image:"RanjheyaVe.jpg",
        singer:"Zain Zohaib",
        theme: ["#2b9348", "#55a630", "#80b918", "#007f5f"]
    },
    {
        name: "Rishte Naate",
        path:"Rishte Naate.mp3",
        image:"RishteNaate.jpg",
        singer:"Rahat Fateh Ali Khan",
        theme: ["#5f0f40", "#9a031e", "#720026", "#3a0f24"]
    },
    {
        name: "Suno Na Suno Na",
        path:"Suno Na Suno Na.mp3",
        image:"SunoNaSunoNa.jpg",
        singer: "Abhijeet",
        theme: ["#00b4d8", "#0077b6", "#023e8a", "#03045e"]
    },
    {
        name: "Tauba Tumhare Ye Ishaare",
        path:"Tauba Tumhare Ishare.mp3",
        image:"Tauba.jpg",
        singer: "Abhijeet, Alka Yagnik",
        theme: ["#ffafcc", "#ffc8dd", "#ffb3c6", "#fb6f92"]
    }
   
]

function loadTrack(index){
    track.src = songs[index].path
    songName.innerHTML=songs[index].name;
    songArtist.innerHTML=songs[index].singer;
    songImage.style=`background-image: url("${songs[index].image}");`
    volume()
    duration()
    setInterval(()=>{
       songRange.max=track.duration
       songRange.value=track.currentTime
    }, 1000)
     track.currentTime = 0;        
    songRange.value = 0; 
    track.loop=true
    track.currentTime = 0;
    songRange.value = 0;
    track.load()
    applySongTheme(index);
    setActiveSong(index);
}
loadTrack(index)

function playSong(){
    track.play();
    isPlaying = true;
    playPauseImage.src="pauseicon.svg"
}

function pauseSong(){
    track.pause();
    isPlaying = false;
    playPauseImage.src = "playicon.svg";
}

function playPause(){
    if(!isPlaying){
        playSong();
    }else{
        pauseSong();
    }
}

function nextSong(){
    if(index<songs.length-1) {
        index ++;
        loadTrack(index)
        playSong()
    }else{
        index = 0;
        loadTrack(index)
        playSong()
    }
}

function previousSong(){
    if(index>0) {
        index --;
        loadTrack(index)
        playSong()
    }else{
        index = songs.length-1;
        loadTrack(index)
        playSong()
    }
}

function volume(){
    track.volume=volumeRange.value/100;

    if(volumeRange.value==0){
        volSvg.src="mute.svg";
    }
    else{
        volSvg.src="volume.svg";
    }
}

function duration(){
    track.currentTime = songRange.value
}

playlistImg.addEventListener("click",()=>{
    playlist.classList.toggle("playlist-active")
})
playlistSong.forEach((song,index)=>{
    song.addEventListener('click',()=>{
        loadTrack(index);
        playSong()
        playlist.classList.remove("playlist-active")
    })
})

function applySongTheme(index){
    if(!songs[index].theme) return;
    const colors = songs[index].theme;

    document.documentElement.style.setProperty("--g1", colors[0]);
    document.documentElement.style.setProperty("--g2", colors[1]);
    document.documentElement.style.setProperty("--g3", colors[2]);
    document.documentElement.style.setProperty("--g4", colors[3]);

    document.body.classList.add("song-theme");
}
function setActiveSong(activeIndex){
    playlistSong.forEach((song, i) => {
        song.classList.toggle("active", i === activeIndex);
    });
}
