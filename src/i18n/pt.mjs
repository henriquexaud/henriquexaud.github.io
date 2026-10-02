export default {
  code: 'pt',
  htmlLang: 'pt-BR',
  ogLocale: 'pt_BR',
  label: 'Português',
  short: 'PT',
  path: '/',

  meta: {
    title: 'DuaTech — Estúdio de engenharia de software',
    description:
      'Sistemas sob medida, lojas virtuais, aplicativos e automações para empresas. A DuaTech projeta e constrói software que resolve problemas reais do seu negócio.',
  },

  ui: {
    skip: 'Pular para o conteúdo',
    menu: 'Menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
    primaryNav: 'Navegação principal',
    external: 'abre em nova aba',
    backToTop: 'Voltar ao topo',
  },

  nav: {
    solutions: 'Soluções',
    services: 'Serviços',
    engineering: 'Engenharia',
    process: 'Processo',
    about: 'Sobre',
    faq: 'FAQ',
    cta: 'Iniciar projeto',
  },

  hero: {
    eyebrow: 'Estúdio de engenharia de software',
    title: 'Projetamos e construímos software',
    titleMuted: 'que resolve problemas reais.',
    lead:
      'Sistemas de gestão, lojas virtuais, aplicativos e automações feitos sob medida para empresas que querem vender mais, operar com menos esforço e decidir com dados.',
    primary: 'Iniciar um projeto',
    secondary: 'Ver soluções',
    meta: {
      availability: 'Agenda',
      open: 'Aberta para novos projetos',
      closed: 'Lista de espera',
      base: 'Atuação',
      baseValue: 'Brasil e exterior, remoto',
      clock: 'Hora local',
      clockSuffix: 'Brasília',
      languages: 'Idiomas',
    },
  },

  solutions: {
    eyebrow: 'Soluções',
    title: 'Software para o jeito que a sua empresa funciona.',
    lead:
      'Cada negócio tem um gargalo diferente. Começamos por ele, e não por um pacote pronto. Alguns exemplos do que construímos:',
    tabsLabel: 'Segmentos',
    beforeLabel: 'Hoje',
    afterLabel: 'Com o sistema',
    modulesLabel: 'O que o sistema faz',
    integrationsLabel: 'Integra com',
    cta: 'Conversar sobre este projeto',
    other: 'Não encontrou o seu segmento? Os mesmos blocos servem para qualquer operação.',
    otherCta: 'Conte o seu caso',
    items: {
      ecommerce: {
        tab: 'Lojas e e-commerce',
        title: 'Venda online sem trabalho manual nos bastidores.',
        lead:
          'Para lojistas que querem vender online ou que já vendem e se afogam no operacional. Construímos a loja e, principalmente, o que acontece depois do “comprar”: pagamento, nota fiscal, etiqueta e rastreio conectados.',
        compare: [
          ['Cada pedido exige emitir nota, gerar etiqueta e copiar o rastreio à mão.', 'Pedido pago, nota fiscal emitida e etiqueta pronta automaticamente, em segundos.'],
          ['Estoque da loja física, do site e do marketplace nunca bate.', 'Um estoque só, atualizado em todos os canais de venda.'],
          ['Em dia de promoção, a operação trava e pedidos se perdem.', 'Sistema preparado para picos como a Black Friday, sem perder nem duplicar pedidos.'],
        ],
        modules: ['Loja virtual rápida no celular', 'Pix, cartão e boleto', 'Nota fiscal automática', 'Etiquetas em lote e frete', 'Rastreio para o cliente', 'Painel de vendas'],
        integrations: ['Pix', 'Gateways de pagamento', 'Emissores de NF-e', 'Correios', 'Transportadoras', 'Marketplaces', 'ERPs'],
        message: 'Olá! Tenho uma loja e quero conversar sobre um projeto de e-commerce.',
      },
      restaurants: {
        tab: 'Restaurantes',
        title: 'Do salão à cozinha e ao caixa, tudo em um só sistema.',
        lead:
          'Para restaurantes, bares, lanchonetes e dark kitchens que querem parar de depender de papel, memória e planilha. O pedido é anotado uma vez, a cozinha é avisada na hora e os números do dia ficam na palma da mão.',
        compare: [
          ['Comandas de papel se perdem e pedidos saem errados.', 'O pedido lançado no celular do garçom aparece na hora na tela da cozinha.'],
          ['Pedidos do delivery, do WhatsApp e do balcão em lugares diferentes.', 'Todos os pedidos numa fila só, na ordem de chegada.'],
          ['O ingrediente acaba no meio do serviço e o caixa não fecha.', 'Estoque baixado a cada prato vendido e caixa conferido automaticamente.'],
        ],
        modules: ['Comandas e mesas', 'Tela da cozinha com tempos', 'Cardápio digital por QR code', 'Delivery e balcão unificados', 'Estoque e custo por prato', 'Caixa e relatórios'],
        integrations: ['Apps de delivery', 'WhatsApp', 'Pix', 'Maquininhas', 'Impressoras térmicas', 'NFC-e'],
        message: 'Olá! Tenho um restaurante e quero conversar sobre um sistema de controle.',
      },
      rental: {
        tab: 'Locadoras de veículos',
        title: 'Frota, reservas e contratos sob controle.',
        lead:
          'Para locadoras que cresceram além da planilha. Saiba na hora qual carro está disponível, quanto cada veículo rende e o que está para vencer, sem precisar ligar para ninguém.',
        compare: [
          ['Disponibilidade da frota controlada em planilha ou quadro.', 'Calendário da frota em tempo real, sem reserva duplicada.'],
          ['Contrato impresso, preenchido à mão e arquivado em pasta.', 'Contrato gerado com os dados do cliente e assinado digitalmente.'],
          ['Avaria descoberta depois, sem prova de quando aconteceu.', 'Vistoria de retirada e devolução com fotos, data e quilometragem.'],
        ],
        modules: ['Cadastro e status da frota', 'Reservas e calendário', 'Contratos digitais', 'Vistorias com fotos', 'Manutenção e vencimentos', 'Financeiro por veículo'],
        integrations: ['Rastreadores GPS', 'Assinatura digital', 'Pix e cartão', 'Reserva pelo site', 'WhatsApp'],
        message: 'Olá! Tenho uma locadora de veículos e quero conversar sobre um sistema administrativo.',
      },
      appointments: {
        tab: 'Clínicas e serviços',
        title: 'Agenda cheia, sem faltas e sem troca de mensagens.',
        lead:
          'Para clínicas, consultórios, salões, estúdios e oficinas: qualquer negócio que vive de horário marcado. O cliente agenda sozinho, recebe lembrete e comparece. Você sabe exatamente o que entrou no mês.',
        compare: [
          ['Horas por dia respondendo mensagens para marcar horário.', 'O cliente vê os horários livres e agenda sozinho, 24 horas por dia.'],
          ['Faltas sem aviso deixam buracos na agenda.', 'Lembretes automáticos com confirmação e lista de espera.'],
          ['Comissões e repasses calculados à mão no fim do mês.', 'Comissões, pacotes e repasses calculados automaticamente.'],
        ],
        modules: ['Agenda online', 'Lembretes e confirmações', 'Ficha e histórico do cliente', 'Sinal e pacotes', 'Equipe e comissões', 'Ocupação e faturamento'],
        integrations: ['WhatsApp', 'Google Agenda', 'Pix e cartão', 'NFS-e', 'E-mail'],
        message: 'Olá! Tenho uma empresa de serviços com agenda e quero conversar sobre um sistema.',
      },
      logistics: {
        tab: 'Logística e entregas',
        title: 'Cada entrega visível, do galpão ao cliente.',
        lead:
          'Para distribuidoras, atacadistas, indústrias e lojas com entrega própria. Saiba onde está cada pedido, por que algo atrasou e quanto custa cada entrega, sem planilha e sem ligar para o motorista.',
        compare: [
          ['Ninguém sabe onde está o pedido sem ligar para o motorista.', 'Mapa com a posição das entregas e o status de cada pedido.'],
          ['O problema só aparece quando o cliente reclama.', 'Pedidos parados ou com ocorrência caem numa fila de atenção.'],
          ['Comprovante de entrega em papel, perdido ou ilegível.', 'Comprovante digital com foto, assinatura, horário e local.'],
        ],
        modules: ['Painel de expedição', 'Rotas por região', 'App do entregador', 'Rastreio para o cliente', 'Etiquetas e transportadoras', 'Prazo e custo por entrega'],
        integrations: ['Correios', 'Transportadoras', 'ERPs', 'Emissores de NF-e', 'Mapas', 'WhatsApp'],
        message: 'Olá! Quero conversar sobre um sistema de logística e entregas.',
      },
      automation: {
        tab: 'Automação e IA',
        title: 'Menos planilha, menos retrabalho, mais tempo.',
        lead:
          'Para empresas em que pessoas qualificadas passam o dia copiando dados de um sistema para outro. Conectamos o que você já usa, automatizamos o que é repetitivo e aplicamos IA onde ela dá retorno.',
        compare: [
          ['Dados copiados à mão entre ERP, planilha e e-mail.', 'Sistemas conversando entre si, sem digitação duplicada.'],
          ['O relatório de segunda-feira consome a manhã inteira.', 'Relatórios e painéis atualizados sozinhos, prontos quando você chega.'],
          ['Pedidos, notas e documentos lidos e digitados manualmente.', 'A IA extrai os dados dos documentos e uma pessoa só confere.'],
        ],
        modules: ['Integração entre sistemas', 'Rotinas automáticas', 'Leitura de documentos com IA', 'Atendimento assistido por IA', 'Relatórios automáticos', 'Alertas quando algo falha'],
        integrations: ['ERPs', 'CRMs', 'Planilhas', 'Google Workspace', 'Microsoft 365', 'WhatsApp', 'Modelos de IA'],
        message: 'Olá! Quero conversar sobre automação de processos na minha empresa.',
      },
    },
  },

  services: {
    eyebrow: 'Serviços',
    title: 'O que construímos.',
    lead: 'Do sistema novo ao sistema que precisa conversar com outros sistemas. Um único estúdio cuida de tudo, da interface à infraestrutura.',
    items: [
      { title: 'Sistemas de gestão sob medida', text: 'Painéis administrativos e sistemas internos que seguem o seu processo, e não o contrário.', tags: 'ERP · Back-office · Controle' },
      { title: 'Lojas virtuais e e-commerce', text: 'Lojas rápidas e integradas a pagamento, nota fiscal, frete e marketplaces.', tags: 'Checkout · Pix · NF-e' },
      { title: 'Aplicativos web e mobile', text: 'Aplicativos instaláveis no celular, que funcionam bem até com internet instável.', tags: 'PWA · Offline · Notificações' },
      { title: 'Integrações entre sistemas', text: 'O ERP, a loja, o financeiro e os parceiros trocando dados sozinhos e com segurança.', tags: 'APIs · Webhooks · ERPs' },
      { title: 'Automação de processos', text: 'Tarefas repetitivas que viram rotinas automáticas, com registro de tudo o que foi feito.', tags: 'Rotinas · Filas · Alertas' },
      { title: 'Painéis e dados em tempo real', text: 'Indicadores, mapas e alertas ao vivo para decidir com números, e não com achismo.', tags: 'Dashboards · Mapas · BI' },
      { title: 'IA aplicada ao negócio', text: 'Leitura de documentos, atendimento assistido e classificação, sempre com supervisão humana.', tags: 'LLMs · Extração · Assistentes' },
      { title: 'Evolução de sistemas existentes', text: 'Já tem um sistema? Assumimos, estabilizamos, documentamos e seguimos evoluindo.', tags: 'Manutenção · Migração · Refatoração' },
    ],
  },

  engineering: {
    eyebrow: 'Engenharia',
    title: 'A engenharia não aparece. O resultado aparece todos os dias.',
    lead:
      'Um sistema bonito que trava na sexta à noite é prejuízo. Por isso cuidamos do que não aparece na tela: dados confiáveis, integrações que se recuperam sozinhas e uma operação que aguenta o pico.',
    proofTitle: 'Capacidade já colocada em prática',
    proof: [
      { tag: 'Fiscal e logística', text: 'Fluxo que leva o pedido pago à nota fiscal autorizada e à etiqueta pronta para postar em segundos, sem digitação.' },
      { tag: 'Escala', text: 'Operação dimensionada para picos de Black Friday, com simulação de cenários antes que eles aconteçam.' },
      { tag: 'Dados em tempo real', text: 'Plataforma de mapas que cruza seis fontes de dados externas e continua no ar quando uma delas cai.' },
      { tag: 'Mobile', text: 'Aplicativos instaláveis que funcionam offline e enviam notificações, sem passar pela loja de apps.' },
    ],
    guarantees: [
      { title: 'Nada se perde, nada duplica', text: 'Cada etapa fica registrada. Um clique duplo ou uma queda de conexão não geram dois pedidos nem duas notas.', tech: 'Idempotência · Transações · Filas' },
      { title: 'Se um parceiro cai, você continua', text: 'Se o emissor de notas, a transportadora ou o banco ficar fora do ar, o sistema espera e tenta de novo sozinho.', tech: 'Retentativas · Isolamento de falhas' },
      { title: 'Integra com o que você já usa', text: 'Trocar de transportadora, gateway ou emissor não exige refazer o sistema: muda só a peça que conversa com ele.', tech: 'Adaptadores · APIs · Webhooks' },
      { title: 'Rápido em qualquer aparelho', text: 'Telas leves que abrem rápido no celular do cliente e no computador antigo do escritório.', tech: 'Performance · PWA · Cache' },
      { title: 'Seguro e em conformidade com a LGPD', text: 'Acesso por perfil, dados protegidos e registro de quem fez o quê.', tech: 'Criptografia · Auditoria · LGPD' },
      { title: 'Pronto para crescer', text: 'A base aguenta o aumento de volume sem reescrever o sistema quando a empresa cresce.', tech: 'Arquitetura · Observabilidade' },
    ],
    stackTitle: 'Tecnologias com que trabalhamos',
    stack: [
      { layer: 'Interface', items: ['TypeScript', 'React', 'Next.js', 'Vite', 'PWA'] },
      { layer: 'Back-end', items: ['Node.js', 'NestJS', 'Express', 'Fastify', 'Python', 'FastAPI'] },
      { layer: 'Dados', items: ['PostgreSQL', 'PostGIS', 'Redis', 'RabbitMQ', 'WebSockets'] },
      { layer: 'Nuvem', items: ['Docker', 'Azure', 'Vercel', 'Render', 'Neon'] },
      { layer: 'Qualidade', items: ['Testes automatizados', 'Testes ponta a ponta', 'CI', 'ADRs'] },
    ],
  },

  process: {
    eyebrow: 'Processo',
    title: 'Do primeiro café ao sistema rodando.',
    lead: 'Um processo claro, com entregas que você vê funcionando a cada etapa. Sem meses de silêncio e sem surpresas no fim.',
    outLabel: 'Você recebe',
    steps: [
      { title: 'Conversa', text: 'Entendemos o negócio, o problema e o que significa sucesso para você. Sem compromisso.', out: 'Uma visão clara do que vale a pena construir' },
      { title: 'Diagnóstico e proposta', text: 'Mapeamos o processo, definimos o escopo da primeira versão e apresentamos prazo e investimento.', out: 'Proposta com escopo, prazo e valor definidos' },
      { title: 'Construção em etapas', text: 'Entregas curtas que você testa e valida. O que importa mais é entregue primeiro.', out: 'Partes do sistema funcionando desde cedo' },
      { title: 'Lançamento', text: 'Colocamos no ar, migramos os dados, treinamos a equipe e acompanhamos os primeiros dias de uso real.', out: 'Sistema em produção e equipe treinada' },
      { title: 'Evolução', text: 'Suporte, melhorias e novas funcionalidades conforme o negócio cresce.', out: 'Um parceiro técnico de longo prazo' },
    ],
  },

  principles: {
    eyebrow: 'Princípios',
    title: 'O que guia cada decisão técnica.',
    items: [
      { tag: 'Performance', title: 'Velocidade é funcionalidade.', text: 'Tela lenta custa venda e paciência. Medimos e otimizamos o que o usuário sente.' },
      { tag: 'Simplicidade', title: 'O mais simples que resolve.', text: 'Nada construído “para o futuro”. Menos peças significam menos custo e menos defeitos.' },
      { tag: 'Segurança', title: 'Proteção desde a primeira linha.', text: 'Acesso mínimo necessário, segredos fora do código e validação em todas as entradas.' },
      { tag: 'Experiência', title: 'Feito para quem usa.', text: 'Linguagem clara e telas que a equipe aprende sem manual.' },
      { tag: 'Observabilidade', title: 'Se não dá para ver, não dá para operar.', text: 'Logs, métricas e alertas desde o primeiro dia, para agir antes do cliente perceber.' },
      { tag: 'Manutenção', title: 'Código que dura.', text: 'Código legível, decisões documentadas e testes no que importa. O sistema não fica refém de ninguém.' },
    ],
  },

  about: {
    eyebrow: 'Sobre',
    title: 'Um estúdio pequeno por escolha.',
    paragraphs: [
      'A DuaTech é um estúdio independente de engenharia de software, fundado e liderado por Henrique Xaud. Cada projeto tem um engenheiro responsável do início ao fim, sem camadas de intermediação e sem contexto perdido no caminho.',
      'Quando o projeto pede, montamos um time sob medida com desenvolvedores e especialistas de confiança em design, mobile, dados e infraestrutura, coordenados pela mesma liderança técnica. Você fala sempre com quem constrói.',
    ],
    founderRole: 'Fundador e engenheiro responsável',
    founderBio: 'Engenheiro de software full-stack. Projeta e constrói sistemas de ponta a ponta, da modelagem dos dados à interface e à operação em produção.',
    facts: [
      { label: 'Desde', value: '2021' },
      { label: 'Modelo', value: 'Estúdio independente com rede de especialistas' },
      { label: 'Atendimento', value: 'Remoto, em todo o Brasil e no exterior' },
    ],
  },

  engagement: {
    eyebrow: 'Formatos',
    title: 'Como podemos trabalhar juntos.',
    models: [
      { title: 'Projeto sob medida', text: 'Para tirar um sistema do papel. Escopo, prazo e investimento definidos antes de começar.', fit: 'Novos sistemas, lojas e aplicativos' },
      { title: 'Evolução contínua', text: 'Um pacote mensal de horas para melhorar, manter e expandir o que já existe, com prioridades definidas junto com você.', fit: 'Empresas com sistema em uso' },
      { title: 'Consultoria técnica', text: 'Diagnóstico, revisão de arquitetura, escolha de tecnologia ou acompanhamento de outro fornecedor.', fit: 'Decisões antes de investir' },
    ],
    fitLabel: 'Ideal para',
  },

  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Antes de conversar.',
    items: [
      { q: 'Quanto custa um sistema sob medida?', a: 'Depende do escopo, e por isso não trabalhamos com tabela. Depois de uma conversa e de um diagnóstico, você recebe uma proposta com escopo, prazo e investimento definidos. Muitas vezes recomendamos começar por uma primeira versão enxuta, que já resolve o problema principal antes das próximas etapas.' },
      { q: 'Quanto tempo leva?', a: 'Uma primeira versão útil costuma levar de algumas semanas a poucos meses, conforme a complexidade. Entregamos em etapas, então você começa a usar partes do sistema antes de o projeto inteiro terminar.' },
      { q: 'O sistema e os dados ficam com a minha empresa?', a: 'Sim. O código, os dados e os acessos são da sua empresa. Não há mensalidade por usuário nem dependência de fornecedor, e os custos de hospedagem ficam transparentes e no nome da empresa.' },
      { q: 'Vocês dão suporte depois da entrega?', a: 'Sim, com planos de suporte e evolução contínua. Se preferir, documentamos tudo e transferimos o sistema para o seu time ou para outro fornecedor.' },
      { q: 'Preciso entender de tecnologia?', a: 'Não. Você conhece o seu negócio e a parte técnica fica com a gente. Explicamos as decisões em linguagem clara, e você acompanha o progresso no próprio sistema.' },
      { q: 'Já uso planilhas ou um sistema pronto. Dá para aproveitar?', a: 'Na maioria dos casos, sim. Podemos integrar com o que já existe, migrar os dados ou evoluir um sistema antigo em vez de começar do zero.' },
    ],
  },

  contact: {
    eyebrow: 'Contato',
    title: 'Vamos conversar sobre o seu projeto?',
    lead: 'Conte o que acontece hoje na sua empresa e aonde você quer chegar. A primeira conversa é sem compromisso, e você sai dela com clareza sobre o caminho.',
    whatsapp: 'Conversar no WhatsApp',
    whatsappMessage: 'Olá! Vim pelo site da DuaTech e quero conversar sobre um projeto.',
    linkedin: 'LinkedIn',
    email: 'E-mail',
    checklistTitle: 'Para a primeira conversa, ajuda saber:',
    checklist: [
      'Qual problema você quer resolver e quem sente esse problema hoje.',
      'Como isso é feito agora: planilhas, papel ou outros sistemas.',
      'Se existe um prazo ou uma data importante pela frente.',
    ],
  },

  footer: {
    tagline: 'Estúdio de engenharia de software. Projetamos e construímos software que resolve problemas reais.',
    studio: 'Estúdio',
    solutions: 'Soluções',
    contact: 'Contato',
    rights: 'Todos os direitos reservados.',
    built: 'HTML estático, sem rastreadores.',
  },

  visuals: {
    ecommerce: { order: 'Pedido #4821', paid: 'Pagamento aprovado', invoice: 'NF-e autorizada', label: 'Etiqueta gerada', transit: 'Em trânsito', waiting: 'aguardando', sales: 'Vendas hoje', amount: 'R$ 12.480' },
    restaurants: { title: 'Cozinha', count: '14 pedidos', cols: ['Novos', 'Preparando', 'Prontos'], table: 'Mesa', delivery: 'Delivery', counter: 'Balcão', items: ['2× Risoto', '1× Salada', '3× Burger', '1× Fritas', '2× Suco', '1× Prato do dia'] },
    rental: { title: 'Frota', week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], rented: 'Alugado', reserved: 'Reservado', maintenance: 'Manutenção' },
    appointments: { title: 'Agenda', week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], blocks: ['Consulta · Ana', 'Corte · João', 'Avaliação · Bia', 'Retorno · Caio', 'Coloração · Lia', 'Revisão · Leo', 'Consulta · Rui'], toast: 'Lembrete enviado', confirmed: 'Confirmado' },
    logistics: { title: 'Entregas', delivered: 'Entregues', route: 'Em rota', issue: 'Atenção', vehicle: 'Veículo 03' },
    automation: { title: 'Automações', when: 'hoje · 07:00', nodes: ['Pedido no ERP', 'Leitura com IA', 'Nota emitida', 'Relatório enviado'], log: ['312 registros sincronizados', 'relatório diário enviado', '1 documento para revisão'] },
  },
};
