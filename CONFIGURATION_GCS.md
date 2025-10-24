# Configuration Google Cloud Storage pour Vercel

## 📋 Étapes de Configuration

### 1. Créer un Projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Notez le **Project ID** (vous en aurez besoin)

### 2. Activer l'API Google Cloud Storage

1. Dans le menu, allez à **APIs & Services → Library**
2. Cherchez "Cloud Storage API"
3. Cliquez sur **Enable**

### 3. Créer un Bucket de Stockage

1. Dans le menu, allez à **Cloud Storage → Buckets**
2. Cliquez sur **Create Bucket**
3. Configuration recommandée :
   - **Nom** : `beno-consulting-cvs` (ou un nom unique)
   - **Location type** : Region
   - **Location** : `europe-west1` (ou proche de vous)
   - **Storage class** : Standard
   - **Access control** : Fine-grained (recommended)
   - **Protection tools** : None (ou selon vos besoins)
4. Notez le **nom du bucket**

### 4. Créer un Service Account

1. Dans le menu, allez à **IAM & Admin → Service Accounts**
2. Cliquez sur **Create Service Account**
3. Remplissez :
   - **Service account name** : `vercel-storage-access`
   - **Description** : "Service account pour accès au stockage depuis Vercel"
4. Cliquez sur **Create and Continue**
5. Dans **Grant this service account access to project** :
   - Sélectionnez le rôle : **Storage Object Admin**
6. Cliquez sur **Done**

### 5. Créer une Clé JSON

1. Trouvez le service account que vous venez de créer
2. Cliquez sur les **3 points** → **Manage keys**
3. Cliquez sur **Add Key → Create new key**
4. Choisissez **JSON**
5. Cliquez sur **Create**
6. **Un fichier JSON sera téléchargé** - GARDEZ-LE EN SÉCURITÉ !

Le fichier ressemble à ça :
```json
{
  "type": "service_account",
  "project_id": "votre-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "vercel-storage-access@votre-project-id.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### 6. Configurer CORS sur le Bucket (Important!)

Pour permettre les uploads depuis le navigateur, configurez CORS :

1. Ouvrez **Cloud Shell** (icône en haut à droite de Google Cloud Console)
2. Créez un fichier `cors.json` :

```bash
cat > cors.json << 'EOF'
[
  {
    "origin": ["https://votre-domaine-vercel.vercel.app"],
    "method": ["GET", "PUT", "POST", "DELETE"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF
```

3. Appliquez la configuration CORS :

```bash
gsutil cors set cors.json gs://beno-consulting-cvs
```

**Note** : Remplacez `beno-consulting-cvs` par le nom de votre bucket et `https://votre-domaine-vercel.vercel.app` par votre URL Vercel.

### 7. Configurer les Variables d'Environnement sur Vercel

1. Allez sur **Vercel Dashboard → Votre Projet → Settings → Environment Variables**

2. Ajoutez ces 3 variables :

#### GCS_PROJECT_ID
```
Value: votre-project-id
```

#### GCS_BUCKET_NAME
```
Value: beno-consulting-cvs
```

#### GCS_CREDENTIALS
```
Value: Copiez-collez TOUT le contenu du fichier JSON téléchargé à l'étape 5
```

**Important** : Pour `GCS_CREDENTIALS`, copiez le JSON complet sur une seule ligne ou tel quel. Vercel gère bien les JSON multi-lignes.

### 8. Modifier server/objectStorage.ts

Remplacez le contenu de `server/objectStorage.ts` par celui de `server/objectStorage.vercel.ts` :

```bash
cp server/objectStorage.vercel.ts server/objectStorage.ts
```

Ou faites-le manuellement en copiant le contenu.

## 🔒 Sécurité

### ⚠️ NE JAMAIS :
- ❌ Commiter le fichier JSON des credentials dans Git
- ❌ Partager les credentials publiquement
- ❌ Utiliser les credentials en développement local (utilisez la version Replit)

### ✅ Bonnes Pratiques :
- ✅ Ajoutez `*.json` (sauf package.json) dans `.gitignore`
- ✅ Utilisez des variables d'environnement
- ✅ Rotez les clés régulièrement
- ✅ Donnez les permissions minimales nécessaires

## 🧪 Tester Localement (Optionnel)

Si vous voulez tester avec GCS en local :

```bash
# Créez un fichier .env.local
cat > .env.local << 'EOF'
GCS_PROJECT_ID=votre-project-id
GCS_BUCKET_NAME=beno-consulting-cvs
GCS_CREDENTIALS='{"type":"service_account","project_id":"..."}'
EOF
```

Puis utilisez `dotenv` :
```bash
npm install --save-dev dotenv
```

## 📊 Coûts

Google Cloud Storage - Tarification (au 22 Oct 2025) :

- **Stockage** : ~$0.020 par GB/mois (Standard - Europe)
- **Opérations** :
  - Classe A (upload) : $0.05 pour 10,000 opérations
  - Classe B (download) : $0.004 pour 10,000 opérations
- **Bande passante** : 
  - Gratuit vers Compute Engine (même région)
  - $0.12 par GB vers Internet (après 1GB gratuit/mois)

**Estimation pour votre cas** :
- 100 CVs/mois (1 MB chacun) = 100 MB stockage
- Coût mensuel estimé : **~$0.01 à $0.50** (quasi gratuit)

## 🆘 Dépannage

### Erreur : "GCS_CREDENTIALS must be configured"
→ Vérifiez que vous avez bien ajouté `GCS_CREDENTIALS` dans Vercel

### Erreur : "Invalid JSON"
→ Assurez-vous que le JSON est bien formaté (pas de caractères spéciaux)

### Erreur : "Permission denied"
→ Vérifiez que le service account a le rôle **Storage Object Admin**

### Upload échoue avec CORS error
→ Configurez CORS sur le bucket (étape 6)

## 📚 Ressources

- [Documentation Google Cloud Storage](https://cloud.google.com/storage/docs)
- [Tarification GCS](https://cloud.google.com/storage/pricing)
- [Best Practices](https://cloud.google.com/storage/docs/best-practices)
