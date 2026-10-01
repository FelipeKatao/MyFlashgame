/**
 * Storage Manager for MyFlashGame
 * Handles dual persistence: LocalStorage + Browser Cookies
 */

const STORAGE_KEY = 'MY_FLASHGAME_DATA_V1';

// Default initial state
const defaultData = {
  playerName: 'Aluno(a)',
  score: 0,
  dailyGoal: 5,
  dailyHits: 0,
  lastGoalDate: new Date().toISOString().split('T')[0],
  goalReachedToday: false,
  responseMode: 'multiple_choice', // 'multiple_choice' or 'type'
  installedPlugins: [], // e.g. ['english-advanced', 'pwa-notifications']
  notificationSettings: {
    category: 'Todas',
    intervalMinutes: 1, // default to 1 min for fast testing
    enabled: true
  },
  categories: ['Geral', 'Matemática', 'Ciências', 'História', 'Inglês'],
  cards: []
};

// Starter sample cards for users who want to load demo cards quickly
const SAMPLE_CARDS = [
  {
    id: 'sample-1',
    question: 'Qual é a capital do Brasil?',
    answer: 'Brasília',
    category: 'Geral',
    status: ''
  },
  {
    id: 'sample-2',
    question: 'Quanto é 7 x 8?',
    answer: '56',
    category: 'Matemática',
    status: ''
  },
  {
    id: 'sample-3',
    question: 'Qual é o maior planeta do Sistema Solar?',
    answer: 'Júpiter',
    category: 'Ciências',
    status: ''
  },
  {
    id: 'sample-4',
    question: 'Em que ano ocorreu a Proclamação da República no Brasil?',
    answer: '1889',
    category: 'História',
    status: ''
  },
  {
    id: 'sample-5',
    question: 'Como se diz "Obrigado" em inglês?',
    answer: 'Thank you',
    category: 'Inglês',
    status: ''
  }
];

class AppStorage {
  constructor() {
    this.data = this.loadData();
    this.checkDailyReset();
  }

  // --- Cookie Helpers ---
  setCookie(name, value, days = 365) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "; expires=" + date.toUTCString();
      const encodedValue = encodeURIComponent(value);
      document.cookie = name + "=" + (encodedValue || "") + expires + "; path=/; SameSite=Lax";
    } catch (e) {
      console.warn("Cookie set error:", e);
    }
  }

  getCookie(name) {
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          const raw = c.substring(nameEQ.length, c.length);
          return decodeURIComponent(raw);
        }
      }
    } catch (e) {
      console.warn("Cookie get error:", e);
    }
    return null;
  }

  // --- Core Persistence ---
  loadData() {
    let raw = null;

    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.warn("LocalStorage load error:", e);
    }

    if (!raw) {
      raw = this.getCookie(STORAGE_KEY);
    }

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return {
          ...defaultData,
          ...parsed,
          notificationSettings: {
            ...defaultData.notificationSettings,
            ...(parsed.notificationSettings || {})
          }
        };
      } catch (e) {
        console.error("Error parsing stored data:", e);
      }
    }

    return { ...defaultData };
  }

  saveData() {
    const jsonStr = JSON.stringify(this.data);

    try {
      localStorage.setItem(STORAGE_KEY, jsonStr);
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }

    this.setCookie(STORAGE_KEY, jsonStr);
  }

  checkDailyReset() {
    const today = new Date().toISOString().split('T')[0];
    if (this.data.lastGoalDate !== today) {
      this.data.lastGoalDate = today;
      this.data.dailyHits = 0;
      this.data.goalReachedToday = false;
      this.saveData();
    }
  }

  // --- Notification Settings ---
  setNotificationSettings(category, intervalMinutes, enabled = true) {
    this.data.notificationSettings = {
      category: category || 'Todas',
      intervalMinutes: Math.max(1, parseInt(intervalMinutes) || 1),
      enabled: enabled !== false
    };
    this.saveData();
  }

  // --- Response Mode Settings ---
  setResponseMode(mode) {
    if (mode === 'multiple_choice' || mode === 'type') {
      this.data.responseMode = mode;
      this.saveData();
    }
  }

  // --- Plugin Settings ---
  isPluginInstalled(pluginId) {
    return Array.isArray(this.data.installedPlugins) && this.data.installedPlugins.includes(pluginId);
  }

  setPluginInstalled(pluginId, installed) {
    if (!Array.isArray(this.data.installedPlugins)) {
      this.data.installedPlugins = [];
    }

    if (installed) {
      if (!this.data.installedPlugins.includes(pluginId)) {
        this.data.installedPlugins.push(pluginId);
      }
    } else {
      this.data.installedPlugins = this.data.installedPlugins.filter(id => id !== pluginId);
    }
    this.saveData();
  }

  // --- Card Management ---
  getCards(category = 'Todas') {
    if (!category || category === 'Todas') {
      return [...this.data.cards];
    }
    return this.data.cards.filter(c => c.category === category);
  }

  addCard(question, answer, category, extraData = {}) {
    const newCard = {
      id: 'card-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      question: question.trim(),
      answer: answer.trim(),
      category: category ? category.trim() : 'Geral',
      status: '', // '', 'Aprovado', 'Reprovado'
      ...extraData
    };

    if (!this.data.categories.includes(newCard.category)) {
      this.data.categories.push(newCard.category);
    }

    this.data.cards.push(newCard);
    this.saveData();
    return newCard;
  }

  updateCard(id, question, answer, category, extraData = {}) {
    const card = this.data.cards.find(c => c.id === id);
    if (card) {
      card.question = question.trim();
      card.answer = answer.trim();
      card.category = category ? category.trim() : 'Geral';
      Object.assign(card, extraData);

      if (!this.data.categories.includes(card.category)) {
        this.data.categories.push(card.category);
      }
      this.saveData();
      return true;
    }
    return false;
  }

  deleteCard(id) {
    this.data.cards = this.data.cards.filter(c => c.id !== id);
    this.saveData();
  }

  updateCardStatus(id, status) {
    const card = this.data.cards.find(c => c.id === id);
    if (card) {
      card.status = status; // 'Aprovado', 'Reprovado', or ''
      this.saveData();
    }
  }

  loadSampleCards() {
    SAMPLE_CARDS.forEach(sample => {
      if (!this.data.cards.some(c => c.question === sample.question)) {
        this.data.cards.push({ ...sample, id: 'sample-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4) });
      }
    });
    this.saveData();
  }

  // --- Profile & Stats ---
  addScore(points) {
    this.data.score = Math.max(0, (this.data.score || 0) + points);
    this.saveData();
  }

  setPlayerName(name) {
    this.data.playerName = name.trim() || 'Aluno(a)';
    this.saveData();
  }

  setDailyGoal(goal) {
    this.data.dailyGoal = Math.max(1, parseInt(goal) || 1);
    this.saveData();
  }

  registerCorrectAnswer() {
    this.addScore(5);
    this.data.dailyHits = (this.data.dailyHits || 0) + 1;
    
    let isGoalReached = false;
    if (this.data.dailyHits >= this.data.dailyGoal && !this.data.goalReachedToday) {
      this.data.goalReachedToday = true;
      isGoalReached = true;
    }

    this.saveData();
    return { scoreAdded: 5, isGoalReached };
  }

  // --- Resets ---
  deleteAllCards() {
    this.data.cards = [];
    this.saveData();
  }

  resetScore() {
    this.data.score = 0;
    this.saveData();
  }

  resetCardStatuses() {
    this.data.cards.forEach(c => c.status = '');
    this.saveData();
  }

  addCategory(categoryName) {
    const trimmed = categoryName.trim();
    if (trimmed && !this.data.categories.includes(trimmed)) {
      this.data.categories.push(trimmed);
      this.saveData();
      return true;
    }
    return false;
  }
}

// Global storage singleton instance
window.storage = new AppStorage();
