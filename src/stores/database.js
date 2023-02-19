import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../firebaseConfig'
import { auth } from '../firebaseConfig'
import { nanoid } from 'nanoid'
import { async } from '@firebase/util'
import { useRouter} from 'vue-router'

export const useDatabaseStore = defineStore('dataBase', ()=>{
    const router = useRouter()
    const documents = ref([]);
    const loadingDoc = ref(false)

    const getUrls = async () =>{
        if(documents.value.length !== 0){
            return 
        }
        loadingDoc.value = true
        try{
            const q = query(collection(db, 'urls'), where("user", "==", auth.currentUser.uid)
            )
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                console.log(doc.id, doc.data());
                documents.value.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
               
        }catch(error){
            console.log(error)
        }finally{
            loadingDoc.value = false
        }
    }

    const $reset = () =>{
        documents.value = []
    }

    const addUrl = async(name) =>{
        try{

            const objectoDoc = {
                name: name,
                short : nanoid(6),
                user: auth.currentUser.uid
            }
            const docRef = await addDoc(collection(db, 'urls'), objectoDoc)
            documents.value.push({
                ...objectoDoc,
                id: docRef.id
            })
        }catch(error){
            console.log(error)
        }finally{
            
        }
    }

    const leerUrl = async (id) =>{
        try{
            const docRef = doc(db, "urls", id);
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()){
                throw new Error('no existe el doc')
            }
            
            if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error('no le pertence ese documento')
            }

            return  docSnap.data().name
        }catch(error){
            console.log(error.message)
        }finally{

        }
    }

    const updateUrl = async (id, name) =>{
        try{
            const docRef = doc(db, "urls", id)
            const docSnap = await getDoc(docRef)
            if(!docSnap.exists()){
                throw new Error('no existe el doc')
            }
            
            if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error('no le pertence ese documento')
            }

            await updateDoc(docRef, {
                name: name
            })

            documents.value = documents.value.map(item => item.id === id ? ({item, name: name}) : item)
            router.push('/')
        }catch(error){
            console.log(error)
        }
    }

    const deleteUrl = async(id) =>{
        try{    
            const docRef = doc(db, "urls", id)
            const docSnap = await getDoc(docRef)
            if(!docSnap.exists()){
                throw new Error('no existe el doc')
            }
            
            if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error('no le pertence ese documento')
            }
            await deleteDoc(docRef)
            documents.value = documents.value.filter(item => item.id !== id)
        }catch(error){
            console.log(error.message)
        }finally{

        }
    }

    return{
        documents,
        getUrls,
        loadingDoc,
        $reset,
        addUrl,
        deleteUrl,
        leerUrl,
        updateUrl
    }
})