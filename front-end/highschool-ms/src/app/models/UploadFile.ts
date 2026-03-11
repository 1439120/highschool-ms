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