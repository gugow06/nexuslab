import { db } from "./db";
import { learningTrails, trailModules, userTrailProgress, users } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedTrails() {
  console.log("🌱 Seeding learning trails...");

  // Get first user (if exists) for demo progress
  const firstUser = await db.select().from(users).limit(1);
  const userId = firstUser[0]?.id;

  // ===== TRILHA 1: Liderança Avançada =====
  const [trail1] = await db.insert(learningTrails).values({
    title: "Liderança Avançada",
    description: "Domine a arte de liderar equipes de alto desempenho e impulsionar mudanças organizacionais",
    difficulty: "intermediate",
    category: "Liderança",
    estimatedHours: 12,
  }).returning();

  console.log(`✅ Trilha criada: ${trail1.title}`);

  // Módulos da Trilha 1
  await db.insert(trailModules).values([
    {
      trailId: trail1.id,
      title: "Introdução aos Fundamentos de Liderança",
      type: "video",
      order: 1,
      content: {
        body: "Aprenda os princípios fundamentais que definem grandes líderes. Este módulo cobre estilos de liderança, inteligência emocional e como inspirar sua equipe.",
        videoUrl: "https://example.com/leadership-intro.mp4"
      },
    },
    {
      trailId: trail1.id,
      title: "Construindo Equipes de Alto Desempenho",
      type: "text",
      order: 2,
      content: {
        body: `# Construindo Equipes de Alto Desempenho\n\nEquipes excepcionais não acontecem por acaso. Elas são construídas através de:\n\n## 1. Seleção Cuidadosa\n- Identifique competências complementares\n- Busque diversidade de pensamento\n- Avalie fit cultural e valores\n\n## 2. Comunicação Clara\n- Estabeleça canais abertos\n- Promova feedback constante\n- Pratique escuta ativa\n\n## 3. Confiança Mútua\n- Delegue responsabilidades\n- Reconheça conquistas\n- Apoie em momentos difíceis\n\n## Exercício Prático\nMapeie as competências de sua equipe atual e identifique gaps que podem ser preenchidos através de treinamento ou novas contratações.`
      },
    },
    {
      trailId: trail1.id,
      title: "Desafio: Dinâmicas de Equipe",
      type: "challenge",
      order: 3,
      content: {
        body: "Você lidera uma equipe de 8 pessoas em um projeto crítico. Dois membros estão em conflito sobre abordagens técnicas. Como você resolveria?",
        questions: [
          { id: "q1", text: "Realizar reunião individual com cada membro", points: 30 },
          { id: "q2", text: "Facilitar sessão conjunta de resolução", points: 50 },
          { id: "q3", text: "Tomar decisão unilateral", points: 10 },
          { id: "q4", text: "Buscar compromisso técnico baseado em dados", points: 40 }
        ]
      },
    },
    {
      trailId: trail1.id,
      title: "Estratégias de Comunicação Eficaz",
      type: "video",
      order: 4,
      content: {
        body: "Domine técnicas de comunicação que transformam líderes medianos em excepcionais. Aprenda a adaptar sua mensagem para diferentes audiências.",
        videoUrl: "https://example.com/communication-strategies.mp4"
      },
    },
    {
      trailId: trail1.id,
      title: "Tomada de Decisão Sob Pressão",
      type: "quiz",
      order: 5,
      content: {
        questions: [
          {
            id: "q1",
            question: "Qual é o primeiro passo na tomada de decisão sob pressão?",
            options: ["Agir rapidamente", "Reunir informações relevantes", "Consultar superiores", "Delegar a decisão"],
            correctAnswer: 1
          },
          {
            id: "q2",
            question: "O que caracteriza uma decisão informada?",
            options: ["Baseada em intuição", "Fundamentada em dados e análise", "Tomada em consenso", "Aprovada por todos"],
            correctAnswer: 1
          },
          {
            id: "q3",
            question: "Como lidar com decisões que deram errado?",
            options: ["Culpar fatores externos", "Aprender e ajustar a abordagem", "Evitar decisões similares", "Reverter imediatamente"],
            correctAnswer: 1
          }
        ]
      },
    },
    {
      trailId: trail1.id,
      title: "Quiz Final de Liderança Avançada",
      type: "quiz",
      order: 6,
      content: {
        questions: [
          {
            id: "q1",
            question: "Qual competência é mais importante para líderes modernos?",
            options: ["Conhecimento técnico", "Inteligência emocional", "Experiência anterior", "Formação acadêmica"],
            correctAnswer: 1
          },
          {
            id: "q2",
            question: "Como medir o sucesso de sua liderança?",
            options: ["Métricas de negócio apenas", "Satisfação e desenvolvimento da equipe", "Reconhecimento da empresa", "Promoções recebidas"],
            correctAnswer: 1
          }
        ]
      },
    },
  ]);

  console.log(`  ✅ 6 módulos adicionados à trilha "${trail1.title}"`);

  // ===== TRILHA 2: Análise de Dados para Negócios =====
  const [trail2] = await db.insert(learningTrails).values({
    title: "Análise de Dados para Negócios",
    description: "Transforme dados em insights acionáveis e tome decisões estratégicas baseadas em evidências",
    difficulty: "advanced",
    category: "Dados e Analytics",
    estimatedHours: 16,
  }).returning();

  console.log(`✅ Trilha criada: ${trail2.title}`);

  // Módulos da Trilha 2
  await db.insert(trailModules).values([
    {
      trailId: trail2.id,
      title: "Fundamentos de Business Intelligence",
      type: "text",
      order: 1,
      content: {
        body: `# Fundamentos de Business Intelligence\n\n## O que é Business Intelligence?\n\nBusiness Intelligence (BI) é o conjunto de tecnologias, processos e práticas que transformam dados brutos em informações significativas para decisões de negócio.\n\n## Componentes Principais\n\n### 1. Coleta de Dados\n- Fontes internas (CRM, ERP, Databases)\n- Fontes externas (APIs, Web scraping, Pesquisas)\n- Dados estruturados e não estruturados\n\n### 2. Processamento\n- ETL (Extract, Transform, Load)\n- Limpeza e validação\n- Integração de múltiplas fontes\n\n### 3. Análise\n- Análise descritiva (O que aconteceu?)\n- Análise diagnóstica (Por que aconteceu?)\n- Análise preditiva (O que vai acontecer?)\n- Análise prescritiva (O que devemos fazer?)\n\n### 4. Visualização\n- Dashboards interativos\n- Relatórios automatizados\n- Storytelling com dados\n\n## Ferramentas Essenciais\n- **Visualização**: Tableau, Power BI, Looker\n- **Processamento**: Python (Pandas), R, SQL\n- **Armazenamento**: Data Warehouses, Data Lakes\n\n## Próximos Passos\nNos próximos módulos, você aprenderá a aplicar cada componente na prática.`
      },
    },
    {
      trailId: trail2.id,
      title: "SQL para Análise de Dados",
      type: "video",
      order: 2,
      content: {
        body: "Aprenda consultas SQL avançadas para extrair insights de grandes volumes de dados. Inclui JOINs, agregações, window functions e otimização de queries.",
        videoUrl: "https://example.com/sql-analytics.mp4"
      },
    },
    {
      trailId: trail2.id,
      title: "Visualização de Dados com Dashboards",
      type: "text",
      order: 3,
      content: {
        body: `# Visualização de Dados com Dashboards\n\n## Princípios de Design de Dashboards\n\n### 1. Clareza\n- **Objetivo único por visualização**\n- Evite poluição visual\n- Use espaço em branco estrategicamente\n\n### 2. Escolha do Gráfico Correto\n\n| Objetivo | Tipo de Gráfico |\n|----------|----------------|\n| Comparação | Barras, Colunas |\n| Tendências ao longo do tempo | Linhas |\n| Proporções | Pizza, Rosquinha |\n| Distribuição | Histograma, Box plot |\n| Correlação | Scatter plot |\n| Hierarquia | Treemap, Sunburst |\n\n### 3. Cores Estratégicas\n- Use paleta limitada (3-5 cores principais)\n- Verde = positivo, Vermelho = negativo\n- Considere acessibilidade (daltonismo)\n\n### 4. Hierarquia da Informação\n- **KPIs principais** no topo\n- Detalhamentos progressivos\n- Filtros intuitivos\n\n## Exemplo Prático: Dashboard de Vendas\n\n**Seção Superior (KPIs)**\n- Receita Total do Mês\n- Variação vs. Mês Anterior\n- Ticket Médio\n- Taxa de Conversão\n\n**Seção Média (Tendências)**\n- Gráfico de linhas: Vendas nos últimos 12 meses\n- Gráfico de barras: Top 10 produtos\n\n**Seção Inferior (Detalhes)**\n- Tabela: Vendas por região\n- Mapa: Distribuição geográfica\n\n## Ferramentas Recomendadas\n- **Power BI**: Integração Microsoft, DAX\n- **Tableau**: Visualizações complexas\n- **Looker**: SQL-based, escalável\n- **Metabase**: Open source, simples`
      },
    },
    {
      trailId: trail2.id,
      title: "Análise Preditiva com Machine Learning",
      type: "video",
      order: 4,
      content: {
        body: "Introdução aos modelos preditivos para prever comportamento de clientes, demanda de produtos e tendências de mercado.",
        videoUrl: "https://example.com/predictive-analytics.mp4"
      },
    },
    {
      trailId: trail2.id,
      title: "Desafio: Caso Real de Análise de Dados",
      type: "challenge",
      order: 5,
      content: {
        body: "Você recebe dados de vendas dos últimos 2 anos. A receita está estagnada. Quais análises você faria para identificar oportunidades?",
        questions: [
          { id: "q1", text: "Segmentar clientes por perfil de compra", points: 40 },
          { id: "q2", text: "Analisar sazonalidade e tendências", points: 35 },
          { id: "q3", text: "Comparar performance por produto/categoria", points: 30 },
          { id: "q4", text: "Investigar correlação entre marketing e vendas", points: 45 },
          { id: "q5", text: "Avaliar churn de clientes", points: 50 }
        ]
      },
    },
    {
      trailId: trail2.id,
      title: "Storytelling com Dados",
      type: "text",
      order: 6,
      content: {
        body: `# Storytelling com Dados\n\n## Por que Contar Histórias com Dados?\n\nDados sem contexto são apenas números. Storytelling transforma insights em ação.\n\n## Estrutura de uma Boa História de Dados\n\n### 1. Contexto (O Problema)\n"Nossa taxa de cancelamento aumentou 15% no último trimestre"\n\n### 2. Descoberta (A Análise)\n"Identificamos 3 perfis de clientes com maior risco de churn"\n\n### 3. Insight (O Porquê)\n"Clientes que não utilizam funcionalidade X nos primeiros 30 dias têm 80% mais chance de cancelar"\n\n### 4. Ação (A Recomendação)\n"Implementar onboarding direcionado à funcionalidade X"\n\n### 5. Impacto (O Resultado Esperado)\n"Projeção de redução de 8% no churn, equivalente a R$ 2.4M/ano"\n\n## Técnicas Avançadas\n\n### Visualização Progressiva\n1. **Slide 1**: Mostre o problema (tendência negativa)\n2. **Slide 2**: Revele a causa (segmentação)\n3. **Slide 3**: Apresente a solução (comparação)\n\n### Anotações Estratégicas\n- Destaque pontos-chave nos gráficos\n- Use setas para guiar o olhar\n- Adicione contexto relevante\n\n### Narrativa Baseada em Audiência\n\n| Audiência | Foco | Formato |\n|-----------|------|--------|\n| Executivos | Impacto no negócio, ROI | KPIs + Recomendações |\n| Gerentes | Táticas, implementação | Detalhes + Timelines |\n| Técnicos | Metodologia, dados | Análises + Validações |\n\n## Checklist Final\n- [ ] História tem começo, meio e fim?\n- [ ] Insights são acionáveis?\n- [ ] Visualizações são autoexplicativas?\n- [ ] Recomendações têm estimativa de impacto?\n- [ ] Linguagem adequada à audiência?`
      },
    },
    {
      trailId: trail2.id,
      title: "Quiz Final: Análise de Dados",
      type: "quiz",
      order: 7,
      content: {
        questions: [
          {
            id: "q1",
            question: "Qual tipo de análise responde 'O que vai acontecer?'",
            options: ["Descritiva", "Diagnóstica", "Preditiva", "Prescritiva"],
            correctAnswer: 2
          },
          {
            id: "q2",
            question: "Qual gráfico é melhor para mostrar tendências ao longo do tempo?",
            options: ["Pizza", "Barras", "Linhas", "Dispersão"],
            correctAnswer: 2
          },
          {
            id: "q3",
            question: "O que é ETL em Business Intelligence?",
            options: [
              "Extract, Transform, Load",
              "Evaluate, Test, Launch",
              "Explore, Track, Learn",
              "Execute, Transfer, Link"
            ],
            correctAnswer: 0
          },
          {
            id: "q4",
            question: "Qual é o principal objetivo do storytelling com dados?",
            options: [
              "Impressionar com visualizações complexas",
              "Transformar insights em ação",
              "Mostrar todo o trabalho realizado",
              "Apresentar o máximo de dados possível"
            ],
            correctAnswer: 1
          }
        ]
      },
    },
  ]);

  console.log(`  ✅ 7 módulos adicionados à trilha "${trail2.title}"`);

  // Criar progresso demo para primeiro usuário (se existir)
  if (userId) {
    await db.insert(userTrailProgress).values([
      {
        userId,
        trailId: trail1.id,
        completedModules: [1, 2], // Primeiros 2 módulos completados
        progressPercentage: 33, // 2/6 = 33%
      },
      {
        userId,
        trailId: trail2.id,
        completedModules: [1], // Primeiro módulo completado
        progressPercentage: 14, // 1/7 = 14%
      },
    ]);
    console.log(`✅ Progresso demo criado para usuário`);
  }

  console.log("\n✨ Seed de trilhas concluído com sucesso!");
  console.log(`📊 Total: 2 trilhas criadas com 13 módulos`);
}

// Run seed if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedTrails()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Erro ao fazer seed:", error);
      process.exit(1);
    });
}

export { seedTrails };
