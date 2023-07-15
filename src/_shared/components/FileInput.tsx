import React, { ChangeEvent, FC, useState } from "react";

type FileInputProps = {
  onFileChange?: ({
    file,
    base64,
  }: {
    file: File | null;
    base64: string;
  }) => void;
  accept?: string;
};

const FileInput: FC<FileInputProps> = ({ onFileChange, accept }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList) {
      const file = fileList[0];
      if (!file) return;

      const reader = new FileReader();
      console.log({ file });
      reader.onload = () => {
        onFileChange && onFileChange({ file, base64: reader.result as string });
      };
      reader.onerror = (error) => console.log("Error: ", error);

      reader.readAsDataURL(file);
    }
  };

  return <input type="file" accept={accept} onChange={handleChange} />;
};

export default FileInput;
