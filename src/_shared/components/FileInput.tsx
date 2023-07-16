import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";

type FileInputProps = {
  onFileChange?: ({
    file,
    base64,
  }: {
    file: File | null;
    base64: string;
  }) => void;
  className?: string;
  accept?: string;
  render: ({ onClick }: { onClick: () => void }) => ReactNode;
};

const FileInput: FC<FileInputProps> = ({
  onFileChange,
  accept,
  className,
  render,
}) => {
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {render({ onClick })}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};

export default FileInput;
