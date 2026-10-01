/**
 * Game Module for MyFlashGame
 * Handles Flash Cards queue, 3D card flip, scoring, multiple choice, typing mode, and automatic validation
 */

class GameEngine {
  constructor() {
    this.currentCategory = 'Todas';
    this.currentCardIndex = 0;
    this.currentCard = null;
    this.cardQueue = [];
    this.isFlipped = false;
    this.selectedMultipleChoice = null;
    this.generatedChoices = [];
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

    // Next card button
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
   * Priority queue logic:
   * 1. Filter by category
   * 2. Prioritize cards with status '' or 'Reprovado' FIRST
   * 3. Place 'Aprovado' cards at the end
   */
  loadCardQueue() {
    const allCards = window.storage.getCards(this.currentCategory);
    
    if (allCards.length === 0) {
      this.cardQueue = [];
      this.currentCard = null;
      this.renderEmptyState();
      return;
    }

    const priorityCards = allCards.filter(c => !c.status || c.status === 'Reprovado');
    const approvedCards = allCards.filter(c => c.status === 'Aprovado');

    this.cardQueue = [...priorityCards, ...approvedCards];
    this.currentCardIndex = 0;
    this.currentCard = this.cardQueue[0];
    this.isFlipped = false;

    this.renderCurrentCard();
    this.updateQueueStats(priorityCards.length, approvedCards.length, allCards.length);
  }

  /**
   * Loads a specific targeted card from Notification click
   */
  loadSpecificCard(cardId, category) {
    if (category) {
      this.currentCategory = category;
      this.refreshCategoriesDropdown();
    }

    let allCards = window.storage.getCards(this.currentCategory);
    
    // If card is not in current category, search across all cards
    if (!allCards.some(c => c.id === cardId)) {
      const found = window.storage.data.cards.find(c => c.id === cardId);
      if (found) {
        this.currentCategory = found.category;
        this.refreshCategoriesDropdown();
        allCards = window.storage.getCards(this.currentCategory);
      } else {
        this.currentCategory = 'Todas';
        this.refreshCategoriesDropdown();
        allCards = window.storage.getCards('Todas');
      }
    }

    if (allCards.length === 0) {
      this.renderEmptyState();
      return;
    }

    const priorityCards = allCards.filter(c => !c.status || c.status === 'Reprovado');
    const approvedCards = allCards.filter(c => c.status === 'Aprovado');

    this.cardQueue = [...priorityCards, ...approvedCards];

    let targetIdx = this.cardQueue.findIndex(c => c.id === cardId);
    if (targetIdx === -1) {
      targetIdx = 0;
    }

    this.currentCardIndex = targetIdx;
    this.currentCard = this.cardQueue[targetIdx];
    this.isFlipped = false;

    this.renderCurrentCard();
    this.updateQueueStats(priorityCards.length, approvedCards.length, allCards.length);
  }

  renderCurrentCard() {
    const cardContainer = document.getElementById('game-card-container');
    const emptyContainer = document.getElementById('game-empty-container');
    const cardInner = document.getElementById('game-card-inner');
    const questionEl = document.getElementById('card-question-text');
    const phoneticContainer = document.getElementById('card-phonetic-container');
    const answerEl = document.getElementById('card-answer-text');
    const exampleContainer = document.getElementById('card-example-container');
    const categoryBadge = document.getElementById('card-category-badge');
    const statusBadge = document.getElementById('card-status-badge');

    if (!this.currentCard) {
      this.renderEmptyState();
      return;
    }

    if (cardContainer) cardContainer.classList.remove('hidden');
    if (emptyContainer) emptyContainer.classList.add('hidden');

    // Unflip card 3D
    if (cardInner) {
      cardInner.classList.remove('is-flipped');
    }
    this.isFlipped = false;

    // Category and Status badges
    if (categoryBadge) categoryBadge.textContent = this.currentCard.category;
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

    // Question / Front Text
    if (questionEl) questionEl.textContent = this.currentCard.question;

    // Special Phonetic display (Plugin Inglês Avançado support)
    if (phoneticContainer) {
      if (this.currentCard.phonetic) {
        phoneticContainer.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-200/90 text-amber-950 border border-amber-400">
            <i class="fa-solid fa-volume-high text-orange-600"></i> Como lê: ${this.currentCard.phonetic}
          </span>
        `;
        phoneticContainer.classList.remove('hidden');
      } else {
        phoneticContainer.classList.add('hidden');
        phoneticContainer.innerHTML = '';
      }
    }

    // Answer / Back Text
    if (answerEl) answerEl.textContent = this.currentCard.answer;

    // Special Example display (Plugin Inglês Avançado support)
    if (exampleContainer) {
      if (this.currentCard.example) {
        exampleContainer.innerHTML = `
          <div class="mt-2 p-2.5 rounded-xl bg-orange-100/70 border border-orange-200 text-xs font-semibold text-orange-950 text-center">
            <span class="font-extrabold text-orange-800 uppercase tracking-wider text-[10px] block mb-0.5">Aplicação:</span>
            "${this.currentCard.example}"
          </div>
        `;
        exampleContainer.classList.remove('hidden');
      } else {
        exampleContainer.classList.add('hidden');
        exampleContainer.innerHTML = '';
      }
    }

    // Render Answer Controls depending on Response Mode ('multiple_choice' vs 'type')
    this.renderResponseModeControls();

    // Hide feedback controls until submitted
    const feedbackControls = document.getElementById('card-feedback-controls');
    if (feedbackControls) feedbackControls.classList.add('hidden');
  }

  renderResponseModeControls() {
    const mode = window.storage.data.responseMode || 'multiple_choice';
    const container = document.getElementById('response-mode-container');
    if (!container) return;

    if (mode === 'multiple_choice') {
      this.generatedChoices = this.generateMultipleChoices();
      this.selectedMultipleChoice = null;

      let choicesHtml = `
        <div class="space-y-2 mb-3">
          <label class="block text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-2">
            <i class="fa-solid fa-list-check text-orange-500 mr-1"></i> Selecione a resposta correta:
          </label>
      `;

      this.generatedChoices.forEach((choice, idx) => {
        choicesHtml += `
          <button type="button" onclick="window.gameEngine.selectChoice(${idx})" id="choice-btn-${idx}" class="choice-option-btn w-full p-3 bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-200 hover:border-amber-400 rounded-xl font-bold text-slate-800 text-sm transition-all text-left flex items-center justify-between">
            <span>${idx + 1}) ${this.escapeHtml(choice)}</span>
            <i class="fa-regular fa-circle text-amber-400 text-base"></i>
          </button>
        `;
      });

      choicesHtml += `
        </div>
        <button type="button" id="btn-submit-choice" onclick="window.gameEngine.submitMultipleChoice()" disabled class="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
          <i class="fa-solid fa-check-double"></i> Confirmar e Virar Card
        </button>
      `;

      container.innerHTML = choicesHtml;
    } else {
      // Type mode
      container.innerHTML = `
        <form id="type-answer-form" onsubmit="event.preventDefault(); window.gameEngine.submitTypedAnswer();" class="space-y-3">
          <label for="user-answer-input" class="block text-xs uppercase tracking-wider font-extrabold text-slate-500">
            <i class="fa-solid fa-keyboard text-orange-500 mr-1"></i> Digite sua Resposta:
          </label>
          <div class="flex flex-col sm:flex-row gap-3">
            <input type="text" id="user-answer-input" placeholder="Digite aqui a resposta exatamente..." autocomplete="off" class="flex-1 px-4 py-3 bg-amber-50/60 border border-amber-300 rounded-xl font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <button type="submit" class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
              <i class="fa-solid fa-paper-plane"></i> Enviar & Virar
            </button>
          </div>
        </form>
      `;
    }
  }

  generateMultipleChoices() {
    if (!this.currentCard) return [];

    const correctAnswer = this.currentCard.answer;
    const category = this.currentCategory;

    // Get other cards from same category
    let otherCards = window.storage.data.cards.filter(c => c.id !== this.currentCard.id);
    let categoryOthers = otherCards.filter(c => c.category === category && c.answer !== correctAnswer);

    // If not enough cards in category, pick from all cards
    if (categoryOthers.length < 2) {
      categoryOthers = otherCards.filter(c => c.answer !== correctAnswer);
    }

    // Shuffle and pick 2 incorrect answers
    categoryOthers.sort(() => 0.5 - Math.random());
    const incorrectAnswers = categoryOthers.slice(0, 2).map(c => c.answer);

    // Fallbacks if system has fewer than 3 total cards
    while (incorrectAnswers.length < 2) {
      const dummyFallbacks = ['Opção Alternativa B', 'Nenhuma das anteriores', 'Resposta Indefinida', 'Conceito Genérico'];
      const dummy = dummyFallbacks.find(d => d !== correctAnswer && !incorrectAnswers.includes(d)) || `Opção ${incorrectAnswers.length + 1}`;
      incorrectAnswers.push(dummy);
    }

    // Combine correct + 2 incorrect and shuffle
    const choices = [correctAnswer, ...incorrectAnswers];
    choices.sort(() => 0.5 - Math.random());
    return choices;
  }

  selectChoice(idx) {
    this.selectedMultipleChoice = this.generatedChoices[idx];

    // Highlight selected button UI
    document.querySelectorAll('.choice-option-btn').forEach((btn, i) => {
      if (i === idx) {
        btn.className = 'choice-option-btn w-full p-3 bg-orange-100 border-2 border-orange-500 rounded-xl font-bold text-orange-950 text-sm transition-all text-left flex items-center justify-between shadow-sm';
        btn.querySelector('i').className = 'fa-solid fa-circle-dot text-orange-600 text-base';
      } else {
        btn.className = 'choice-option-btn w-full p-3 bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-200 hover:border-amber-400 rounded-xl font-bold text-slate-800 text-sm transition-all text-left flex items-center justify-between';
        btn.querySelector('i').className = 'fa-regular fa-circle text-amber-400 text-base';
      }
    });

    const btnSubmit = document.getElementById('btn-submit-choice');
    if (btnSubmit) btnSubmit.disabled = false;
  }

  submitMultipleChoice() {
    if (!this.selectedMultipleChoice || !this.currentCard) return;

    const isCorrect = (this.selectedMultipleChoice.trim() === this.currentCard.answer.trim());
    this.processAutomaticValidation(isCorrect, this.selectedMultipleChoice);
  }

  submitTypedAnswer() {
    const input = document.getElementById('user-answer-input');
    const userText = input ? input.value : '';

    // Clean whitespace and lowercase as required
    const cleanedUser = userText.trim().toLowerCase();
    const cleanedActual = this.currentCard.answer.trim().toLowerCase();

    const isCorrect = (cleanedUser === cleanedActual);
    this.processAutomaticValidation(isCorrect, userText);
  }

  processAutomaticValidation(isCorrect, providedAnswer) {
    // 1. Flip Card 3D
    const cardInner = document.getElementById('game-card-inner');
    this.isFlipped = true;
    if (cardInner) {
      cardInner.classList.add('is-flipped');
    }

    // 2. Render Automatic Verdict Banner on back side
    const autoVerdictEl = document.getElementById('card-auto-verdict');
    if (autoVerdictEl) {
      autoVerdictEl.classList.remove('hidden');
      if (isCorrect) {
        autoVerdictEl.className = 'p-3 bg-green-100 text-green-900 border-2 border-green-400 rounded-2xl font-black text-sm text-center mb-3 shadow-sm';
        autoVerdictEl.innerHTML = `
          <i class="fa-solid fa-circle-check text-green-600 text-lg mr-1"></i> Resposta Correta! (+5 pontos)
        `;
      } else {
        autoVerdictEl.className = 'p-3 bg-red-100 text-red-950 border-2 border-red-300 rounded-2xl font-bold text-xs sm:text-sm text-center mb-3 shadow-sm';
        autoVerdictEl.innerHTML = `
          <i class="fa-solid fa-circle-xmark text-red-600 text-lg mr-1"></i> Resposta Incorreta!<br>
          <span class="text-xs text-red-800">Sua resposta: "${this.escapeHtml(providedAnswer)}"</span>
        `;
      }
    }

    // 3. Register outcome automatically
    if (isCorrect) {
      window.storage.updateCardStatus(this.currentCard.id, 'Aprovado');
      this.currentCard.status = 'Aprovado';
      const result = window.storage.registerCorrectAnswer();

      this.spawnFloatingScore('+5');

      if (result.isGoalReached && window.app) {
        window.app.triggerDailyGoalToast();
      } else if (window.confetti) {
        window.confetti({ particleCount: 40, spread: 65, origin: { y: 0.7 } });
      }

      if (window.app) window.app.updateHeaderStats();
    } else {
      window.storage.updateCardStatus(this.currentCard.id, 'Reprovado');
      this.currentCard.status = 'Reprovado';
    }

    // Show next card button
    const feedbackControls = document.getElementById('card-feedback-controls');
    if (feedbackControls) feedbackControls.classList.remove('hidden');
  }

  nextCard() {
    this.currentCardIndex++;
    if (this.currentCardIndex < this.cardQueue.length) {
      this.currentCard = this.cardQueue[this.currentCardIndex];
      this.renderCurrentCard();
    } else {
      this.loadCardQueue();
    }
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
          <i class="fa-solid fa-hourglass mr-1"></i> Pendentes/Reprovados: ${priorityCount}
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

  escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.gameEngine = new GameEngine();
