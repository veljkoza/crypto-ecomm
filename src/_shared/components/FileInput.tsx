import React, { ChangeEvent, FC, useState } from "react";

type FileInputProps = {
  onFileChange?: (file: File | null, base64: string | null) => void;
  accept?: string;
};

const FileInput: FC<FileInputProps> = ({ onFileChange, accept }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList) {
      const file = fileList[0];
      if (!file) return;
      setFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        setFileData(reader.result as string);
        onFileChange && onFileChange(file, reader.result as string);
      };
      reader.onerror = (error) => console.log("Error: ", error);

      reader.readAsDataURL(file);
    }
  };

  console.log({ file });

  return <input type="file" accept={accept} onChange={handleChange} />;
};

export default FileInput;
