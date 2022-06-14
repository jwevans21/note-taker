export type File = {
   name: string;
   id: string;
   createdAt: string;
   updatedAt: string;
   content: string;
};

export type Folder = {
   name: string;
   id: string;
   createdAt: string;
   updatedAt: string;
   files: File[] | null;
   folders: Folder[] | null;
};
