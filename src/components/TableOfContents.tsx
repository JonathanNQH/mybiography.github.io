"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSectionId?: string;
  className?: string; // Add className prop for external styling
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSectionId, className }) => {
  return (
    <nav className={cn("pr-8", className)}> {/* Removed fixed layout classes */}
      <h3 className="text-xl font-serif font-semibold mb-5 text-foreground">On this page</h3>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block text-muted-foreground hover:text-primary transition-colors text-base font-sans",
                activeSectionId === section.id && "font-semibold text-primary"
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;