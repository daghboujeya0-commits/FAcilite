# FAcilite – HEC'FA (version Firebase)

Site statique : `index.html`, `firebase-layer.js`, `firebase-config.js`, `firestore.rules`, `logo-hecfa.png`. Aucun build.

## 1. Firebase (console.firebase.google.com)
1. Créer un projet.
2. Authentication > Sign-in method > activer **Google**.
3. Firestore Database > Créer une base (mode production).
4. Paramètres du projet > Vos applications > ajouter une application **Web** > copier `firebaseConfig`.
5. Coller la config dans `firebase-config.js` et mettre l'adresse Gmail du chef de projet dans `CHEF_EMAIL`.
6. Mettre la même adresse dans `firestore.rules` (fonction `boot`), puis Firestore > Règles > coller le fichier > Publier.

## 2. GitHub
Créer un dépôt, y déposer tous les fichiers de ce dossier (Add file > Upload files).

## 3. Netlify
Add new site > Import an existing project > GitHub > choisir le dépôt. Build command : vide. Publish directory : `.`
Ensuite : Firebase > Authentication > Settings > **Domaines autorisés** > ajouter l'adresse `xxx.netlify.app`.

## Fonctionnement
- Le chef de projet se connecte avec Google (1re fois : il choisit son nom et son mot de passe).
- Il ajoute chaque membre avec son **adresse Gmail** et un **mot de passe** à lui transmettre.
- Un membre se connecte avec Google, puis entre son mot de passe (une seule fois par appareil).
- Mots de passe stockés hachés (SHA-256 + sel), jamais en clair.

## Les boutons Google / s'authentifier ne réagissent pas ?
- Ne double-cliquez pas sur `index.html` : la connexion Google ne fonctionne pas depuis un fichier local. Utilisez l'adresse Netlify.
- Test en local : dans le dossier, lancer `python -m http.server 8000`, puis ouvrir http://localhost:8000
- Un message rouge-violet s'affiche en bas de page pour indiquer la cause (configuration non remplie, domaine non autorisé, pop-up bloquée...).

## Forme exacte de firebase-config.js
Le fichier doit rester au format ci-dessus (avec `export const`). Si vous collez directement le bloc donné par Firebase
(`const firebaseConfig = ...` ou `import { initializeApp } ...`), le site ne se charge plus : copiez seulement les 6 valeurs.
