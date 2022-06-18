import type { File, Folder } from '../files.types';

export type Data = {
   files: File[];
   folders: Folder[];
   createdAt: string;
   updatedAt: string;
};
