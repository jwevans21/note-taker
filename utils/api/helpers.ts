import { Folder} from '../files.types';
import {Data} from './data.types';

function idExistsInFolder(folder: Folder, id: string): boolean {
   let exists = false;
   if (folder.files.some((file) => file.id === id)) {
      exists = true;
      return exists;
   } else if (folder.folders.some((folder) => folder.id === id)) {
      exists = true;
      return exists;
   } else {
      folder.folders.forEach((f) => {
         exists = idExistsInFolder(f, id);
         if (exists) {
            return exists;
         }
      });
      return exists;
   }
}

export function idExistsInState(data: Data, id: string): boolean {
   let exists = false;
   if (data.files.some((file) => file.id === id)) {
      exists = true;
      return exists;
   } else if (data.folders.some((folder) => folder.id === id)) {
      exists = true;
      return exists;
   } else {
      data.folders.forEach((folder) => {
         if (idExistsInFolder(folder, id)) {
            exists = true;
            return exists;
         }
      });
      return exists;
   }
}
