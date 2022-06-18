import type { File, Folder } from '../files.types';

export type Data = {
   files: File[];
   folders: Folder[];
   createdAt: string;
   updatedAt: string;
};

export type AddFileAPIPayload = {
   name: string;
   content: string;
   path: string;
};

export type AddFileAPIResponse =
   | {
        success: true;
        data: Data;
        added: File;
     }
   | {
        success: false;
        error: string;
     };

export type DeleteFileAPIPayload = {
   id: string;
   path: string;
};

export type DeleteFileAPIResponse =
   | {
        success: true;
        data: Data;
     }
   | {
        success: false;
        error: string;
     };

export type AddFolderAPIPayload = {
   name: string;
   path: string;
};

export type AddFolderAPIResponse =
   | {
        success: true;
        data: Data;
        added: Folder;
     }
   | {
        success: false;
        error: string;
     };
