# 🚀 Déploiement Rapide sur Vercel avec Google Cloud Storage

## ✅ Fichiers Déjà Préparés

- ✅ `package.json` mis à jour avec Node 20.x
- ✅ `vercel.json` configuré
- ✅ `api/index.js` créé pour Vercel serverless
- ✅ `.vercelignore` créé
- ✅ `server/objectStorage.vercel.ts` créé pour GCS

## 📋 Checklist de Déploiement

### ☐ Étape 1 : Configuration Google Cloud Storage

**📖 Suivez le guide détaillé : `CONFIGURATION_GCS.md`**

Résumé rapide :
1. Créer un projet Google Cloud
2. Activer l'API Cloud Storage
3. Créer un bucket de stockage
4. Créer un service account avec rôle "Storage Object Admin"
5. Télécharger le fichier JSON des credentials
6. Configurer CORS sur le bucket

### ☐ Étape 2 : Remplacer objectStorage.ts

```bash
cp server/objectStorage.vercel.ts server/objectStorage.ts
```

### ☐ Étape 3 : Variables d'Environnement Vercel

Allez dans **Vercel Dashboard → Settings → Environment Variables** :

#### Base de Données
```
DATABASE_URL=<votre-postgresql-url>
```
💡 Utilisez Neon, Supabase, ou Vercel Postgres

#### Sécurité
```
SESSION_SECRET=<générez-un-secret-aléatoire-32-caractères>
NODE_ENV=production
```

#### Google Sheets (Contact Form)
```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx1l-HBoUCEM9lSUJF7cdjejrXt9n_3qjo1Ox2pk1-YWL5BeUZ89rhVNp7Pcjb1NYWl/exec
```

#### Google Cloud Storage (Upload CV)
```
GCS_PROJECT_ID=votre-project-id
GCS_BUCKET_NAME=beno-consulting-cvs
GCS_CREDENTIALS={"type":"service_account","project_id":"...","private_key":"..."}
```
💡 Copiez-collez TOUT le contenu du fichier JSON téléchargé de GCS

### ☐ Étape 4 : Déployer

#### Via GitHub (Recommandé)

```bash
# 1. Vérifier que objectStorage.ts est bien remplacé
ls -la server/objectStorage.ts

# 2. Commit et push
git add .
git commit -m "Configure for Vercel with Google Cloud Storage"
git push origin main

# 3. Sur vercel.com
# - New Project
# - Import your GitHub repo
# - Add environment variables
# - Deploy!
```

#### Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## 🧪 Test Local (Optionnel)

```bash
# Créer .env.local avec vos credentials GCS
cat > .env.local << 'EOF'
GCS_PROJECT_ID=votre-project-id
GCS_BUCKET_NAME=beno-consulting-cvs
GCS_CREDENTIALS='{"type":"service_account",...}'
DATABASE_URL=votre-db-url
SESSION_SECRET=test-secret
GOOGLE_SHEET_WEBHOOK_URL=votre-webhook
EOF

# Tester le build
npm run build

# Vérifier que dist/ contient index.html
ls -la dist/
```

## ⚠️ Problèmes Courants

### Erreur: "GCS_CREDENTIALS must be configured"
→ Ajoutez la variable `GCS_CREDENTIALS` dans Vercel avec le JSON complet

### Erreur: "Invalid JSON"
→ Vérifiez que le JSON est valide (testez sur jsonlint.com)

### Erreur: 404 sur les routes API
→ Vérifiez que `api/index.js` existe et que `vercel.json` est présent

### Page blanche après déploiement
→ Vérifiez les logs de build sur Vercel
→ Testez `npm run build` localement

### Upload CV ne fonctionne pas
→ Vérifiez CORS sur le bucket GCS (voir CONFIGURATION_GCS.md étape 6)
→ Vérifiez que les 3 variables GCS sont configurées

## 💰 Coûts Estimés

**Google Cloud Storage :**
- Stockage : ~$0.02/GB/mois
- Pour 100 CVs (1MB chacun) : **~$0.01-$0.50/mois**

**Vercel :**
- Hobby Plan : **Gratuit** (100GB bandwidth/mois)
- Pro Plan : **$20/mois** (1TB bandwidth/mois)

## 🎯 Alternative : Replit Deployments

Si vous préférez garder toutes les fonctionnalités Replit sans modification :

1. Dans votre Repl → **Deployments** tab
2. **Create Deployment**
3. Domaine : `*.replit.app`
4. ✅ Object Storage fonctionne automatiquement
5. ✅ Aucune configuration supplémentaire

## 📚 Ressources

- **Guide GCS détaillé** : `CONFIGURATION_GCS.md`
- **Guide Vercel complet** : `DEPLOIEMENT_VERCEL.md`
- [Vercel Documentation](https://vercel.com/docs)
- [Google Cloud Storage Docs](https://cloud.google.com/storage/docs)

## ✅ Succès !

Une fois déployé, votre application sera accessible à :
```
https://votre-projet.vercel.app
```

Testez :
- ✅ Homepage
- ✅ Formulaire de contact (avec upload CV)
- ✅ Intégration Google Sheets
- ✅ Recherche d'emplois
- ✅ Toutes les 3 langues (EN/FR/AR)
