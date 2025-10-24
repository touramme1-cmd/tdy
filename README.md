# 🌍 BENO Consulting - Gulf Jobs Portal

![BENO Consulting](attached_assets/e6a7b1df-8f39-4d71-be94-25c86eed6781_removalai_preview_1761119121046.png)

## 🎯 À propos

Portail d'emploi professionnel trilingue (Arabe/Anglais/Français) connectant des talents d'Afrique du Nord (Tunisie, Maroc, Algérie) avec des opportunités de carrière dans les pays du Golfe (Arabie Saoudite, EAU, Qatar).

## ✨ Fonctionnalités

- 🌐 **Trilingue complet** : Arabe (RTL), Anglais, Français
- 🔍 **Recherche avancée** : Filtres par pays, ville, catégorie, expérience, salaire
- 💼 **6 offres de démonstration** pré-configurées
- 📱 **WhatsApp intégré** : Contact direct (+216 52 265 563)
- 📧 **Formulaire contact** → Google Sheets automatique
- 🌙 **Mode sombre** complet
- 📱 **100% Responsive** : Mobile, Tablette, Desktop
- ⚡ **Performances optimales** avec Vite + React

## 🚀 Stack Technique

### Frontend
- **Framework** : React 18 avec TypeScript
- **Routing** : Wouter
- **Styling** : Tailwind CSS + Shadcn UI
- **State Management** : TanStack Query (React Query v5)
- **Internationalisation** : i18n personnalisé avec support RTL

### Backend
- **Server** : Express.js + TypeScript
- **Database** : PostgreSQL (Neon)
- **ORM** : Drizzle ORM
- **Session** : Express Session

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

## 🌐 Déploiement sur Vercel

### Variables d'environnement requises

```env
DATABASE_URL=votre_url_postgresql_neon
SESSION_SECRET=votre_secret_de_session
NODE_ENV=production
GOOGLE_SHEET_WEBHOOK_URL=votre_url_google_apps_script
```

### Configuration Vercel

```
Root Directory: [LAISSER VIDE]
Framework Preset: Other
Build Command: npm run build
Output Directory: dist/public
Node.js Version: 20.x
```

## 📊 Base de données

### Tables
- `employers` - Informations employeurs/recruteurs
- `jobs` - Offres d'emploi avec contenu bilingue
- `applications` - Candidatures
- `contact_submissions` - Formulaires de contact
- `employer_submissions` - Demandes de publication d'offres
- `job_alerts` - Abonnements aux alertes

### Données de démonstration

La base de données Neon inclut déjà :
- ✅ 6 offres d'emploi échantillon
- ✅ 4 employeurs
- ✅ Toutes les tables configurées

## 🎨 Design System

### Couleurs
- **Primary** : Cyan-700 (#0E7490) - CTA, liens
- **Accent** : Amber-500 (#EAB308) - Badges urgents
- **Success** : Green-600 - Badges visa sponsor

### Typographie
- **Latin** : Inter (400, 500, 600, 700)
- **Arabe** : Noto Sans Arabic (400, 500, 600, 700)

## 📱 Contact

- **Email** : contact@beno-consulting.com
- **WhatsApp** : +216 52 265 563
- **Bureau Tunisie** : Tunis, Tunisie
- **Bureau KSA** : Jeddah, Arabie Saoudite

## 📄 Licence

© 2025 BENO Consulting. Tous droits réservés.

---

**Développé avec ❤️ pour connecter les talents Nord-Africains aux opportunités du Golfe**
