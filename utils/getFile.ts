import type { File, Folder } from './files.types';
import type { FilesContextType } from './reducer.types';

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
   if (folder.id === '') return null;
   if (index === path.length - 1) {
      const file = folder.files.find((file) => file.id === path[index]) || null;
      return file;
   } else {
      return getFileFromFolder(
         folder.folders.find((f) => f.id === path[index]) || emptyFolder,
         path,
         index + 1
      );
   }
}

export function getFile(path: string, state: FilesContextType): File | null {
   if (path === '') return null;
   const pathArray = path.split('/');
   if (pathArray.length === 2) {
      const file = state.files.find((file) => file.id === pathArray[1]) || null;
      return file;
   } else {
      let index = 1;
      let folder =
         state.folders.find((f) => f.id === pathArray[index]) || emptyFolder;
      return getFileFromFolder(folder, pathArray, index + 1);
   }
}
