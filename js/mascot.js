/**
 * Mascot Manager Module for MyFlashGame
 * Handles Mascot animation, speech bubble messages, and screen state triggers
 */

class MascotManager {
  constructor() {
    this.speechElement = null;
    this.containerElement = null;
    this.typingTimer = null;
    this.messages = {
      home: "Olá! Sou o Finny! 🐠 Vamos aprender algo novo hoje? Crie seus cards ou teste com exemplos!",
      game: "Selecione ou digite a resposta certa e ganhe +5 pontos! Estou torcendo por você!",
      manage: "Aqui você organiza seus estudos por matéria. Crie, edite ou exclua seus flashcards!",
      profile: "Personalize seu nome, escolha seu modo de resposta e mantenha sua meta diária em dia!",
      export: "Gere arquivos PDF prontos para imprimir e revisar no papel onde você estiver!",
      plugins: "Instale plugins para desbloquear 80 palavras em inglês e Notificações Push PWA!"
    };
  }

  init() {
    this.speechElement = document.getElementById('mascot-speech-text');
    this.containerElement = document.getElementById('mascot-top-banner');
    
    // Inject animated SVG mascot into container if SVG element exists
    this.setupMascotSvg();
  }

  async setupMascotSvg() {
    const mascotWrapper = document.getElementById('mascot-svg-wrapper');
    if (!mascotWrapper) return;

    try {
      const response = await fetch('images/Mascote.svg');
      if (response.ok) {
        let svgText = await response.text();
        
        // Add animation classes or IDs to SVG elements if needed
        svgText = svgText.replace('<svg', '<svg class="mascot-svg-animated"');
        
        mascotWrapper.innerHTML = svgText;
      }
    } catch (err) {
      console.warn("Could not fetch Mascote.svg inline, fallback to img tag:", err);
      mascotWrapper.innerHTML = `<img src="images/Mascote.svg" class="w-14 h-14 mascot-float-anim" alt="Mascote">`;
    }
  }

  speak(text) {
    if (!this.speechElement) {
      this.speechElement = document.getElementById('mascot-speech-text');
    }
    if (!this.speechElement) return;

    // Bounce speech bubble effect
    const bubble = document.getElementById('mascot-speech-bubble');
    if (bubble) {
      bubble.classList.remove('mascot-pop-anim');
      void bubble.offsetWidth; // Trigger reflow
      bubble.classList.add('mascot-pop-anim');
    }

    // Type text animation
    if (this.typingTimer) clearInterval(this.typingTimer);
    
    this.speechElement.textContent = text;
  }

  onScreenChange(screenId) {
    const text = this.messages[screenId] || "Vamos estudar juntos com os Flashcards!";
    this.speak(text);
  }

  onCorrectAnswer() {
    const compliments = [
      "Mandou muito bem! +5 pontos pra conta! 🎉",
      "Excelente acerto! Você está no caminho certo! ⭐",
      "Impressionante! Mais um acerto garantido! 🚀",
      "Perfeito! Continue assim e domine a matéria! 🎓"
    ];
    const rand = compliments[Math.floor(Math.random() * compliments.length)];
    this.speak(rand);
  }

  onIncorrectAnswer(correctAnswer) {
    this.speak(`Não desanime! A resposta era "${correctAnswer}". Na próxima você acerta! 💪`);
  }

  onDailyGoalReached(playerName) {
    this.speak(`INCRÍVEL ${playerName}! 🎉 Você bateu a meta diária de hoje! Parabéns! 🏆`);
  }
}

window.mascotManager = new MascotManager();
