/**
 * Game Module for MyFlashGame
 * Handles Flash Cards queue, 3D card flip, scoring, and card priority
 */

class GameEngine {
  constructor() {
    this.currentCategory = 'Todas';
    this.currentCardIndex = 0;
    this.currentCard = null;
    this.cardQueue = [];
    this.isFlipped = false;
  }

  init() {
    this.setupEventListeners();
    this.refreshCategoriesDropdown();
    this.loadCardQueue();
  }

  setupEventListeners() {
    const categorySelect = document.getElementById('game-category-select');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.currentCategory = e.target.value;
        this.loadCardQueue();
      });
    }

    const flipBtn = document.getElementById('btn-flip-card');
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        this.flipCard();
      });
    }

    const checkForm = document.getElementById('answer-form');
    if (checkForm) {
      checkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.flipCard();
      });
    }

    const btnCorrect = document.getElementById('btn-mark-correct');
    if (btnCorrect) {
      btnCorrect.addEventListener('click', () => {
        this.handleAnswerResult(true);
      });
    }

    const btnIncorrect = document.getElementById('btn-mark-incorrect');
    if (btnIncorrect) {
      btnIncorrect.addEventListener('click', () => {
        this.handleAnswerResult(false);
      });
    }

    const btnNext = document.getElementById('btn-next-card');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.nextCard();
      });
    }

    const btnResetDeck = document.getElementById('btn-reset-deck-statuses');
    if (btnResetDeck) {
      btnResetDeck.addEventListener('click', () => {
        window.storage.resetCardStatuses();
        this.loadCardQueue();
        if (window.app) window.app.showNotification("Status de todos os cards resetados!");
      });
    }
  }

  refreshCategoriesDropdown() {
    const categorySelect = document.getElementById('game-category-select');
    if (!categorySelect) return;

    const categories = window.storage.data.categories || [];
    let html = `<option value="Todas">Todas as Matérias</option>`;
    categories.forEach(cat => {
      const selected = (this.currentCategory === cat) ? 'selected' : '';
      html += `<option value="${cat}" ${selected}>${cat}</option>`;
    });

    categorySelect.innerHTML = html;
  }

  /**
   * Card Queue Priority Logic:
   * 1. Filter cards by selected category
   * 2. Prioritize cards with status '' or 'Reprovado' FIRST
   * 3. Place 'Aprovado' cards at the end of the queue
   */
  loadCardQueue() {
    const allCards = window.storage.getCards(this.currentCategory);
    
    if (allCards.length === 0) {
      this.cardQueue = [];
      this.currentCard = null;
      this.renderEmptyState();
      return;
    }

    // Split cards by priority
    const priorityCards = allCards.filter(c => !c.status || c.status === 'Reprovado');
    const approvedCards = allCards.filter(c => c.status === 'Aprovado');

    // Combine queue: Pending/Reprovado first, then Approved
    this.cardQueue = [...priorityCards, ...approvedCards];
    this.currentCardIndex = 0;
    this.currentCard = this.cardQueue[0];
    this.isFlipped = false;

    this.renderCurrentCard();
    this.updateQueueStats(priorityCards.length, approvedCards.length, allCards.length);
  }

  renderCurrentCard() {
    const cardContainer = document.getElementById('game-card-container');
    const emptyContainer = document.getElementById('game-empty-container');
    const cardInner = document.getElementById('game-card-inner');
    const questionEl = document.getElementById('card-question-text');
    const answerEl = document.getElementById('card-answer-text');
    const categoryBadge = document.getElementById('card-category-badge');
    const statusBadge = document.getElementById('card-status-badge');
    const userAnswerInput = document.getElementById('user-answer-input');
    const autoVerdictEl = document.getElementById('card-auto-verdict');

    if (!this.currentCard) {
      this.renderEmptyState();
      return;
    }

    if (cardContainer) cardContainer.classList.remove('hidden');
    if (emptyContainer) emptyContainer.classList.add('hidden');

    // Unflip card
    if (cardInner) {
      cardInner.classList.remove('is-flipped');
    }
    this.isFlipped = false;

    // Set Front Side Content
    if (questionEl) questionEl.textContent = this.currentCard.question;
    if (categoryBadge) categoryBadge.textContent = this.currentCard.category;

    // Status Badge Styling
    if (statusBadge) {
      if (this.currentCard.status === 'Aprovado') {
        statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-green-200 text-green-800 border border-green-400';
        statusBadge.innerHTML = '<i class="fa-solid fa-check mr-1"></i> Aprovado';
      } else if (this.currentCard.status === 'Reprovado') {
        statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-red-200 text-red-800 border border-red-400';
        statusBadge.innerHTML = '<i class="fa-solid fa-xmark mr-1"></i> Reprovado';
      } else {
        statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-900 border border-amber-400';
        statusBadge.innerHTML = '<i class="fa-solid fa-hourglass-start mr-1"></i> Pendente';
      }
    }

    // Set Back Side Content
    if (answerEl) answerEl.textContent = this.currentCard.answer;

    // Clear input & verdict
    if (userAnswerInput) userAnswerInput.value = '';
    if (autoVerdictEl) {
      autoVerdictEl.className = 'hidden p-3 rounded-lg text-sm font-semibold mb-3 text-center';
      autoVerdictEl.textContent = '';
    }

    // Controls display
    const checkControls = document.getElementById('card-check-controls');
    const feedbackControls = document.getElementById('card-feedback-controls');
    if (checkControls) checkControls.classList.remove('hidden');
    if (feedbackControls) feedbackControls.classList.add('hidden');
  }

  flipCard() {
    if (!this.currentCard) return;

    const cardInner = document.getElementById('game-card-inner');
    const userAnswerInput = document.getElementById('user-answer-input');
    const autoVerdictEl = document.getElementById('card-auto-verdict');
    const checkControls = document.getElementById('card-check-controls');
    const feedbackControls = document.getElementById('card-feedback-controls');

    this.isFlipped = true;
    if (cardInner) {
      cardInner.classList.add('is-flipped');
    }

    // Compare user typed answer if any
    const typed = userAnswerInput ? userAnswerInput.value.trim() : '';
    const actual = this.currentCard.answer.trim();

    if (typed.length > 0 && autoVerdictEl) {
      const isSimilar = this.normalizeString(typed) === this.normalizeString(actual);
      autoVerdictEl.classList.remove('hidden');
      if (isSimilar) {
        autoVerdictEl.className = 'p-3 rounded-lg text-sm font-semibold mb-3 text-center bg-green-100 text-green-800 border border-green-300';
        autoVerdictEl.innerHTML = '<i class="fa-solid fa-circle-check mr-1"></i> Sua resposta parece EXATA!';
      } else {
        autoVerdictEl.className = 'p-3 rounded-lg text-sm font-semibold mb-3 text-center bg-amber-100 text-amber-800 border border-amber-300';
        autoVerdictEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1"></i> Sua resposta: <strong>"${typed}"</strong>.<br>Compare com a resposta correta acima!`;
      }
    }

    // Switch action buttons below
    if (checkControls) checkControls.classList.add('hidden');
    if (feedbackControls) feedbackControls.classList.remove('hidden');
  }

  handleAnswerResult(isCorrect) {
    if (!this.currentCard) return;

    if (isCorrect) {
      // Update status to Aprovado
      window.storage.updateCardStatus(this.currentCard.id, 'Aprovado');
      this.currentCard.status = 'Aprovado';

      // Score + 5 & Daily Goal check
      const result = window.storage.registerCorrectAnswer();

      // Trigger floating +5 animation
      this.spawnFloatingScore('+5');

      // Check daily goal reached
      if (result.isGoalReached && window.app) {
        window.app.triggerDailyGoalToast();
      } else if (window.confetti) {
        // Little burst on correct answer
        window.confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      }

      if (window.app) window.app.updateHeaderStats();
    } else {
      // Update status to Reprovado
      window.storage.updateCardStatus(this.currentCard.id, 'Reprovado');
      this.currentCard.status = 'Reprovado';
    }

    this.nextCard();
  }

  nextCard() {
    this.currentCardIndex++;
    if (this.currentCardIndex < this.cardQueue.length) {
      this.currentCard = this.cardQueue[this.currentCardIndex];
      this.renderCurrentCard();
    } else {
      // Re-evaluate queue or show finished state
      this.loadCardQueue();
    }
  }

  normalizeString(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .trim();
  }

  spawnFloatingScore(text) {
    const cardEl = document.getElementById('game-card-container');
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const floatEl = document.createElement('div');
    floatEl.className = 'floating-score';
    floatEl.textContent = text;
    floatEl.style.left = `${rect.left + rect.width / 2 - 25}px`;
    floatEl.style.top = `${rect.top + 30}px`;

    document.body.appendChild(floatEl);

    setTimeout(() => {
      if (floatEl && floatEl.parentNode) {
        floatEl.parentNode.removeChild(floatEl);
      }
    }, 1200);
  }

  updateQueueStats(priorityCount, approvedCount, totalCount) {
    const queueStatsEl = document.getElementById('game-queue-stats');
    if (queueStatsEl) {
      queueStatsEl.innerHTML = `
        <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
          <i class="fa-solid fa-hourglass mr-1"></i> A estudar / Reprovados: ${priorityCount}
        </span>
        <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
          <i class="fa-solid fa-check-double mr-1"></i> Aprovados: ${approvedCount}
        </span>
        <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800">
          <i class="fa-solid fa-layer-group mr-1"></i> Total: ${totalCount}
        </span>
      `;
    }
  }

  renderEmptyState() {
    const cardContainer = document.getElementById('game-card-container');
    const emptyContainer = document.getElementById('game-empty-container');
    const queueStatsEl = document.getElementById('game-queue-stats');

    if (cardContainer) cardContainer.classList.add('hidden');
    if (emptyContainer) emptyContainer.classList.remove('hidden');
    if (queueStatsEl) queueStatsEl.innerHTML = '';
  }
}

window.gameEngine = new GameEngine();
