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
      extensions: [...extensions, onUpdate],
   });
   const cm = new EditorView({
      state,
      parent:
         ref.current ||
         document.body.appendChild(document.createElement('div')),
   });

   return cm;
}
