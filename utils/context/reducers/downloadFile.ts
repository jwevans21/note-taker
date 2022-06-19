import { getFile } from '../../getFile';
import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';

export function downloadFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['DOWNLOAD_FILE'],
   setState?: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   if (state.currentFile) {
      const file = getFile(payload.path, state);
      if (file) {
         const blob = new Blob([file.content], { type: 'text/plain' });
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = file.name.endsWith('.md')
            ? file.name
            : `${file.name}.md`;
         link.click();
         window.URL.revokeObjectURL(url);
      }
   }
}
