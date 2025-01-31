## Installation des dépendances

Avant de commencer, assurez-vous d'avoir installé toutes les dépendances du projet :

```bash
pnpm install -w
```

Si vous rencontrez des erreurs, essayez sans `-w` :

```bash
pnpm install
```

# Utilisation du Client, du Serveur et du Simulateur

Ce guide explique comment utiliser le client et le serveur sans la simulation, ainsi que comment exécuter la simulation des matchs.

## Démarrer le serveur et le client sans la simulation

1. Lancez d'abord le serveur :
   ```bash
   pnpm run apps:server:start
   ```
2. Ensuite, démarrer le client :
   ```bash
   pnpm run apps:client:dev
   ```
   - Ajoutez `-w` si le client ne se lance pas correctement.

3. Une fois démarré :
   - L'API est accessible à `http://localhost:3000/api`
   - Le client est disponible à `http://localhost:3001`

> **Attention !!** Le serveur doit être lancé avant le client.

## Lancer la simulation des matchs

Pour simuler des matchs, exécutez :
```bash
pnpm exec node apps/realtime-elo-ranker-simulator/index.js
```
Cela démarrera une simulation automatique des matchs.

Ensuite, rendez-vous sur l'interface client pour observer les mises à jour en temps réel du classement Elo.

## Reconnexion automatique du client

La page client a été modifiée pour tenter de se reconnecter toutes les 5 secondes si le serveur est indisponible, évitant ainsi la nécessité de rafraîchir manuellement la page après un redémarrage du serveur.
