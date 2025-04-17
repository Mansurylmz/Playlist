const play=document.querySelector(".bi-play-circle-fill")
const next=document.querySelector(".bi-skip-end-fill")
const back=document.querySelector(".bi-skip-start-fill")
const pause=document.querySelector(".bi-pause-circle-fill")
const audio=document.querySelector("#audio")
const current=document.querySelector("#current-time")
const max=document.querySelector("#max-duration")
const progress=document.querySelector("#progress-bar")
const down=document.querySelector(".bi-chevron-down")
const singlist=document.querySelector(".sing-list")
const backlist=document.querySelector(".bi-x-lg")
const singSong=document.querySelector(".sing-song")
const singName=document.querySelector(".single-name")
const img=document.querySelector(".img")
const shuffle=document.querySelector(".bi-shuffle")
const currentProgress=document.querySelector("#current-progress")
const ul=document.querySelector("#playlist-songs")



let index


const songsList = [
    {
        name: "Gelo Ew Ki Bu",
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]
//sarkı suresını hesaplama
const time=(timed)=>{
    let minute= Math.floor(timed / 60)
    let yuvarlam=minute.toFixed(0)
    let second=timed%60
    let yuvarlas=second.toFixed(0)
    if(yuvarlas<10){
        return `${yuvarlam}:0${yuvarlas}`
    }
    else{
        return `${yuvarlam}:${yuvarlas}`
    }
    
}
//sarkı atama
const selectsong=(arrayIndex)=>{
    let{name,link,artist,image}=songsList[arrayIndex]
    audio.src=link
    singSong.innerHTML=name
    singName.innerHTML=artist
    img.src=image
    
    
    audio.addEventListener("loadedmetadata", ()=> {
        max.textContent=time(audio.duration)
        
    });
    
}

const playAudio=()=>{
    audio.play()
    play.classList.add("hide")
    pause.classList.remove("hide")
}
const pauseAudio=()=>{
    audio.pause()
    pause.classList.add("hide")
    play.classList.remove("hide")
}
const nextSong=()=>{
    if(shuffle.classList.contains("blue")){
        let random=Math.floor(Math.random()*(songsList.length))
        selectsong(random)
        pauseAudio()
    }
    else{
        if(index==songsList.length-1){
            index=0
        }
        else{
            index+=1
        }
        selectsong(index)
        pauseAudio()
    }
}
const backSong=()=>{
    if(index==0){
        index=songsList.length-1
    }
    else{
        index-=1
    }
    selectsong(index)
    pauseAudio()
}

audio.onended = () =>{
    pauseAudio()
}

play.addEventListener("click",playAudio)
pause.addEventListener("click",pauseAudio)
down.addEventListener("click",()=>{
    singlist.classList.remove("hide")
})
backlist.addEventListener("click",()=>{
    singlist.classList.add("hide")
   
})
next.addEventListener("click",nextSong)
back.addEventListener("click",backSong)

shuffle.addEventListener("click",()=>{
    console.log(shuffle)
    shuffle.classList.toggle("blue")
    
})
progress.addEventListener("click",(e)=>{
    let coordStart = progress.getBoundingClientRect().left
    

    let coordEnd = e.clientX
   
    let progressBarr = (coordEnd - coordStart) / progress.offsetWidth

    currentProgress.style.width = progressBarr * 100 + "%"
    
    
    
 
    audio.play()
    play.classList.add("hide")
    pause.classList.remove("hide")
})
//progresbarın genişliği
setInterval(() => {
    current.innerHTML = time(audio.currentTime) 
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))*100 + "%"
}, 1000);

//icona tıklanıldıgında sarkı listesinin gorunmesi
const singBiring=()=>{
    songsList.forEach((item)=>{
        let img=document.createElement("img")
        let p=document.createElement("p")
        let li=document.createElement("li")
        let p2=document.createElement("p")
        img.src=item.image
        img.style.width="70px"
        img.style.height="80px"
        p.innerText=item.name
        p2.innerText=item.artist
        li.appendChild(img)
        li.appendChild(p2)
        li.appendChild(p)
        li.style.display="flex"
        li.style.alignItems="center"
        li.style.justifyContent="space-around"
        console.log(li)
        ul.appendChild(li)

    })
}

window.onload=()=>{
    index=0
    selectsong(index)
    singBiring()
}





