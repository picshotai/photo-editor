import React from "react";
import Link from "next/link";
import Image from "next/image";

export const PoweredByFalBadge: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 z-20 hidden md:block">
      <Link
        href="https://fal.ai"
        target="_blank"
        className="border bg-card py-1 px-2 flex flex-row rounded-xl gap-2 items-center"
      >
        <Image src="/favicon-32x32.png" width={24} height={24} className="w-8 h-8 rounded-lg" alt="Unrealshot logo" />
        <div className="text-xs">
          Powered by <br />
          <span className="font-bold text-sm">Unrealshot</span>
        </div>
      </Link>
    </div>
  );
};
