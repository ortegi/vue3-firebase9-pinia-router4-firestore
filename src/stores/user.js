import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'
import { ref, computed, onActivated } from 'vue'
import { auth } from '../firebaseConfig'
import {useRouter} from 'vue-router'
export const useUserStore = defineStore('user', ()=>{

    const router = useRouter()

    const userData = ref(null)

    const loadingUser = ref(false) 
    const loadingSession = ref(false)

    const  register = async (email, password) =>{
        loadingUser.value = true
        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
           userData.value  = {email: user.email, uid: user.uid}
           router.push('/')
        }catch(error){
            console.log(error)
        }finally{
            loadingUser.value = false
        }
    }

    const loginUser = async (email, password) =>{
        loadingUser.value = true
        try{
           const {user} = await signInWithEmailAndPassword(auth, email, password)
           userData.value  = {email: user.email, uid: user.uid}
           router.push('/')
        }catch(error){
            console.log(error)
        }finally{
            loadingUser.value = false
        }
    }

    const logOutUser = async () =>{
        try{
            await signOut(auth)
            userData.value = null
            router.push('/login')
        }catch(error){
            console.log(error)
        }
    }

    const currentUser = () =>{
        return new Promise( (resolve, reject)=>{
           const unsubscribe =  onAuthStateChanged(auth, (user) =>{
                if(user){
                    userData.value  = {email: user.email, uid: user.uid}
                }else{
                    userData.value = null
                }
                resolve(user)
            }, e => reject(e))
            unsubscribe()
        })
    }


    return{
        userData, 
        register, 
        loginUser,
        logOutUser,
        loadingUser,
        currentUser,
        loadingSession
       
    }
})


