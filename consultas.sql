-- 1. Buscar as Trilhas de Carreira recomendadas para um Perfil Específico:
SELECT 
    tc.nome_carreira,
    tc.nivel_inicia_recomendado,
    tc.tempo_estimado_evolucao
FROM TrilhaCarreira tc
WHERE tc.perfil_id = 1;

-- 2. Buscar o último Perfil Comportamental de um Usuário:
SELECT 
    pc.tipo_perfil,
    pc.escore_critico,
    pc.data_avaliacao
FROM PerfilComportamental pc
WHERE pc.usuario_id = 1
ORDER BY pc.data_avaliacao DESC
LIMIT 1;


-- 1. Buscar a lista de Trilhas de Carreira recomendadas, filtrando pelo último Perfil Comportamental de um usuário (ID = 1):
SELECT 
    t.nome_carreira, 
    t.area_foco, 
    pc.tipo_perfil
FROM TrilhaCarreira t
JOIN PerfilComportamental pc ON t.perfil_id = pc.perfil_id
WHERE pc.usuario_id = 1
ORDER BY t.data_recomendacao DESC;

-- 2. Buscar todas as Recomendações de Estudo para uma Trilha de Carreira específica (ID = 5):
SELECT 
    re.nome_curso,
    re.tipo_conteudo,
    re.link_acesso
FROM RecomendacaoEstudo re
WHERE re.trilha_id = 5;

-- 3. Buscar as últimas 5 leituras de monitoramento de bem-estar para o usuário (ID = 2):
SELECT 
    mb.timestamp_leitura, 
    mb.nivel_ruido_db, 
    mb.nivel_stress_mockado
FROM MonitoramentoBemEstar mb
WHERE mb.usuario_id = 2
ORDER BY mb.timestamp_leitura DESC
LIMIT 5;