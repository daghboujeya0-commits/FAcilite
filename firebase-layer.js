// Couche Firebase : connexion Google + Firestore (affiche clairement la cause en cas d'échec)
const V='10.14.1',URL_=n=>`https://www.gstatic.com/firebasejs/${V}/firebase-${n}.js`;
const note=m=>{console.error(m);const e=document.createElement('div');e.textContent=m;e.style.cssText='position:fixed;left:50%;bottom:60px;transform:translateX(-50%);max-width:92vw;background:#8f689b;color:#fff;padding:12px 18px;z-index:99;font:16px Georgia,serif;cursor:pointer';e.onclick=()=>e.remove();document.body.appendChild(e);setTimeout(()=>e.remove(),12000)};
let ok=false,why='',auth,db,G={},F={},chef='';
try{
  const C=await import('./firebase-config.js').catch(e=>{throw new Error('firebase-config.js est illisible ('+e.message+'). Il doit commencer par : export const firebaseConfig = {')});
  const cfg=C.firebaseConfig||C.default;
  if(!cfg)throw new Error('firebase-config.js : il manque « export const firebaseConfig = { ... } ».');
  if(String(cfg.apiKey).startsWith('COLLEZ'))throw new Error('Renseignez d’abord firebase-config.js avec votre configuration Firebase.');
  chef=(C.CHEF_EMAIL||'').toLowerCase();
  const [A,Au,Fs]=await Promise.all([import(URL_('app')),import(URL_('auth')),import(URL_('firestore'))]);
  const app=A.initializeApp(cfg);auth=Au.getAuth(app);db=Fs.getFirestore(app);G=Au;F=Fs;ok=true;
}catch(e){why=e.message||String(e)}
const err=e=>note('Erreur : '+(e.code||e.message));
window.FB={chef,
 signIn:()=>ok?G.signInWithPopup(auth,new G.GoogleAuthProvider()).catch(err):note(why),
 signOut:()=>ok?G.signOut(auth):Promise.resolve(),
 onUser:cb=>ok&&G.onAuthStateChanged(auth,cb),
 get:async(c,i)=>{const d=await F.getDoc(F.doc(db,c,i));return d.exists()?d.data():null},
 set:(c,i,d,m)=>{try{return F.setDoc(F.doc(db,c,i),JSON.parse(JSON.stringify(d)),{merge:!!m}).catch(err)}catch(e){err(e)}},
 del:(c,i)=>{try{return F.deleteDoc(F.doc(db,c,i)).catch(err)}catch(e){err(e)}},
 delMany:l=>{const b=F.writeBatch(db);l.forEach(([c,i])=>b.delete(F.doc(db,c,i)));return b.commit().catch(err)},
 watch:(c,f,cb)=>F.onSnapshot(f?F.query(F.collection(db,c),F.where(...f)):F.collection(db,c),s=>cb(s.docs.map(d=>({...d.data(),_id:d.id}))),err)};
window.dispatchEvent(new Event('fbready'));
if(!ok)note(why);
