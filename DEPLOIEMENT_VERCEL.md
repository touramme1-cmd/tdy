# Guide de Déploiement sur Vercel

## 🚨 IMPORTANT - Limitations et Changements Nécessaires

Votre application utilise des fonctionnalités spécifiques à Replit qui **NE FONCTIONNERONT PAS** sur Vercel sans modifications:

### ❌ Fonctionnalités qui ne marcheront pas directement:

1. **Replit Object Storage** - Le système de stockage de fichiers (CV uploads)
2. **Variables d'environnement Replit** - Doivent être reconfigurées
3. **Google Cloud Storage** via Replit - Nécessite reconfiguration

---

## 📋 Étapes de Déploiement

### 1. Préparer les Variables d'Environnement

Allez dans **Vercel Dashboard → Votre Projet → Settings → Environment Variables** et ajoutez:

#### ✅ Variables Requises:

```
DATABASE_URL=<votre-url-postgresql>
SESSION_SECRET=<génér

ez-un-secret-aléatoire>
GOOGLE_SHEET_WEBHOOK_URL=<votre-webhook-google-sheets>
NODE_ENV=production
```

#### ⚠️ Pour le Stockage de Fichiers (CV):

**✅ SOLUTION RECOMMANDÉE - Google Cloud Storage:**

1. Suivez le guide complet : **`CONFIGURATION_GCS.md`**
2. Remplacez `server/objectStorage.ts` :
```bash
cp server/objectStorage.vercel.ts server/objectStorage.ts
```
3. Ajoutez les variables d'environnement Vercel :
   - `GCS_PROJECT_ID`
   - `GCS_BUCKET_NAME`
   - `GCS_CREDENTIALS` (JSON complet du service account)

**Alternative - Vercel Blob Storage:**
```bash
npm install @vercel/blob
```
Puis modifiez `server/objectStorage.ts` pour utiliser Vercel Blob.

**Dernière option - Désactiver temporairement:**
- Commentez les routes d'upload dans `server/routes.ts`

---

### 2. Configurer Google Cloud Storage (RECOMMANDÉ)

**📖 Suivez le guide complet : `CONFIGURATION_GCS.md`**

Résumé rapide :
1. Créez un projet GCS
2. Créez un bucket de stockage
3. Créez un service account avec rôle "Storage Object Admin"
4. Téléchargez le fichier JSON des credentials
5. Configurez les variables d'environnement Vercel
6. Remplacez objectStorage.ts :

```bash
cp server/objectStorage.vercel.ts server/objectStorage.ts
```

---

### 3. Vérifier package.json

Assurez-vous que votre `package.json` contient:

```json
{
  "engines": {
    "node": "20.x"
  },
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
  }
}
```

---

### 4. Déployer sur Vercel

#### Via GitHub (Recommandé):

1. Poussez votre code sur GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. Allez sur [vercel.com](https://vercel.com)
3. Cliquez sur **"New Project"**
4. Importez votre repo GitHub
5. **NE MODIFIEZ PAS** les paramètres de build (le fichier `vercel.json` s'en occupe)
6. Ajoutez les variables d'environnement
7. Cliquez sur **"Deploy"**

#### Via Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel
```

---

## 🔧 Problèmes Courants et Solutions

### Erreur: "FUNCTION_INVOCATION_FAILED"

**Cause:** Les routes API ne trouvent pas les dépendances

**Solution:** Vérifiez que tous les imports dans `server/routes.ts` sont corrects et que les dépendances sont dans `dependencies` (pas `devDependencies`)

### Erreur: "NOT_FOUND" sur les routes API

**Cause:** Configuration `vercel.json` incorrecte

**Solution:** Vérifiez que le fichier `vercel.json` existe à la racine et contient les rewrites corrects

### Page blanche après déploiement

**Cause:** Le frontend ne se build pas correctement

**Solution:** 
1. Testez localement: `npm run build`
2. Vérifiez que `dist/` contient `index.html` et les assets
3. Vérifiez les logs de build sur Vercel

### Erreur Database Connection

**Cause:** Variable `DATABASE_URL` manquante ou incorrecte

**Solution:**
1. Ajoutez `DATABASE_URL` dans les variables d'environnement Vercel
2. Assurez-vous que votre DB accepte les connexions externes
3. Pour PostgreSQL, utilisez une connexion poolée (Neon, Supabase, etc.)

---

## 📝 Checklist Avant Déploiement

- [ ] Variables d'environnement configurées sur Vercel
- [ ] Routes d'upload CV désactivées OU solution de stockage configurée
- [ ] Database accessible depuis l'extérieur
- [ ] `npm run build` fonctionne localement
- [ ] Fichier `vercel.json` présent à la racine
- [ ] Fichier `api/index.js` présent
- [ ] `.vercelignore` présent

---

## 🎯 Alternative Recommandée

Si vous voulez garder **toutes les fonctionnalités** (Object Storage Replit, etc.):

**👉 Utilisez "Replit Deployments"** au lieu de Vercel:

1. Dans votre Repl, allez dans l'onglet **"Deployments"**
2. Cliquez sur **"Create Deployment"**
3. Votre app sera déployée avec un domaine `.replit.app`
4. Toutes les fonctionnalités fonctionneront parfaitement

**Avantages:**
- ✅ Object Storage fonctionne
- ✅ Variables d'environnement auto-configurées
- ✅ Base de données incluse
- ✅ Aucune modification nécessaire

---

## 💡 Besoin d'Aide?

Si vous rencontrez des erreurs spécifiques lors du déploiement sur Vercel, partagez:
1. Le message d'erreur exact
2. Les logs de build de Vercel
3. Quel composant ne fonctionne pas

Je pourrai alors vous aider à résoudre le problème spécifique!
