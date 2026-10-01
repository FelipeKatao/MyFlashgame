/**
 * Plugin: Inglês Avançado
 * Adiciona 80 Flashcards de Vocabulário de Inglês com pronúncia fonética e aplicação em frases.
 */

window.PluginEnglishAdvanced = {
  id: 'english-advanced',
  name: 'Inglês Avançado',
  description: 'Adiciona 80 Flashcards com palavras em Inglês, como se lê (pronúncia fonética) e exemplo de aplicação.',
  icon: 'fa-language',
  categoryName: 'Inglês Avançado',

  cards: [
    { question: 'School', phonetic: '/ sko͞ol /', example: 'Children go to school to learn.', answer: 'an institution for educating children (Escola)' },
    { question: 'Knowledge', phonetic: '/ ˈnäləj /', example: 'Knowledge is power in the modern world.', answer: 'facts, information, and skills acquired (Conhecimento)' },
    { question: 'Challenge', phonetic: '/ ˈCHalənj /', example: 'Accepting a challenge helps you grow.', answer: 'a call to take part in a contest or test (Desafio)' },
    { question: 'Journey', phonetic: '/ ˈjərnē /', example: 'Life is a long and beautiful journey.', answer: 'an act of traveling from one place to another (Jornada)' },
    { question: 'Opportunity', phonetic: '/ ˌäpərˈt(y)o͞onədē /', example: 'Seize every opportunity that comes your way.', answer: 'a set of circumstances that makes something possible (Oportunidade)' },
    { question: 'Achieve', phonetic: '/ əˈCHēv /', example: 'You can achieve all your dreams with hard work.', answer: 'successfully bring about or reach a goal (Alcançar / Atingir)' },
    { question: 'Development', phonetic: '/ dəˈveləpmənt /', example: 'Personal development takes time and patience.', answer: 'the process of developing or growing (Desenvolvimento)' },
    { question: 'Environment', phonetic: '/ inˈvīrənmənt /', example: 'We must protect the natural environment.', answer: 'the surroundings or conditions in which one lives (Meio Ambiente / Ambiente)' },
    { question: 'Improvement', phonetic: '/ imˈpro͞ovmənt /', example: 'There is steady improvement in her grades.', answer: 'the process of making something better (Melhoria)' },
    { question: 'Leadership', phonetic: '/ ˈlēdərˌSHip /', example: 'Great leadership inspires people to do their best.', answer: 'the action of leading a group of people (Liderança)' },
    { question: 'Persistence', phonetic: '/ pərˈsistəns /', example: 'Persistence leads to ultimate victory.', answer: 'continuing firmly in spite of difficulty (Persistência)' },
    { question: 'Strategy', phonetic: '/ ˈstradəjē /', example: 'A clear strategy is essential for business success.', answer: 'a plan of action designed to achieve a goal (Estratégia)' },
    { question: 'Success', phonetic: '/ səkˈses /', example: 'Hard work is the key to success.', answer: 'the accomplishment of an aim or purpose (Sucesso)' },
    { question: 'Understanding', phonetic: '/ ˌəndərˈstandiNG /', example: 'Mutual understanding builds strong relationships.', answer: 'the ability to comprehend something (Compreensão)' },
    { question: 'Wisdom', phonetic: '/ ˈwizdəm /', example: 'Wisdom comes with experience and reflection.', answer: 'having experience, knowledge, and good judgment (Sabedoria)' },
    { question: 'Ambition', phonetic: '/ amˈbiSHən /', example: 'His ambition is to become a top scientist.', answer: 'a strong desire to achieve something (Ambição)' },
    { question: 'Bravery', phonetic: '/ ˈbrāvərē /', example: 'The soldier showed immense bravery.', answer: 'courageous behavior or character (Bravura / Coragem)' },
    { question: 'Community', phonetic: '/ kəˈmyo͞onədē /', example: 'We belong to a helpful and friendly community.', answer: 'a group of people living in the same place (Comunidade)' },
    { question: 'Determination', phonetic: '/ dəˌtərməˈnāSHən /', example: 'Her determination helped her finish the marathon.', answer: 'firmness of purpose (Determinação)' },
    { question: 'Empathy', phonetic: '/ ˈempəTHē /', example: 'Empathy allows us to feel what others experience.', answer: 'the ability to understand and share feelings (Empatia)' },
    { question: 'Freedom', phonetic: '/ ˈfrēdəm /', example: 'Freedom of speech is a fundamental human right.', answer: 'the power to act or speak as one wants (Liberdade)' },
    { question: 'Gratitude', phonetic: '/ ˈɡradəˌt(y)o͞od /', example: 'Expressing gratitude brings happiness.', answer: 'the quality of being thankful (Gratidão)' },
    { question: 'Harmony', phonetic: '/ ˈhärmənē /', example: 'They lived together in peace and harmony.', answer: 'pleasing arrangement or agreement (Harmonia)' },
    { question: 'Innovation', phonetic: '/ ˌinəˈvāSHən /', example: 'Tech companies thrive on continuous innovation.', answer: 'a new method, idea, or product (Inovação)' },
    { question: 'Justice', phonetic: '/ ˈjəstəs /', example: 'Laws exist to maintain justice in society.', answer: 'just behavior or fairness (Justiça)' },
    { question: 'Kindness', phonetic: '/ ˈkīn(d)nəs /', example: 'A simple act of kindness can change someone\'s day.', answer: 'the quality of being friendly and generous (Gentileza / Bondade)' },
    { question: 'Motivation', phonetic: '/ ˌmōdəˈvāSHən /', example: 'Self-discipline is stronger than temporary motivation.', answer: 'the reason for acting or behaving in a way (Motivação)' },
    { question: 'Resilience', phonetic: '/ rəˈzilyəns /', example: 'Resilience helps people bounce back from adversity.', answer: 'the capacity to recover quickly from difficulties (Resiliência)' },
    { question: 'Trust', phonetic: '/ trəst /', example: 'Trust is the foundation of any good relationship.', answer: 'firm belief in the reliability of someone (Confiança)' },
    { question: 'Value', phonetic: '/ ˈvalyo͞o /', example: 'Education adds great value to your life.', answer: 'the worth or importance of something (Valor)' },
    { question: 'Adventure', phonetic: '/ ədˈvenCHər /', example: 'Exploring new cultures is an unforgettable adventure.', answer: 'an exciting or unusual experience (Aventura)' },
    { question: 'Balance', phonetic: '/ ˈbaləns /', example: 'Maintaining a balance between work and rest is vital.', answer: 'an even distribution of weight or effort (Equilíbrio)' },
    { question: 'Communication', phonetic: '/ kəˌmyo͞onəˈkāSHən /', example: 'Clear communication prevents misunderstandings.', answer: 'the exchanging of information (Comunicação)' },
    { question: 'Creativity', phonetic: '/ ˌkrēāˈtivədē /', example: 'Art fosters imagination and creativity.', answer: 'the use of imagination to create (Criatividade)' },
    { question: 'Discipline', phonetic: '/ ˈdisəplən /', example: 'Daily discipline guarantees steady progress.', answer: 'the practice of training obedience or focus (Disciplina)' },
    { question: 'Education', phonetic: '/ ˌejəˈkāSHən /', example: 'Education opens doors to new opportunities.', answer: 'systematic instruction and learning (Educação)' },
    { question: 'Foundation', phonetic: '/ founˈdāSHən /', example: 'Good habits form the foundation of success.', answer: 'an underlying basis or principle (Fundamento / Base)' },
    { question: 'Growth', phonetic: '/ ɡrōTH /', example: 'Mindset determines personal growth.', answer: 'the process of growing or maturing (Crescimento)' },
    { question: 'Hope', phonetic: '/ hōp /', example: 'Hope inspires us to keep going during hard times.', answer: 'a feeling of expectation and desire (Esperança)' },
    { question: 'Integrity', phonetic: '/ inˈteɡrədē /', example: 'A person of integrity always tells the truth.', answer: 'the quality of being honest and moral (Integridade)' },
    { question: 'Memory', phonetic: '/ ˈmem(ə)rē /', example: 'Flashcards improve long-term memory retention.', answer: 'the mental faculty of storing information (Memória)' },
    { question: 'Passion', phonetic: '/ ˈpaSHən /', example: 'Follow your passion and work hard for it.', answer: 'strong and barely controllable enthusiasm (Paixão / Entusiasmo)' },
    { question: 'Purpose', phonetic: '/ ˈpərpəs /', example: 'Discovering your purpose brings meaning to life.', answer: 'the reason for which something exists (Propósito)' },
    { question: 'Respect', phonetic: '/ rəˈspekt /', example: 'Respect others if you wish to be respected.', answer: 'due regard for the feelings or rights of others (Respeito)' },
    { question: 'Solution', phonetic: '/ səˈlo͞oSHən /', example: 'Teamwork led us to the correct solution.', answer: 'a means of solving a problem (Solução)' },
    { question: 'Teamwork', phonetic: '/ ˈtēmˌwərk /', example: 'Great teamwork achieves big goals faster.', answer: 'collaborative effort of a group (Trabalho em Equipe)' },
    { question: 'Vision', phonetic: '/ ˈviZHən /', example: 'Leaders must have a clear vision for the future.', answer: 'the ability to plan the future with wisdom (Visão)' },
    { question: 'Courage', phonetic: '/ ˈkərij /', example: 'Courage is facing your fears with bravery.', answer: 'the ability to do something that frightens one (Coragem)' },
    { question: 'Curiosity', phonetic: '/ ˌkyoorēˈäsədē /', example: 'Curiosity drives scientific discoveries.', answer: 'a strong desire to learn something (Curiosidade)' },
    { question: 'Focus', phonetic: '/ ˈfōkəs /', example: 'Focus on your goals and eliminate distractions.', answer: 'the center of interest or concentration (Foco / Concentração)' },
    { question: 'Patience', phonetic: '/ ˈpāSHəns /', example: 'Patience is a key virtue in learning languages.', answer: 'the capacity to tolerate delay or trouble (Paciência)' },
    { question: 'Strength', phonetic: '/ streNGTH /', example: 'Inner strength helps you overcome difficulties.', answer: 'the state of being mentally or physically strong (Força)' },
    { question: 'Legacy', phonetic: '/ ˈleɡəsē /', example: 'Teachers leave a lasting legacy in their students.', answer: 'an amount of money or impact left behind (Legado)' },
    { question: 'Potential', phonetic: '/ pəˈtenCHəl /', example: 'Everyone has untapped potential inside them.', answer: 'capacity to develop into something in the future (Potencial)' },
    { question: 'Progress', phonetic: '/ ˈpräɡres /', example: 'Small daily steps result in huge progress.', answer: 'forward movement toward a goal (Progresso)' },
    { question: 'Reflection', phonetic: '/ rəˈflekSHən /', example: 'Quiet reflection helps you evaluate your actions.', answer: 'serious thought or consideration (Reflexão)' },
    { question: 'Transformation', phonetic: '/ ˌtransfərˈmāSHən /', example: 'Education brings a complete transformation.', answer: 'a thorough or dramatic change (Transformação)' },
    { question: 'Excellence', phonetic: '/ ˈeksələns /', example: 'Strive for excellence in everything you do.', answer: 'the quality of being outstanding (Excelência)' },
    { question: 'Future', phonetic: '/ ˈfyo͞oCHər /', example: 'The future belongs to those who prepare today.', answer: 'the time following the present (Futuro)' },
    { question: 'Perspective', phonetic: '/ pərˈspektiv /', example: 'Traveling gives you a broader perspective on life.', answer: 'a particular attitude toward something (Perspectiva)' },
    { question: 'Friendship', phonetic: '/ ˈfren(d)SHip /', example: 'True friendship lasts a lifetime.', answer: 'the relationship between friends (Amizade)' },
    { question: 'Happiness', phonetic: '/ ˈhapēnəs /', example: 'Happiness comes from contentment and peace.', answer: 'the state of being happy (Felicidade)' },
    { question: 'Inspiration', phonetic: '/ ˌinspəˈrāSHən /', example: 'Nature is a constant source of inspiration.', answer: 'being mentally stimulated to do something (Inspiração)' },
    { question: 'Optimism', phonetic: '/ ˈäptəˌmizəm /', example: 'Maintain optimism even in tough situations.', answer: 'hopefulness and confidence about the future (Otimismo)' },
    { question: 'Performance', phonetic: '/ pərˈfôrməns /', example: 'Regular practice improves test performance.', answer: 'the execution of an action or task (Desempenho)' },
    { question: 'Quality', phonetic: '/ ˈkwälədē /', example: 'Focus on quality rather than quantity.', answer: 'the standard of something as measured against others (Qualidade)' },
    { question: 'Resourceful', phonetic: '/ rēˈsôrsfəl /', example: 'A resourceful student finds clever solutions.', answer: 'able to find quick ways to overcome difficulties (Desenrascado / Engenhoso)' },
    { question: 'Skill', phonetic: '/ skil /', example: 'Practice builds a valuable skill.', answer: 'the ability to do something well (Habilidade)' },
    { question: 'Talent', phonetic: '/ ˈtalənt /', example: 'Talent combined with effort yields greatness.', answer: 'natural aptitude or skill (Talento)' },
    { question: 'Victory', phonetic: '/ ˈvikt(ə)rē /', example: 'Celebrated their hard-earned victory.', answer: 'an act of defeating an opponent (Vitória)' },
    { question: 'Wonder', phonetic: '/ ˈwəndər /', example: 'The universe is full of natural wonder.', answer: 'a feeling of surprise and admiration (Maravilha / Espanto)' },
    { question: 'Zeal', phonetic: '/ zēl /', example: 'He pursued his studies with great zeal.', answer: 'great energy or enthusiasm (Zelo / Entusiasmo)' },
    { question: 'Adaptability', phonetic: '/ əˌdaptəˈbilədē /', example: 'Adaptability is essential in a changing world.', answer: 'ability to adjust to new conditions (Adaptabilidade)' },
    { question: 'Brilliance', phonetic: '/ ˈbrilyəns /', example: 'Her mathematical brilliance amazed everyone.', answer: 'exceptional talent or intelligence (Brilhantismo)' },
    { question: 'Efficiency', phonetic: '/ əˈfiSHənsē /', example: 'New tools improved working efficiency.', answer: 'working productively without waste (Eficiência)' },
    { question: 'Generosity', phonetic: '/ ˌjenəˈräsədē /', example: 'Her generosity touched many lives.', answer: 'the quality of being kind and generous (Generosidade)' },
    { question: 'Insight', phonetic: '/ ˈinˌsīt /', example: 'The book gave deep insight into history.', answer: 'accurate and deep intuitive understanding (Visão interna / Percepção)' },
    { question: 'Prosperity', phonetic: '/ präˈsperədē /', example: 'Peace brings economic prosperity.', answer: 'the state of flourishing or thriving (Prosperidade)' },
    { question: 'Perseverance', phonetic: '/ ˌpərsəˈvirəns /', example: 'Perseverance leads to success despite obstacles.', answer: 'continued effort despite difficulties (Perseverança)' },
    { question: 'Dedication', phonetic: '/ ˌdedəˈkāSHən /', example: 'His dedication to learning is inspiring.', answer: 'the quality of being committed to a task (Dedicação)' }
  ],

  install() {
    // Add category
    window.storage.addCategory(this.categoryName);

    // Add 80 cards
    let addedCount = 0;
    this.cards.forEach((item, index) => {
      const cardQuestion = item.question;
      const exists = window.storage.data.cards.some(c => c.question === cardQuestion && c.category === this.categoryName);
      if (!exists) {
        window.storage.addCard(item.question, item.answer, this.categoryName, {
          phonetic: item.phonetic,
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
    // Remove plugin cards
    window.storage.data.cards = window.storage.data.cards.filter(c => c.pluginOrigin !== this.id && c.category !== this.categoryName);
    // Remove category if empty
    window.storage.data.categories = window.storage.data.categories.filter(cat => cat !== this.categoryName);
    
    window.storage.saveData();
    window.storage.setPluginInstalled(this.id, false);
    return { success: true };
  }
};
