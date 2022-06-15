import type { Folder, File } from './files.types';
import type { FilesContextType } from './reducer.types';

const emptyFile: File = {
   id: '',
   name: '',
   content: '',
   createdAt: '',
   updatedAt: '',
};

const emptyFolder: Folder = {
   id: '',
   name: '',
   folders: [],
   files: [],
   createdAt: '',
   updatedAt: '',
};

function getFileFromFolder(
   folder: Folder,
   path: string[],
   index: number
): File | null {
   if (index === path.length - 1) {
      return folder.files.find((file) => file.id === path[index]) || null;
   } else {
      return getFileFromFolder(
         folder.folders.find((f) => f.id === path[index]) || emptyFolder,
         path,
         index + 1
      );
   }
}

function getCurrentFile(state: FilesContextType): File | null {
   if (!state.currentFile) {
      return null;
   } else {
      const path = state.currentFile.path.split('/');
      console.log(path);
      if (path.length === 1 && path[0] === 'root') {
         return (
            state.files.find((file) => file.id === path[path.length - 1]) ||
            null
         );
      } else {
         let index = 1;
         let folder =
            state.folders.find((f) => f.id === path[index]) || emptyFolder;
         return getFileFromFolder(folder, path, index + 1);
      }
   }
}

export { getCurrentFile };
