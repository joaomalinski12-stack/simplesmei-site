/* Registro das páginas-satélite ("spokes") da ferramenta Consulta CNAE MEI.
   Cada entrada vira uma página estática indexável em
   /ferramentas/consulta-cnae-mei/<slug> (motor de rota em entry-server.jsx +
   main.jsx + prerender.js).

   Estratégia (ver memória seo-cnae-tool-keywords): profissão LIBERAL/regulamentada
   → a pessoa busca "[X] pode ser MEI" (alto volume, SD baixa, ganhável a DA6). Cada
   spoke pendura na seção "Quem não pode ser MEI" do hub. Slug SEM acento (o Google
   separa; "psicologo" 1.300 vs "psicólogo" 0).

   Conteúdo (motivo/alternativa/faq) é ESCRITO À MÃO — o naomei.json só dá área/CNAE.
   Honestidade (PRODUTO.md): o SimplesMEI é a IA fiscal do MEI, NÃO abre ME/Simples.
   Por isso a alternativa é informativa ("procure um contador"), sem prometer o que o
   produto não faz. */

export const SPOKES = {
  psicologo: {
    slug: 'psicologo',
    nome: 'Psicólogo',
    kwVol: 1300,
    conselho: 'CRP (Conselho Regional de Psicologia)',
    lei: 'Lei nº 4.119/1962',
    cnae: '8650-0/03',
    cnaeNome: 'Atividades de psicologia e psicanálise',
    resposta: 'Não. Psicólogo é uma profissão regulamentada, com conselho de classe (CRP), e a lei não permite exercer profissão regulamentada como MEI.',
    motivo: 'O MEI foi pensado para atividades sem exigência de formação regulamentada. A Psicologia é regulamentada por lei federal (Lei nº 4.119/1962) e fiscalizada pelo Conselho Regional de Psicologia (CRP), com registro obrigatório para atuar. Por isso ela fica de fora das 466 ocupações permitidas ao MEI (Anexo XI da Resolução CGSN nº 140/2018), e o CNAE da atividade — 8650-0/03 (Atividades de psicologia e psicanálise) — não está entre os habilitados ao SIMEI.',
    alternativa: 'Para ter CNPJ e emitir nota como psicólogo, o caminho costuma ser abrir uma Microempresa (ME) no Simples Nacional — normalmente no Anexo III, ou no Anexo V dependendo do fator R. Também dá para atuar como autônomo (recolhendo por carnê-leão). O enquadramento que sai mais barato depende do seu faturamento: vale confirmar com um contador.',
    faq: [
      { q: 'Psicólogo pode ter CNPJ?', a: 'Pode — só não como MEI. O caminho mais comum é abrir uma Microempresa (ME) no Simples Nacional. Um contador indica o melhor enquadramento.' },
      { q: 'Qual o melhor CNPJ para psicólogo?', a: 'Em geral uma ME no Simples Nacional (Anexo III, ou V conforme o fator R). O contador calcula qual anexo e alíquota saem mais baratos para o seu faturamento.' },
      { q: 'Psicólogo paga qual imposto?', a: 'Como ME no Simples, recolhe um DAS mensal com alíquota progressiva (a partir de ~6% no Anexo III) — diferente do valor fixo do MEI. Como autônomo, paga pelo carnê-leão (IRPF) e ISS ao município.' },
      { q: 'Psicólogo pode emitir nota fiscal?', a: 'Pode, tendo um CNPJ (ME) ou como autônomo (nota avulsa pela prefeitura / RPA). O que não existe é a nota pelo MEI, porque a atividade não é permitida.' },
    ],
    relacionados: ['fisioterapeuta', 'nutricionista', 'dentista'],
  },

  fisioterapeuta: {
    slug: 'fisioterapeuta',
    nome: 'Fisioterapeuta',
    kwVol: 1300,
    conselho: 'CREFITO (Conselho Regional de Fisioterapia e Terapia Ocupacional)',
    lei: 'Decreto-Lei nº 938/1969',
    cnae: '8650-0/04',
    cnaeNome: 'Atividades de fisioterapia',
    resposta: 'Não. Fisioterapeuta é uma profissão regulamentada, com conselho de classe (CREFITO), e a lei não permite exercê-la como MEI.',
    motivo: 'A Fisioterapia é regulamentada (Decreto-Lei nº 938/1969) e fiscalizada pelo CREFITO, com registro obrigatório. Como toda profissão de saúde com conselho de classe, ela está fora das 466 ocupações permitidas ao MEI (Anexo XI da Resolução CGSN nº 140/2018). O CNAE 8650-0/04 (Atividades de fisioterapia) não é habilitado ao SIMEI — nem para atendimento em consultório, domicílio ou clínica.',
    alternativa: 'Para ter CNPJ, a saída costuma ser uma Microempresa (ME) no Simples Nacional (Anexo III ou V, conforme o fator R) ou atuar como autônomo com recolhimento por carnê-leão. Se você pretende montar uma clínica, o contador ajuda a definir o enquadramento e as obrigações certas.',
    faq: [
      { q: 'Fisioterapeuta pode ter CNPJ?', a: 'Pode, mas não como MEI. O mais comum é abrir uma ME no Simples Nacional. Um contador indica o melhor formato.' },
      { q: 'Clínica de fisioterapia pode ser MEI?', a: 'Não. Tanto o atendimento quanto a clínica dependem de profissional com registro no CREFITO, e a atividade não está na lista do MEI.' },
      { q: 'Qual o melhor CNPJ para fisioterapeuta?', a: 'Costuma ser uma ME no Simples Nacional (Anexo III, ou V conforme o fator R). O contador calcula o que sai mais barato para o seu faturamento.' },
      { q: 'Fisioterapeuta paga qual imposto?', a: 'Como ME no Simples, um DAS mensal com alíquota progressiva (a partir de ~6% no Anexo III) — não o valor fixo do MEI.' },
    ],
    relacionados: ['psicologo', 'nutricionista', 'dentista'],
  },

  advogado: {
    slug: 'advogado',
    nome: 'Advogado',
    kwVol: 1000,
    conselho: 'OAB (Ordem dos Advogados do Brasil)',
    lei: 'Lei nº 8.906/1994 (Estatuto da Advocacia)',
    cnae: '6911-7/01',
    cnaeNome: 'Serviços advocatícios',
    resposta: 'Não. A advocacia é regulamentada pela OAB e regida por estatuto próprio; o advogado não pode ser MEI nem prestar serviços jurídicos por uma empresa comum.',
    motivo: 'A advocacia é uma profissão regulamentada pela OAB (Lei nº 8.906/1994) e só pode ser exercida por quem tem inscrição na Ordem. Além de ser profissão regulamentada — o que já a exclui do MEI —, a advocacia não é atividade empresária: ela é prestada pessoalmente ou por sociedade de advogados registrada na OAB, não na Junta Comercial. O CNAE 6911-7/01 (Serviços advocatícios) não está entre os permitidos ao SIMEI.',
    alternativa: 'Para faturar com CNPJ, o advogado abre uma Sociedade Individual de Advocacia ou uma sociedade de advogados, registrada na OAB (não na Junta Comercial) e, em geral, optante pelo Simples Nacional. Um contador com experiência na área jurídica ajuda no registro e no enquadramento.',
    faq: [
      { q: 'Advogado pode ter CNPJ?', a: 'Pode — pela Sociedade Individual de Advocacia ou por uma sociedade de advogados, registrada na OAB. Não é como MEI.' },
      { q: 'Advogado pode abrir MEI?', a: 'Não. A advocacia é regulamentada e não empresária; não entra no MEI em nenhuma hipótese.' },
      { q: 'Como o advogado emite nota fiscal?', a: 'Pela sociedade de advocacia (CNPJ) que ele constitui na OAB, normalmente no Simples Nacional. Um contador cuida da parte fiscal.' },
      { q: 'Qual o melhor regime para advogado?', a: 'Costuma ser a Sociedade Individual de Advocacia no Simples Nacional (Anexo IV). O contador calcula conforme o faturamento.' },
    ],
    relacionados: ['corretor-de-imoveis', 'dentista', 'psicologo'],
  },

  dentista: {
    slug: 'dentista',
    nome: 'Dentista',
    kwVol: 880,
    conselho: 'CRO (Conselho Regional de Odontologia)',
    lei: 'Lei nº 5.081/1966',
    cnae: '8630-5/04',
    cnaeNome: 'Atividade odontológica',
    resposta: 'Não. Dentista é uma profissão regulamentada, com conselho de classe (CRO), e a lei não permite exercer a odontologia como MEI.',
    motivo: 'A Odontologia é regulamentada (Lei nº 5.081/1966) e fiscalizada pelo Conselho Regional de Odontologia (CRO), com registro obrigatório. Por ser profissão regulamentada de saúde, fica fora das 466 ocupações do MEI (Anexo XI da Resolução CGSN nº 140/2018). O CNAE 8630-5/04 (Atividade odontológica) não é habilitado ao SIMEI — nem o consultório odontológico.',
    alternativa: 'Para ter CNPJ e consultório, o caminho costuma ser uma Microempresa (ME) no Simples Nacional (Anexo III ou V, conforme o fator R). Também é possível atuar como autônomo. Como há custos e equipamentos envolvidos, vale um contador para escolher o enquadramento certo.',
    faq: [
      { q: 'Consultório odontológico pode ser MEI?', a: 'Não. A odontologia depende de registro no CRO e não está na lista do MEI, nem para o profissional nem para o consultório.' },
      { q: 'Dentista pode ter CNPJ?', a: 'Pode, mas não como MEI. O mais comum é abrir uma ME no Simples Nacional. Um contador indica o melhor formato.' },
      { q: 'Qual o melhor CNPJ para dentista?', a: 'Geralmente uma ME no Simples Nacional (Anexo III, ou V conforme o fator R). O contador calcula a alíquota conforme o faturamento.' },
      { q: 'Dentista paga qual imposto?', a: 'Como ME no Simples, um DAS mensal com alíquota progressiva — diferente do valor fixo do MEI.' },
    ],
    relacionados: ['psicologo', 'fisioterapeuta', 'nutricionista'],
  },

  nutricionista: {
    slug: 'nutricionista',
    nome: 'Nutricionista',
    kwVol: 720,
    conselho: 'CRN (Conselho Regional de Nutricionistas)',
    lei: 'Lei nº 8.234/1991',
    cnae: '8650-0/02',
    cnaeNome: 'Atividades de profissionais da nutrição e dietética',
    resposta: 'Não. Nutricionista é uma profissão regulamentada, com conselho de classe (CRN), e a lei não permite exercê-la como MEI.',
    motivo: 'A profissão de nutricionista é regulamentada (Lei nº 8.234/1991) e fiscalizada pelo Conselho Regional de Nutricionistas (CRN), com registro obrigatório. Como profissão regulamentada, fica fora das 466 ocupações permitidas ao MEI (Anexo XI da Resolução CGSN nº 140/2018). O CNAE 8650-0/02 (Atividades de profissionais da nutrição e dietética) não é habilitado ao SIMEI.',
    alternativa: 'Para ter CNPJ e emitir nota, o caminho costuma ser abrir uma Microempresa (ME) no Simples Nacional (Anexo III, ou V conforme o fator R) ou atuar como autônomo (carnê-leão). O melhor enquadramento depende do seu faturamento — vale confirmar com um contador.',
    faq: [
      { q: 'Qual o melhor CNPJ para nutricionista?', a: 'Em geral uma ME no Simples Nacional (Anexo III, ou V conforme o fator R). Um contador calcula qual sai mais barato para o seu faturamento.' },
      { q: 'Nutricionista pode ter CNPJ?', a: 'Pode — só não como MEI. O mais comum é abrir uma ME no Simples Nacional.' },
      { q: 'Nutricionista pode emitir nota fiscal?', a: 'Pode, tendo um CNPJ (ME) ou como autônomo (nota avulsa pela prefeitura). Pelo MEI não dá, porque a atividade não é permitida.' },
      { q: 'Nutricionista paga qual imposto?', a: 'Como ME no Simples, um DAS mensal com alíquota progressiva (a partir de ~6% no Anexo III) — não o valor fixo do MEI.' },
    ],
    relacionados: ['psicologo', 'fisioterapeuta', 'dentista'],
  },

  'corretor-de-imoveis': {
    slug: 'corretor-de-imoveis',
    nome: 'Corretor de imóveis',
    kwVol: 720,
    conselho: 'CRECI (Conselho Regional de Corretores de Imóveis)',
    lei: 'Lei nº 6.530/1978',
    cnae: '6821-8/01',
    cnaeNome: 'Corretagem na compra e venda e avaliação de imóveis',
    resposta: 'Não. Corretor de imóveis é uma profissão regulamentada, com registro obrigatório no CRECI, e não pode ser MEI.',
    motivo: 'A corretagem de imóveis é regulamentada (Lei nº 6.530/1978) e só pode ser exercida por quem tem registro no Conselho Regional de Corretores de Imóveis (CRECI). Por ser profissão regulamentada, fica de fora das 466 ocupações do MEI (Anexo XI da Resolução CGSN nº 140/2018). O CNAE 6821-8/01 (Corretagem na compra e venda e avaliação de imóveis) não é habilitado ao SIMEI.',
    alternativa: 'O corretor pode atuar como autônomo (pessoa física com CRECI, recolhendo por carnê-leão) ou abrir uma Microempresa (ME) no Simples Nacional para ter CNPJ e emitir nota. Muitos atuam vinculados a uma imobiliária. Um contador ajuda a escolher o formato conforme o seu volume de comissões.',
    faq: [
      { q: 'Corretor de imóveis pode ter CNPJ?', a: 'Pode, mas não como MEI. O caminho é uma ME no Simples Nacional, ou atuar como autônomo com CRECI.' },
      { q: 'Tem como ter CRECI e MEI ao mesmo tempo?', a: 'Não para a corretagem: a atividade regulamentada pelo CRECI não entra no MEI. O MEI só serviria para outra atividade permitida, não para a corretagem.' },
      { q: 'Corretor de imóveis autônomo paga imposto?', a: 'Sim — como pessoa física, recolhe pelo carnê-leão (IRPF) e o ISS ao município sobre as comissões. Com ME, recolhe pelo Simples.' },
      { q: 'Qual o melhor CNPJ para corretor de imóveis?', a: 'Geralmente uma ME no Simples Nacional. O contador calcula a alíquota conforme o volume de comissões.' },
    ],
    relacionados: ['advogado', 'psicologo', 'dentista'],
  },
};

export const SPOKE_SLUGS = Object.keys(SPOKES);
