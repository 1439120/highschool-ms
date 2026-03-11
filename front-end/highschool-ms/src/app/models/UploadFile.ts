export interface UploadedFile {
  id?: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  file?: File;
  url?: string;
  errorMessage?: string;
  lastModified?: Date;
}

export interface DocumentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  };
  uploadDate: Date;
  lastModified?: Date;
  category?: string;
  tags?: string[];
  description?: string;
  version?: number;
  starred?: boolean;
  url?: string;
  thumbnail?: string;
  status?: 'active' | 'archived' | 'draft';
  accessLevel?: 'public' | 'private' | 'shared';
}