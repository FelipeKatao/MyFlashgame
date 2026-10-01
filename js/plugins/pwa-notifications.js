/**
 * Plugin: Modo App & Notificações Push (PWA)
 * Transforma a aplicação em PWA instalável e envia Notificações Push configuráveis por matéria e tempo.
 */

window.PluginPWANotifications = {
  id: 'pwa-notifications',
  name: 'Modo App & Notificações Push (PWA)',
  description: 'Habilita instalação PWA e Notificações Push configuráveis por matéria (Reprovado/Pendente) e tempo customizável.',
  icon: 'fa-mobile-screen-button',
  notificationTimer: null,
  deferredInstallPrompt: null,

  init() {
    // Listen for PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      const installBtn = document.getElementById('btn-pwa-install');
      if (installBtn) installBtn.classList.remove('hidden');
    });

    // Listen for service worker notification click messages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NAVIGATE_TO_CARD') {
          const { cardId, category } = event.data;
          if (window.app) window.app.navigateTo('game');
          if (window.gameEngine) window.gameEngine.loadSpecificCard(cardId, category);
        }
      });
    }

    if (window.storage.isPluginInstalled(this.id)) {
      this.startNotificationScheduler();
    }
  },

  install() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('PWA Service Worker registrado:', reg.scope);
      }).catch((err) => {
        console.warn('Erro ao registrar Service Worker:', err);
      });
    }

    // Request notification permissions
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          if (window.app) window.app.showNotification("Notificações Push ativadas com sucesso!");
          this.sendRandomCardNotification();
        } else {
          if (window.app) window.app.showNotification("Permissão de notificação negada no navegador.");
        }
      });
    }

    this.startNotificationScheduler();
    window.storage.setPluginInstalled(this.id, true);
    return { success: true };
  },

  uninstall() {
    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
      this.notificationTimer = null;
    }

    window.storage.setPluginInstalled(this.id, false);
    return { success: true };
  },

  startNotificationScheduler() {
    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
      this.notificationTimer = null;
    }

    const settings = window.storage.data.notificationSettings || { category: 'Todas', intervalMinutes: 1, enabled: true };
    if (settings.enabled === false) {
      // Notifications are paused by user choice
      return;
    }

    const intervalMs = Math.max(1, settings.intervalMinutes || 1) * 60 * 1000;

    this.notificationTimer = setInterval(() => {
      this.sendRandomCardNotification();
    }, intervalMs);
  },

  toggleNotifications(enable) {
    const settings = window.storage.data.notificationSettings || { category: 'Todas', intervalMinutes: 1, enabled: true };
    const newEnabled = (enable !== undefined) ? enable : !(settings.enabled !== false);

    window.storage.setNotificationSettings(settings.category, settings.intervalMinutes, newEnabled);

    if (newEnabled) {
      this.startNotificationScheduler();
      if (window.app) window.app.showNotification("Notificações Push Reativadas!");
    } else {
      if (this.notificationTimer) {
        clearInterval(this.notificationTimer);
        this.notificationTimer = null;
      }
      if (window.app) window.app.showNotification("Notificações Push Pausadas!");
    }

    if (window.pluginsManager) {
      window.pluginsManager.render();
    }
  },

  sendRandomCardNotification() {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const settings = window.storage.data.notificationSettings || { category: 'Todas', intervalMinutes: 1, enabled: true };
    if (settings.enabled === false) return; // Do not send if paused/disabled

    const chosenCategory = settings.category || 'Todas';

    // Get cards for selected category
    let cardsOfCategory = window.storage.getCards(chosenCategory);
    if (cardsOfCategory.length === 0) return;

    // Filter cards with status Pending ('') or Reprovado
    let candidateCards = cardsOfCategory.filter(c => !c.status || c.status === 'Reprovado');
    if (candidateCards.length === 0) {
      // Fallback if all cards in category are approved
      candidateCards = cardsOfCategory;
    }

    const randomCard = candidateCards[Math.floor(Math.random() * candidateCards.length)];
    if (!randomCard) return;

    const notifTitle = `🎴 Flashcard: ${randomCard.category}`;
    const notifBody = `Pergunta: "${randomCard.question}"`;

    // Calculate absolute URL for PNG icon so mobile PWAs & Android status bar render it properly
    let iconUrl = './images/icon.png';
    try {
      iconUrl = new URL('./images/icon.png', window.location.href).href;
    } catch (e) {
      iconUrl = 'images/icon.png';
    }

    const options = {
      body: notifBody,
      icon: iconUrl,
      badge: iconUrl,
      data: { cardId: randomCard.id, category: randomCard.category }
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(notifTitle, options);
      });
    } else {
      const notif = new Notification(notifTitle, options);
      notif.onclick = () => {
        window.focus();
        if (window.app) window.app.navigateTo('game');
        if (window.gameEngine) window.gameEngine.loadSpecificCard(randomCard.id, randomCard.category);
      };
    }
  },

  triggerSampleNotification() {
    if (!('Notification' in window)) {
      alert('Seu navegador não suporta notificações de sistema.');
      return;
    }

    if (Notification.permission === 'granted') {
      this.sendRandomCardNotification();
    } else {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          this.sendRandomCardNotification();
        } else {
          alert('Permissão para notificações foi negada.');
        }
      });
    }
  },

  promptInstallPWA() {
    if (this.deferredInstallPrompt) {
      this.deferredInstallPrompt.prompt();
      this.deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação do PWA');
        }
        this.deferredInstallPrompt = null;
      });
    } else {
      alert('Para instalar o App no Celular/Desktop, use o menu "Adicionar à Tela Inicial" do seu navegador!');
    }
  }
};

// Auto init PWA listener
document.addEventListener('DOMContentLoaded', () => {
  window.PluginPWANotifications.init();
});
