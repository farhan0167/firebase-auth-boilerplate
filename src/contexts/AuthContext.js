import React, {useContext, useState, useEffect} from 'react'
import {auth, db} from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, name,type){
    return auth.createUserWithEmailAndPassword(email, password).then(cred =>{
      cred.user.updateProfile({
        displayName: name
      });
      db.collection('users').doc(cred.user.uid).set({
        bio: "Please add a bio.",
        age: "Please add your age",
        accountType: type
      })
      console.log(cred)
    })
  }
  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logout(){
    return auth.signOut()
  }

  function updateProfileInfo(bio, age){
    var user = auth.currentUser;
      if (user) {
        db.collection('users').doc(user.uid).update({
          bio: bio,
          age: age
        })
      } else {
        console.log("No user exists")
      }
    return user
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfileInfo
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
