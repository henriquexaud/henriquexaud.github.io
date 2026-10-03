# Duvalle — site

Site da Duvalle, estúdio de engenharia de software: uma página única, estática e multilíngue (PT, EN, ES), publicada pelo GitHub Pages em https://henriquexaud.github.io.

- Português na raiz (`/`), inglês em `/en/` e espanhol em `/es/`.
- HTML gerado em build: cada idioma é uma página completa, indexável e com `hreflang`, sem tradução no navegador.
- Sem framework e sem dependências em runtime: um CSS, um JS pequeno (opcional: a página funciona sem ele) e fontes servidas pelo próprio site.

## Conceito

A página é contada como uma jornada em capítulos numerados (01 a 09): como pensamos, a anatomia de um sistema, problemas reais, serviços, princípios, processo, sobre, dúvidas e contato.

- **Um desenho que viaja.** As três camadas do hero (interface, processos, dados) são o fio da narrativa: fecham ao rolar na abertura, esperam ao lado do manifesto, são desmontadas camada por camada na anatomia, fecham numa peça só e voltam fechadas no contato. O desenho fica num palco fixo (`.stage`) e o `main.js` o leva de um "slot" a outro (`data-slot="hero|manifesto|anatomy|contact"`); a linha do tempo está em `buildTimeline()`.
- **Duas cores com papel.** Verde é o sinal (o que está ativo); silício é o material: um prata polido usado em detalhes escolhidos (o arco do logo, os números dos capítulos, as bordas das placas, os verbos dos serviços, a assinatura no rodapé). É uma referência ao "vale" do nome. Os tons ficam em `--si-*` e `--metal`, no topo do `main.css`.
- **Sem JavaScript ou com movimento reduzido**, tudo continua legível: o desenho fica parado no hero e uma cópia estática aparece na anatomia, os textos aparecem inteiros e nada se move com a rolagem.

## Estrutura

```
src/
  config.mjs           URL do site, contatos, idiomas e ordem das soluções
  i18n/pt.mjs          todo o texto do site, um arquivo por idioma
  i18n/en.mjs
  i18n/es.mjs
  templates/page.mjs   a página (capítulos, head, SEO, JSON-LD)
  templates/blueprint.mjs  o desenho das três camadas, que atravessa a página
  templates/icons.mjs  o logo (barra verde + arco de silício) e os ícones
  templates/visuals.mjs  as interfaces ilustrativas em SVG de cada solução
  build.mjs            gera index.html, en/, es/, 404.html, sitemap e manifest
  images.mjs           gera favicons e imagens de compartilhamento (Open Graph)
assets/                CSS, JS, fontes e imagens
index.html, en/, es/   gerados: não edite à mão
```

## Editar

Requer Node.js 20+.

```sh
npm run build    # regenera as páginas depois de mudar src/ ou assets/
npm run serve    # http://localhost:8080
```

- **Texto:** edite `src/i18n/<idioma>.mjs` e rode `npm run build`. O build falha se faltar alguma chave em algum idioma.
- **Contato e disponibilidade:** `src/config.mjs`. Ali ficam o WhatsApp, o LinkedIn, um e-mail opcional e o indicador “aberta para novos projetos”.
- **Imagens de compartilhamento e ícones:** rode `npm install` e depois `npm run images` (usa Playwright). Isso só é necessário quando o título do hero ou a marca mudarem. Para usar um Playwright já instalado em outro lugar: `PLAYWRIGHT_MODULE=/caminho/para/playwright/index.mjs npm run images`.

## Novo idioma

1. Copie `src/i18n/en.mjs` para `src/i18n/<código>.mjs` e traduza. Ajuste `code`, `htmlLang`, `ogLocale`, `label`, `short` e `path` (por exemplo `/fr/`).
2. Adicione o código em `locales`, em `src/config.mjs`.
3. Adicione o texto do 404 em `src/templates/not-found.mjs`.
4. Rode `npm run build` e `npm run images`.

O seletor de idioma, os `hreflang`, o sitemap e a imagem de compartilhamento passam a incluir o novo idioma automaticamente.
