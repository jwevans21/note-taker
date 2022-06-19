import { type } from 'os';
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

export type RenameFileAPIPayload = {
   id: string;
   name: string;
   path: string;
};

export type RenameFileAPIResponse =
   | {
        success: true;
        data: Data;
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

export type RenameFolderAPIPayload = {
   id: string;
   name: string;
   path: string;
};

export type RenameFolderAPIResponse =
   | {
        success: true;
        data: Data;
     }
   | {
        success: false;
        error: string;
     };

export type DeleteFolderAPIPayload = {
   id: string;
   path: string;
};

export type DeleteFolderAPIResponse =
   | {
        success: true;
        data: Data;
     }
   | {
        success: false;
        error: string;
     };
