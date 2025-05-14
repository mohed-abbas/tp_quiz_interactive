# Quiz Interactif

Un quiz interactif en JavaScript, HTML et Tailwind CSS pour tester des connaissances générales, gaming et programmation.

## Fonctionnalités

* Formulaire de saisie du nom et de l'email de l'utilisateur
* Barre de navigation fixe affichant le nom, l'email et la progression
* Navigation **Précédent** / **Suivant** entre les questions
* Validation de la réponse avant de passer à la question suivante
* Affichage du score final

## Structure du projet

```
quiz-project/
├── index.html            # Page principale (formulaire, navbar, quiz)
├── css/
│   └── styles.css        # Feuille de styles générée par Tailwind CSS
├── js/
│   ├── questions.js      # Définition des questions (FR)
│   └── script.js         # Logique du quiz et DOM
└── assets/               # Images, icônes, ressources...
```

## Installation

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/quiz-project.git
   cd quiz-project
   ```

2. Ouvrir `index.html` dans votre navigateur.

## Utilisation

1. Saisissez votre nom et votre email, puis cliquez sur **Commencer**.
2. Répondez aux questions en cliquant sur un choix.
3. Utilisez les boutons **Précédent** et **Suivant** pour naviguer.
4. À la dernière question, cliquez sur **Terminer** pour afficher votre score.
5. Relancez le quiz avec le bouton **Recommencer**.

## Personnalisation

* Modifiez les questions dans `js/questions.js`.
* Adaptez le style via Tailwind dans `src/input.css` puis régénérez `css/styles.css`.

## License

MIT © Mohed Abbas
