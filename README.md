# Machine à Café Automatique

## Description
Ce projet implémente une machine à café automatique avec gestion des paiements, sélection des boissons et distribution automatique.

## Structure du Projet
```
.
├── src/
│   └── CoffeeMachine.ts    # Implémentation principale en TypeScript
├── tsconfig.json          # Configuration TypeScript
└── README.md             # Documentation du projet
```

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

## Implémentation Technique

### Technologies Utilisées
- TypeScript
- Node.js

### Structure du Code
- **Interfaces** : Définition des types de données
  - `PaymentMethod` : Types de paiement acceptés
  - `CoffeeType` : Types de café disponibles
  - `Stock` : Gestion des stocks

- **États de la Machine**
  - `IDLE` : En attente
  - `PAYMENT_PENDING` : Paiement en cours
  - `COFFEE_SELECTION` : Sélection du café
  - `PREPARING` : Préparation en cours
  - `ERROR` : État d'erreur

- **Gestion des Erreurs**
  - `INSUFFICIENT_PAYMENT` : Paiement insuffisant
  - `NO_WATER` : Plus d'eau
  - `NO_COFFEE` : Plus de café
  - `NO_CUPS` : Plus de gobelets
  - `TECHNICAL_ERROR` : Erreur technique

### Fonctionnalités Implémentées
- Gestion des états de la machine
- Validation des paiements
- Sélection des types de café
- Gestion des stocks
- Gestion des erreurs
- Préparation automatique

