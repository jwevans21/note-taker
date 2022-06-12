import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const md = new MarkdownIt({
   highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
         try {
            return hljs.highlight(lang, str).value;
         } catch (__) {
            return '';
         }
      }
      return '';
   },
});

export function parseMarkdown(text: string): string {
   return md.render(text);
}
