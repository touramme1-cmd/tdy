# 📦 GUIDE : Télécharger ZIP → GitHub → Vercel

## 🎯 VOTRE MÉTHODE (ZIP Download)

Ce guide explique comment déployer en téléchargeant le ZIP depuis Replit.

---

## ÉTAPE 1️⃣ : TÉLÉCHARGER LE ZIP DEPUIS REPLIT

### **A. Télécharger le projet**

1. Dans Replit, cliquer sur **les 3 points** (⋮) en haut à gauche
2. Cliquer **"Download as ZIP"**
3. Sauvegarder le fichier `workspace.zip` sur votre ordinateur
4. **Extraire le ZIP** dans un dossier (ex: `beno-gulf-jobs`)

---

## ÉTAPE 2️⃣ : CRÉER UN REPOSITORY GITHUB

### **Option A : Interface GitHub (RECOMMANDÉ)**

1. **Aller sur** https://github.com/new
2. **Nom du repository** : `beno-gulf-jobs` (ou autre)
3. **Visibilité** : Public ou Private (au choix)
4. ⚠️ **NE PAS cocher** "Add a README file"
5. ⚠️ **NE PAS ajouter** .gitignore ou licence
6. Cliquer **"Create repository"**

### **Vous arrivez sur une page vide** ✅ - C'est normal !

---

## ÉTAPE 3️⃣ : UPLOADER LES FICHIERS

### **Sur la page du repository GitHub :**

1. Cliquer **"uploading an existing file"** (lien bleu au milieu)
2. **Glisser-déposer TOUS les fichiers** depuis le dossier extrait
   - ✅ Inclure : `package.json`, `vercel.json`, `client/`, `server/`, etc.
   - ❌ Exclure : `node_modules/`, `dist/`, `.cache/` (déjà dans .gitignore)
3. En bas, dans **"Commit changes"** :
   ```
   Initial commit - BENO Gulf Jobs Portal
   ```
4. Cliquer **"Commit changes"**

⏱️ **Attendre 10-30 secondes** que GitHub traite l'upload.

---

## ÉTAPE 4️⃣ : DÉPLOYER SUR VERCEL

### **A. Importer le projet**

1. **Aller sur** https://vercel.com/new
2. **Connecter GitHub** (si pas déjà fait)
3. **Chercher** votre repository `beno-gulf-jobs`
4. Cliquer **"Import"**

### **B. Configuration CRITIQUE** ⚠️

**VOICI VOTRE ERREUR PRÉCÉDENTE :**

❌ **AVANT (INCORRECT)** :
```
Root Directory: ./          ← FAUX !
Output Directory: dist      ← FAUX !
```

✅ **MAINTENANT (CORRECT)** :
```
┌────────────────────────────────────────────────┐
│ Root Directory                                 │
│ ┌────────────────────────────────────────────┐ │
│ │ [LAISSER COMPLÈTEMENT VIDE]                │ │ ← NE RIEN METTRE !
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘

Framework Preset: Other

Build Command: npm run build

┌────────────────────────────────────────────────┐
│ Output Directory                               │
│ ┌────────────────────────────────────────────┐ │
│ │ dist/public                                │ │ ← Pas juste "dist" !
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘

Install Command: npm install

Node.js Version: 20.x
```

### **C. Variables d'environnement** (4 obligatoires)

Cliquer **"Add Environment Variable"** pour chacune :

```env
DATABASE_URL
────────────────────────────────────────────────────────────────
postgresql://neondb_owner:npg_bjzeivPXgq21@ep-proud-poetry-a4f0e8g3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require


SESSION_SECRET
────────────────────────────────────────────────────────────────
8b86a3a4d7adeb903db0b0e35f82ff54af6830804e8d20bbf2dce89e8641e8bc


NODE_ENV
────────────────────────────────────────────────────────────────
production


GOOGLE_SHEET_WEBHOOK_URL
────────────────────────────────────────────────────────────────
https://script.google.com/macros/s/AKfycbx1l-HBoUCEM9lSUJF7cdjejrXt9n_3qjo1Ox2pk1-YWL5BeUZ89rhVNp7Pcjb1NYWl/exec
```

### **D. Déployer !**

1. **Vérifier** que tout est correct (checklist ci-dessous)
2. Cliquer **"Deploy"**
3. ⏱️ Attendre 2-3 minutes

---

## ✅ CHECKLIST FINALE (Avant de cliquer "Deploy")

Vérifiez **TOUS** ces points :

- [ ] Root Directory = **VIDE** (pas `./` ni autre chose)
- [ ] Output Directory = **dist/public** (pas juste `dist`)
- [ ] Framework Preset = **Other**
- [ ] Build Command = **npm run build**
- [ ] Install Command = **npm install**
- [ ] Node.js Version = **20.x**
- [ ] **4 variables d'environnement** ajoutées :
  - [ ] DATABASE_URL
  - [ ] SESSION_SECRET
  - [ ] NODE_ENV
  - [ ] GOOGLE_SHEET_WEBHOOK_URL

---

## 🎉 SUCCÈS !

Après 2-3 minutes, votre site sera disponible sur :

```
https://votre-projet-xxx.vercel.app
```

### **Tests à faire :**

1. ✅ **Navigation EN/FR/AR** fonctionne
2. ✅ **6 jobs de démo** s'affichent sur la page Jobs
3. ✅ **Formulaire contact** envoie vers Google Sheets
4. ✅ **WhatsApp (+216 52 265 563)** s'ouvre correctement
5. ✅ **Mode sombre** toggle fonctionne
6. ✅ **Mobile responsive** (tester sur téléphone)

---

## 🆘 RÉSOLUTION DES PROBLÈMES

### ❌ "The provided GitHub repository does not contain the requested branch"

**Cause** : Fichiers pas encore commités sur GitHub  
**Solution** :
1. Retourner sur votre repo GitHub
2. Vérifier que vous voyez **tous les fichiers** (package.json, client/, server/, etc.)
3. Vérifier qu'il y a **au moins 1 commit** (en haut : "1 commit" ou plus)
4. Si pas de fichiers visibles : refaire ÉTAPE 3

### ❌ "Error: Cannot find module 'package.json'"

**Cause** : Root Directory mal configuré  
**Solution** : Mettre Root Directory = **VIDE** (supprimer le `./`)

### ❌ "Build failed - Output directory not found"

**Cause** : Output Directory incorrect  
**Solution** : Changer de `dist` → `dist/public`

### ❌ "Build Error: npm ERR! enoent"

**Cause** : package.json pas au bon endroit  
**Solution** :
1. Vérifier sur GitHub que `package.json` est **à la racine** du repo
2. Si dans un sous-dossier, re-uploader correctement

### ❌ Page affiche "No jobs found"

**Cause** : Database pas connectée  
**Solution** :
1. Vérifier que `DATABASE_URL` est bien ajoutée
2. La base Neon contient déjà 6 jobs ✅

---

## 📸 CAPTURES D'ÉCRAN DES BONS RÉGLAGES

### **Configuration Vercel correcte :**

```
┌─────────────────────────────────────────────────┐
│ Import Git Repository                           │
│ touramme1-cmd/beno-gulf-jobs     main  [Import]│
├─────────────────────────────────────────────────┤
│ Configure Project                               │
│                                                 │
│ Root Directory: [                            ]  │ ← VIDE !
│                                                 │
│ Framework Preset: Other                         │
│                                                 │
│ Build Command: npm run build                    │
│                                                 │
│ Output Directory: dist/public                   │ ← Important !
│                                                 │
│ Install Command: npm install                    │
│                                                 │
│ Node.js Version: 20.x                           │
├─────────────────────────────────────────────────┤
│ Environment Variables (4)                       │
│ DATABASE_URL         = postgresql://...         │
│ SESSION_SECRET       = 8b86a3a4...              │
│ NODE_ENV             = production               │
│ GOOGLE_SHEET_...URL  = https://script...        │
└─────────────────────────────────────────────────┘

                    [Deploy] ← Cliquer ici
```

---

## 🎯 RÉSUMÉ EN 4 ÉTAPES

```
1️⃣  Télécharger ZIP depuis Replit
     └─ ⋮ → Download as ZIP → Extraire

2️⃣  Créer repo GitHub vide
     └─ github.com/new → Ne pas ajouter README

3️⃣  Upload tous les fichiers
     └─ "uploading an existing file" → Commit

4️⃣  Déployer sur Vercel
     └─ Root Directory = VIDE
     └─ Output Directory = dist/public
     └─ Ajouter 4 variables d'environnement
     └─ Deploy !
```

**Temps total** : 5-7 minutes ⏱️

---

## 💡 ASTUCE : Modifications futures

Après le premier déploiement, pour mettre à jour :

1. **Télécharger nouveau ZIP** depuis Replit
2. **Sur GitHub** : Upload → Remplacer les fichiers modifiés
3. **Vercel re-déploie automatiquement** ! ✅

Pas besoin de tout reconfigurer.

---

**Besoin d'aide ?** Vérifiez la checklist ✅ et les erreurs courantes 🆘 ci-dessus.

Bonne chance ! 🚀
