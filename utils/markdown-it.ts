import MarkdownIt, { Options } from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';

import hljs from 'highlight.js';

import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import abbreviation from 'markdown-it-abbr';
import mark from 'markdown-it-mark';

const md = new MarkdownIt({
   html: true,
   linkify: true,
   typographer: true,
   highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
         try {
            return hljs.highlight(lang, str, true).value;
         } catch (__) {
            return '';
         }
      }
      return '';
   },
});

md.use(sub);
md.use(sup);
md.use(footnote);
md.use(deflist);
md.use(abbreviation);
md.use(mark);

const proxy = (
   tokens: Token[],
   idx: number,
   options: Options,
   env: any,
   self: Renderer
) => self.renderToken(tokens, idx, options);

// parser rules
const defaultStrongOpenRenderer = md.renderer.rules.strong_open || proxy;
md.renderer.rules.strong_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-strong');
   return defaultStrongOpenRenderer(tokens, idx, options, env, self);
};

const defaultEmOpenRenderer = md.renderer.rules.em_open || proxy;
md.renderer.rules.em_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-em');
   return defaultEmOpenRenderer(tokens, idx, options, env, self);
};

const defaultStrikeOpenRenderer = md.renderer.rules.s_open || proxy;
md.renderer.rules.s_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-strike');
   return defaultStrikeOpenRenderer(tokens, idx, options, env, self);
};

const defaultSupOpenRenderer = md.renderer.rules.sup_open || proxy;
md.renderer.rules.sup_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-sup');
   return defaultSupOpenRenderer(tokens, idx, options, env, self);
};

const defaultSubOpenRenderer = md.renderer.rules.sub_open || proxy;
md.renderer.rules.sub_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-sub');
   return defaultSubOpenRenderer(tokens, idx, options, env, self);
};

const defaultMarkOpenRenderer = md.renderer.rules.mark_open || proxy;
md.renderer.rules.mark_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-mark');
   return defaultMarkOpenRenderer(tokens, idx, options, env, self);
}

const defaultDLOpenRenderer = md.renderer.rules.dl_open || proxy;
md.renderer.rules.dl_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-dl');
   return defaultDLOpenRenderer(tokens, idx, options, env, self);
}

const defaultDTOpenRenderer = md.renderer.rules.dt_open || proxy;
md.renderer.rules.dt_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-dt');
   return defaultDTOpenRenderer(tokens, idx, options, env, self);
}

const defaultDDOpenRenderer = md.renderer.rules.dd_open || proxy;
md.renderer.rules.dd_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-dd');
   return defaultDDOpenRenderer(tokens, idx, options, env, self);
}

const defaultAbbrOpenRenderer = md.renderer.rules.abbr_open || proxy;
md.renderer.rules.abbr_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-abbr');
   return defaultAbbrOpenRenderer(tokens, idx, options, env, self);
}

const defaultTableOpenRenderer = md.renderer.rules.table_open || proxy;
md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-table');
   return defaultTableOpenRenderer(tokens, idx, options, env, self);
}

const defaultTHeadOpenRenderer = md.renderer.rules.thead_open || proxy;
md.renderer.rules.thead_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-thead');
   return defaultTHeadOpenRenderer(tokens, idx, options, env, self);
}

const defaultTBodyOpenRenderer = md.renderer.rules.tbody_open || proxy;
md.renderer.rules.tbody_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-tbody');
   return defaultTBodyOpenRenderer(tokens, idx, options, env, self);
}

const defaultTROpenRenderer = md.renderer.rules.tr_open || proxy;
md.renderer.rules.tr_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-tr');
   return defaultTROpenRenderer(tokens, idx, options, env, self);
}

const defaultTHOpenRenderer = md.renderer.rules.th_open || proxy;
md.renderer.rules.th_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-th');
   return defaultTHOpenRenderer(tokens, idx, options, env, self);
}

const defaultTDOpenRenderer = md.renderer.rules.td_open || proxy;
md.renderer.rules.td_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-td');
   return defaultTDOpenRenderer(tokens, idx, options, env, self);
}

const defaultFenceRenderer = md.renderer.rules.fence || proxy;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-fenced-code-block');
   return defaultFenceRenderer(tokens, idx, options, env, self);
}

const defaultCodeBlockRenderer = md.renderer.rules.code_block || proxy;
md.renderer.rules.code_block = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-code-block');
   return defaultCodeBlockRenderer(tokens, idx, options, env, self);
}

const defaultCodeInlineRenderer = md.renderer.rules.code_inline || proxy;
md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-code-inline');
   return defaultCodeInlineRenderer(tokens, idx, options, env, self);
}

const defaultBlockquoteOpenRenderer = md.renderer.rules.blockquote_open || proxy;
md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-blockquote');
   return defaultBlockquoteOpenRenderer(tokens, idx, options, env, self);
}

const defaultOrderedListOpenRenderer = md.renderer.rules.ordered_list_open || proxy;
md.renderer.rules.ordered_list_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-ol');
   return defaultOrderedListOpenRenderer(tokens, idx, options, env, self);
}

const defaultUnorderedListOpenRenderer = md.renderer.rules.bullet_list_open || proxy;
md.renderer.rules.bullet_list_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-ul');
   return defaultUnorderedListOpenRenderer(tokens, idx, options, env, self);
}

const defaultListItemOpenRenderer = md.renderer.rules.list_item_open || proxy;
md.renderer.rules.list_item_open = (tokens, idx, options, env, self) => {
   tokens[idx].attrJoin('class', 'jwevans-md-li');
   return defaultListItemOpenRenderer(tokens, idx, options, env, self);
}

/*
 * Export markdown-it parse function
 */
export function parseMarkdown(text: string): string {
   return md.render(text);
}
