#!/bin/bash

echo "═══════════════════════════════════════════════════════════════════"
echo "    🔍 TEST DE STRUCTURE - À faire AVANT d'uploader sur GitHub"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

# Vérifier les fichiers essentiels
echo "✓ Vérification des fichiers essentiels..."
echo ""

if [ -f "package.json" ]; then
    echo "✅ package.json présent"
else
    echo "❌ package.json MANQUANT"
    exit 1
fi

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json présent"
else
    echo "❌ vercel.json MANQUANT"
    exit 1
fi

if [ -d "client" ]; then
    echo "✅ client/ présent"
else
    echo "❌ client/ MANQUANT"
    exit 1
fi

if [ -d "server" ]; then
    echo "✅ server/ présent"
else
    echo "❌ server/ MANQUANT"
    exit 1
fi

echo ""
echo "✓ Vérification de vercel.json..."
if grep -q "dist/public" vercel.json; then
    echo "✅ Output Directory correct (dist/public)"
else
    echo "⚠️  Vérifier Output Directory dans vercel.json"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "    ✅ STRUCTURE CORRECTE !"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "Vous pouvez uploader ces fichiers sur GitHub."
echo ""
echo "⚠️  ATTENTION : Sur GitHub, uploadez le CONTENU de ce dossier,"
echo "    PAS le dossier parent !"
echo ""
echo "═══════════════════════════════════════════════════════════════════"
