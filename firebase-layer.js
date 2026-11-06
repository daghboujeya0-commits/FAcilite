// Couche Firebase : connexion Google + Firestore
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {getFirestore,doc,getDoc,setDoc,deleteDoc,onSnapshot,collection,query,where,writeBatch} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import {firebaseConfig,CHEF_EMAIL} from './firebase-config.js';
const ok=!String(firebaseConfig.apiKey).startsWith('COLLEZ');
let auth,db;
if(ok){const app=initializeApp(firebaseConfig);auth=getAuth(app);db=getFirestore(app)}
const err=e=>{console.error(e);window.toast('Erreur : '+(e.code||e.message))};
window.FB={chef:(CHEF_EMAIL||'').toLowerCase(),
 signIn:()=>ok?signInWithPopup(auth,new GoogleAuthProvider()).catch(err):window.toast('Renseignez d’abord firebase-config.js'),
 signOut:()=>ok?signOut(auth):Promise.resolve(),
 onUser:cb=>ok&&onAuthStateChanged(auth,cb),
 get:async(c,i)=>{const d=await getDoc(doc(db,c,i));return d.exists()?d.data():null},
 set:(c,i,d,m)=>setDoc(doc(db,c,i),d,{merge:!!m}).catch(err),
 del:(c,i)=>deleteDoc(doc(db,c,i)).catch(err),
 delMany:l=>{const b=writeBatch(db);l.forEach(([c,i])=>b.delete(doc(db,c,i)));return b.commit().catch(err)},
 watch:(c,f,cb)=>onSnapshot(f?query(collection(db,c),where(...f)):collection(db,c),s=>cb(s.docs.map(d=>({...d.data(),_id:d.id}))),err)};
window.dispatchEvent(new Event('fbready'));
