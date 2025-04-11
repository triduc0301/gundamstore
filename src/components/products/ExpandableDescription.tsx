import React, { useState } from "react";

interface ExpandableDescriptionProps {
  text: string;
  maxLength?: number;
}

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  text,
  maxLength = 300, // Default max length before truncation
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsTruncation = text.length > maxLength;

  const truncatedText =
    needsTruncation && !isExpanded ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="space-y-2">
      <p className="text-gray-400 leading-relaxed">{truncatedText}</p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#CD7F32] hover:text-[#B87333] transition-colors duration-300 text-sm font-medium focus:outline-none"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ExpandableDescription;
