import { ref, firebaseAuth } from './firebase'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export function updateUser (displayName: string, photoURL: string) {
  const user = firebaseAuth().currentUser;

  user.updateProfile({
    displayName,
    photoURL
  }).then(function() {
    // Update successful.
    console.log('Profile updated.')
  }, function(error) {
    // An error happened.
    console.log('Error when updateding profile.')
  });
}

export function updateEmail (email: string) {
  const user = firebaseAuth().currentUser;

  user.updateEmail(email).then(function() {
    // Update successful.
    console.log('Email updated.')
  }, function(error) {
    // An error happened.
    console.log('Error when updateding user email.')
  });
}