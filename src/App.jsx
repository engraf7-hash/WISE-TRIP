import { useState, useEffect, useRef } from "react";
import { Volume2, Check, X, ArrowRight, Flame, Star, ChevronLeft, RotateCcw, Sparkles } from "lucide-react";

// ---------- Conteúdo ----------
const TRACKS = [
  {
    id: "diaadia",
    name: "Dia a dia",
    tagline: "Frases prontas para situações reais",
    color: "#FF5D73",
    lessons: [
      { id: "cumprimentos", title: "Cumprimentos", phrases: [
        ["Good morning", "Bom dia"], ["Good afternoon", "Boa tarde"], ["Good evening", "Boa noite (chegada)"],
        ["How are you?", "Como você está? (formal)"], ["How are you doing?", "Como você está? (informal)"],
        ["How is it going?", "Como vai você?"], ["What's up?", "E aí?"], ["Nice to meet you", "Prazer em te conhecer"],
        ["Good to see you", "Bom ver você"],
      ]},
      { id: "apresentacao", title: "Apresentação", phrases: [
        ["My name is Eric", "Meu nome é Eric"], ["Let me introduce myself", "Deixe eu me apresentar"],
        ["I am from Brazil", "Eu sou do Brasil"], ["My hometown is São Paulo", "Minha cidade natal é São Paulo"],
        ["I am 25 years old", "Eu tenho 25 anos"], ["I studied economics at USP", "Eu estudei economia na USP"],
        ["I like to travel in my free time", "Eu gosto de viajar no meu tempo livre"],
      ]},
      { id: "perguntas", title: "Perguntas essenciais", phrases: [
        ["What's your name?", "Qual o seu nome?"], ["How old are you?", "Quantos anos você tem?"],
        ["Where are you from?", "De onde você é?"], ["How much does it cost?", "Quanto custa?"],
        ["Can you help me, please?", "Você pode me ajudar, por favor?"],
        ["Do you need anything else?", "Você precisa de algo mais?"],
        ["Would you like to have lunch with me?", "Você gostaria de almoçar comigo?"],
      ]},
      { id: "agradecimentos", title: "Agradecimentos", phrases: [
        ["Thank you", "Obrigado"], ["Thank you very much", "Muito obrigado"],
        ["I really appreciate it", "Eu realmente agradeço"], ["You didn't have to do that", "Não precisava ter feito isso"],
        ["That's very kind of you", "Muito gentil da sua parte"], ["You're so helpful", "Você é de muita ajuda"],
      ]},
      { id: "concordar", title: "Concordar e discordar", phrases: [
        ["I agree with you 100%", "Eu concordo 100% com você"], ["That's so true", "Isso realmente é verdade"],
        ["You're absolutely right", "Você está absolutamente certo"], ["I totally agree", "Concordo plenamente"],
        ["I don't agree", "Eu não concordo"], ["I totally disagree", "Discordo totalmente"],
        ["I'm not sure about that", "Não estou certo disso"], ["No way!", "Sem chance!"],
      ]},
      { id: "despedidas", title: "Despedidas", phrases: [
        ["Goodbye", "Adeus"], ["See you", "Até mais"], ["Take care", "Se cuida"],
        ["Have a good day", "Tenha um bom dia"], ["See you soon", "Te vejo em breve"], ["See you next time", "Te vejo na próxima"],
      ]},
    ],
  },
  {
    id: "idiomas",
    name: "Expressões idiomáticas",
    tagline: "O tempero que faz o inglês soar natural",
    color: "#FF9F1C",
    lessons: [
      { id: "trabalho", title: "Trabalho", phrases: [
        ["In a nutshell", "De forma breve, resumindo"], ["Break the ice", "Quebrar o gelo"],
        ["Wrap up", "Encerrar, finalizar"], ["Take the initiative", "Tomar iniciativa"],
        ["Run out of", "Ficar sem"], ["Top-notch", "Excelente"],
      ]},
      { id: "viagem-hotel", title: "Viagem e hotel", phrases: [
        ["Spur of the moment", "De forma espontânea"], ["Travel light", "Viajar com pouca bagagem"],
        ["Pack for", "Arrumar a mala para"], ["Book a room", "Reservar um quarto"],
        ["Complimentary breakfast", "Café da manhã incluso"],
      ]},
      { id: "restaurante", title: "Restaurante", phrases: [
        ["Book a table", "Reservar uma mesa"], ["A side of...", "Uma porção de..."],
        ["For here or to go?", "Para comer aqui ou para viagem?"], ["No dressing, please", "Sem molho, por favor"],
      ]},
      { id: "cotidiano", title: "Cotidiano", phrases: [
        ["Piece of cake", "Moleza, muito fácil"], ["Under the weather", "Se sentir meio doente"],
        ["Take it easy", "Pega leve"], ["Out of the blue", "De forma inesperada"], ["Time flies", "O tempo voa"],
      ]},
      { id: "emocoes", title: "Emoções", phrases: [
        ["Over the moon", "Muito feliz"], ["Feel blue", "Sentir-se triste"],
        ["Blow a fuse", "Ficar muito bravo"], ["Down in the dumps", "Muito triste, deprimido"],
      ]},
      { id: "compras-dinheiro", title: "Compras e dinheiro", phrases: [
        ["Just looking, thanks", "Só estou olhando, obrigado"], ["Window-shopping", "Vitrinando"],
        ["An arm and a leg", "Muito caro, o olho da cara"], ["Rip-off", "Roubalheira"], ["Peanuts", "Muito barato"],
      ]},
      { id: "saude-transporte", title: "Saúde e transporte", phrases: [
        ["Make an appointment", "Marcar consulta"], ["Side effects", "Efeitos colaterais"],
        ["Drop me there, please", "Me deixa lá, por favor"], ["At the corner", "Na esquina"],
      ]},
    ],
  },
  {
    id: "tecnico",
    name: "Técnico e corporativo",
    tagline: "Engenharia, meio ambiente e gestão",
    color: "#3A86FF",
    lessons: [
      { id: "engenharia", title: "Engenharia", phrases: [
        ["Blueprint", "Planta baixa, projeto"], ["Tolerance", "Tolerância (de medida)"],
        ["Maintenance", "Manutenção"], ["Assembly line", "Linha de montagem"],
        ["Quality control", "Controle de qualidade"], ["Load-bearing", "Estrutural, que suporta carga"],
      ]},
      { id: "meio-ambiente", title: "Meio ambiente", phrases: [
        ["Sustainability", "Sustentabilidade"], ["Greenhouse gases", "Gases de efeito estufa"],
        ["Renewable energy", "Energia renovável"], ["Carbon footprint", "Pegada de carbono"],
        ["Waste management", "Gestão de resíduos"],
      ]},
      { id: "gestao", title: "Administração e gestão", phrases: [
        ["Stakeholder", "Parte interessada"], ["Deadline", "Prazo final"], ["Budget", "Orçamento"],
        ["Key performance indicator (KPI)", "Indicador-chave de desempenho"], ["Workflow", "Fluxo de trabalho"],
      ]},
    ],
  },
  {
    id: "palavras1000",
    name: "1000 Palavras",
    tagline: "O vocabulário essencial do inglês, em blocos",
    color: "#E0447A",
    lessons: [
      { id: "palavras-bloco-1", title: "Palavras 1–25", phrases: [["I", "eu"], ["you", "você; vocês"], ["he", "ele"], ["she", "ela"], ["it", "isso; ele/ela (coisa)"], ["we", "nós"], ["they", "eles; elas"], ["me", "me; mim"], ["him", "ele; o"], ["her", "ela; a"], ["us", "nos; nós"], ["them", "eles; elas"], ["my", "meu; minha"], ["your", "seu; sua"], ["his", "dele"], ["our", "nosso; nossa"], ["their", "deles; delas"], ["this", "isto; este; esta"], ["that", "isso; aquele; aquela"], ["these", "estes; estas"], ["those", "esses; essas; aqueles"], ["who", "quem"], ["what", "o que; qual"], ["which", "qual; que"], ["where", "onde"]] },
      { id: "palavras-bloco-2", title: "Palavras 26–50", phrases: [["when", "quando"], ["why", "por quê"], ["how", "como"], ["a", "um; uma"], ["an", "um; uma"], ["the", "o; a; os; as"], ["some", "algum; alguns"], ["any", "qualquer; algum"], ["all", "todo; todos"], ["each", "cada"], ["every", "todo; cada"], ["both", "ambos"], ["either", "um dos dois"], ["neither", "nenhum dos dois"], ["another", "outro; mais um"], ["other", "outro"], ["others", "outros"], ["same", "mesmo"], ["such", "tal; tamanho"], ["own", "próprio"], ["enough", "suficiente"], ["more", "mais"], ["most", "a maioria; mais"], ["less", "menos"], ["least", "menos; mínimo"]] },
      { id: "palavras-bloco-3", title: "Palavras 51–75", phrases: [["be", "ser; estar"], ["have", "ter"], ["do", "fazer"], ["say", "dizer"], ["go", "ir"], ["can", "poder"], ["get", "obter; conseguir"], ["make", "fazer; criar"], ["know", "saber; conhecer"], ["think", "pensar; achar"], ["take", "pegar; levar"], ["see", "ver"], ["come", "vir"], ["want", "querer"], ["look", "olhar; parecer"], ["use", "usar"], ["find", "encontrar"], ["give", "dar"], ["tell", "contar; dizer"], ["ask", "perguntar; pedir"], ["work", "trabalhar"], ["seem", "parecer"], ["feel", "sentir"], ["try", "tentar"], ["leave", "sair; deixar"]] },
      { id: "palavras-bloco-4", title: "Palavras 76–100", phrases: [["call", "chamar; ligar"], ["need", "precisar"], ["become", "tornar-se"], ["put", "colocar"], ["mean", "significar; querer dizer"], ["keep", "manter; guardar"], ["let", "deixar; permitir"], ["begin", "começar"], ["help", "ajudar"], ["talk", "falar; conversar"], ["turn", "virar; transformar"], ["start", "começar"], ["show", "mostrar"], ["hear", "ouvir"], ["play", "jogar; tocar"], ["run", "correr; funcionar"], ["move", "mover; mudar"], ["like", "gostar; como"], ["live", "viver; morar"], ["believe", "acreditar"], ["hold", "segurar; manter"], ["bring", "trazer"], ["happen", "acontecer"], ["write", "escrever"], ["provide", "fornecer"]] },
      { id: "palavras-bloco-5", title: "Palavras 101–125", phrases: [["sit", "sentar"], ["stand", "ficar de pé"], ["lose", "perder"], ["pay", "pagar"], ["meet", "encontrar; conhecer"], ["include", "incluir"], ["continue", "continuar"], ["set", "definir; colocar"], ["learn", "aprender"], ["change", "mudar"], ["lead", "liderar; conduzir"], ["understand", "entender"], ["watch", "assistir; observar"], ["follow", "seguir"], ["stop", "parar"], ["create", "criar"], ["speak", "falar"], ["read", "ler"], ["allow", "permitir"], ["add", "adicionar"], ["spend", "gastar; passar (tempo)"], ["grow", "crescer; cultivar"], ["open", "abrir"], ["walk", "caminhar"], ["win", "vencer; ganhar"]] },
      { id: "palavras-bloco-6", title: "Palavras 126–150", phrases: [["offer", "oferecer"], ["remember", "lembrar"], ["love", "amar"], ["consider", "considerar"], ["appear", "aparecer; parecer"], ["buy", "comprar"], ["wait", "esperar"], ["serve", "servir"], ["die", "morrer"], ["send", "enviar"], ["expect", "esperar; esperar que"], ["build", "construir"], ["stay", "ficar"], ["fall", "cair"], ["cut", "cortar"], ["reach", "alcançar"], ["kill", "matar"], ["remain", "permanecer"], ["suggest", "sugerir"], ["raise", "levantar; aumentar"], ["pass", "passar"], ["sell", "vender"], ["require", "exigir"], ["report", "relatar; informar"], ["decide", "decidir"]] },
      { id: "palavras-bloco-7", title: "Palavras 151–175", phrases: [["pull", "puxar"], ["return", "retornar; devolver"], ["explain", "explicar"], ["hope", "esperar; ter esperança"], ["develop", "desenvolver"], ["carry", "carregar"], ["break", "quebrar"], ["receive", "receber"], ["agree", "concordar"], ["support", "apoiar"], ["hit", "atingir; bater"], ["produce", "produzir"], ["eat", "comer"], ["cover", "cobrir"], ["catch", "pegar; capturar"], ["draw", "desenhar; puxar"], ["choose", "escolher"], ["cause", "causar"], ["point", "apontar"], ["listen", "escutar"], ["realize", "perceber"], ["place", "colocar"], ["close", "fechar"], ["involve", "envolver"], ["increase", "aumentar"]] },
      { id: "palavras-bloco-8", title: "Palavras 176–200", phrases: [["improve", "melhorar"], ["join", "juntar-se"], ["answer", "responder"], ["enjoy", "aproveitar; gostar"], ["teach", "ensinar"], ["plan", "planejar"], ["visit", "visitar"], ["travel", "viajar"], ["study", "estudar"], ["forget", "esquecer"], ["finish", "terminar"], ["drive", "dirigir"], ["cook", "cozinhar"], ["clean", "limpar"], ["wash", "lavar"], ["wear", "vestir; usar"], ["sleep", "dormir"], ["wake", "acordar"], ["drink", "beber"], ["prepare", "preparar"], ["check", "verificar"], ["examine", "examinar"], ["manage", "gerenciar"], ["control", "controlar"], ["protect", "proteger"]] },
      { id: "palavras-bloco-9", title: "Palavras 201–225", phrases: [["avoid", "evitar"], ["solve", "resolver"], ["discuss", "discutir"], ["share", "compartilhar"], ["save", "salvar; economizar"], ["fix", "consertar"], ["wish", "desejar"], ["imagine", "imaginar"], ["describe", "descrever"], ["compare", "comparar"], ["discover", "descobrir"], ["practice", "praticar"], ["train", "treinar"], ["question", "questionar"], ["organize", "organizar"], ["arrive", "chegar"], ["enter", "entrar"], ["exit", "sair"], ["pick", "pegar; escolher"], ["drop", "deixar cair"], ["reply", "responder"], ["text", "mandar mensagem"], ["email", "enviar e-mail"], ["ride", "andar; viajar"], ["fly", "voar"]] },
      { id: "palavras-bloco-10", title: "Palavras 226–250", phrases: [["cost", "custar"], ["order", "pedir; encomendar"], ["dress", "vestir-se"], ["brush", "escovar"], ["shower", "tomar banho"], ["taste", "provar; ter sabor"], ["rest", "descansar"], ["exercise", "exercitar-se"], ["laugh", "rir"], ["smile", "sorrir"], ["cry", "chorar"], ["lock", "trancar"], ["unlock", "destrancar"], ["disagree", "discordar"], ["fail", "falhar"], ["succeed", "ter sucesso"], ["repair", "reparar"], ["borrow", "pegar emprestado"], ["lend", "emprestar"], ["design", "projetar"], ["search", "procurar"], ["collect", "coletar"], ["measure", "medir"], ["count", "contar"], ["good", "bom"]] },
      { id: "palavras-bloco-11", title: "Palavras 251–275", phrases: [["bad", "ruim"], ["great", "ótimo; grande"], ["small", "pequeno"], ["large", "grande"], ["big", "grande"], ["little", "pequeno; pouco"], ["long", "longo"], ["short", "curto; baixo"], ["high", "alto"], ["low", "baixo"], ["old", "velho; antigo"], ["young", "jovem"], ["new", "novo"], ["early", "cedo"], ["late", "tarde"], ["important", "importante"], ["different", "diferente"], ["easy", "fácil"], ["difficult", "difícil"], ["hard", "difícil; duro"], ["simple", "simples"], ["possible", "possível"], ["impossible", "impossível"], ["right", "certo; direito"], ["wrong", "errado"]] },
      { id: "palavras-bloco-12", title: "Palavras 276–300", phrases: [["true", "verdadeiro"], ["false", "falso"], ["real", "real"], ["sure", "certo; seguro"], ["ready", "pronto"], ["busy", "ocupado"], ["free", "livre; gratuito"], ["full", "cheio"], ["empty", "vazio"], ["closed", "fechado"], ["strong", "forte"], ["weak", "fraco"], ["safe", "seguro"], ["dangerous", "perigoso"], ["beautiful", "bonito"], ["ugly", "feio"], ["dirty", "sujo"], ["hot", "quente"], ["cold", "frio"], ["warm", "morno; quente"], ["cool", "fresco; legal"], ["fast", "rápido"], ["slow", "lento"], ["quick", "rápido"], ["happy", "feliz"]] },
      { id: "palavras-bloco-13", title: "Palavras 301–325", phrases: [["sad", "triste"], ["angry", "zangado"], ["afraid", "com medo"], ["tired", "cansado"], ["hungry", "com fome"], ["thirsty", "com sede"], ["sick", "doente"], ["healthy", "saudável"], ["rich", "rico"], ["poor", "pobre"], ["cheap", "barato"], ["expensive", "caro"], ["kind", "gentil"], ["nice", "legal; agradável"], ["friendly", "amigável"], ["serious", "sério"], ["funny", "engraçado"], ["interesting", "interessante"], ["boring", "chato"], ["special", "especial"], ["common", "comum"], ["available", "disponível"], ["necessary", "necessário"], ["useful", "útil"], ["clear", "claro"]] },
      { id: "palavras-bloco-14", title: "Palavras 326–350", phrases: [["dark", "escuro"], ["light", "claro; leve"], ["heavy", "pesado"], ["local", "local"], ["national", "nacional"], ["international", "internacional"], ["public", "público"], ["private", "privado"], ["personal", "pessoal"], ["social", "social"], ["natural", "natural"], ["human", "humano"], ["modern", "moderno"], ["traditional", "tradicional"], ["main", "principal"], ["basic", "básico"], ["final", "final"], ["next", "próximo"], ["last", "último"], ["first", "primeiro"], ["best", "melhor"], ["worst", "pior"], ["better", "melhor"], ["worse", "pior"], ["likely", "provável"]] },
      { id: "palavras-bloco-15", title: "Palavras 351–375", phrases: [["certain", "certo"], ["similar", "semelhante"], ["specific", "específico"], ["general", "geral"], ["recent", "recente"], ["current", "atual"], ["future", "futuro"], ["past", "passado"], ["adult", "adulto"], ["time", "tempo"], ["year", "ano"], ["day", "dia"], ["week", "semana"], ["month", "mês"], ["hour", "hora"], ["minute", "minuto"], ["morning", "manhã"], ["afternoon", "tarde"], ["evening", "noite; fim da tarde"], ["night", "noite"], ["today", "hoje"], ["tomorrow", "amanhã"], ["yesterday", "ontem"], ["people", "pessoas"], ["person", "pessoa"]] },
      { id: "palavras-bloco-16", title: "Palavras 376–400", phrases: [["man", "homem"], ["woman", "mulher"], ["child", "criança"], ["boy", "menino"], ["girl", "menina"], ["family", "família"], ["friend", "amigo"], ["life", "vida"], ["world", "mundo"], ["home", "casa; lar"], ["house", "casa"], ["room", "quarto; sala"], ["door", "porta"], ["window", "janela"], ["street", "rua"], ["city", "cidade"], ["country", "país"], ["area", "área"], ["school", "escola"], ["class", "aula; classe"], ["student", "estudante"], ["teacher", "professor"], ["book", "livro"], ["word", "palavra"], ["language", "idioma; língua"]] },
      { id: "palavras-bloco-17", title: "Palavras 401–425", phrases: [["problem", "problema"], ["idea", "ideia"], ["reason", "razão; motivo"], ["example", "exemplo"], ["way", "maneira; caminho"], ["part", "parte"], ["thing", "coisa"], ["fact", "fato"], ["case", "caso"], ["number", "número"], ["name", "nome"], ["job", "emprego"], ["company", "empresa"], ["business", "negócio; empresa"], ["office", "escritório"], ["money", "dinheiro"], ["price", "preço"], ["market", "mercado"], ["service", "serviço"], ["product", "produto"], ["customer", "cliente"], ["team", "equipe"], ["group", "grupo"], ["government", "governo"], ["law", "lei"]] },
      { id: "palavras-bloco-18", title: "Palavras 426–450", phrases: [["power", "poder"], ["community", "comunidade"], ["society", "sociedade"], ["information", "informação"], ["news", "notícias"], ["story", "história"], ["history", "história"], ["picture", "imagem"], ["photo", "foto"], ["video", "vídeo"], ["music", "música"], ["movie", "filme"], ["game", "jogo"], ["food", "comida"], ["water", "água"], ["coffee", "café"], ["bread", "pão"], ["fruit", "fruta"], ["car", "carro"], ["bus", "ônibus"], ["plane", "avião"], ["road", "estrada"], ["phone", "telefone"], ["computer", "computador"], ["internet", "internet"]] },
      { id: "palavras-bloco-19", title: "Palavras 451–475", phrases: [["message", "mensagem"], ["paper", "papel"], ["table", "mesa"], ["chair", "cadeira"], ["bed", "cama"], ["clothes", "roupas"], ["shoes", "sapatos"], ["body", "corpo"], ["head", "cabeça"], ["face", "rosto"], ["eye", "olho"], ["hand", "mão"], ["arm", "braço"], ["leg", "perna"], ["foot", "pé"], ["heart", "coração"], ["mind", "mente"], ["health", "saúde"], ["doctor", "médico"], ["hospital", "hospital"], ["medicine", "medicamento; medicina"], ["experience", "experiência"], ["goal", "objetivo"], ["result", "resultado"], ["decision", "decisão"]] },
      { id: "palavras-bloco-20", title: "Palavras 476–500", phrases: [["choice", "escolha"], ["chance", "chance"], ["opportunity", "oportunidade"], ["success", "sucesso"], ["failure", "fracasso"], ["level", "nível"], ["side", "lado"], ["end", "fim"], ["beginning", "começo"], ["middle", "meio"], ["line", "linha"], ["form", "forma; formulário"], ["system", "sistema"], ["process", "processo"], ["project", "projeto"], ["program", "programa"], ["method", "método"], ["rule", "regra"], ["space", "espaço"], ["building", "edifício"], ["ground", "solo; chão"], ["land", "terra"], ["air", "ar"], ["fire", "fogo"], ["tree", "árvore"]] },
      { id: "palavras-bloco-21", title: "Palavras 501–525", phrases: [["plant", "planta"], ["animal", "animal"], ["nature", "natureza"], ["river", "rio"], ["sea", "mar"], ["sun", "sol"], ["rain", "chuva"], ["weather", "clima; tempo"], ["very", "muito"], ["really", "realmente"], ["quite", "bastante"], ["too", "também; demais"], ["also", "também"], ["only", "somente"], ["just", "apenas; justamente"], ["even", "até; mesmo"], ["still", "ainda"], ["already", "já"], ["again", "novamente"], ["always", "sempre"], ["usually", "geralmente"], ["often", "frequentemente"], ["sometimes", "às vezes"], ["never", "nunca"], ["ever", "alguma vez"]] },
      { id: "palavras-bloco-22", title: "Palavras 526–550", phrases: [["soon", "em breve"], ["now", "agora"], ["then", "então; depois"], ["here", "aqui"], ["there", "lá; ali"], ["together", "juntos"], ["apart", "separado"], ["away", "longe"], ["back", "de volta"], ["forward", "para frente"], ["inside", "dentro"], ["outside", "fora"], ["above", "acima"], ["below", "abaixo"], ["almost", "quase"], ["maybe", "talvez"], ["probably", "provavelmente"], ["perhaps", "talvez"], ["especially", "especialmente"], ["actually", "na verdade"], ["finally", "finalmente"], ["quickly", "rapidamente"], ["slowly", "lentamente"], ["carefully", "cuidadosamente"], ["easily", "facilmente"]] },
      { id: "palavras-bloco-23", title: "Palavras 551–575", phrases: [["exactly", "exatamente"], ["certainly", "certamente"], ["clearly", "claramente"], ["simply", "simplesmente"], ["mostly", "principalmente"], ["recently", "recentemente"], ["directly", "diretamente"], ["instead", "em vez disso"], ["however", "porém; entretanto"], ["therefore", "portanto"], ["otherwise", "caso contrário"], ["rather", "preferencialmente; bastante"], ["once", "uma vez"], ["twice", "duas vezes"], ["daily", "diariamente"], ["weekly", "semanalmente"], ["monthly", "mensalmente"], ["far", "longe"], ["near", "perto"], ["well", "bem"], ["badly", "mal"], ["alone", "sozinho"], ["in", "em; dentro de"], ["on", "em; sobre"], ["at", "em; no; na"]] },
      { id: "palavras-bloco-24", title: "Palavras 576–600", phrases: [["to", "para; até"], ["from", "de; desde"], ["for", "para; por"], ["with", "com"], ["without", "sem"], ["about", "sobre; aproximadamente"], ["of", "de"], ["by", "por; perto de"], ["as", "como"], ["into", "para dentro de"], ["out", "fora de"], ["over", "sobre; acima de"], ["under", "sob; abaixo de"], ["between", "entre"], ["among", "entre vários"], ["through", "através de"], ["during", "durante"], ["before", "antes"], ["after", "depois"], ["against", "contra"], ["around", "ao redor de"], ["behind", "atrás de"], ["beside", "ao lado de"], ["across", "através de; do outro lado"], ["along", "ao longo de"]] },
      { id: "palavras-bloco-25", title: "Palavras 601–625", phrases: [["toward", "em direção a"], ["until", "até"], ["since", "desde"], ["despite", "apesar de"], ["because", "porque"], ["although", "embora"], ["though", "embora"], ["if", "se"], ["unless", "a menos que"], ["while", "enquanto"], ["whether", "se; quer...quer"], ["and", "e"], ["or", "ou"], ["but", "mas"], ["so", "então; portanto"], ["yet", "ainda; porém"], ["nor", "nem"], ["than", "do que"], ["whose", "de quem"], ["whom", "quem; a quem"], ["one", "um"], ["two", "dois"], ["three", "três"], ["four", "quatro"], ["five", "cinco"]] },
      { id: "palavras-bloco-26", title: "Palavras 626–650", phrases: [["six", "seis"], ["seven", "sete"], ["eight", "oito"], ["nine", "nove"], ["ten", "dez"], ["eleven", "onze"], ["twelve", "doze"], ["thirteen", "treze"], ["fourteen", "quatorze"], ["fifteen", "quinze"], ["sixteen", "dezesseis"], ["seventeen", "dezessete"], ["eighteen", "dezoito"], ["nineteen", "dezenove"], ["twenty", "vinte"], ["thirty", "trinta"], ["forty", "quarenta"], ["fifty", "cinquenta"], ["hundred", "cem"], ["thousand", "mil"], ["million", "milhão"], ["second", "segundo"], ["third", "terceiro"], ["half", "metade"], ["quarter", "quarto"]] },
      { id: "palavras-bloco-27", title: "Palavras 651–675", phrases: [["pair", "par"], ["many", "muitos"], ["much", "muito"], ["few", "poucos"], ["several", "vários"], ["none", "nenhum"], ["total", "total"], ["amount", "quantidade"], ["percent", "por cento"], ["career", "carreira"], ["manager", "gerente"], ["employee", "funcionário"], ["employer", "empregador"], ["worker", "trabalhador"], ["leader", "líder"], ["meeting", "reunião"], ["task", "tarefa"], ["schedule", "cronograma"], ["deadline", "prazo"], ["document", "documento"], ["file", "arquivo"], ["client", "cliente"], ["sale", "venda"], ["value", "valor"], ["payment", "pagamento"]] },
      { id: "palavras-bloco-28", title: "Palavras 676–700", phrases: [["account", "conta"], ["bank", "banco"], ["contract", "contrato"], ["policy", "política; diretriz"], ["solution", "solução"], ["strategy", "estratégia"], ["quality", "qualidade"], ["training", "treinamento"], ["course", "curso"], ["college", "faculdade"], ["university", "universidade"], ["lesson", "lição; aula"], ["test", "teste"], ["exam", "exame"], ["knowledge", "conhecimento"], ["skill", "habilidade"], ["research", "pesquisa"], ["data", "dados"], ["subject", "assunto; disciplina"], ["sentence", "frase"], ["meaning", "significado"], ["note", "nota; anotação"], ["degree", "diploma; grau"], ["effort", "esforço"], ["purpose", "propósito"]] },
      { id: "palavras-bloco-29", title: "Palavras 701–725", phrases: [["progress", "progresso"], ["challenge", "desafio"], ["role", "função; papel"], ["responsibility", "responsabilidade"], ["professional", "profissional"], ["apartment", "apartamento"], ["kitchen", "cozinha"], ["bathroom", "banheiro"], ["bedroom", "quarto"], ["wall", "parede"], ["floor", "piso; andar"], ["bath", "banho"], ["key", "chave"], ["meal", "refeição"], ["breakfast", "café da manhã"], ["lunch", "almoço"], ["dinner", "jantar"], ["rice", "arroz"], ["meat", "carne"], ["chicken", "frango"], ["fish", "peixe"], ["egg", "ovo"], ["milk", "leite"], ["cheese", "queijo"], ["vegetable", "vegetal; legume"]] },
      { id: "palavras-bloco-30", title: "Palavras 726–750", phrases: [["apple", "maçã"], ["banana", "banana"], ["orange", "laranja"], ["sugar", "açúcar"], ["salt", "sal"], ["tea", "chá"], ["restaurant", "restaurante"], ["menu", "cardápio"], ["bill", "conta"], ["hotel", "hotel"], ["airport", "aeroporto"], ["station", "estação"], ["ticket", "passagem; ingresso"], ["trip", "viagem"], ["map", "mapa"], ["traffic", "trânsito"], ["beach", "praia"], ["park", "parque"], ["wind", "vento"], ["shirt", "camisa"], ["pants", "calça"], ["shoe", "sapato"], ["coat", "casaco"], ["bag", "bolsa; saco"], ["card", "cartão"]] },
      { id: "palavras-bloco-31", title: "Palavras 751–775", phrases: [["sport", "esporte"], ["ball", "bola"], ["newspaper", "jornal"], ["letter", "carta; letra"], ["gift", "presente"], ["party", "festa"], ["holiday", "feriado; férias"], ["birthday", "aniversário"], ["weekend", "fim de semana"], ["neighbor", "vizinho"], ["earth", "terra"], ["energy", "energia"], ["environment", "meio ambiente"], ["stress", "estresse"], ["dream", "sonho"], ["death", "morte"], ["birth", "nascimento"], ["parent", "pai/mãe"], ["mother", "mãe"], ["father", "pai"], ["brother", "irmão"], ["sister", "irmã"], ["husband", "marido"], ["wife", "esposa"], ["son", "filho"]] },
      { id: "palavras-bloco-32", title: "Palavras 776–800", phrases: [["daughter", "filha"], ["ability", "capacidade"], ["access", "acesso"], ["action", "ação"], ["activity", "atividade"], ["address", "endereço"], ["advice", "conselho"], ["age", "idade"], ["agency", "agência"], ["agreement", "acordo"], ["attention", "atenção"], ["behavior", "comportamento"], ["benefit", "benefício"], ["center", "centro"], ["character", "caráter; personagem"], ["condition", "condição"], ["connection", "conexão"], ["contact", "contato"], ["culture", "cultura"], ["danger", "perigo"], ["difference", "diferença"], ["direction", "direção"], ["education", "educação"], ["effect", "efeito"], ["event", "evento"]] },
      { id: "palavras-bloco-33", title: "Palavras 801–825", phrases: [["evidence", "evidência"], ["feeling", "sentimento"], ["field", "campo; área"], ["force", "força"], ["freedom", "liberdade"], ["growth", "crescimento"], ["industry", "indústria"], ["interest", "interesse"], ["material", "material"], ["matter", "assunto; matéria"], ["member", "membro"], ["moment", "momento"], ["organization", "organização"], ["period", "período"], ["population", "população"], ["pressure", "pressão"], ["relationship", "relacionamento"], ["resource", "recurso"], ["response", "resposta"], ["risk", "risco"], ["situation", "situação"], ["source", "fonte"], ["standard", "padrão; norma"], ["state", "estado; situação"], ["step", "passo"]] },
      { id: "palavras-bloco-34", title: "Palavras 826–850", phrases: [["technology", "tecnologia"], ["term", "termo"], ["type", "tipo"], ["view", "visão; opinião"], ["voice", "voz"], ["whole", "todo; inteiro"], ["effective", "eficaz"], ["exact", "exato"], ["individual", "individual"], ["major", "principal; maior"], ["normal", "normal"], ["political", "político"], ["successful", "bem-sucedido"], ["technical", "técnico"], ["accept", "aceitar"], ["achieve", "alcançar"], ["act", "agir"], ["admit", "admitir"], ["affect", "afetar"], ["apply", "aplicar; candidatar-se"], ["argue", "argumentar"], ["arrange", "organizar"], ["assume", "presumir"], ["attack", "atacar"], ["attempt", "tentar"]] },
      { id: "palavras-bloco-35", title: "Palavras 851–875", phrases: [["attend", "participar; frequentar"], ["belong", "pertencer"], ["cancel", "cancelar"], ["celebrate", "celebrar"], ["claim", "afirmar; reivindicar"], ["communicate", "comunicar"], ["complete", "completar"], ["contain", "conter"], ["depend", "depender"], ["determine", "determinar"], ["encourage", "incentivar"], ["ensure", "garantir"], ["establish", "estabelecer"], ["exist", "existir"], ["fill", "preencher; encher"], ["focus", "focar"], ["handle", "lidar com"], ["identify", "identificar"], ["indicate", "indicar"], ["influence", "influenciar"], ["introduce", "apresentar; introduzir"], ["mention", "mencionar"], ["notice", "perceber"], ["occur", "ocorrer"], ["perform", "realizar; desempenhar"]] },
      { id: "palavras-bloco-36", title: "Palavras 876–900", phrases: [["prefer", "preferir"], ["prevent", "prevenir; impedir"], ["promise", "prometer"], ["prove", "provar"], ["publish", "publicar"], ["reduce", "reduzir"], ["reflect", "refletir"], ["relate", "relacionar"], ["remove", "remover"], ["replace", "substituir"], ["represent", "representar"], ["respond", "responder"], ["review", "revisar"], ["select", "selecionar"], ["sign", "assinar; sinalizar"], ["suppose", "supor"], ["treat", "tratar"], ["trust", "confiar"], ["wonder", "perguntar-se"], ["worry", "preocupar-se"], ["article", "artigo"], ["background", "contexto"], ["balance", "equilíbrio"], ["board", "quadro; diretoria"], ["communication", "comunicação"]] },
      { id: "palavras-bloco-37", title: "Palavras 901–925", phrases: [["competition", "competição"], ["conversation", "conversa"], ["couple", "casal"], ["date", "data; encontro"], ["detail", "detalhe"], ["development", "desenvolvimento"], ["distance", "distância"], ["feature", "característica"], ["figure", "figura; número"], ["habit", "hábito"], ["image", "imagem"], ["issue", "questão; problema"], ["item", "item"], ["list", "lista"], ["location", "localização"], ["model", "modelo"], ["option", "opção"], ["pattern", "padrão"], ["position", "posição"], ["thought", "pensamento"], ["truth", "verdade"], ["understanding", "compreensão"], ["care", "cuidado"], ["town", "cidade pequena"], ["able", "capaz"]] },
      { id: "palavras-bloco-38", title: "Palavras 926–950", phrases: [["above", "acima"], ["according", "de acordo com"], ["across", "através de"], ["actually", "na verdade"], ["address", "endereço"], ["afford", "poder pagar"], ["ahead", "à frente"], ["alone", "sozinho"], ["along", "ao longo"], ["anywhere", "em qualquer lugar"], ["anyway", "de qualquer forma"], ["appear", "aparecer"], ["approach", "abordagem; aproximar-se"], ["argue", "argumentar"], ["around", "ao redor"], ["arrive", "chegar"], ["article", "artigo"], ["available", "disponível"], ["avoid", "evitar"], ["aware", "ciente"], ["beautiful", "bonito"], ["believe", "acreditar"], ["belong", "pertencer"], ["besides", "além disso"], ["beyond", "além de"]] },
      { id: "palavras-bloco-39", title: "Palavras 951–975", phrases: [["both", "ambos"], ["certainly", "certamente"], ["challenge", "desafio"], ["clear", "claro"], ["clearly", "claramente"], ["complete", "completo; completar"], ["continue", "continuar"], ["could", "poderia"], ["deal", "lidar; negócio"], ["deep", "profundo"], ["despite", "apesar de"], ["direct", "direto"], ["direction", "direção"], ["either", "qualquer um dos dois"], ["else", "outro; mais"], ["enjoy", "aproveitar; gostar"], ["especially", "especialmente"], ["exactly", "exatamente"], ["except", "exceto"], ["explain", "explicar"], ["fair", "justo"], ["far", "longe"], ["few", "poucos"], ["finally", "finalmente"], ["follow", "seguir"]] },
      { id: "palavras-bloco-40", title: "Palavras 976–1000", phrases: [["forward", "para frente"], ["general", "geral"], ["guess", "adivinhar"], ["happen", "acontecer"], ["hardly", "mal; quase não"], ["however", "porém"], ["immediately", "imediatamente"], ["instead", "em vez disso"], ["interest", "interesse"], ["involve", "envolver"], ["just", "apenas; justamente"], ["likely", "provável"], ["main", "principal"], ["maybe", "talvez"], ["necessary", "necessário"], ["probably", "provavelmente"], ["rather", "bastante; em vez de"], ["really", "realmente"], ["recently", "recentemente"], ["seem", "parecer"], ["several", "vários"], ["simply", "simplesmente"], ["since", "desde; já que"], ["specific", "específico"], ["still", "ainda"]] },
    ],
  },
  {
    id: "expressoes400",
    name: "400 Expressões",
    tagline: "As frases mais usadas do inglês do dia a dia",
    color: "#2FA88C",
    lessons: [
      { id: "expr400-bloco-1", title: "Expressões 1–20", phrases: [["How are you?", "Como você está?"], ["I'm fine, thanks.", "Estou bem, obrigado(a)."], ["What's your name?", "Qual é o seu nome?"], ["My name is...", "Meu nome é..."], ["Nice to meet you.", "Prazer em conhecer você."], ["Where are you from?", "De onde você é?"], ["I'm from Brazil.", "Sou do Brasil."], ["How old are you?", "Quantos anos você tem?"], ["What do you do?", "O que você faz?"], ["I work as a...", "Eu trabalho como..."], ["See you later.", "Até mais tarde."], ["See you soon.", "Até breve."], ["See you tomorrow.", "Até amanhã."], ["Take care.", "Cuide-se."], ["Have a nice day.", "Tenha um bom dia."], ["Good morning.", "Bom dia."], ["Good afternoon.", "Boa tarde."], ["Good evening.", "Boa noite (ao chegar)."], ["Good night.", "Boa noite (ao sair/dormir)."], ["Welcome!", "Bem-vindo(a)!"]] },
      { id: "expr400-bloco-2", title: "Expressões 21–40", phrases: [["Please.", "Por favor."], ["Thank you.", "Obrigado(a)."], ["You're welcome.", "De nada."], ["Excuse me.", "Com licença / Desculpe."], ["I'm sorry.", "Sinto muito / Desculpe."], ["No problem.", "Sem problema."], ["That's okay.", "Tudo bem."], ["Don't worry.", "Não se preocupe."], ["Of course.", "Claro."], ["Sure.", "Claro / Com certeza."], ["Absolutely.", "Com certeza / Absolutamente."], ["Maybe.", "Talvez."], ["Probably.", "Provavelmente."], ["I think so.", "Acho que sim."], ["I don't think so.", "Acho que não."], ["I agree.", "Eu concordo."], ["I disagree.", "Eu discordo."], ["You're right.", "Você está certo(a)."], ["You're wrong.", "Você está errado(a)."], ["It depends.", "Depende."]] },
      { id: "expr400-bloco-3", title: "Expressões 41–60", phrases: [["I don't know.", "Eu não sei."], ["I have no idea.", "Não faço ideia."], ["I understand.", "Eu entendo."], ["I don't understand.", "Eu não entendo."], ["I see.", "Entendi / Estou vendo."], ["Got it.", "Entendi."], ["I get it.", "Eu entendo / Entendi."], ["What do you mean?", "O que você quer dizer?"], ["What happened?", "O que aconteceu?"], ["What's going on?", "O que está acontecendo?"], ["Can you help me?", "Você pode me ajudar?"], ["Could you help me?", "Você poderia me ajudar?"], ["Can you repeat that?", "Pode repetir isso?"], ["Could you speak more slowly?", "Poderia falar mais devagar?"], ["Please speak slowly.", "Por favor, fale devagar."], ["What does this mean?", "O que isso significa?"], ["How do you say... in English?", "Como se diz... em inglês?"], ["How do you spell it?", "Como se soletra?"], ["What is this?", "O que é isto?"], ["What is that?", "O que é aquilo?"]] },
      { id: "expr400-bloco-4", title: "Expressões 61–80", phrases: [["Where is it?", "Onde fica?"], ["Where are you?", "Onde você está?"], ["I'm here.", "Estou aqui."], ["I'm on my way.", "Estou a caminho."], ["Wait a minute.", "Espere um minuto."], ["Just a moment.", "Só um momento."], ["Come with me.", "Venha comigo."], ["Follow me.", "Siga-me."], ["Let's go.", "Vamos."], ["Let's do it.", "Vamos fazer isso."], ["Let's see.", "Vamos ver."], ["Let's try.", "Vamos tentar."], ["Let's talk.", "Vamos conversar."], ["Let's start.", "Vamos começar."], ["Let's finish.", "Vamos terminar."], ["Hurry up!", "Ande rápido! / Depressa!"], ["Slow down.", "Vá mais devagar."], ["Be careful.", "Tenha cuidado."], ["Watch out!", "Cuidado!"], ["Calm down.", "Acalme-se."]] },
      { id: "expr400-bloco-5", title: "Expressões 81–100", phrases: [["What's up?", "E aí? / O que está acontecendo?"], ["How's it going?", "Como estão as coisas?"], ["Long time no see.", "Quanto tempo!"], ["What have you been up to?", "O que você tem feito?"], ["I'm doing well.", "Estou indo bem."], ["I'm a little tired.", "Estou um pouco cansado(a)."], ["I'm hungry.", "Estou com fome."], ["I'm thirsty.", "Estou com sede."], ["I'm busy.", "Estou ocupado(a)."], ["I'm ready.", "Estou pronto(a)."], ["I'm not ready yet.", "Ainda não estou pronto(a)."], ["Are you ready?", "Você está pronto(a)?"], ["I'm tired.", "Estou cansado(a)."], ["I'm exhausted.", "Estou exausto(a)."], ["I'm excited.", "Estou animado(a)."], ["I'm worried.", "Estou preocupado(a)."], ["I'm happy.", "Estou feliz."], ["I'm sad.", "Estou triste."], ["I'm angry.", "Estou com raiva."], ["I'm afraid.", "Estou com medo."]] },
      { id: "expr400-bloco-6", title: "Expressões 101–120", phrases: [["I need help.", "Preciso de ajuda."], ["I need a favor.", "Preciso de um favor."], ["I need some time.", "Preciso de um tempo."], ["I need to go.", "Preciso ir."], ["I have to go.", "Tenho que ir."], ["I have to work.", "Tenho que trabalhar."], ["I want to learn.", "Quero aprender."], ["I want to know.", "Quero saber."], ["I want to try.", "Quero tentar."], ["I would like...", "Eu gostaria de..."], ["I'd like some water.", "Eu gostaria de água."], ["I'd like to order.", "Eu gostaria de fazer um pedido."], ["I would rather...", "Eu preferiria..."], ["I prefer this one.", "Prefiro este."], ["I don't mind.", "Não me importo."], ["I mind.", "Eu me importo."], ["I miss you.", "Sinto sua falta."], ["I love you.", "Eu te amo."], ["I like it.", "Eu gosto disso."], ["I don't like it.", "Eu não gosto disso."]] },
      { id: "expr400-bloco-7", title: "Expressões 121–140", phrases: [["I love it!", "Eu adoro!"], ["I hate it.", "Eu odeio isso."], ["It looks great.", "Parece ótimo."], ["It sounds good.", "Parece bom."], ["It tastes good.", "Está gostoso."], ["That's amazing!", "Isso é incrível!"], ["That's great!", "Isso é ótimo!"], ["That's awesome!", "Isso é demais!"], ["That's interesting.", "Isso é interessante."], ["That's a good idea.", "É uma boa ideia."], ["That's a bad idea.", "É uma má ideia."], ["It doesn't matter.", "Não importa."], ["It matters.", "Importa."], ["It makes sense.", "Faz sentido."], ["It doesn't make sense.", "Não faz sentido."], ["I hope so.", "Espero que sim."], ["I hope not.", "Espero que não."], ["I guess so.", "Acho que sim."], ["I guess not.", "Acho que não."], ["As far as I know.", "Até onde eu sei."]] },
      { id: "expr400-bloco-8", title: "Expressões 141–160", phrases: [["As soon as possible.", "O mais rápido possível."], ["At least.", "Pelo menos."], ["For example.", "Por exemplo."], ["In fact.", "Na verdade."], ["By the way.", "A propósito."], ["Anyway.", "De qualquer forma."], ["Actually.", "Na verdade."], ["Basically.", "Basicamente."], ["Exactly.", "Exatamente."], ["Not exactly.", "Não exatamente."], ["What time is it?", "Que horas são?"], ["It's five o'clock.", "São cinco horas."], ["What time does it start?", "Que horas começa?"], ["What time does it end?", "Que horas termina?"], ["What day is it?", "Que dia é hoje?"], ["What's the date?", "Qual é a data?"], ["Today.", "Hoje."], ["Tomorrow.", "Amanhã."], ["Yesterday.", "Ontem."], ["Right now.", "Agora mesmo."]] },
      { id: "expr400-bloco-9", title: "Expressões 161–180", phrases: [["See you next week.", "Até a próxima semana."], ["See you next time.", "Até a próxima."], ["I'll call you.", "Vou ligar para você."], ["I'll text you.", "Vou mandar mensagem para você."], ["I'll be back.", "Eu volto."], ["I'll be there.", "Estarei lá."], ["I'll let you know.", "Eu aviso você."], ["Let me know.", "Avise-me."], ["Keep me posted.", "Mantenha-me informado(a)."], ["Give me a call.", "Me ligue."], ["Give me a minute.", "Me dê um minuto."], ["Give me a chance.", "Me dê uma chance."], ["Give me a hand.", "Me dê uma ajuda."], ["Let me help you.", "Deixe-me ajudar você."], ["Let me think.", "Deixe-me pensar."], ["Let me check.", "Deixe-me verificar."], ["Let me see.", "Deixe-me ver."], ["Let me know if...", "Avise-me se..."], ["Don't forget.", "Não se esqueça."], ["Remember that.", "Lembre-se disso."]] },
      { id: "expr400-bloco-10", title: "Expressões 181–200", phrases: [["What do you think?", "O que você acha?"], ["What do you suggest?", "O que você sugere?"], ["What should I do?", "O que devo fazer?"], ["What can I do?", "O que posso fazer?"], ["What would you do?", "O que você faria?"], ["Do you agree?", "Você concorda?"], ["Do you understand?", "Você entende?"], ["Do you have time?", "Você tem tempo?"], ["Do you have a minute?", "Você tem um minuto?"], ["Are you sure?", "Você tem certeza?"], ["Are you kidding?", "Você está brincando?"], ["Really?", "Sério?"], ["Why not?", "Por que não?"], ["Why is that?", "Por que isso?"], ["How come?", "Como assim? / Por que?"], ["How much is it?", "Quanto custa?"], ["How many?", "Quantos?"], ["How long?", "Quanto tempo?"], ["How far?", "Quão longe?"], ["How often?", "Com que frequência?"]] },
      { id: "expr400-bloco-11", title: "Expressões 201–220", phrases: [["Where can I find...?", "Onde posso encontrar...?"], ["Where is the bathroom?", "Onde fica o banheiro?"], ["Is there a pharmacy nearby?", "Há uma farmácia por perto?"], ["How do I get there?", "Como chego lá?"], ["Is it far?", "É longe?"], ["Is it close?", "É perto?"], ["Turn left.", "Vire à esquerda."], ["Turn right.", "Vire à direita."], ["Go straight.", "Siga em frente."], ["It's on the left.", "Fica à esquerda."], ["It's on the right.", "Fica à direita."], ["It's around the corner.", "Fica logo ali na esquina."], ["I'm lost.", "Estou perdido(a)."], ["Can you show me on the map?", "Pode me mostrar no mapa?"], ["I need a taxi.", "Preciso de um táxi."], ["Call a taxi, please.", "Chame um táxi, por favor."], ["Where is the station?", "Onde fica a estação?"], ["Where is the airport?", "Onde fica o aeroporto?"], ["One-way or round trip?", "Só ida ou ida e volta?"], ["How much is a ticket?", "Quanto custa uma passagem?"]] },
      { id: "expr400-bloco-12", title: "Expressões 221–240", phrases: [["I'd like a ticket.", "Gostaria de uma passagem."], ["What platform?", "Qual plataforma?"], ["What gate?", "Qual portão?"], ["Is this seat taken?", "Este assento está ocupado?"], ["Where can I buy a ticket?", "Onde posso comprar uma passagem?"], ["I'd like to book a room.", "Gostaria de reservar um quarto."], ["I have a reservation.", "Tenho uma reserva."], ["I'd like to check in.", "Gostaria de fazer o check-in."], ["I'd like to check out.", "Gostaria de fazer o check-out."], ["Do you have any rooms available?", "Vocês têm quartos disponíveis?"], ["How much is the room?", "Quanto custa o quarto?"], ["Is breakfast included?", "O café da manhã está incluído?"], ["What time is breakfast?", "Que horas é o café da manhã?"], ["Can I have the Wi-Fi password?", "Pode me passar a senha do Wi-Fi?"], ["I need a towel.", "Preciso de uma toalha."], ["The room is not clean.", "O quarto não está limpo."], ["There is a problem with my room.", "Há um problema com meu quarto."], ["Can you fix it?", "Pode consertar isso?"], ["I need to change rooms.", "Preciso trocar de quarto."], ["Thank you for your help.", "Obrigado(a) pela ajuda."]] },
      { id: "expr400-bloco-13", title: "Expressões 241–260", phrases: [["A table for two, please.", "Uma mesa para dois, por favor."], ["Can I see the menu?", "Posso ver o cardápio?"], ["What do you recommend?", "O que você recomenda?"], ["I'd like to order.", "Gostaria de pedir."], ["I'll have this.", "Vou querer isto."], ["I'd like a coffee.", "Gostaria de um café."], ["Can I have some water?", "Pode me trazer água?"], ["No ice, please.", "Sem gelo, por favor."], ["Without sugar, please.", "Sem açúcar, por favor."], ["I'm vegetarian.", "Sou vegetariano(a)."], ["I'm allergic to...", "Sou alérgico(a) a..."], ["Does it contain nuts?", "Contém castanhas/nozes?"], ["Is this spicy?", "Isto é apimentado?"], ["Can I get the bill?", "Pode trazer a conta?"], ["Can I pay by card?", "Posso pagar com cartão?"], ["Keep the change.", "Fique com o troco."], ["It was delicious.", "Estava delicioso."], ["Could I have another one?", "Poderia trazer outro?"], ["To go, please.", "Para viagem, por favor."], ["For here, please.", "Para comer aqui, por favor."]] },
      { id: "expr400-bloco-14", title: "Expressões 261–280", phrases: [["How much does this cost?", "Quanto custa isto?"], ["That's too expensive.", "Isso é caro demais."], ["Do you have anything cheaper?", "Você tem algo mais barato?"], ["Do you have this in another size?", "Tem isso em outro tamanho?"], ["Do you have another color?", "Tem outra cor?"], ["Can I try it on?", "Posso experimentar?"], ["Where are the fitting rooms?", "Onde ficam os provadores?"], ["I'll take it.", "Vou levar."], ["I'm just looking.", "Só estou olhando."], ["Can I pay in cash?", "Posso pagar em dinheiro?"], ["Do you accept credit cards?", "Aceitam cartões de crédito?"], ["Can I get a receipt?", "Pode me dar um recibo?"], ["Is there a discount?", "Tem desconto?"], ["It's on sale.", "Está em promoção."], ["I'm looking for...", "Estou procurando..."], ["I have a question.", "Tenho uma pergunta."], ["Could you explain this?", "Poderia explicar isso?"], ["Can you send me the details?", "Pode me enviar os detalhes?"], ["I'll send it by email.", "Vou enviar por e-mail."], ["I'll get back to you.", "Vou retornar para você."]] },
      { id: "expr400-bloco-15", title: "Expressões 281–300", phrases: [["I'll check and let you know.", "Vou verificar e avisar você."], ["Let's schedule a meeting.", "Vamos marcar uma reunião."], ["When are you available?", "Quando você está disponível?"], ["Does Monday work for you?", "Segunda-feira funciona para você?"], ["That works for me.", "Para mim está ótimo."], ["That doesn't work for me.", "Para mim não funciona."], ["I'm available at...", "Estou disponível às..."], ["I'm not available then.", "Não estou disponível nesse horário."], ["Can we reschedule?", "Podemos remarcar?"], ["Let's discuss it.", "Vamos discutir isso."], ["Let's move on.", "Vamos seguir em frente."], ["Let's get started.", "Vamos começar."], ["Let's take a break.", "Vamos fazer uma pausa."], ["I'll take notes.", "Vou fazer anotações."], ["Please send me the report.", "Por favor, envie-me o relatório."], ["I'll send the report today.", "Vou enviar o relatório hoje."], ["We need to meet the deadline.", "Precisamos cumprir o prazo."], ["We're running late.", "Estamos atrasados."], ["We're on schedule.", "Estamos dentro do cronograma."], ["Good job!", "Bom trabalho!"]] },
      { id: "expr400-bloco-16", title: "Expressões 301–320", phrases: [["Well done!", "Muito bem!"], ["Keep up the good work.", "Continue com o bom trabalho."], ["Great work!", "Ótimo trabalho!"], ["That's a good point.", "Esse é um bom ponto."], ["I agree with you.", "Concordo com você."], ["I see your point.", "Entendo seu ponto de vista."], ["Let's find a solution.", "Vamos encontrar uma solução."], ["We have a problem.", "Temos um problema."], ["We need more information.", "Precisamos de mais informações."], ["I'll look into it.", "Vou verificar/investigar isso."], ["I'll take care of it.", "Vou cuidar disso."], ["It's under control.", "Está sob controle."], ["Keep me informed.", "Mantenha-me informado(a)."], ["What is the deadline?", "Qual é o prazo?"], ["What's the next step?", "Qual é o próximo passo?"], ["Let's make a plan.", "Vamos fazer um plano."], ["We need to improve this.", "Precisamos melhorar isso."], ["It needs to be done.", "Isso precisa ser feito."], ["I'll do my best.", "Vou fazer o meu melhor."], ["Let's work together.", "Vamos trabalhar juntos."]] },
      { id: "expr400-bloco-17", title: "Expressões 321–340", phrases: [["Can I ask you something?", "Posso perguntar uma coisa?"], ["Do you have any questions?", "Você tem alguma pergunta?"], ["That's a good question.", "Essa é uma boa pergunta."], ["I have an idea.", "Tenho uma ideia."], ["I have a suggestion.", "Tenho uma sugestão."], ["In my opinion...", "Na minha opinião..."], ["From my point of view...", "Do meu ponto de vista..."], ["As I mentioned...", "Como mencionei..."], ["As you know...", "Como você sabe..."], ["The main point is...", "O ponto principal é..."], ["For now.", "Por enquanto."], ["So far, so good.", "Até agora, tudo bem."], ["From now on.", "De agora em diante."], ["At the moment.", "No momento."], ["In the meantime.", "Enquanto isso."], ["In the end.", "No final."], ["In the long run.", "A longo prazo."], ["At the same time.", "Ao mesmo tempo."], ["On the other hand.", "Por outro lado."], ["For sure.", "Com certeza."]] },
      { id: "expr400-bloco-18", title: "Expressões 341–360", phrases: [["No way!", "De jeito nenhum! / Não acredito!"], ["Of course not.", "Claro que não."], ["Not at all.", "De jeito nenhum."], ["Never mind.", "Deixa para lá."], ["Forget it.", "Esqueça."], ["It doesn't matter.", "Não importa."], ["That's enough.", "Isso é suficiente."], ["That's it.", "É isso."], ["Here you go.", "Aqui está."], ["There you go.", "Aí está."], ["Here we are.", "Chegamos / Aqui estamos."], ["There we are.", "Pronto / Aí está."], ["Go ahead.", "Pode ir / Pode começar."], ["After you.", "Depois de você."], ["Come on!", "Vamos! / Qual é!"], ["Hold on.", "Espere."], ["Hang on.", "Aguarde."], ["Just kidding.", "Estou brincando."], ["No kidding!", "Sério! / Não brinca!"], ["Good for you!", "Que bom para você!"]] },
      { id: "expr400-bloco-19", title: "Expressões 361–380", phrases: [["Lucky you!", "Que sorte a sua!"], ["That's too bad.", "Que pena."], ["What a shame.", "Que pena."], ["Congratulations!", "Parabéns!"], ["Good luck!", "Boa sorte!"], ["Have fun!", "Divirta-se!"], ["Enjoy yourself!", "Aproveite!"], ["Get well soon.", "Melhoras."], ["Happy birthday!", "Feliz aniversário!"], ["Happy New Year!", "Feliz Ano Novo!"], ["Merry Christmas!", "Feliz Natal!"], ["Bless you!", "Saúde! (após espirro)"], ["Cheers!", "Saúde! / Um brinde!"], ["Welcome back!", "Bem-vindo(a) de volta!"], ["Make yourself at home.", "Sinta-se em casa."], ["Have a good trip.", "Boa viagem."], ["Drive safely.", "Dirija com segurança."], ["Be right back.", "Já volto."], ["I'll be right there.", "Já estarei aí."], ["I'm almost there.", "Estou quase chegando."]] },
      { id: "expr400-bloco-20", title: "Expressões 381–400", phrases: [["I'm running late.", "Estou atrasado(a)."], ["I got stuck in traffic.", "Fiquei preso(a) no trânsito."], ["I forgot.", "Eu esqueci."], ["I remember.", "Eu me lembro."], ["I don't remember.", "Não me lembro."], ["I made a mistake.", "Cometi um erro."], ["It's my fault.", "A culpa é minha."], ["It's not my fault.", "Não é minha culpa."], ["Don't take it personally.", "Não leve para o lado pessoal."], ["It happens.", "Acontece."], ["Things happen.", "As coisas acontecem."], ["Better late than never.", "Antes tarde do que nunca."], ["Easier said than done.", "É mais fácil falar do que fazer."], ["Time will tell.", "O tempo dirá."], ["That's life.", "É a vida."], ["It is what it is.", "É o que é."], ["The sooner, the better.", "Quanto antes, melhor."], ["Better safe than sorry.", "Melhor prevenir do que remediar."], ["Practice makes perfect.", "A prática leva à perfeição."], ["Keep going!", "Continue! / Não desista!"]] },
    ],
  },
  {
    id: "expressoes600",
    name: "600 Técnicas",
    tagline: "Engenharia, meio ambiente, campo e gestão",
    color: "#5B5FE0",
    lessons: [
      { id: "exp600-gestao-ambiental-e-sustentabilidade-1", title: "Gestão ambiental e sustentabilidade (1/4)", phrases: [["Environmental management", "Gestão ambiental"], ["Environmental sustainability", "Sustentabilidade ambiental"], ["Sustainable development", "Desenvolvimento sustentável"], ["Environmental policy", "Política ambiental"], ["Environmental planning", "Planejamento ambiental"], ["Environmental performance", "Desempenho ambiental"], ["Environmental indicator", "Indicador ambiental"], ["Environmental objective", "Objetivo ambiental"], ["Environmental target", "Meta ambiental"], ["Environmental program", "Programa ambiental"], ["Environmental action plan", "Plano de ação ambiental"], ["Environmental management system", "Sistema de gestão ambiental"], ["Environmental compliance", "Conformidade ambiental"], ["Legal compliance", "Conformidade legal"], ["Environmental responsibility", "Responsabilidade ambiental"], ["Corporate sustainability", "Sustentabilidade corporativa"], ["Environmental governance", "Governança ambiental"], ["Environmental risk", "Risco ambiental"], ["Environmental risk management", "Gestão de riscos ambientais"], ["Environmental impact", "Impacto ambiental"]] },
      { id: "exp600-gestao-ambiental-e-sustentabilidade-2", title: "Gestão ambiental e sustentabilidade (2/4)", phrases: [["Environmental aspect", "Aspecto ambiental"], ["Significant environmental aspect", "Aspecto ambiental significativo"], ["Environmental monitoring", "Monitoramento ambiental"], ["Environmental inspection", "Inspeção ambiental"], ["Environmental audit", "Auditoria ambiental"], ["Environmental assessment", "Avaliação ambiental"], ["Environmental diagnosis", "Diagnóstico ambiental"], ["Environmental licensing", "Licenciamento ambiental"], ["Environmental permit", "Licença ambiental"], ["Environmental authorization", "Autorização ambiental"], ["Environmental condition", "Condição ambiental"], ["Environmental requirement", "Requisito ambiental"], ["Environmental standard", "Norma ambiental"], ["Environmental legislation", "Legislação ambiental"], ["Environmental regulation", "Regulamentação ambiental"], ["Environmental agency", "Órgão ambiental"], ["Regulatory compliance", "Conformidade regulatória"], ["Environmental liability", "Passivo ambiental"], ["Environmental asset", "Ativo ambiental"], ["Environmental cost", "Custo ambiental"]] },
      { id: "exp600-gestao-ambiental-e-sustentabilidade-3", title: "Gestão ambiental e sustentabilidade (3/4)", phrases: [["Environmental investment", "Investimento ambiental"], ["Environmental expenditure", "Despesa ambiental"], ["Environmental education", "Educação ambiental"], ["Environmental awareness", "Conscientização ambiental"], ["Environmental training", "Treinamento ambiental"], ["Environmental communication", "Comunicação ambiental"], ["Environmental culture", "Cultura ambiental"], ["Environmental stewardship", "Gestão responsável do meio ambiente"], ["Natural resources management", "Gestão de recursos naturais"], ["Ecosystem services", "Serviços ecossistêmicos"], ["Natural capital", "Capital natural"], ["Circular economy", "Economia circular"], ["Green economy", "Economia verde"], ["Low-carbon economy", "Economia de baixo carbono"], ["Climate resilience", "Resiliência climática"], ["Climate adaptation", "Adaptação climática"], ["Climate mitigation", "Mitigação climática"], ["Carbon footprint", "Pegada de carbono"], ["Greenhouse gas emissions", "Emissões de gases de efeito estufa"], ["Carbon emissions", "Emissões de carbono"]] },
      { id: "exp600-gestao-ambiental-e-sustentabilidade-4", title: "Gestão ambiental e sustentabilidade (4/4)", phrases: [["Carbon neutrality", "Neutralidade de carbono"], ["Net zero", "Emissões líquidas zero"], ["Environmental, social and governance (ESG)", "Ambiental, social e governança (ESG)"], ["Materiality assessment", "Avaliação de materialidade"], ["Double materiality", "Dupla materialidade"], ["Stakeholder engagement", "Engajamento das partes interessadas"], ["Environmental disclosure", "Divulgação ambiental"], ["Environmental reporting", "Relato ambiental"], ["Sustainability report", "Relatório de sustentabilidade"], ["Environmental due diligence", "Due diligence ambiental"], ["Environmental management plan", "Plano de gestão ambiental"], ["Environmental control", "Controle ambiental"], ["Pollution prevention", "Prevenção da poluição"], ["Cleaner production", "Produção mais limpa"], ["Best environmental practices", "Melhores práticas ambientais"]] },
      { id: "exp600-residuos-saneamento-agua-e-efluentes-1", title: "Resíduos, saneamento, água e efluentes (1/4)", phrases: [["Solid waste management", "Gestão de resíduos sólidos"], ["Waste management plan", "Plano de gerenciamento de resíduos"], ["Waste segregation", "Segregação de resíduos"], ["Waste characterization", "Caracterização de resíduos"], ["Waste classification", "Classificação de resíduos"], ["Waste inventory", "Inventário de resíduos"], ["Waste generation", "Geração de resíduos"], ["Waste reduction", "Redução de resíduos"], ["Waste minimization", "Minimização de resíduos"], ["Waste reuse", "Reutilização de resíduos"], ["Waste recycling", "Reciclagem de resíduos"], ["Waste recovery", "Recuperação de resíduos"], ["Waste treatment", "Tratamento de resíduos"], ["Waste disposal", "Disposição de resíduos"], ["Final disposal", "Disposição final"], ["Waste collection", "Coleta de resíduos"], ["Selective collection", "Coleta seletiva"], ["Reverse logistics", "Logística reversa"], ["Extended producer responsibility", "Responsabilidade estendida do produtor"], ["Waste transport", "Transporte de resíduos"]] },
      { id: "exp600-residuos-saneamento-agua-e-efluentes-2", title: "Resíduos, saneamento, água e efluentes (2/4)", phrases: [["Waste storage", "Armazenamento de resíduos"], ["Temporary waste storage", "Armazenamento temporário de resíduos"], ["Hazardous waste", "Resíduo perigoso"], ["Non-hazardous waste", "Resíduo não perigoso"], ["Recyclable waste", "Resíduo reciclável"], ["Organic waste", "Resíduo orgânico"], ["Construction waste", "Resíduo da construção civil"], ["Healthcare waste", "Resíduo de serviço de saúde"], ["Electronic waste", "Resíduo eletroeletrônico"], ["Industrial waste", "Resíduo industrial"], ["Sludge management", "Gestão de lodos"], ["Wastewater treatment", "Tratamento de águas residuárias"], ["Domestic wastewater", "Esgoto doméstico"], ["Industrial wastewater", "Efluente industrial"], ["Effluent treatment plant", "Estação de tratamento de efluentes"], ["Sewage treatment plant", "Estação de tratamento de esgoto"], ["Water treatment plant", "Estação de tratamento de água"], ["Drinking water treatment", "Tratamento de água potável"], ["Water quality", "Qualidade da água"], ["Water quality monitoring", "Monitoramento da qualidade da água"]] },
      { id: "exp600-residuos-saneamento-agua-e-efluentes-3", title: "Resíduos, saneamento, água e efluentes (3/4)", phrases: [["Effluent monitoring", "Monitoramento de efluentes"], ["Effluent discharge", "Lançamento de efluentes"], ["Discharge standard", "Padrão de lançamento"], ["Water body", "Corpo hídrico"], ["Receiving water body", "Corpo receptor"], ["Water resources management", "Gestão de recursos hídricos"], ["Water use permit", "Outorga de uso da água"], ["Water abstraction", "Captação de água"], ["Water consumption", "Consumo de água"], ["Water balance", "Balanço hídrico"], ["Water reuse", "Reúso de água"], ["Rainwater harvesting", "Captação de água de chuva"], ["Stormwater management", "Gestão de águas pluviais"], ["Drainage system", "Sistema de drenagem"], ["Urban drainage", "Drenagem urbana"], ["Flood control", "Controle de enchentes"], ["Watershed management", "Gestão de bacias hidrográficas"], ["Watershed", "Bacia hidrográfica"], ["River basin committee", "Comitê de bacia hidrográfica"], ["Groundwater", "Água subterrânea"]] },
      { id: "exp600-residuos-saneamento-agua-e-efluentes-4", title: "Resíduos, saneamento, água e efluentes (4/4)", phrases: [["Surface water", "Água superficial"], ["Aquifer", "Aquífero"], ["Groundwater monitoring", "Monitoramento de águas subterrâneas"], ["Water table", "Lençol freático"], ["Water pollution", "Poluição hídrica"], ["Water contamination", "Contaminação da água"], ["Oil and grease", "Óleos e graxas"], ["Biochemical oxygen demand (BOD)", "Demanda bioquímica de oxigênio (DBO)"], ["Chemical oxygen demand (COD)", "Demanda química de oxigênio (DQO)"], ["Total suspended solids (TSS)", "Sólidos suspensos totais (SST)"], ["pH monitoring", "Monitoramento de pH"], ["Dissolved oxygen", "Oxigênio dissolvido"], ["Nutrient removal", "Remoção de nutrientes"], ["Biological treatment", "Tratamento biológico"], ["Physical treatment", "Tratamento físico"]] },
      { id: "exp600-licenciamento-legislacao-e-regularizacao-1", title: "Licenciamento, legislação e regularização (1/4)", phrases: [["Environmental licensing process", "Processo de licenciamento ambiental"], ["Licensing authority", "Autoridade licenciadora"], ["Licensing procedure", "Procedimento de licenciamento"], ["License application", "Requerimento de licença"], ["License renewal", "Renovação da licença"], ["License amendment", "Alteração da licença"], ["License condition", "Condicionante da licença"], ["Environmental condition compliance", "Cumprimento de condicionantes"], ["License validity", "Validade da licença"], ["Operating license", "Licença de operação"], ["Installation license", "Licença de instalação"], ["Preliminary license", "Licença prévia"], ["Environmental authorization", "Autorização ambiental"], ["Simplified licensing", "Licenciamento simplificado"], ["Corrective licensing", "Licenciamento corretivo"], ["Environmental impact assessment (EIA)", "Estudo de impacto ambiental (EIA)"], ["Environmental impact report (RIMA)", "Relatório de impacto ambiental (RIMA)"], ["Environmental study", "Estudo ambiental"], ["Environmental report", "Relatório ambiental"], ["Environmental impact statement", "Declaração de impacto ambiental"]] },
      { id: "exp600-licenciamento-legislacao-e-regularizacao-2", title: "Licenciamento, legislação e regularização (2/4)", phrases: [["Public hearing", "Audiência pública"], ["Public consultation", "Consulta pública"], ["Terms of reference", "Termo de referência"], ["Technical report", "Relatório técnico"], ["Environmental diagnosis", "Diagnóstico ambiental"], ["Environmental prognosis", "Prognóstico ambiental"], ["Impact identification", "Identificação de impactos"], ["Impact assessment", "Avaliação de impactos"], ["Impact prediction", "Previsão de impactos"], ["Impact significance", "Significância do impacto"], ["Impact magnitude", "Magnitude do impacto"], ["Impact duration", "Duração do impacto"], ["Impact extent", "Abrangência do impacto"], ["Cumulative impact", "Impacto cumulativo"], ["Direct impact", "Impacto direto"], ["Indirect impact", "Impacto indireto"], ["Positive impact", "Impacto positivo"], ["Negative impact", "Impacto negativo"], ["Mitigation measure", "Medida mitigadora"], ["Compensatory measure", "Medida compensatória"]] },
      { id: "exp600-licenciamento-legislacao-e-regularizacao-3", title: "Licenciamento, legislação e regularização (3/4)", phrases: [["Environmental compensation", "Compensação ambiental"], ["Environmental monitoring program", "Programa de monitoramento ambiental"], ["Environmental control program", "Programa de controle ambiental"], ["Environmental education program", "Programa de educação ambiental"], ["Recovery plan", "Plano de recuperação"], ["Environmental recovery plan", "Plano de recuperação ambiental"], ["Degraded area recovery", "Recuperação de área degradada"], ["Environmental restoration", "Restauração ambiental"], ["Environmental infraction", "Infração ambiental"], ["Environmental violation", "Violação ambiental"], ["Environmental fine", "Multa ambiental"], ["Notice of violation", "Auto de infração"], ["Environmental enforcement", "Fiscalização ambiental"], ["Inspection report", "Relatório de fiscalização"], ["Administrative proceeding", "Processo administrativo"], ["Environmental liability assessment", "Avaliação de responsabilidade ambiental"], ["Environmental legal opinion", "Parecer jurídico-ambiental"], ["Technical opinion", "Parecer técnico"], ["Environmental authorization document", "Documento de autorização ambiental"], ["Proof of compliance", "Comprovante de conformidade"]] },
      { id: "exp600-licenciamento-legislacao-e-regularizacao-4", title: "Licenciamento, legislação e regularização (4/4)", phrases: [["Environmental registry", "Cadastro ambiental"], ["Rural Environmental Registry (CAR)", "Cadastro Ambiental Rural (CAR)"], ["Environmental regularization", "Regularização ambiental"], ["Rural environmental regularization", "Regularização ambiental rural"], ["Environmental regularization program", "Programa de Regularização Ambiental (PRA)"], ["Environmental commitment agreement", "Termo de compromisso ambiental"], ["Conduct adjustment agreement", "Termo de ajustamento de conduta (TAC)"], ["Protected area", "Área protegida"], ["Permanent preservation area (APP)", "Área de preservação permanente (APP)"], ["Legal reserve", "Reserva legal"], ["Native vegetation", "Vegetação nativa"], ["Deforestation authorization", "Autorização de supressão vegetal"], ["Vegetation suppression", "Supressão de vegetação"], ["Environmental authorization for vegetation removal", "Autorização ambiental para supressão"], ["Wildlife management", "Manejo de fauna"]] },
      { id: "exp600-regularizacao-fundiaria-e-cadastro-rural-1", title: "Regularização fundiária e cadastro rural (1/4)", phrases: [["Land regularization", "Regularização fundiária"], ["Rural land regularization", "Regularização fundiária rural"], ["Urban land regularization", "Regularização fundiária urbana"], ["Land tenure", "Posse e domínio da terra"], ["Land ownership", "Propriedade da terra"], ["Property title", "Título de propriedade"], ["Land title", "Título fundiário"], ["Land registry", "Registro de imóvel"], ["Property registration", "Matrícula do imóvel"], ["Deed", "Escritura"], ["Public deed", "Escritura pública"], ["Private agreement", "Contrato particular"], ["Chain of title", "Cadeia dominial"], ["Title search", "Pesquisa dominial"], ["Land tenure history", "Histórico fundiário"], ["Boundary survey", "Levantamento de limites"], ["Property boundary", "Limite do imóvel"], ["Boundary marker", "Marco de divisa"], ["Property boundary dispute", "Conflito de limites"], ["Georeferencing", "Georreferenciamento"]] },
      { id: "exp600-regularizacao-fundiaria-e-cadastro-rural-2", title: "Regularização fundiária e cadastro rural (2/4)", phrases: [["Rural property georeferencing", "Georreferenciamento de imóvel rural"], ["Georeferenced polygon", "Polígono georreferenciado"], ["Certified polygon", "Polígono certificado"], ["Survey certificate", "Certificação do levantamento"], ["Land parcel", "Parcela fundiária"], ["Land parcel identification", "Identificação da parcela"], ["Rural property", "Imóvel rural"], ["Urban property", "Imóvel urbano"], ["Land parceling", "Parcelamento do solo"], ["Land subdivision", "Desmembramento"], ["Land development", "Loteamento"], ["Lot", "Lote"], ["Block", "Quadra"], ["Right of way", "Faixa de domínio"], ["Public land", "Terra pública"], ["Private land", "Terra privada"], ["Federal land", "Terra da União"], ["State land", "Terra estadual"], ["Municipal land", "Terra municipal"], ["Vacant land", "Terra devoluta"]] },
      { id: "exp600-regularizacao-fundiaria-e-cadastro-rural-3", title: "Regularização fundiária e cadastro rural (3/4)", phrases: [["Indigenous land", "Terra indígena"], ["Traditional territory", "Território tradicional"], ["Land occupation", "Ocupação da terra"], ["Informal occupation", "Ocupação informal"], ["Possession", "Posse"], ["Adverse possession", "Usucapião"], ["Property regularization", "Regularização imobiliária"], ["Land registry office", "Cartório de registro de imóveis"], ["Registry certificate", "Certidão de registro"], ["Property certificate", "Certidão do imóvel"], ["Encumbrance certificate", "Certidão de ônus reais"], ["Ownership certificate", "Certidão de propriedade"], ["Property tax", "Imposto predial/territorial"], ["Rural land tax", "Imposto sobre a propriedade territorial rural (ITR)"], ["Rural Environmental Registry", "Cadastro Ambiental Rural"], ["Rural Property Registration", "Cadastro do imóvel rural"], ["Rural property code", "Código do imóvel rural"], ["Land use", "Uso do solo"], ["Land cover", "Cobertura do solo"], ["Current land use", "Uso atual do solo"]] },
      { id: "exp600-regularizacao-fundiaria-e-cadastro-rural-4", title: "Regularização fundiária e cadastro rural (4/4)", phrases: [["Land-use conflict", "Conflito de uso do solo"], ["Land-use planning", "Planejamento do uso do solo"], ["Land-use restriction", "Restrição de uso do solo"], ["Land capability", "Capacidade de uso da terra"], ["Land suitability", "Aptidão da terra"], ["Environmental restriction", "Restrição ambiental"], ["Protected land", "Área protegida"], ["Legal reserve area", "Área de reserva legal"], ["Permanent preservation area", "Área de preservação permanente"], ["Conservation unit", "Unidade de conservação"], ["Settlement project", "Projeto de assentamento"], ["Rural settlement", "Assentamento rural"], ["Land tenure security", "Segurança da posse"], ["Social land regularization", "Regularização fundiária social"], ["Specific social regularization", "Regularização fundiária de interesse social"]] },
      { id: "exp600-topografia-geoprocessamento-e-georreferenciamento-1", title: "Topografia, geoprocessamento e georreferenciamento (1/4)", phrases: [["Topographic survey", "Levantamento topográfico"], ["Topographic map", "Mapa topográfico"], ["Topographic plan", "Planta topográfica"], ["Surveying", "Topografia"], ["Surveyor", "Topógrafo"], ["Survey equipment", "Equipamento topográfico"], ["Total station", "Estação total"], ["Electronic total station", "Estação total eletrônica"], ["GNSS receiver", "Receptor GNSS"], ["GPS survey", "Levantamento com GPS"], ["RTK positioning", "Posicionamento RTK"], ["Real-time kinematic", "Cinemática em tempo real"], ["Base station", "Estação base"], ["Rover", "Receptor móvel"], ["Coordinate system", "Sistema de coordenadas"], ["Reference system", "Sistema de referência"], ["Geodetic datum", "Datum geodésico"], ["Horizontal datum", "Datum horizontal"], ["Vertical datum", "Datum vertical"], ["Geographic coordinates", "Coordenadas geográficas"]] },
      { id: "exp600-topografia-geoprocessamento-e-georreferenciamento-2", title: "Topografia, geoprocessamento e georreferenciamento (2/4)", phrases: [["Projected coordinates", "Coordenadas projetadas"], ["Latitude", "Latitude"], ["Longitude", "Longitude"], ["Elevation", "Elevação"], ["Orthometric height", "Altitude ortométrica"], ["Ellipsoidal height", "Altura elipsoidal"], ["Mean sea level", "Nível médio do mar"], ["Benchmark", "Referência de nível"], ["Control point", "Ponto de controle"], ["Ground control point", "Ponto de controle em campo"], ["Traverse", "Poligonal"], ["Closed traverse", "Poligonal fechada"], ["Open traverse", "Poligonal aberta"], ["Traverse adjustment", "Ajustamento de poligonal"], ["Leveling", "Nivelamento"], ["Differential leveling", "Nivelamento geométrico"], ["Trigonometric leveling", "Nivelamento trigonométrico"], ["Topographic profile", "Perfil topográfico"], ["Longitudinal profile", "Perfil longitudinal"], ["Cross section", "Seção transversal"]] },
      { id: "exp600-topografia-geoprocessamento-e-georreferenciamento-3", title: "Topografia, geoprocessamento e georreferenciamento (3/4)", phrases: [["Contour line", "Curva de nível"], ["Contour interval", "Equidistância das curvas de nível"], ["Terrain model", "Modelo do terreno"], ["Digital terrain model (DTM)", "Modelo digital do terreno (MDT)"], ["Digital elevation model (DEM)", "Modelo digital de elevação (MDE)"], ["Digital surface model (DSM)", "Modelo digital de superfície (MDS)"], ["Point cloud", "Nuvem de pontos"], ["LiDAR survey", "Levantamento LiDAR"], ["Drone survey", "Levantamento com drone"], ["Aerial survey", "Levantamento aéreo"], ["Photogrammetry", "Fotogrametria"], ["Orthomosaic", "Ortomosaico"], ["Orthophoto", "Ortofoto"], ["Ground sampling distance", "Distância de amostragem no terreno"], ["Georeferencing", "Georreferenciamento"], ["Geospatial analysis", "Análise geoespacial"], ["Geographic information system (GIS)", "Sistema de informações geográficas (SIG)"], ["Spatial analysis", "Análise espacial"], ["Spatial database", "Banco de dados espacial"], ["Geospatial data", "Dados geoespaciais"]] },
      { id: "exp600-topografia-geoprocessamento-e-georreferenciamento-4", title: "Topografia, geoprocessamento e georreferenciamento (4/4)", phrases: [["Raster data", "Dados raster"], ["Vector data", "Dados vetoriais"], ["Point feature", "Feição pontual"], ["Line feature", "Feição linear"], ["Polygon feature", "Feição poligonal"], ["Attribute table", "Tabela de atributos"], ["Map projection", "Projeção cartográfica"], ["UTM projection", "Projeção UTM"], ["Coordinate transformation", "Transformação de coordenadas"], ["Datum transformation", "Transformação de datum"], ["Accuracy", "Exatidão"], ["Precision", "Precisão"], ["Positional accuracy", "Exatidão posicional"], ["Survey error", "Erro de levantamento"], ["Measurement uncertainty", "Incerteza de medição"]] },
      { id: "exp600-lideranca-pessoas-e-comunicacao-1", title: "Liderança, pessoas e comunicação (1/4)", phrases: [["Leadership", "Liderança"], ["Leadership style", "Estilo de liderança"], ["Strategic leadership", "Liderança estratégica"], ["Servant leadership", "Liderança servidora"], ["Situational leadership", "Liderança situacional"], ["Team leadership", "Liderança de equipe"], ["People management", "Gestão de pessoas"], ["People development", "Desenvolvimento de pessoas"], ["Talent management", "Gestão de talentos"], ["Team building", "Construção de equipes"], ["High-performance team", "Equipe de alto desempenho"], ["Teamwork", "Trabalho em equipe"], ["Collaboration", "Colaboração"], ["Cooperation", "Cooperação"], ["Delegation", "Delegação"], ["Accountability", "Responsabilização"], ["Ownership", "Senso de responsabilidade"], ["Empowerment", "Empoderamento"], ["Decision-making", "Tomada de decisão"], ["Problem-solving", "Resolução de problemas"]] },
      { id: "exp600-lideranca-pessoas-e-comunicacao-2", title: "Liderança, pessoas e comunicação (2/4)", phrases: [["Critical thinking", "Pensamento crítico"], ["Strategic thinking", "Pensamento estratégico"], ["Creativity", "Criatividade"], ["Innovation", "Inovação"], ["Emotional intelligence", "Inteligência emocional"], ["Self-awareness", "Autoconsciência"], ["Active listening", "Escuta ativa"], ["Effective communication", "Comunicação eficaz"], ["Clear communication", "Comunicação clara"], ["Feedback", "Feedback / retorno"], ["Constructive feedback", "Feedback construtivo"], ["Performance feedback", "Feedback de desempenho"], ["One-on-one meeting", "Reunião individual"], ["Team meeting", "Reunião de equipe"], ["Conflict management", "Gestão de conflitos"], ["Conflict resolution", "Resolução de conflitos"], ["Negotiation", "Negociação"], ["Mediation", "Mediação"], ["Persuasion", "Persuasão"], ["Influence", "Influência"]] },
      { id: "exp600-lideranca-pessoas-e-comunicacao-3", title: "Liderança, pessoas e comunicação (3/4)", phrases: [["Stakeholder communication", "Comunicação com partes interessadas"], ["Public speaking", "Oratória"], ["Presentation skills", "Habilidades de apresentação"], ["Facilitation", "Facilitação"], ["Meeting facilitation", "Condução de reuniões"], ["Active participation", "Participação ativa"], ["Employee engagement", "Engajamento dos colaboradores"], ["Employee motivation", "Motivação dos colaboradores"], ["Recognition", "Reconhecimento"], ["Reward system", "Sistema de recompensas"], ["Career development", "Desenvolvimento de carreira"], ["Career path", "Plano de carreira"], ["Professional development", "Desenvolvimento profissional"], ["Training needs", "Necessidades de treinamento"], ["Training plan", "Plano de treinamento"], ["Competency development", "Desenvolvimento de competências"], ["Competency matrix", "Matriz de competências"], ["Performance management", "Gestão de desempenho"], ["Performance appraisal", "Avaliação de desempenho"], ["Key performance indicator (KPI)", "Indicador-chave de desempenho"]] },
      { id: "exp600-lideranca-pessoas-e-comunicacao-4", title: "Liderança, pessoas e comunicação (4/4)", phrases: [["Goal setting", "Definição de metas"], ["SMART goals", "Metas SMART"], ["Continuous learning", "Aprendizagem contínua"], ["Knowledge sharing", "Compartilhamento de conhecimento"], ["Knowledge management", "Gestão do conhecimento"], ["Organizational culture", "Cultura organizacional"], ["Company values", "Valores da empresa"], ["Code of conduct", "Código de conduta"], ["Ethical leadership", "Liderança ética"], ["Integrity", "Integridade"], ["Transparency", "Transparência"], ["Trust", "Confiança"], ["Psychological safety", "Segurança psicológica"], ["Workplace culture", "Cultura do ambiente de trabalho"], ["Change management", "Gestão da mudança"]] },
      { id: "exp600-gestao-empresarial-projetos-e-negocios-1", title: "Gestão empresarial, projetos e negócios (1/4)", phrases: [["Business management", "Gestão empresarial"], ["Business strategy", "Estratégia empresarial"], ["Strategic planning", "Planejamento estratégico"], ["Business plan", "Plano de negócios"], ["Business model", "Modelo de negócio"], ["Value proposition", "Proposta de valor"], ["Business objective", "Objetivo empresarial"], ["Business goal", "Meta empresarial"], ["Strategic objective", "Objetivo estratégico"], ["Action plan", "Plano de ação"], ["Execution plan", "Plano de execução"], ["Operational plan", "Plano operacional"], ["Business process", "Processo empresarial"], ["Process management", "Gestão de processos"], ["Process improvement", "Melhoria de processos"], ["Workflow", "Fluxo de trabalho"], ["Standard operating procedure (SOP)", "Procedimento operacional padrão (POP)"], ["Operational efficiency", "Eficiência operacional"], ["Productivity", "Produtividade"], ["Performance", "Desempenho"]] },
      { id: "exp600-gestao-empresarial-projetos-e-negocios-2", title: "Gestão empresarial, projetos e negócios (2/4)", phrases: [["Performance indicator", "Indicador de desempenho"], ["Dashboard", "Painel de indicadores"], ["Management dashboard", "Painel gerencial"], ["Key performance indicator", "Indicador-chave de desempenho"], ["Target", "Meta"], ["Benchmark", "Referência comparativa"], ["Benchmarking", "Benchmarking / comparação de desempenho"], ["Best practice", "Melhor prática"], ["Business intelligence", "Inteligência de negócios"], ["Data-driven decision-making", "Tomada de decisão orientada por dados"], ["Data analysis", "Análise de dados"], ["Business analytics", "Análise empresarial"], ["Risk management", "Gestão de riscos"], ["Risk assessment", "Avaliação de riscos"], ["Risk matrix", "Matriz de riscos"], ["Risk mitigation", "Mitigação de riscos"], ["Business continuity", "Continuidade dos negócios"], ["Contingency plan", "Plano de contingência"], ["Strategic risk", "Risco estratégico"], ["Operational risk", "Risco operacional"]] },
      { id: "exp600-gestao-empresarial-projetos-e-negocios-3", title: "Gestão empresarial, projetos e negócios (3/4)", phrases: [["Financial risk", "Risco financeiro"], ["Project management", "Gestão de projetos"], ["Project planning", "Planejamento de projetos"], ["Project scope", "Escopo do projeto"], ["Scope management", "Gestão do escopo"], ["Project schedule", "Cronograma do projeto"], ["Milestone", "Marco do projeto"], ["Deliverable", "Entregável"], ["Project budget", "Orçamento do projeto"], ["Resource allocation", "Alocação de recursos"], ["Project team", "Equipe do projeto"], ["Project stakeholder", "Parte interessada do projeto"], ["Project charter", "Termo de abertura do projeto"], ["Project governance", "Governança de projetos"], ["Project monitoring", "Monitoramento do projeto"], ["Project control", "Controle do projeto"], ["Project closure", "Encerramento do projeto"], ["Lessons learned", "Lições aprendidas"], ["Corrective action plan", "Plano de ação corretiva"], ["Procurement", "Compras / contratação"]] },
      { id: "exp600-gestao-empresarial-projetos-e-negocios-4", title: "Gestão empresarial, projetos e negócios (4/4)", phrases: [["Supplier management", "Gestão de fornecedores"], ["Contract management", "Gestão de contratos"], ["Service level agreement (SLA)", "Acordo de nível de serviço"], ["Budget management", "Gestão orçamentária"], ["Cost management", "Gestão de custos"], ["Cost control", "Controle de custos"], ["Cost reduction", "Redução de custos"], ["Cost-benefit analysis", "Análise de custo-benefício"], ["Return on investment (ROI)", "Retorno sobre investimento"], ["Revenue", "Receita"], ["Profit", "Lucro"], ["Profit margin", "Margem de lucro"], ["Cash flow", "Fluxo de caixa"], ["Operating cost", "Custo operacional"], ["Fixed cost", "Custo fixo"]] },
      { id: "exp600-engenharia-ambiental-e-campo-1", title: "Engenharia ambiental e campo (1/4)", phrases: [["Environmental engineering", "Engenharia ambiental"], ["Environmental engineer", "Engenheiro ambiental"], ["Engineering design", "Projeto de engenharia"], ["Technical specification", "Especificação técnica"], ["Technical drawing", "Desenho técnico"], ["Engineering calculation", "Cálculo de engenharia"], ["Technical feasibility", "Viabilidade técnica"], ["Field inspection", "Inspeção de campo"], ["Site inspection", "Vistoria de campo"], ["Site assessment", "Avaliação da área"], ["Field survey", "Levantamento de campo"], ["Sampling plan", "Plano de amostragem"], ["Environmental sampling", "Amostragem ambiental"], ["Sampling point", "Ponto de amostragem"], ["Sample collection", "Coleta de amostras"], ["Laboratory analysis", "Análise laboratorial"], ["Analytical method", "Método analítico"], ["Quality control", "Controle de qualidade"], ["Quality assurance", "Garantia da qualidade"], ["Chain of custody", "Cadeia de custódia"]] },
      { id: "exp600-engenharia-ambiental-e-campo-2", title: "Engenharia ambiental e campo (2/4)", phrases: [["Laboratory report", "Laudo laboratorial"], ["Technical report", "Relatório técnico"], ["Engineering report", "Relatório de engenharia"], ["Technical memorandum", "Nota técnica"], ["Technical responsibility", "Responsabilidade técnica"], ["Technical expert report", "Laudo técnico"], ["Environmental expert assessment", "Perícia ambiental"], ["Environmental forensics", "Perícia ambiental investigativa"], ["Environmental investigation", "Investigação ambiental"], ["Site characterization", "Caracterização da área"], ["Contaminated site", "Área contaminada"], ["Potentially contaminated site", "Área potencialmente contaminada"], ["Remediation", "Remediação"], ["Environmental remediation", "Remediação ambiental"], ["Soil remediation", "Remediação do solo"], ["Groundwater remediation", "Remediação de águas subterrâneas"], ["Contaminant plume", "Pluma de contaminação"], ["Source area", "Área fonte"], ["Environmental monitoring well", "Poço de monitoramento ambiental"], ["Monitoring network", "Rede de monitoramento"]] },
      { id: "exp600-engenharia-ambiental-e-campo-3", title: "Engenharia ambiental e campo (3/4)", phrases: [["Soil sampling", "Amostragem de solo"], ["Groundwater sampling", "Amostragem de água subterrânea"], ["Air quality monitoring", "Monitoramento da qualidade do ar"], ["Ambient air quality", "Qualidade do ar ambiente"], ["Air emission source", "Fonte de emissão atmosférica"], ["Stack emission", "Emissão de chaminé"], ["Air pollution control", "Controle da poluição atmosférica"], ["Dust suppression", "Controle de poeira"], ["Noise monitoring", "Monitoramento de ruído"], ["Environmental noise", "Ruído ambiental"], ["Noise pollution", "Poluição sonora"], ["Odor control", "Controle de odores"], ["Vibration monitoring", "Monitoramento de vibrações"], ["Soil conservation", "Conservação do solo"], ["Soil erosion", "Erosão do solo"], ["Erosion control", "Controle de erosão"], ["Sediment control", "Controle de sedimentos"], ["Sediment basin", "Bacia de sedimentação"], ["Silt fence", "Barreira de sedimentos"], ["Slope stabilization", "Estabilização de taludes"]] },
      { id: "exp600-engenharia-ambiental-e-campo-4", title: "Engenharia ambiental e campo (4/4)", phrases: [["Drainage channel", "Canal de drenagem"], ["Energy audit", "Auditoria energética"], ["Energy consumption", "Consumo de energia"], ["Energy management", "Gestão de energia"], ["Renewable energy", "Energia renovável"], ["Solar energy", "Energia solar"], ["Energy efficiency project", "Projeto de eficiência energética"], ["Environmental technology", "Tecnologia ambiental"], ["Green technology", "Tecnologia verde"], ["Pollution control technology", "Tecnologia de controle da poluição"], ["Environmental equipment", "Equipamento ambiental"], ["Treatment system", "Sistema de tratamento"], ["Control system", "Sistema de controle"], ["Monitoring equipment", "Equipamento de monitoramento"], ["Instrumentation", "Instrumentação"]] },
    ],
  },
];

const ALL_PT = TRACKS.flatMap(t => t.lessons.flatMap(l => l.phrases.map(p => p[1])));

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function buildExercises(phrases) {
  const ex = [];
  phrases.forEach((p, i) => {
    const distractors = shuffle(ALL_PT.filter(pt => pt !== p[1])).slice(0, 3);
    ex.push({ type: "mcq", en: p[0], correct: p[1], options: shuffle([p[1], ...distractors]) });
  });
  shuffle(phrases).slice(0, Math.min(3, phrases.length)).forEach(p => {
    ex.push({ type: "type", pt: p[1], correct: p[0] });
  });
  return shuffle(ex);
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// ---------- Persistência ----------
const DEFAULT_PROGRESS = { xp: 0, streak: 0, lastDay: null, completed: {}, missed: [] };

const STORAGE_KEY = "wisetrip:progress";

function useProgress() {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch (e) { /* sem progresso salvo ainda */ }
    setLoaded(true);
  }, []);
  const save = async (next) => {
    setProgress(next);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
  };
  return { progress, save, loaded };
}

function todayStr() { return new Date().toISOString().slice(0, 10); }

// ---------- UI ----------
export default function App() {
  const { progress, save, loaded } = useProgress();
  const [screen, setScreen] = useState("home");
  const [activeTrack, setActiveTrack] = useState(TRACKS[0].id);
  const [lesson, setLesson] = useState(null);

  const track = TRACKS.find(t => t.id === activeTrack);

  const openLesson = (trackId, lessonId) => {
    const t = TRACKS.find(x => x.id === trackId);
    const l = t.lessons.find(x => x.id === lessonId);
    setLesson({ trackId, ...l, exercises: buildExercises(l.phrases), step: 0, phase: "cards", correct: 0, wrong: [] });
    setScreen("lesson");
  };

  const finishLesson = async (result) => {
    const gained = result.correct * 10;
    const isNewDay = progress.lastDay !== todayStr();
    const next = {
      ...progress,
      xp: progress.xp + gained,
      streak: isNewDay ? progress.streak + 1 : progress.streak,
      lastDay: todayStr(),
      completed: { ...progress.completed, [lesson.id]: true },
      missed: [...progress.missed.filter(m => m.lessonId !== lesson.id), ...(result.wrong.length ? [{ lessonId: lesson.id, trackId: lesson.trackId, items: result.wrong }] : [])],
    };
    await save(next);
    setScreen("summary");
  };

  if (!loaded) return <Shell><div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}>Carregando...</div></Shell>;

  return (
    <Shell>
      {screen === "home" && (
        <Home progress={progress} track={track} setActiveTrack={setActiveTrack} openLesson={openLesson} />
      )}
      {screen === "lesson" && lesson && (
        <Lesson lesson={lesson} setLesson={setLesson} onFinish={finishLesson} onExit={() => setScreen("home")} trackColor={track.color} />
      )}
      {screen === "summary" && lesson && (
        <Summary lesson={lesson} onHome={() => { setScreen("home"); setLesson(null); }} />
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div style={{ minHeight: "100%", background: "var(--bg)", color: "var(--ink)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root{
          --bg:#F5F3FF; --bg-alt:#FFFFFF; --ink:#1C1B2E; --ink-soft:#6B6785; --card:#FFFFFF;
          --border:#E7E3F7; --amber:#FFB703; --amber-ink:#8A5A00;
          --success:#12B76A; --success-bg:#E7F9F1; --success-ink:#0A7A46;
          --error:#F04438; --error-bg:#FDEDEC; --error-ink:#B4271E;
          --grad-1:#FF5D73; --grad-2:#7B2FF7;
        }
        *{box-sizing:border-box;}
        .btn{cursor:pointer; border:none; font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; transition:transform .12s ease, opacity .12s ease;}
        .btn:active{transform:scale(0.97);}
        .stamp{border:2px dashed var(--border); border-radius:16px;}
        ::selection{ background: var(--grad-1); color:#fff; }
      `}</style>
      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", position: "relative", background: "var(--bg)" }}>
        {children}
      </div>
    </div>
  );
}

function Home({ progress, track, setActiveTrack, openLesson }) {
  const reviewCount = progress.missed.reduce((n, m) => n + m.items.length, 0);
  return (
    <div style={{ paddingBottom: 40 }}>
      <header style={{
        padding: "30px 20px 22px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(120deg, var(--grad-1), var(--grad-2))", borderRadius: "0 0 28px 28px",
        boxShadow: "0 12px 30px -14px rgba(123,47,247,0.45)",
      }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 27, fontWeight: 700, letterSpacing: -0.3, color: "#fff" }}>Wise Trip</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Seu passaporte para o inglês</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Pill icon={<Flame size={14} color="#FFD166" />} value={progress.streak} />
          <Pill icon={<Star size={14} color="#FFD166" />} value={progress.xp} />
        </div>
      </header>

      <div style={{ display: "flex", gap: 8, padding: "18px 20px 16px", overflowX: "auto" }}>
        {TRACKS.map(t => (
          <button key={t.id} className="btn" onClick={() => setActiveTrack(t.id)}
            style={{
              padding: "9px 15px", borderRadius: 999, fontSize: 13,
              background: t.id === track.id ? t.color : "var(--card)",
              color: t.id === track.id ? "#fff" : "var(--ink)",
              border: `1.5px solid ${t.id === track.id ? t.color : "var(--border)"}`,
              boxShadow: t.id === track.id ? `0 6px 16px -6px ${t.color}99` : "none",
              whiteSpace: "nowrap",
            }}>{t.name}</button>
        ))}
      </div>

      <div style={{ padding: "0 20px 6px", fontSize: 13, color: "var(--ink-soft)" }}>{track.tagline}</div>

      <div style={{ padding: "10px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {reviewCount > 0 && (
          <div className="stamp" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, #FFF3D6, #FFE3EC)", border: "2px dashed var(--amber)" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Revisão pendente</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{reviewCount} frases para reforçar</div>
            </div>
            <RotateCcw size={20} color="var(--amber-ink)" />
          </div>
        )}

        {track.lessons.map((l, i) => {
          const done = !!progress.completed[l.id];
          return (
            <button key={l.id} className="btn" onClick={() => openLesson(track.id, l.id)}
              style={{
                textAlign: "left", background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: 16, padding: "16px 16px", display: "flex", alignItems: "center", gap: 14,
                boxShadow: "0 2px 10px -6px rgba(28,27,46,0.12)",
              }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: done ? track.color : "var(--bg)", border: `1.5px solid ${done ? track.color : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700,
                color: done ? "#fff" : "var(--ink-soft)",
              }}>{done ? <Check size={16} /> : i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{l.title}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{l.phrases.length} frases</div>
              </div>
              <ArrowRight size={16} color={track.color} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Pill({ icon, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999, padding: "6px 11px", fontSize: 13, fontWeight: 700, color: "#fff" }}>
      {icon}{value}
    </div>
  );
}

function Lesson({ lesson, setLesson, onFinish, onExit, trackColor }) {
  const { phase, step, phrases, exercises } = lesson;

  if (phase === "cards") {
    const p = phrases[step];
    const isLast = step === phrases.length - 1;
    return (
      <LessonShell title={lesson.title} progress={(step + 1) / phrases.length} onExit={onExit} color={trackColor}>
        <div style={{ padding: "10px 20px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Passo {step + 1} de {phrases.length} · toque para ouvir</div>
          <button className="btn stamp" onClick={() => speak(p[0])}
            style={{ background: "var(--card)", padding: "36px 20px", display: "flex", flexDirection: "column", gap: 10, alignItems: "center", textAlign: "center" }}>
            <Volume2 size={22} color={trackColor} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600 }}>{p[0]}</div>
            <div style={{ fontSize: 15, color: "var(--ink-soft)" }}>{p[1]}</div>
          </button>

          <WritePractice key={`write-${step}`} target={p[0]} color={trackColor} />

          <RepeatTimer key={`timer-${step}`} color={trackColor} />

          <button className="btn" onClick={() => {
            if (isLast) setLesson({ ...lesson, phase: "exercise", step: 0 });
            else setLesson({ ...lesson, step: step + 1 });
          }} style={{ background: trackColor, color: "#fff", borderRadius: 12, padding: "14px", fontSize: 15 }}>
            {isLast ? "Começar exercícios" : "Próxima frase"}
          </button>
        </div>
      </LessonShell>
    );
  }

  // fase de exercício
  const ex = exercises[step];
  return (
    <LessonShell title={lesson.title} progress={(step + 1) / exercises.length} onExit={onExit} color={trackColor}>
      <Exercise key={step} ex={ex} onAnswer={(isCorrect) => {
        const wrong = isCorrect ? lesson.wrong : [...lesson.wrong, ex];
        const correct = isCorrect ? lesson.correct + 1 : lesson.correct;
        if (step === exercises.length - 1) {
          onFinish({ correct, wrong });
        } else {
          setLesson({ ...lesson, step: step + 1, correct, wrong });
        }
      }} color={trackColor} />
    </LessonShell>
  );
}

function WritePractice({ target, color }) {
  const [values, setValues] = useState(["", "", "", ""]);
  const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
  const doneCount = values.filter(v => norm(v) === norm(target) && v.trim().length > 0).length;

  return (
    <div className="stamp" style={{ padding: 16, background: "var(--card)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Escreva a frase 4 vezes</div>
        <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{doneCount}/4</div>
      </div>
      {values.map((v, i) => {
        const ok = norm(v) === norm(target) && v.trim().length > 0;
        return (
          <div key={i} style={{ position: "relative" }}>
            <input
              value={v}
              onChange={(e) => {
                const nv = e.target.value;
                setValues(vals => vals.map((x, idx) => idx === i ? nv : x));
              }}
              placeholder={`${i + 1}ª vez`}
              style={{
                width: "100%", boxSizing: "border-box", padding: "10px 36px 10px 12px", borderRadius: 10,
                border: `1.5px solid ${ok ? "var(--success)" : "var(--border)"}`, fontSize: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif", background: ok ? "var(--success-bg)" : "#fff",
                color: "var(--ink)",
              }}
            />
            {ok && <Check size={16} color="var(--success)" style={{ position: "absolute", right: 10, top: 12 }} />}
          </div>
        );
      })}
    </div>
  );
}

function RepeatTimer({ color, duration = 5 }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rounds, setRounds] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const start = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = (now - startRef.current) / 1000;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setRunning(false);
        setRounds(r => r + 1);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="stamp" style={{ padding: 16, background: "var(--card)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Repita em voz alta</div>
        <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{rounds > 0 ? `${rounds}x repetido` : "toque em começar"}</div>
      </div>
      <button className="btn" onClick={start} disabled={running}
        style={{
          background: running ? "var(--border)" : color, color: "#fff", borderRadius: 999,
          padding: "9px 16px", fontSize: 13, alignSelf: "flex-start",
        }}>
        {running ? "Repetindo..." : "Começar (5s)"}
      </button>
      <div style={{ height: 8, borderRadius: 999, background: "var(--border)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: color, transition: running ? "width .05s linear" : "width .15s ease" }} />
      </div>
    </div>
  );
}

function LessonShell({ title, progress, onExit, color, children }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 10px" }}>
        <button className="btn" onClick={onExit} style={{ background: "none", padding: 4 }}><ChevronLeft size={22} /></button>
        <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: color, transition: "width .3s ease" }} />
        </div>
      </div>
      <div style={{ padding: "4px 20px 0", fontSize: 13, color: "var(--ink-soft)" }}>{title}</div>
      {children}
    </div>
  );
}

function Exercise({ ex, onAnswer, color }) {
  const [picked, setPicked] = useState(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const inputRef = useRef(null);

  const isCorrect = ex.type === "mcq" ? picked === ex.correct : typed.trim().toLowerCase() === ex.correct.toLowerCase();

  const check = (value) => {
    if (ex.type === "mcq") setPicked(value);
    setChecked(true);
  };

  return (
    <div style={{ padding: "16px 20px", minHeight: 420, display: "flex", flexDirection: "column" }}>
      {ex.type === "mcq" ? (
        <>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 8 }}>O que significa:</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <button className="btn" onClick={() => speak(ex.en)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: 8 }}>
              <Volume2 size={16} color={color} />
            </button>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 21, fontWeight: 600 }}>{ex.en}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ex.options.map(opt => {
              let bg = "var(--card)", border = "var(--border)";
              if (checked && opt === ex.correct) { bg = "var(--success-bg)"; border = "var(--success)"; }
              else if (checked && opt === picked) { bg = "var(--error-bg)"; border = "var(--error)"; }
              return (
                <button key={opt} className="btn" disabled={checked} onClick={() => check(opt)}
                  style={{ textAlign: "left", padding: "13px 14px", borderRadius: 12, background: bg, border: `1.5px solid ${border}`, fontSize: 14 }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 8 }}>Como se diz em inglês:</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 21, fontWeight: 600, marginBottom: 22 }}>{ex.pt}</div>
          <input ref={inputRef} value={typed} disabled={checked} onChange={e => setTyped(e.target.value)}
            placeholder="Digite em inglês..."
            style={{ padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${checked ? (isCorrect ? "var(--success)" : "var(--error)") : "var(--border)"}`, fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", background: checked ? (isCorrect ? "var(--success-bg)" : "var(--error-bg)") : "#fff" }} />
          {checked && !isCorrect && <div style={{ marginTop: 8, fontSize: 13, color: "var(--error-ink)" }}>Resposta certa: {ex.correct}</div>}
          {!checked && <div style={{ flex: 1 }} />}
        </>
      )}

      <div style={{ flex: 1 }} />
      {!checked ? (
        ex.type === "type" && (
          <button className="btn" disabled={!typed.trim()} onClick={() => check()}
            style={{ background: typed.trim() ? color : "var(--border)", color: "#fff", borderRadius: 12, padding: 14, fontSize: 15 }}>
            Verificar
          </button>
        )
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: isCorrect ? "var(--success-ink)" : "var(--error-ink)" }}>
            {isCorrect ? <Check size={18} /> : <X size={18} />} {isCorrect ? "Correto!" : "Quase lá"}
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn" onClick={() => onAnswer(isCorrect)} style={{ background: color, color: "#fff", borderRadius: 12, padding: "12px 20px", fontSize: 14 }}>
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}

function Summary({ lesson, onHome }) {
  const total = lesson.exercises.length;
  const pct = Math.round((lesson.correct / total) * 100);
  return (
    <div style={{ padding: "60px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <Sparkles size={40} color="var(--amber)" />
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 600 }}>Lição concluída!</div>
      <div style={{ color: "var(--ink-soft)", fontSize: 14 }}>{lesson.title}</div>
      <div style={{ display: "flex", gap: 24, margin: "10px 0 6px" }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{pct}%</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>acerto</div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--amber-ink)" }}>+{lesson.correct * 10}</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>XP</div>
        </div>
      </div>
      {lesson.wrong.length > 0 && (
        <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{lesson.wrong.length} frase(s) foram para a fila de revisão</div>
      )}
      <button className="btn" onClick={onHome} style={{ marginTop: 20, background: "linear-gradient(135deg, var(--grad-1), var(--grad-2))", color: "#fff", borderRadius: 14, padding: "14px 28px", fontSize: 15 }}>
        Voltar para a trilha
      </button>
    </div>
  );
}
