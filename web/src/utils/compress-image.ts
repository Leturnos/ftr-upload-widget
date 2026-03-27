interface CompressImageParams {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

function convertToWebp(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return `${filename}.webp`;
  }

  return `${filename.substring(0, lastDotIndex)}.webp`;
}

export function compressImage({
  file,
  maxWidth = Number.POSITIVE_INFINITY,
  maxHeight = Number.POSITIVE_INFINITY,
  quality = 1,
}: CompressImageParams) {
  const allowedFileTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedFileTypes.includes(file.type)) {
    throw new Error("Image format not supported");
  }

  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const compressed = new Image();

      compressed.onload = () => {
        const canvas = document.createElement("canvas");

        let width = compressed.width;
        let height = compressed.height;

        const needsResize = width > maxWidth || height > maxHeight;

        // to avoid unnecessary re-compression and quality degradation.
        if (file.type === "image/webp" && quality === 0.8 && !needsResize) {
          resolve(file);
          return;
        }

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * (maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        context.drawImage(compressed, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image."));
              return;
            }

            const compressedFile = new File([blob], convertToWebp(file.name), {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };

      compressed.onerror = () => reject(new Error("Failed to load image."));

      compressed.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file."));

    reader.readAsDataURL(file);
  });
}