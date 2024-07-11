// components/shared/RepostButton.tsx
"use client";

import { useRouter } from "next/navigation";

interface RepostButtonProps {
  content: string;
}

const RepostButton: React.FC<RepostButtonProps> = ({ content }) => {
  const router = useRouter();

  const handleRepostClick = () => {
    const queryString = new URLSearchParams({
      content: encodeURIComponent(content),
    }).toString();
    router.push(`/create-thread?${queryString}`);
  };

  return (
    <img
      src="/assets/repost.svg"
      alt="repost"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleRepostClick}
    />
  );
};

export default RepostButton;
