export function maxAllowedSizeError(file: File) {
  const maxAllowedSize = 1024 * 1024;
  const fileSize = file?.size;
  if (fileSize && fileSize > maxAllowedSize) {
    return true;
  }
  return false;
}

export function isImageSizeValid(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        if (image.width > 100 && image.height > 100 && image.width < 1000 && image.height < 1000) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      image.onerror = () => reject(new Error('Failed to load image'));
      image.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function typeError(file: File) {
  return (
    file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/png'
  );
}

export function checkFileFormat(fileName: string): boolean {
  const allowedExtensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF'];
  const fileExtension = fileName.split('.').pop();
  return !!fileExtension && allowedExtensions.includes(fileExtension);
}

export const checkImgName = (width: number, text: string): string => {
  if (width < 480) {
    return text.length > 24 ? text.slice(0, 22) + '...' : text;
  }
  return text.length > 30 ? text.slice(0, 28) + '...' : text;
};
