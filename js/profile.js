/**
 * Profile Module for MyFlashGame
 * Handles player name, daily goals, response mode selection, resetting data, and profile stats
 */

class ProfileManager {
  constructor() {}

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    const nameInput = document.getElementById('profile-player-name-input');
    if (nameInput) {
      nameInput.addEventListener('change', (e) => {
        window.storage.setPlayerName(e.target.value);
        if (window.app) {
          window.app.updateHeaderStats();
          window.app.showNotification("Nome de perfil salvo!");
        }
      });
    }

    const goalInput = document.getElementById('profile-daily-goal-input');
    if (goalInput) {
      goalInput.addEventListener('change', (e) => {
        window.storage.setDailyGoal(e.target.value);
        this.render();
        if (window.app) {
          window.app.updateHeaderStats();
          window.app.showNotification("Meta diária atualizada!");
        }
      });
    }

    // Response Mode Radio Listeners
    const modeMultiple = document.getElementById('profile-mode-multiple');
    if (modeMultiple) {
      modeMultiple.addEventListener('change', () => {
        if (modeMultiple.checked) {
          window.storage.setResponseMode('multiple_choice');
          if (window.app) window.app.showNotification("Modo de resposta: Múltipla Escolha ativo!");
          if (window.gameEngine) window.gameEngine.renderCurrentCard();
        }
      });
    }

    const modeType = document.getElementById('profile-mode-type');
    if (modeType) {
      modeType.addEventListener('change', () => {
        if (modeType.checked) {
          window.storage.setResponseMode('type');
          if (window.app) window.app.showNotification("Modo de resposta: Digitar resposta ativo!");
          if (window.gameEngine) window.gameEngine.renderCurrentCard();
        }
      });
    }

    // Reset Buttons
    const btnResetCards = document.getElementById('btn-reset-all-cards');
    if (btnResetCards) {
      btnResetCards.addEventListener('click', () => {
        if (confirm('ATENÇÃO: Deseja apagar TODOS os seus Flashcards? Esta ação não pode ser desfeita.')) {
          window.storage.deleteAllCards();
          this.render();
          if (window.manageCards) window.manageCards.render();
          if (window.gameEngine) window.gameEngine.loadCardQueue();
          if (window.app) {
            window.app.updateHeaderStats();
            window.app.showNotification("Todos os Flashcards foram apagados.");
          }
        }
      });
    }

    const btnResetScore = document.getElementById('btn-reset-score');
    if (btnResetScore) {
      btnResetScore.addEventListener('click', () => {
        if (confirm('Deseja zerar a sua pontuação?')) {
          window.storage.resetScore();
          this.render();
          if (window.app) {
            window.app.updateHeaderStats();
            window.app.showNotification("Pontuação zerada.");
          }
        }
      });
    }

    const btnResetStatus = document.getElementById('btn-reset-statuses');
    if (btnResetStatus) {
      btnResetStatus.addEventListener('click', () => {
        if (confirm('Deseja limpar os status de "Aprovado" e "Reprovado" de todos os Flashcards?')) {
          window.storage.resetCardStatuses();
          this.render();
          if (window.gameEngine) window.gameEngine.loadCardQueue();
          if (window.app) window.app.showNotification("Status dos flashcards zerados.");
        }
      });
    }
  }

  render() {
    const data = window.storage.data;

    // Inputs
    const nameInput = document.getElementById('profile-player-name-input');
    if (nameInput) nameInput.value = data.playerName || 'Aluno(a)';

    const goalInput = document.getElementById('profile-daily-goal-input');
    if (goalInput) goalInput.value = data.dailyGoal || 5;

    // Response Mode Radios
    const currentMode = data.responseMode || 'multiple_choice';
    const modeMultiple = document.getElementById('profile-mode-multiple');
    const modeType = document.getElementById('profile-mode-type');

    if (modeMultiple) modeMultiple.checked = (currentMode === 'multiple_choice');
    if (modeType) modeType.checked = (currentMode === 'type');

    // Stats
    const scoreVal = document.getElementById('profile-stat-score');
    if (scoreVal) scoreVal.textContent = data.score || 0;

    const totalCardsVal = document.getElementById('profile-stat-total-cards');
    if (totalCardsVal) totalCardsVal.textContent = data.cards.length;

    const approvedVal = document.getElementById('profile-stat-approved');
    if (approvedVal) approvedVal.textContent = data.cards.filter(c => c.status === 'Aprovado').length;

    const reprovedVal = document.getElementById('profile-stat-reproved');
    if (reprovedVal) reprovedVal.textContent = data.cards.filter(c => c.status === 'Reprovado').length;

    // Daily Goal Progress
    const goalProgressText = document.getElementById('profile-goal-progress-text');
    const goalProgressBar = document.getElementById('profile-goal-progress-bar');
    
    const hits = data.dailyHits || 0;
    const goal = data.dailyGoal || 5;
    const percent = Math.min(100, Math.round((hits / goal) * 100));

    if (goalProgressText) {
      goalProgressText.textContent = `${hits} / ${goal} acertos hoje (${percent}%)`;
    }

    if (goalProgressBar) {
      goalProgressBar.style.width = `${percent}%`;
      if (percent >= 100) {
        goalProgressBar.className = 'h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-green-500 to-emerald-400';
      } else {
        goalProgressBar.className = 'h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-orange-500';
      }
    }
  }
}

window.profileManager = new ProfileManager();
