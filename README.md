# Duvalle — site

Site da Duvalle, estúdio de engenharia de software: uma página única, estática e multilíngue (PT, EN, ES), publicada pelo GitHub Pages em https://henriquexaud.github.io.

- Português na raiz (`/`), inglês em `/en/` e espanhol em `/es/`.
- HTML gerado em build: cada idioma é uma página completa, indexável e com `hreflang`, sem tradução no navegador.
- Sem framework e sem dependências em runtime: um CSS, um JS pequeno (opcional: a página funciona sem ele) e fontes servidas pelo próprio site.

## Estrutura

```
src/
  config.mjs           URL do site, contatos, idiomas e ordem das soluções
  i18n/pt.mjs          todo o texto do site, um arquivo por idioma
  i18n/en.mjs
  i18n/es.mjs
  templates/page.mjs   a página (seções, head, SEO, JSON-LD)
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
- **Imagens de compartilhamento e ícones:** rode `npm install` e depois `npm run images` (usa Playwright). Isso só é necessário quando o título do hero ou a marca mudarem.

## Novo idioma

1. Copie `src/i18n/en.mjs` para `src/i18n/<código>.mjs` e traduza. Ajuste `code`, `htmlLang`, `ogLocale`, `label`, `short` e `path` (por exemplo `/fr/`).
2. Adicione o código em `locales`, em `src/config.mjs`.
3. Adicione o texto do 404 em `src/templates/not-found.mjs`.
4. Rode `npm run build` e `npm run images`.

O seletor de idioma, os `hreflang`, o sitemap e a imagem de compartilhamento passam a incluir o novo idioma automaticamente.
