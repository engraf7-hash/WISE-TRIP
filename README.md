# Wise Trip — App de Aprendizado de Inglês

PWA para aprender inglês com frases prontas, expressões idiomáticas e vocabulário técnico (engenharia, meio ambiente, gestão), com flashcards, exercícios, XP, streak e fila de revisão.

## Conteúdo incluído

- **Dia a dia** — cumprimentos, apresentação, perguntas, agradecimentos, concordar/discordar, despedidas
- **Expressões idiomáticas** — trabalho, viagem/hotel, restaurante, cotidiano, emoções, compras/dinheiro, saúde/transporte
- **Técnico e corporativo** — engenharia, meio ambiente, gestão
- **1000 Palavras** — vocabulário essencial, em 40 blocos de 25 palavras
- **400 Expressões** — frases mais usadas do dia a dia, em 20 blocos
- **600 Técnicas** — meio ambiente, engenharia, regularização fundiária, topografia, liderança e gestão empresarial, organizadas por área

## Rodando localmente

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

## Gerando a versão de produção

```bash
npm run build
npm run preview
```

Os arquivos finais ficam em `dist/`.

## Instalar como app (PWA)

O projeto já vem configurado com `vite-plugin-pwa`. Depois do `npm run build`, publicando a pasta `dist/` em qualquer hospedagem estática com HTTPS (Vercel, Netlify, GitHub Pages, etc.), o app pode ser instalado no celular ou no computador direto do navegador.

**Antes de publicar**, coloque os ícones do app em `public/icons/`:
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)

## Progresso do usuário

O progresso (XP, streak, lições concluídas, fila de revisão) é salvo no `localStorage` do navegador — não depende de backend. Para persistir entre dispositivos, seria necessário conectar um backend (Supabase/Firebase), como sugerido no roteiro de próximos passos abaixo.

## Próximos passos sugeridos

- Conectar a um backend (Supabase/Firebase) para progresso por usuário com login
- Implementar repetição espaçada (tipo SM-2) na fila de revisão
- Testar instalação/offline em dispositivos reais (Android/iOS/desktop)

## Stack

React + Vite, `vite-plugin-pwa` para instalabilidade, Web Speech API para pronúncia, `lucide-react` para ícones.
