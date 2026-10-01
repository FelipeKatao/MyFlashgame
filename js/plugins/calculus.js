/**
 * Plugin: Cálculo (Derivadas, Integrais, Funções)
 * Adiciona 100 Flashcards com questões de Cálculo Diferencial e Integral simples.
 */

window.PluginCalculus = {
  id: 'calculus',
  name: 'Cálculo (Derivadas & Integrais)',
  description: 'Adiciona 100 Flashcards de Cálculo (Derivadas, Integrais e Funções). Aceita notações padrão.',
  icon: 'fa-calculator',
  categoryName: 'Cálculo',

  cards: [
    // Derivadas (1 - 40)
    { question: 'Derivada de f(x) = c (constante)', example: 'Regra da Constante', answer: '0' },
    { question: 'Derivada de f(x) = x', example: 'd/dx (x)', answer: '1' },
    { question: 'Derivada de f(x) = 5x', example: 'd/dx (5x)', answer: '5' },
    { question: 'Derivada de f(x) = x^2', example: 'Regra do Tombo: d/dx (x^n)', answer: '2x' },
    { question: 'Derivada de f(x) = x^3', example: 'd/dx (x^3)', answer: '3x^2' },
    { question: 'Derivada de f(x) = x^4', example: 'd/dx (x^4)', answer: '4x^3' },
    { question: 'Derivada de f(x) = x^5', example: 'd/dx (x^5)', answer: '5x^4' },
    { question: 'Derivada de f(x) = 3x^2', example: 'd/dx (3x^2)', answer: '6x' },
    { question: 'Derivada de f(x) = 4x^3', example: 'd/dx (4x^3)', answer: '12x^2' },
    { question: 'Derivada de f(x) = x^2 + 3x', example: 'Soma de derivadas', answer: '2x + 3' },
    { question: 'Derivada de f(x) = 2x^3 - 5x + 7', example: 'd/dx (2x^3 - 5x + 7)', answer: '6x^2 - 5' },
    { question: 'Derivada de f(x) = sin(x)', example: 'Derivada Trigonométrica', answer: 'cos(x)' },
    { question: 'Derivada de f(x) = cos(x)', example: 'Derivada Trigonométrica', answer: '-sin(x)' },
    { question: 'Derivada de f(x) = tan(x)', example: 'Derivada Trigonométrica', answer: 'sec^2(x)' },
    { question: 'Derivada de f(x) = e^x', example: 'Função Exponencial Natural', answer: 'e^x' },
    { question: 'Derivada de f(x) = e^(2x)', example: 'Regra da Cadeia', answer: '2e^(2x)' },
    { question: 'Derivada de f(x) = ln(x)', example: 'Função Logarítmica Natural', answer: '1/x' },
    { question: 'Derivada de f(x) = 1/x', example: 'd/dx (x^-1)', answer: '-1/x^2' },
    { question: 'Derivada de f(x) = √(x)', example: 'd/dx (x^(1/2))', answer: '1/(2√(x)) / 1/2x^(-1/2)' },
    { question: 'Derivada de f(x) = sin(2x)', example: 'Regra da Cadeia: d/dx (sin(2x))', answer: '2cos(2x)' },
    { question: 'Derivada de f(x) = cos(3x)', example: 'Regra da Cadeia', answer: '-3sin(3x)' },
    { question: 'Derivada da constante 100', example: 'd/dx (100)', answer: '0' },
    { question: 'Regra do Produto: d/dx [f(x)·g(x)]', example: 'Fórmula', answer: "f'(x)g(x) + f(x)g'(x)" },
    { question: 'Regra do Quociente: d/dx [f(x)/g(x)]', example: 'Fórmula', answer: "[f'(x)g(x) - f(x)g'(x)] / g(x)^2" },
    { question: 'Derivada de f(x) = x·sin(x)', example: 'Regra do Produto', answer: 'sin(x) + x·cos(x)' },
    { question: 'Derivada de f(x) = x·e^x', example: 'Regra do Produto', answer: 'e^x + x·e^x / e^x(1 + x)' },
    { question: 'Derivada de f(x) = ln(2x)', example: 'Regra da Cadeia', answer: '1/x' },
    { question: 'Derivada de f(x) = arctan(x)', example: 'Trigonométrica Inversa', answer: '1/(1 + x^2)' },
    { question: 'Derivada de f(x) = arcsin(x)', example: 'Trigonométrica Inversa', answer: '1/√(1 - x^2)' },
    { question: 'Derivada de f(x) = 2^x', example: 'Exponencial Geral', answer: '2^x ln(2)' },
    { question: 'Derivada de f(x) = x^10', example: 'Regra da Potência', answer: '10x^9' },
    { question: 'Derivada de f(x) = 7x^4', example: 'Regra da Potência', answer: '28x^3' },
    { question: 'Derivada de f(x) = (x + 1)^2', example: 'Regra da Cadeia', answer: '2(x + 1) / 2x + 2' },
    { question: 'Derivada de f(x) = (2x + 3)^3', example: 'Regra da Cadeia', answer: '6(2x + 3)^2' },
    { question: 'Derivada de f(x) = cos^2(x)', example: 'Regra da Cadeia', answer: '-2sin(x)cos(x) / -sin(2x)' },
    { question: 'Derivada de f(x) = sin^2(x)', example: 'Regra da Cadeia', answer: '2sin(x)cos(x) / sin(2x)' },
    { question: 'Derivada de f(x) = x^1/2', example: 'Potência Fracionária', answer: '1/2x^(-1/2)' },
    { question: 'Derivada de f(x) = -x', example: 'd/dx (-x)', answer: '-1' },
    { question: 'Derivada de f(x) = -3x^2', example: 'd/dx (-3x^2)', answer: '-6x' },
    { question: 'Derivada segunda de f(x) = x^3', example: "f''(x)", answer: '6x' },

    // Integrais (41 - 80)
    { question: 'Integral Indefinida de ∫ 0 dx', example: 'Constante de Integração', answer: 'C' },
    { question: 'Integral Indefinida de ∫ 1 dx', example: '∫ dx', answer: 'x + C' },
    { question: 'Integral Indefinida de ∫ k dx', example: 'k constante', answer: 'kx + C' },
    { question: 'Integral Indefinida de ∫ 5 dx', example: '∫ 5 dx', answer: '5x + C' },
    { question: 'Integral Indefinida de ∫ x dx', example: 'Regra da Potência da Integral', answer: 'x^2/2 + C' },
    { question: 'Integral Indefinida de ∫ x^2 dx', example: '∫ x^2 dx', answer: 'x^3/3 + C' },
    { question: 'Integral Indefinida de ∫ x^3 dx', example: '∫ x^3 dx', answer: 'x^4/4 + C' },
    { question: 'Integral Indefinida de ∫ x^4 dx', example: '∫ x^4 dx', answer: 'x^5/5 + C' },
    { question: 'Integral Indefinida de ∫ 2x dx', example: '∫ 2x dx', answer: 'x^2 + C' },
    { question: 'Integral Indefinida de ∫ 3x^2 dx', example: '∫ 3x^2 dx', answer: 'x^3 + C' },
    { question: 'Integral Indefinida de ∫ 4x^3 dx', example: '∫ 4x^3 dx', answer: 'x^4 + C' },
    { question: 'Integral Indefinida de ∫ cos(x) dx', example: 'Integral Trigonométrica', answer: 'sin(x) + C' },
    { question: 'Integral Indefinida de ∫ sin(x) dx', example: 'Integral Trigonométrica', answer: '-cos(x) + C' },
    { question: 'Integral Indefinida de ∫ e^x dx', example: 'Exponencial', answer: 'e^x + C' },
    { question: 'Integral Indefinida de ∫ 1/x dx', example: 'Logarítmica', answer: 'ln|x| + C / ln(x) + C' },
    { question: 'Integral Indefinida de ∫ sec^2(x) dx', example: 'Trigonométrica', answer: 'tan(x) + C' },
    { question: 'Integral Indefinida de ∫ e^(2x) dx', example: 'Substituição', answer: 'e^(2x)/2 + C' },
    { question: 'Integral Indefinida de ∫ cos(2x) dx', example: 'Substituição', answer: 'sin(2x)/2 + C' },
    { question: 'Integral Indefinida de ∫ sin(2x) dx', example: 'Substituição', answer: '-cos(2x)/2 + C' },
    { question: 'Integral Definida ∫(0 a 1) 1 dx', example: 'Área do retângulo [0,1]', answer: '1' },
    { question: 'Integral Definida ∫(0 a 1) 2x dx', example: 'Fórmula fundamental', answer: '1' },
    { question: 'Integral Definida ∫(0 a 2) x dx', example: '[x^2/2] de 0 a 2', answer: '2' },
    { question: 'Integral Definida ∫(0 a 1) x^2 dx', example: '[x^3/3] de 0 a 1', answer: '1/3' },
    { question: 'Integral Indefinida de ∫ 1/(1+x^2) dx', example: 'Integral de Arctan', answer: 'arctan(x) + C' },
    { question: 'Integral Indefinida de ∫ (x + 2) dx', example: 'Soma de integrais', answer: 'x^2/2 + 2x + C' },
    { question: 'Integral Indefinida de ∫ (3x^2 + 2x) dx', example: 'Soma', answer: 'x^3 + x^2 + C' },
    { question: 'Integral Indefinida de ∫ 6x^5 dx', example: '∫ 6x^5 dx', answer: 'x^6 + C' },
    { question: 'Integral Indefinida de ∫ x^(-2) dx', example: '∫ 1/x^2 dx', answer: '-1/x + C / -x^(-1) + C' },
    { question: 'Método de Integração por Partes', example: 'Fórmula', answer: '∫ u dv = uv - ∫ v du' },
    { question: 'Integral Indefinida de ∫ ln(x) dx', example: 'Por Partes', answer: 'x ln(x) - x + C' },
    { question: 'Integral Indefinida de ∫ x e^x dx', example: 'Por Partes', answer: 'x e^x - e^x + C' },
    { question: 'Integral Definida ∫(0 a π) sin(x) dx', example: '[-cos(x)] de 0 a π', answer: '2' },
    { question: 'Integral Definida ∫(0 a π/2) cos(x) dx', example: '[sin(x)] de 0 a π/2', answer: '1' },
    { question: 'Integral Indefinida de ∫ 1/√(x) dx', example: '∫ x^(-1/2) dx', answer: '2√(x) + C' },
    { question: 'Integral Indefinida de ∫ (x^3 + 1) dx', example: 'Soma', answer: 'x^4/4 + x + C' },
    { question: 'Integral Indefinida de ∫ 1/√(1-x^2) dx', example: 'Arcsin', answer: 'arcsin(x) + C' },
    { question: 'Integral Indefinida de ∫ 8x^3 dx', example: '∫ 8x^3 dx', answer: '2x^4 + C' },
    { question: 'Integral Indefinida de ∫ 10x^9 dx', example: '∫ 10x^9 dx', answer: 'x^10 + C' },
    { question: 'Integral Definida ∫(1 a E) 1/x dx', example: 'ln(E) - ln(1)', answer: '1' },
    { question: 'Integral Definida ∫(0 a 3) 2 dx', example: '[2x] de 0 a 3', answer: '6' },

    // Funções, Limites e Conceitos (81 - 100)
    { question: 'Domínio da função f(x) = 1/x', example: 'Denominador ≠ 0', answer: 'x ≠ 0 / R - {0}' },
    { question: 'Domínio da função f(x) = √(x)', example: 'Radicando ≥ 0', answer: 'x ≥ 0 / [0, ∞)' },
    { question: 'Limite Fundamental: lim (x→0) [sin(x) / x]', example: 'Limite Trigonométrico', answer: '1' },
    { question: 'Limite: lim (x→0) (1 + x)^(1/x)', example: 'Definição do Número de Euler', answer: 'e' },
    { question: 'Limite: lim (x→∞) (1/x)', example: 'Divisão por infinito', answer: '0' },
    { question: 'Limite: lim (x→2) (x^2 - 4)/(x - 2)', example: 'Fatoração (x-2)(x+2)', answer: '4' },
    { question: 'Limite: lim (x→3) (2x + 1)', example: 'Substituição Direta', answer: '7' },
    { question: 'Fórmula do Teorema Fundamental do Cálculo', example: '∫(a a b) f(x) dx', answer: 'F(b) - F(a)' },
    { question: 'Regra de L’Hôpital se aplica a formas indeterminadas', example: 'Quais formas?', answer: '0/0 ou ∞/∞' },
    { question: 'Pontos onde f’(x) = 0 são chamados de', example: 'Classificação no gráfico', answer: 'Pontos Críticos' },
    { question: 'Se f’’(x) > 0 no intervalo, a concavidade é', example: 'Concavidade do gráfico', answer: 'Para Cima / Positiva' },
    { question: 'Se f’’(x) < 0 no intervalo, a concavidade é', example: 'Concavidade do gráfico', answer: 'Para Baixo / Negativa' },
    { question: 'Ponto onde o gráfico muda de concavidade', example: 'Definição', answer: 'Ponto de Inflexão' },
    { question: 'Período da função sin(x)', example: 'Ciclo completo', answer: '2π' },
    { question: 'Período da função cos(x)', example: 'Ciclo completo', answer: '2π' },
    { question: 'Período da função tan(x)', example: 'Ciclo completo', answer: 'π' },
    { question: 'Identidade Trigonométrica Fundamental', example: 'sin^2(x) + cos^2(x) = ?', answer: '1' },
    { question: 'Fórmula da Reta Tangente no ponto (x0, y0)', example: 'Com coeficiente m = f’(x0)', answer: 'y - y0 = f’(x0)(x - x0)' },
    { question: 'Valor do número e (Aproximação de Euler)', example: 'Número irracional', answer: '2.718' },
    { question: 'Valor de π (Aproximação)', example: 'Número irracional', answer: '3.14' }
  ],

  install() {
    window.storage.addCategory(this.categoryName);

    let addedCount = 0;
    this.cards.forEach((item) => {
      const exists = window.storage.data.cards.some(c => c.question === item.question && c.category === this.categoryName);
      if (!exists) {
        window.storage.addCard(item.question, item.answer, this.categoryName, {
          example: item.example,
          pluginOrigin: this.id
        });
        addedCount++;
      }
    });

    window.storage.setPluginInstalled(this.id, true);
    return { success: true, count: addedCount };
  },

  uninstall() {
    window.storage.data.cards = window.storage.data.cards.filter(c => c.pluginOrigin !== this.id && c.category !== this.categoryName);
    window.storage.data.categories = window.storage.data.categories.filter(cat => cat !== this.categoryName);
    window.storage.saveData();
    window.storage.setPluginInstalled(this.id, false);
    return { success: true };
  }
};
