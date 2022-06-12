import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { markdown, markdownKeymap } from '@codemirror/lang-markdown';
import React from 'react';

const extensions = [
   keymap.of(defaultKeymap),
   keymap.of(markdownKeymap),
   lineNumbers(),
   markdown(),
];

const theme = EditorView.theme({
   '&': {
      color: 'var(--on-bg)',
      backgroundColor: 'var(--clr-bg)',
   },
   '.cm-content': {
      caretColor: 'var(--on-bg)',
   },
   '&.cm-focused .cm-cursor': {
      borderLeftColor: 'var(--on-bg)',
   },
   '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: 'var(--clr-primary)',
      color: 'var(--on-primary)',
   },
   '.cm-gutters': {
      backgroundColor: 'var(--clr-bg-elevated)',
      color: 'var(--on-bg)',
   },
});

export function editor(
   ref: React.RefObject<HTMLDivElement>,
   value: string,
   onChange: (value: string) => void
) {
   const onUpdate = EditorView.updateListener.of((v) =>
      onChange(v.state.doc.toString())
   );

   const state = EditorState.create({
      doc: value,
      extensions: [theme, ...extensions, onUpdate],
   });
   const cm = new EditorView({
      state,
      parent:
         ref.current ||
         document.body.appendChild(document.createElement('div')),
   });

   return cm;
}
