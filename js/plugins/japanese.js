/**
 * Plugin: Japonês Avançado
 * Adiciona 100 Flashcards de Vocabulário em Japonês (Kanji, Katakana, Hiragana) com explicações e tradução.
 */

window.PluginJapanese = {
  id: 'japanese',
  name: 'Japonês (Kanji & Vocabulário)',
  description: 'Adiciona 100 Flashcards de Japonês (Kanji, Hiragana, Katakana). Aceita digitação de qualquer um dos termos traduzidos.',
  icon: 'fa-torii-gate',
  categoryName: 'Japonês',

  cards: [
    { question: '食べ物', phonetic: '[ Tabemono / たべもの ]', example: '美味しい食べ物を食べる。', answer: '(Comida / Alimento)' },
    { question: '飲み物', phonetic: '[ Nomimono / のみもの ]', example: '冷たい飲み物を飲む。', answer: '(Bebida)' },
    { question: '本', phonetic: '[ Hon / ほん ]', example: '面白い本を読む。', answer: '(Livro)' },
    { question: '学校', phonetic: '[ Gakkou / がっこう ]', example: '毎日学校に行く。', answer: '(Escola)' },
    { question: '先生', phonetic: '[ Sensei / せんせい ]', example: '先生に質問する。', answer: '(Professor / Mestre)' },
    { question: '学生', phonetic: '[ Gakusei / がくせい ]', example: '私は日本語の学生です。', answer: '(Estudante / Aluno)' },
    { question: '友達', phonetic: '[ Tomodachi / ともだち ]', example: '友達と遊ぶ。', answer: '(Amigo / Companheiro)' },
    { question: '家族', phonetic: '[ Kazoku / かぞく ]', example: '家族と一緒に暮らす。', answer: '(Família)' },
    { question: '水', phonetic: '[ Mizu / みず ]', example: '水を一杯ください。', answer: '(Água)' },
    { question: '火', phonetic: '[ Hi / ひ ]', example: '火に気を付けてください。', answer: '(Fogo)' },
    { question: '空', phonetic: '[ Sora / そら ]', example: '青い空を見る。', answer: '(Céu)' },
    { question: '山', phonetic: '[ Yama / やま ]', example: '高い山に登る。', answer: '(Montanha / Monte)' },
    { question: '川', phonetic: '[ Kawa / かわ ]', example: '川で泳ぐ。', answer: '(Rio)' },
    { question: '花', phonetic: '[ Hana / はな ]', example: '綺麗な花が咲いている。', answer: '(Flor)' },
    { question: '犬', phonetic: '[ Inu / いぬ ]', example: '可愛い犬を飼う。', answer: '(Cão / Cachorro)' },
    { question: '猫', phonetic: '[ Neko / ねこ ]', example: '猫が部屋にいる。', answer: '(Gato)' },
    { question: '車', phonetic: '[ Kuruma / くるま ]', example: '新しい車を買う。', answer: '(Carro / Automóvel)' },
    { question: '電車', phonetic: '[ Densha / でんしゃ ]', example: '電車で通勤する。', answer: '(Trem / Comboio)' },
    { question: '時間', phonetic: '[ Jikan / じかん ]', example: '時間が足りない。', answer: '(Tempo / Hora)' },
    { question: '今日', phonetic: '[ Kyou / きょう ]', example: '今日はいい天気がいい。', answer: '(Hoje)' },
    { question: '明日', phonetic: '[ Ashita / あした ]', example: '明日また会いましょう。', answer: '(Amanhã)' },
    { question: '昨日', phonetic: '[ Kinou / きのう ]', example: '昨日映画を見た。', answer: '(Ontem)' },
    { question: '心', phonetic: '[ Kokoro / こころ ]', example: '心を込めて作る。', answer: '(Coração / Mente / Alma)' },
    { question: '力', phonetic: '[ Chikara / ちから ]', example: '強い力を持つ。', answer: '(Força / Poder)' },
    { question: '夢', phonetic: '[ Yume / ゆめ ]', example: '大きな夢を持つ。', answer: '(Sonho)' },
    { question: '愛', phonetic: '[ Ai / あい ]', example: '愛を伝える。', answer: '(Amor / Afeto)' },
    { question: '平和', phonetic: '[ Heiwa / へいわ ]', example: '世界平和を願う。', answer: '(Paz)' },
    { question: '希望', phonetic: '[ Kibou / きぼう ]', example: '未来への希望。', answer: '(Esperança)' },
    { question: '光', phonetic: '[ Hikari / ひかり ]', example: '太陽の光が眩しい。', answer: '(Luz / Brilho)' },
    { question: '海', phonetic: '[ Umi / うみ ]', example: '広い海を見る。', answer: '(Mar / Oceano)' },
    { question: '雨', phonetic: '[ Ame / あめ ]', example: '雨が降っている。', answer: '(Chuva)' },
    { question: '雪', phonetic: '[ Yuki / ゆき ]', example: '白い雪が降る。', answer: '(Neve)' },
    { question: '風', phonetic: '[ Kaze / かぜ ]', example: '強い風が吹く。', answer: '(Vento)' },
    { question: '星', phonetic: '[ Hoshi / ほし ]', example: '夜空に星が光る。', answer: '(Estrela)' },
    { question: '月', phonetic: '[ Tsuki / つき ]', example: '満月が美しい。', answer: '(Lua / Mês)' },
    { question: '日', phonetic: '[ Hi / ひ ]', example: '日暮れ時。', answer: '(Sol / Dia)' },
    { question: '木', phonetic: '[ Ki / き ]', example: '大きな木の下で休む。', answer: '(Árvore / Madeira)' },
    { question: '金', phonetic: '[ Kane / かね ]', example: 'お金を貯める。', answer: '(Dinheiro / Ouro)' },
    { question: '土', phonetic: '[ Tsuchi / つち ]', example: '肥沃な土。', answer: '(Terra / Solo)' },
    { question: '家', phonetic: '[ Ie / いえ ]', example: '自分の家に帰る。', answer: '(Casa / Lar)' },
    { question: '部屋', phonetic: '[ Heya / へや ]', example: '部屋を掃除する。', answer: '(Quarto / Cômodo)' },
    { question: '窓', phonetic: '[ Mado / まど ]', example: '窓を開ける。', answer: '(Janela)' },
    { question: 'ドア', phonetic: '[ Doa / どあ ]', example: 'ドアを閉める。', answer: '(Porta)' },
    { question: '机', phonetic: '[ Tsukue / つくえ ]', example: '机の上に本を置く。', answer: '(Escrivaninha / Mesa)' },
    { question: '椅子', phonetic: '[ Isu / いす ]', example: '椅子に座る。', answer: '(Cadeira)' },
    { question: '時計', phonetic: '[ Tokei / とけい ]', example: '時計を見る。', answer: '(Relógio)' },
    { question: '電話', phonetic: '[ Denwa / でんわ ]', example: '電話をかける。', answer: '(Telefone)' },
    { question: '写真', phonetic: '[ Shashin / しゃしん ]', example: '写真を撮る。', answer: '(Foto / Fotografia)' },
    { question: '音楽', phonetic: '[ Ongaku / おんがく ]', example: '音楽を聴く。', answer: '(Música)' },
    { question: '映画', phonetic: '[ Eiga / えいが ]', example: '映画館で映画を見る。', answer: '(Filme / Cinema)' },
    { question: '手紙', phonetic: '[ Tegami / てがみ ]', example: '手紙を書く。', answer: '(Carta)' },
    { question: '言葉', phonetic: '[ Kotoba / ことば ]', example: '優しい言葉をかける。', answer: '(Palavra / Idioma)' },
    { question: '体', phonetic: '[ Karada / からだ ]', example: '体を鍛える。', answer: '(Corpo)' },
    { question: '頭', phonetic: '[ Atama / あたま ]', example: '頭がいい。', answer: '(Cabeça)' },
    { question: '目', phonetic: '[ Me / め ]', example: '目が大きい。', answer: '(Olho)' },
    { question: '耳', phonetic: '[ Mimi / みみ ]', example: '耳を澄ませる。', answer: '(Orelha / Ouvido)' },
    { question: '口', phonetic: '[ Kuchi / くち ]', example: '口を開ける。', answer: '(Boca)' },
    { question: '手', phonetic: '[ Te / て ]', example: '手を洗う。', answer: '(Mão)' },
    { question: '足', phonetic: '[ Ashi / あし ]', example: '足が速い。', answer: '(Pé / Perna)' },
    { question: '顔', phonetic: '[ Kao / かお ]', example: '笑顔を見せる。', answer: '(Rosto / Face)' },
    { question: '魚', phonetic: '[ Sakana / さかな ]', example: '新鮮な魚。', answer: '(Peixe)' },
    { question: '肉', phonetic: '[ Niku / にく ]', example: '牛肉を食べる。', answer: '(Carne)' },
    { question: '野菜', phonetic: '[ Yasai / やさい ]', example: '野菜を食べる。', answer: '(Vegetal / Verdura)' },
    { question: '果物', phonetic: '[ Kudamono / くだもの ]', example: '甘い果物。', answer: '(Fruta)' },
    { question: '米', phonetic: '[ Kome / こめ ]', example: 'お米を炊く。', answer: '(Arroz)' },
    { question: 'パン', phonetic: '[ Pan / ぱん ]', example: '朝食にパンを食べる。', answer: '(Pão)' },
    { question: '卵', phonetic: '[ Tamago / たまご ]', example: '目玉焼きをつくる。', answer: '(Ovo)' },
    { question: '塩', phonetic: '[ Shio / しお ]', example: '塩を加える。', answer: '(Sal)' },
    { question: '砂糖', phonetic: '[ Satou / さとう ]', example: '砂糖を入れる。', answer: '(Açúcar)' },
    { question: 'お茶', phonetic: '[ Ocha / おちゃ ]', example: '緑茶を飲む。', answer: '(Chá)' },
    { question: '春', phonetic: '[ Haru / はる ]', example: '暖かい春。', answer: '(Primavera)' },
    { question: '夏', phonetic: '[ Natsu / なつ ]', example: '暑い夏。', answer: '(Verão)' },
    { question: '秋', phonetic: '[ Aki / あき ]', example: '紅葉の秋。', answer: '(Outono)' },
    { question: '冬', phonetic: '[ Fuyu / ふゆ ]', example: '寒い冬。', answer: '(Inverno)' },
    { question: '朝', phonetic: '[ Asa / あさ ]', example: '早朝散歩。', answer: '(Manhã)' },
    { question: '昼', phonetic: '[ Hiru / ひる ]', example: '昼ご飯を食べる。', answer: '(Tarde / Meio-dia)' },
    { question: '夜', phonetic: '[ Yoru / よる ]', example: '静かな夜。', answer: '(Noite)' },
    { question: '今', phonetic: '[ Ima / いま ]', example: '今すぐ行く。', answer: '(Agora)' },
    { question: '道', phonetic: '[ Michi / みち ]', example: '広い道を歩く。', answer: '(Caminho / Estrada)' },
    { question: '国', phonetic: '[ Kuni / くに ]', example: '自分の国。', answer: '(País / Nação)' },
    { question: '町', phonetic: '[ Machi / まち ]', example: '賑やかな町。', answer: '(Cidade / Vila)' },
    { question: '駅', phonetic: '[ Eki / えき ]', example: '駅で待つ。', answer: '(Estação)' },
    { question: '空港', phonetic: '[ Kuukou / くうこう ]', example: '空港に着く。', answer: '(Aeroporto)' },
    { question: '海老', phonetic: '[ Ebi / えび ]', example: 'エビフライ。', answer: '(Camarão)' },
    { question: '桜', phonetic: '[ Sakura / さくら ]', example: '桜の花が満開だ。', answer: '(Cerejeira / Sakura)' },
    { question: '太陽', phonetic: '[ Taiyou / たいよう ]', example: '太陽が昇る。', answer: '(Sol)' },
    { question: '地球', phonetic: '[ Chikyuu / ちきゅう ]', example: '美しい地球。', answer: '(Terra / Planeta Terra)' },
    { question: '未来', phonetic: '[ Mirai / みらい ]', example: '明るい未来。', answer: '(Futuro)' },
    { question: '過去', phonetic: '[ Kako / かこ ]', example: '過去の思い出。', answer: '(Passado)' },
    { question: '真実', phonetic: '[ Shinjitsu / しんじつ ]', example: '真実を明かす。', answer: '(Verdade)' },
    { question: '自由', phonetic: '[ Jiyuu / じゆう ]', example: '自由を求めて。', answer: '(Liberdade)' },
    { question: '成功', phonetic: '[ Seikou / せいこう ]', example: '成功を収める。', answer: '(Sucesso)' },
    { question: '失敗', phonetic: '[ Shippai / しっぱい ]', example: '失敗から学ぶ。', answer: '(Fracasso / Erro)' },
    { question: '感謝', phonetic: '[ Kansha / かんしゃ ]', example: '感謝の気持ち。', answer: '(Gratidão / Agradecimento)' },
    { question: '勇気', phonetic: '[ Yuuki / ゆうき ]', example: '勇気を出す。', answer: '(Coragem)' },
    { question: '幸せ', phonetic: '[ Shiawase / しあわせ ]', example: '幸せな生活。', answer: '(Felicidade)' },
    { question: '知識', phonetic: '[ Chishiki / ちしき ]', example: '豊富な知識。', answer: '(Conhecimento)' },
    { question: '努力', phonetic: '[ Doryoku / どりょく ]', example: '継続的な努力。', answer: '(Esforço / Dedicação)' },
    { question: '絆', phonetic: '[ Kizuna / きずな ]', example: '家族の絆。', answer: '(Laço / Vínculo)' }
  ],

  install() {
    window.storage.addCategory(this.categoryName);

    let addedCount = 0;
    this.cards.forEach((item) => {
      const exists = window.storage.data.cards.some(c => c.question === item.question && c.category === this.categoryName);
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
    window.storage.data.cards = window.storage.data.cards.filter(c => c.pluginOrigin !== this.id && c.category !== this.categoryName);
    window.storage.data.categories = window.storage.data.categories.filter(cat => cat !== this.categoryName);
    window.storage.saveData();
    window.storage.setPluginInstalled(this.id, false);
    return { success: true };
  }
};
