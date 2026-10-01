/**
 * Card Management Module for MyFlashGame
 * Handles CRUD operations for Flashcards and Categories
 */

class ManageCards {
  constructor() {
    this.currentFilterCategory = 'Todas';
    this.searchQuery = '';
    this.editingCardId = null;
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    // Search & Filter
    const searchInput = document.getElementById('manage-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.renderCardsList();
      });
    }

    const categoryFilter = document.getElementById('manage-category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.currentFilterCategory = e.target.value;
        this.renderCardsList();
      });
    }

    // Modal Trigger for New Card
    const btnOpenNewCardModal = document.getElementById('btn-open-new-card-modal');
    if (btnOpenNewCardModal) {
      btnOpenNewCardModal.addEventListener('click', () => {
        this.openCardModal();
      });
    }

    // Save Card Form Submit
    const cardForm = document.getElementById('card-modal-form');
    if (cardForm) {
      cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveCardFromModal();
      });
    }

    // Close Modal Button
    const btnCloseModal = document.getElementById('btn-close-card-modal');
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => {
        this.closeCardModal();
      });
    }

    // Load Sample Cards Button
    const btnLoadSamples = document.getElementById('btn-load-sample-cards');
    if (btnLoadSamples) {
      btnLoadSamples.addEventListener('click', () => {
        window.storage.loadSampleCards();
        this.render();
        if (window.gameEngine) window.gameEngine.loadCardQueue();
        if (window.app) window.app.showNotification("Cards de exemplo carregados com sucesso!");
      });
    }
  }

  render() {
    this.populateCategorySelects();
    this.renderCardsList();
  }

  populateCategorySelects() {
    const categories = window.storage.data.categories || [];

    // Filter select
    const filterSelect = document.getElementById('manage-category-filter');
    if (filterSelect) {
      let filterHtml = `<option value="Todas">Todas as Matérias</option>`;
      categories.forEach(cat => {
        filterHtml += `<option value="${cat}" ${this.currentFilterCategory === cat ? 'selected' : ''}>${cat}</option>`;
      });
      filterSelect.innerHTML = filterHtml;
    }

    // Modal select
    const modalSelect = document.getElementById('modal-card-category-select');
    if (modalSelect) {
      let modalHtml = `<option value="">-- Selecione uma Matéria --</option>`;
      categories.forEach(cat => {
        modalHtml += `<option value="${cat}">${cat}</option>`;
      });
      modalHtml += `<option value="__NEW__">+ Criar Nova Matéria...</option>`;
      modalSelect.innerHTML = modalHtml;
    }
  }

  renderCardsList() {
    const container = document.getElementById('manage-cards-grid');
    if (!container) return;

    let cards = window.storage.getCards(this.currentFilterCategory);

    // Apply search filter
    if (this.searchQuery) {
      cards = cards.filter(c => 
        c.question.toLowerCase().includes(this.searchQuery) ||
        c.answer.toLowerCase().includes(this.searchQuery) ||
        c.category.toLowerCase().includes(this.searchQuery)
      );
    }

    if (cards.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white/70 backdrop-blur rounded-2xl border-2 border-dashed border-amber-300 p-8 shadow-sm">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4 text-2xl">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">Nenhum Flashcard encontrado</h3>
          <p class="text-slate-600 max-w-md mx-auto mb-6 text-sm">
            ${this.searchQuery || this.currentFilterCategory !== 'Todas' 
              ? 'Tente alterar os filtros de busca ou matéria.' 
              : 'Você ainda não possui flashcards cadastrados. Crie um novo card ou carregue os exemplos prontas!'}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button onclick="window.manageCards.openCardModal()" class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-md transition-all duration-200">
              <i class="fa-solid fa-plus mr-2"></i> Criar Primeiro Flashcard
            </button>
            <button onclick="window.manageCards.loadSampleCardsAction()" class="px-5 py-2.5 bg-white border border-amber-300 hover:bg-amber-50 text-amber-900 font-bold rounded-xl shadow-sm transition-all duration-200">
              <i class="fa-solid fa-wand-magic-sparkles mr-2 text-orange-500"></i> Carregar Cards de Exemplo
            </button>
          </div>
        </div>
      `;
      return;
    }

    let html = '';
    cards.forEach(card => {
      let statusHtml = '';
      if (card.status === 'Aprovado') {
        statusHtml = `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300"><i class="fa-solid fa-check mr-1"></i> Aprovado</span>`;
      } else if (card.status === 'Reprovado') {
        statusHtml = `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300"><i class="fa-solid fa-xmark mr-1"></i> Reprovado</span>`;
      } else {
        statusHtml = `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300"><i class="fa-solid fa-hourglass-start mr-1"></i> Pendente</span>`;
      }

      html += `
        <div class="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-3 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <i class="fa-solid fa-book-bookmark mr-1 text-orange-500"></i> ${this.escapeHtml(card.category)}
              </span>
              ${statusHtml}
            </div>
            
            <div class="mb-4">
              <h4 class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Pergunta / Frente:</h4>
              <p class="text-slate-800 font-bold text-base line-clamp-3 bg-amber-50/50 p-3 rounded-xl border border-amber-100/60">
                ${this.escapeHtml(card.question)}
              </p>
            </div>

            <div class="mb-4">
              <h4 class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Resposta / Verso:</h4>
              <p class="text-slate-700 text-sm line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                ${this.escapeHtml(card.answer)}
              </p>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button onclick="window.manageCards.openCardModal('${card.id}')" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-amber-700 bg-slate-100 hover:bg-amber-100 transition-colors">
              <i class="fa-solid fa-pen-to-square mr-1"></i> Editar
            </button>
            <button onclick="window.manageCards.deleteCardAction('${card.id}')" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 transition-colors">
              <i class="fa-solid fa-trash-can mr-1"></i> Excluir
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  openCardModal(cardId = null) {
    this.editingCardId = cardId;
    const modal = document.getElementById('card-modal');
    const modalTitle = document.getElementById('modal-title');
    const inputQuestion = document.getElementById('modal-card-question');
    const inputAnswer = document.getElementById('modal-card-answer');
    const selectCategory = document.getElementById('modal-card-category-select');
    const inputNewCategory = document.getElementById('modal-card-new-category');
    const newCatContainer = document.getElementById('modal-new-category-container');

    if (!modal) return;

    this.populateCategorySelects();

    if (cardId) {
      const card = window.storage.data.cards.find(c => c.id === cardId);
      if (card) {
        if (modalTitle) modalTitle.textContent = 'Editar Flashcard';
        if (inputQuestion) inputQuestion.value = card.question;
        if (inputAnswer) inputAnswer.value = card.answer;
        if (selectCategory) selectCategory.value = card.category;
        if (newCatContainer) newCatContainer.classList.add('hidden');
      }
    } else {
      if (modalTitle) modalTitle.textContent = 'Novo Flashcard';
      if (inputQuestion) inputQuestion.value = '';
      if (inputAnswer) inputAnswer.value = '';
      if (selectCategory) selectCategory.value = this.currentFilterCategory !== 'Todas' ? this.currentFilterCategory : '';
      if (newCatContainer) newCatContainer.classList.add('hidden');
    }

    if (selectCategory) {
      selectCategory.onchange = (e) => {
        if (e.target.value === '__NEW__') {
          if (newCatContainer) newCatContainer.classList.remove('hidden');
        } else {
          if (newCatContainer) newCatContainer.classList.add('hidden');
        }
      };
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeCardModal() {
    const modal = document.getElementById('card-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    this.editingCardId = null;
  }

  saveCardFromModal() {
    const inputQuestion = document.getElementById('modal-card-question');
    const inputAnswer = document.getElementById('modal-card-answer');
    const selectCategory = document.getElementById('modal-card-category-select');
    const inputNewCategory = document.getElementById('modal-card-new-category');

    const question = inputQuestion ? inputQuestion.value.trim() : '';
    const answer = inputAnswer ? inputAnswer.value.trim() : '';
    let category = selectCategory ? selectCategory.value : '';

    if (category === '__NEW__') {
      category = inputNewCategory ? inputNewCategory.value.trim() : '';
    }

    if (!question || !answer || !category) {
      alert('Por favor, preencha a pergunta, a resposta e a matéria!');
      return;
    }

    if (this.editingCardId) {
      window.storage.updateCard(this.editingCardId, question, answer, category);
      if (window.app) window.app.showNotification("Flashcard atualizado!");
    } else {
      window.storage.addCard(question, answer, category);
      if (window.app) window.app.showNotification("Novo Flashcard criado!");
    }

    this.closeCardModal();
    this.render();

    if (window.gameEngine) window.gameEngine.loadCardQueue();
    if (window.app) window.app.updateHeaderStats();
  }

  deleteCardAction(cardId) {
    if (confirm('Tem certeza que deseja excluir este flashcard?')) {
      window.storage.deleteCard(cardId);
      this.render();
      if (window.gameEngine) window.gameEngine.loadCardQueue();
      if (window.app) {
        window.app.updateHeaderStats();
        window.app.showNotification("Flashcard excluído.");
      }
    }
  }

  loadSampleCardsAction() {
    window.storage.loadSampleCards();
    this.render();
    if (window.gameEngine) window.gameEngine.loadCardQueue();
    if (window.app) window.app.showNotification("Cards de exemplo carregados!");
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

window.manageCards = new ManageCards();
