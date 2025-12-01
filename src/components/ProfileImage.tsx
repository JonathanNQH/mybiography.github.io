"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, className }) => {
  return (
    <div className={cn("relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-lg overflow-hidden shadow-lg border-4 border-background", className)}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfileImage;