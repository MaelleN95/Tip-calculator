# Calculatrice de pourboire par pays

## Sommaire

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Note de synthèse](#note-de-synthèse)
  - [Spécifications fonctionnelles](#spécifications-fonctionnelles)
  - [Spécifications techniques](#spécifications-techniques)
- [Screenshots](#screenshots)
- [Auteur](#auteur)

## Description

La **Calculatrice de pourboire par pays** est l'outil indispensable pour les voyageurs qui veulent calculer rapidement leurs pourboires en fonction des pratiques locales tout en gardant le contrôle sur leur budget. Conçue pour être **simple**, **intuitive** et esthétiquement plaisante, cette application vous permet non seulement de **déterminer le montant de votre pourboire**, mais aussi de **convertir** automatiquement l'addition dans votre devise préférée grâce à une **API de taux de change en temps réel**.

Que vous soyez en vacances à l'étranger ou dans un restaurant chic dans votre propre pays, cette calculatrice s'adapte à toutes vos situations. Elle vous offre également une expérience utilisateur sur mesure, avec un **design responsive** et la possibilité de basculer entre un **mode sombre** élégant et un **mode clair** lumineux, pour un confort visuel optimal dans toutes les conditions.

[Essayez-la dès maintenant et simplifiez vos voyages !](https://calculatrice-de-pourboire.vercel.app/)

## Fonctionnalités

- **Calcul de pourboires** : Entrée du montant de l'addition et sélection du pourcentage de pourboire pour calculer automatiquement le montant du pourboire.
- **Conversion en devises** : Convertit le montant de l'addition et du pourboire en temps réel selon la devise de l'utilisateur, en se basant sur les taux de change actuels.
- **Interface intuitive** : Une interface utilisateur simple et agréable, optimisée pour les mobiles, idéale pour une utilisation lors de voyages.

## Installation

1. Clonez le repository :
```bash
  git clone https://github.com/MaelleN95/Tip-calculator.git
```

2. Installez les dépendances

```bash
  cd Tip-calculator
  npm install
```

3. Lancez l'application

```bash
  npm run dev
```

## Utilisation

- Accédez à [l'application](https://calculatrice-de-pourboire.vercel.app/) via votre navigateur ou en la lançant localement après l'installation.
- Entrez le montant de votre addition.
- Sélectionnez le pourcentage de pourboire souhaité.
- Choisissez votre devise pour voir la conversion en temps réel.

## Structure du projet

- `public/` : Contient les fichiers publics et les ressources de l'application.
- `src/components/` : Contient les composants React utilisés pour l'interface de l'application.
- `src/styles/` : Fichiers Sass pour la mise en forme de l'application web.
- `src/utils/` : Contient les appels API et les hooks personnalisés.

## Technologies utilisées

- **React (v18.2.0)** : Pour la gestion des composants et de l'interface utilisateur.
- **Vite (v5.1.4)** : Pour le bundling et la gestion du développement.
- **Sass (v1.71.1)** : Pour la gestion des styles de manière modulaire et maintenable.
- **API de [taux de change](https://taux.live/)** : Pour la conversion en temps réel des devises.

## Note de synthèse

### Spécifications fonctionnelles

| Fonctionnalités             | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Calcul de pourboire**   | Les utilisateurs peuvent entrer un montant et un pourcentage pour calculer le pourboire. |
| **Conversion en devises** | Les montants sont automatiquement convertis en fonction de la devise sélectionnée par l'utilisateur. |
| **Interface réactive**    | Le site est responsive et s'adapte aux écrans mobiles pour une expérience utilisateur optimale. |

### Spécifications techniques

| Critères techniques                   | Détails                                                                 |
|-------------------------|-----------------------------------------------------------------------------------------|
| **Framework**            | L'application est construite avec React pour une gestion dynamique des données et de l'interface. |
| **Taux de change**       | L'API utilisée permet d'obtenir les taux de change en temps réel, pour un calcul précis dans plusieurs devises. |
| **Mode sombre/clair**         | Implémentation d'une fonctionnalité de basculement entre le mode sombre et le mode clair avec stockage de la préférence utilisateur. |
| **Compatibilité navigateurs** | L'application est compatible avec les dernières versions de Chrome, Firefox, et Safari. |

## Screenshots

### Page de la Calculatrice

#### Desktop - mode clair
|![desktop-modeclair1](https://github.com/user-attachments/assets/d2c99562-5da5-48d5-a9bb-491c3d0ebaab)|
|-|

|![desktop-modeclair2](https://github.com/user-attachments/assets/f9cc00a3-7c67-4b94-afa3-4423fbd523b4)|
|-|

#### Desktop - mode sombre
|![desktop-modesombre1](https://github.com/user-attachments/assets/b20a8d60-bf23-49c3-a2e6-751a2c8a031b)|
|-|

|![desktop-modesombre2](https://github.com/user-attachments/assets/4cab38d7-d41d-4346-9671-e67957b82a9c)|
|-|

#### Mobile - mode sombre
|![Capture d’écran_21-9-2024_182659_calculatrice-de-pourboire vercel app](https://github.com/user-attachments/assets/607b8364-5dd9-40d1-9b49-4cc419b46ed3)|
|-|

|![Capture d’écran_21-9-2024_182648_calculatrice-de-pourboire vercel app](https://github.com/user-attachments/assets/ee25576a-8d4e-4eea-8b17-b3d673d749c7)|
|-|

### Page d'informations
#### Desktop
|![page-d-info1](https://github.com/user-attachments/assets/7a311505-53e8-446b-99aa-c0ad78ff084a)|
|-|
#### Mobile
|![page-d-info2](https://github.com/user-attachments/assets/ad832928-173f-4a50-bce6-02cc1da56673)|
|-|

## Auteur

- [Maëlle Nioche](https://www.linkedin.com/in/maelle-nioche/)
