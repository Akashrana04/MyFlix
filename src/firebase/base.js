import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyASlwdMtYjdbNmeEWz8d8hXUjji0-dEmns",
  authDomain: "silver-screen-76c12.firebaseapp.com",
  databaseURL: "https://silver-screen-76c12.firebaseio.com",
  projectId: "silver-screen-76c12",
  storageBucket: "silver-screen-76c12.appspot.com",
  messagingSenderId: "838006733275",
  appId: "1:838006733275:web:494b9caa2abb4ed5dc8ffe",
  measurementId: "G-SC0ZGR854L",
};

//https://raw.githubusercontent.com/Azazel5/NetflixClone/master/src/assets/images/landingPage.jpg

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  dbreturns() {
    return this.db;
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  addMovie(emailId, movie) {
    const data = {
      emailId,
      movie,
      uid: new Date().getTime(),
    };

    this.db
      .collection("users")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        alert("Sucess : New Movie Added to Your List");
      });
  }

  addSeries(emailId, series) {
    const data = {
      emailId,
      series,
      uid: new Date().getTime(),
    };

    this.db
      .collection("userseries")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        alert("Sucess : New Series Added to Your List");
      });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.email;
  }
}

export default new Firebase();
