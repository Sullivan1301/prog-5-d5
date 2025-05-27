# Machine à Café Automatique

## Description
Ce projet implémente une machine à café automatique avec gestion des paiements, sélection des boissons et distribution automatique.

## Cas d'Utilisation

### 1. Acheter un café
- **Acteur** : Client
- **Scénario principal** :
  1. Le client insère un moyen de paiement (monnaie, carte, jeton, sans contact)
  2. La machine valide le paiement
  3. Le client sélectionne le type de café
  4. La machine prépare et distribue le café
  5. Le client récupère son café

## Logique Métier

### 1. Gestion du Paiement
- Validation du montant inséré
- Vérification de la validité du paiement
- Calcul de la monnaie à rendre
- Gestion des différents moyens de paiement

### 2. Sélection et Préparation
- Affichage des boissons disponibles
- Vérification des stocks
- Processus de préparation automatique
- Gestion des paramètres de préparation

### 3. Distribution
- Distribution du café dans le gobelet
- Notification de fin de préparation
- Gestion des gobelets

## Gestion des Erreurs

| Erreur | Description | Action |
|--------|-------------|---------|
| Paiement insuffisant | Montant inséré insuffisant | Message d'erreur et remboursement |
| Plus de café | Stock de café épuisé | Message "Plus de café" |
| Plus d'eau | Réservoir d'eau vide | Message "Plus d'eau" |
| Plus de gobelets | Stock de gobelets épuisé | Message "Plus de gobelets" |
| Panne technique | Erreur système | Message "Erreur technique" |

## Optimisations

1. **Interface Utilisateur**
   - Écran tactile intuitif
   - Instructions claires
   - Retour visuel des actions

2. **Performance**
   - Temps de préparation optimisé
   - Gestion efficace des stocks
   - Détection rapide des erreurs

3. **Maintenance**
   - Alertes automatiques pour les stocks bas
   - Journalisation des erreurs
   - Auto-diagnostic

