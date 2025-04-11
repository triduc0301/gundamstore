import React from "react";

interface ImageFallbackProps {
  name: string;
  className?: string;
}

const ImageFallback: React.FC<ImageFallbackProps> = ({
  name,
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-900 flex items-center justify-center ${className}`}
    >
      <div className="text-gray-600 text-center p-4">
        <div className="text-3xl mb-2">📷</div>
        <div className="text-sm">{name}</div>
      </div>
    </div>
  );
};

export default ImageFallback;
