const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_APP"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let isAdmin = false;

// ENTER
function enter(){
  document.querySelector(".hero").style.display="none";
  document.getElementById("app").style.display="block";
  load();
}

// ADMIN PASSWORD
function adminLogin(pass){
  if(pass === "ACDB-V7-ADMIN"){
    isAdmin = true;
    document.getElementById("adminBtn").style.display="block";
  }
}

// VIEW
function view(id){
  document.querySelectorAll("section").forEach(s=>s.style.display="none");
  document.getElementById(id).style.display="block";
}

// ADD SONG
function addSong(){
  if(!isAdmin) return;

  db.collection("songs").add({
    title:title.value,
    link:link.value
  });
}

// ADD NEWS
function addNews(){
  db.collection("news").add({
    text:news.value
  });
}

// ADD ARTIST
function addArtist(){
  db.collection("artists").add({
    name:artist.value
  });
}

// LOAD
function load(){

  db.collection("songs").onSnapshot(snap=>{
    let html="";
    snap.forEach(doc=>{
      let d=doc.data();

      html += `<div onclick="play('${d.link}')">🎵 ${d.title}</div>`;
    });

    songs.innerHTML=html;
  });

  db.collection("artists").onSnapshot(snap=>{
    let html="";
    snap.forEach(doc=>{
      html += `<div>🎤 ${doc.data().name}</div>`;
    });

    artistList.innerHTML=html;
  });
}

// PLAYER
function play(url){
  audioPlayer.src=url;
  audioPlayer.play();
    }
