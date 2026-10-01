/**
 * Main Application Module for MyFlashGame
 * Handles SPA navigation, screen animations, hamburger menu, header stats, and toasts
 */

class App {
  constructor() {
    this.currentScreen = 'home';
    this.isTransitioning = false;
  }

  init() {
    this.setupEventListeners();
    this.updateHeaderStats();

    // Screen routing check based on flashcards presence
    const cardCount = window.storage.data.cards.length;
    if (cardCount === 0) {
      this.navigateTo('home', false);
    } else {
      this.navigateTo('game', false);
    }
  }

  setupEventListeners() {
    // Hamburger Menu Toggles
    const btnHamburger = document.getElementById('btn-hamburger');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerClose = document.getElementById('btn-close-drawer');

    if (btnHamburger) {
      btnHamburger.addEventListener('click', () => this.toggleDrawer(true));
    }
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', () => this.toggleDrawer(false));
    }
    if (drawerClose) {
      drawerClose.addEventListener('click', () => this.toggleDrawer(false));
    }

    // Navigation Links in Drawer and UI
    const navButtons = document.querySelectorAll('[data-nav-target]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetScreen = btn.getAttribute('data-nav-target');
        this.navigateTo(targetScreen);
        this.toggleDrawer(false);
      });
    });

    // Home Screen "Criar Flash Cards" Action
    const btnHomeCreateCards = document.getElementById('btn-home-create-cards');
    if (btnHomeCreateCards) {
      btnHomeCreateCards.addEventListener('click', () => {
        this.navigateTo('manage');
        if (window.manageCards) {
          setTimeout(() => window.manageCards.openCardModal(), 400);
        }
      });
    }

    // Home Screen "Carregar Exemplos" Action
    const btnHomeSampleCards = document.getElementById('btn-home-sample-cards');
    if (btnHomeSampleCards) {
      btnHomeSampleCards.addEventListener('click', () => {
        window.storage.loadSampleCards();
        this.updateHeaderStats();
        if (window.manageCards) window.manageCards.render();
        if (window.gameEngine) window.gameEngine.loadCardQueue();
        this.navigateTo('game');
        this.showNotification("Cards de exemplo carregados! Bom jogo!");
      });
    }
  }

  toggleDrawer(open) {
    const drawer = document.getElementById('menu-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (!drawer || !backdrop) return;

    if (open) {
      backdrop.classList.remove('hidden');
      setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
      drawer.classList.remove('-translate-x-full');
    } else {
      backdrop.classList.add('opacity-0');
      drawer.classList.add('-translate-x-full');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
    }
  }

  navigateTo(screenId, animate = true) {
    if (this.isTransitioning && animate) return;

    const targetScreenEl = document.getElementById(`screen-${screenId}`);
    const currentScreenEl = document.getElementById(`screen-${this.currentScreen}`);

    if (!targetScreenEl) return;
    if (screenId === this.currentScreen && targetScreenEl.classList.contains('active-screen')) return;

    // Check redirection rule for home
    if (screenId === 'home' && window.storage.data.cards.length > 0 && animate) {
      // If user clicks home but already has cards, allow viewing home explanation or route
    }

    this.isTransitioning = true;

    // Highlight menu link
    document.querySelectorAll('.menu-item').forEach(item => {
      if (item.getAttribute('data-nav-target') === screenId) {
        item.classList.add('bg-amber-500', 'text-white', 'shadow-md');
        item.classList.remove('text-amber-950', 'hover:bg-amber-100');
      } else {
        item.classList.remove('bg-amber-500', 'text-white', 'shadow-md');
        item.classList.add('text-amber-950', 'hover:bg-amber-100');
      }
    });

    const finishSwitch = () => {
      // Hide all screens
      document.querySelectorAll('.page-screen').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active-screen', 'screen-enter', 'screen-exit');
      });

      // Show target screen with enter animation
      targetScreenEl.classList.remove('hidden');
      targetScreenEl.classList.add('active-screen');

      if (animate) {
        targetScreenEl.classList.add('screen-enter');
        setTimeout(() => targetScreenEl.classList.remove('screen-enter'), 400);
      }

      this.currentScreen = screenId;
      this.isTransitioning = false;

      // Trigger screen-specific initializers
      this.onScreenActive(screenId);
    };

    if (animate && currentScreenEl && !currentScreenEl.classList.contains('hidden')) {
      currentScreenEl.classList.add('screen-exit');
      setTimeout(() => {
        finishSwitch();
      }, 250);
    } else {
      finishSwitch();
    }
  }

  onScreenActive(screenId) {
    if (screenId === 'game') {
      if (window.gameEngine) window.gameEngine.init();
    } else if (screenId === 'manage') {
      if (window.manageCards) window.manageCards.init();
    } else if (screenId === 'profile') {
      if (window.profileManager) window.profileManager.init();
    } else if (screenId === 'export') {
      if (window.exportManager) window.exportManager.init();
    }
  }

  updateHeaderStats() {
    const data = window.storage.data;

    // Header Points
    const headerScoreEl = document.getElementById('header-user-score');
    if (headerScoreEl) headerScoreEl.textContent = data.score || 0;

    // Header Player Name
    const headerNameEl = document.getElementById('header-player-name');
    if (headerNameEl) headerNameEl.textContent = data.playerName || 'Aluno(a)';

    // Header Goal Badge
    const headerGoalEl = document.getElementById('header-daily-goal-badge');
    if (headerGoalEl) {
      headerGoalEl.textContent = `${data.dailyHits || 0}/${data.dailyGoal || 5} Meta`;
    }
  }

  triggerDailyGoalToast() {
    const toast = document.getElementById('daily-goal-toast');
    const toastMsg = document.getElementById('toast-message-text');
    if (!toast || !toastMsg) return;

    const playerName = window.storage.data.playerName || 'Aluno(a)';
    toastMsg.textContent = `Parabéns ${playerName} você conseguiu bater a meta diaria`;

    toast.classList.remove('hidden');
    toast.classList.add('toast-animated');

    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#22c55e', '#10b981', '#f59e0b', '#fbbf24', '#ea580c']
      });
    }

    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('toast-animated');
    }, 6000);
  }

  showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-amber-500/40 text-sm transition-all duration-300 transform translate-y-5 opacity-0';
    notif.innerHTML = `<i class="fa-solid fa-circle-info text-amber-400"></i> ${msg}`;

    document.body.appendChild(notif);

    setTimeout(() => {
      notif.classList.remove('translate-y-5', 'opacity-0');
    }, 10);

    setTimeout(() => {
      notif.classList.add('translate-y-5', 'opacity-0');
      setTimeout(() => {
        if (notif.parentNode) notif.parentNode.removeChild(notif);
      }, 300);
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  window.app.init();
});
