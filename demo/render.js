import Vditor from '../src/method'
import '../src/assets/scss/index.scss'

document.querySelector('.markdown-list').
  addEventListener('click', function (event) {
    if (event.target.tagName === 'SPAN') {
      render(event.target.getAttribute('data-file'))
    }
  })

const render = (fileName) => {
  fetch(`/demo/markdown/${fileName}.md`).
    then(response => response.text()).
    then(markdown => {
      Vditor.preview(document.getElementById('preview'),
        markdown, {
          markdown: {
            toc: true,
            listStyle: fileName === 'cute-list',
          },
          speech: {
            enable: true,
          },
          anchor: 1,
          after () {
            if (window.innerWidth <= 768) {
              return;
            }
            const outlineElement = document.getElementById('outline')
            Vditor.outlineRender(document.getElementById('preview'),
              outlineElement)
            if (outlineElement.innerText.trim() !== '') {
              outlineElement.style.display = 'block'
            }
          },
          lazyLoadImage: 'https://cdn.jsdelivr.net/npm/vditor/dist/images/img-loading.svg',
          renderers: {
            renderHeading: (node, entering) => {
              const id = Lute.GetHeadingID(node)
              if (entering) {
                return [
                  `<h${node.__internal_object__.HeadingLevel} id="${id}" class="vditor__heading">
<span class="prefix"></span><span>`,
                  Lute.WalkContinue]
              } else {
                return [
                  `</span><a id="vditorAnchor-${id}" class="vditor-anchor" href="#${id}"><svg viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a></h${node.__internal_object__.HeadingLevel}>`,
                  Lute.WalkContinue]
              }
            },
          },
        })
    })
}

render('zh_CN')
window.setTheme = (theme) => {
  const outlineElement = document.getElementById('outline')
  if (theme === 'dark') {
    Vditor.setCodeTheme('native')
    Vditor.setContentTheme('dark')
    outlineElement.classList.add('dark')
    document.querySelector('html').style.backgroundColor = '#2f363d'
  } else {
    Vditor.setCodeTheme('github')
    Vditor.setContentTheme('light')
    outlineElement.classList.remove('dark')
    document.querySelector('html').style.backgroundColor = '#fff'
  }
}
