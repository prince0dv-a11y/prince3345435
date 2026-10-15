"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Twitter, Github, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";

interface SocialCloudProps {
  className?: string;
}

const socials = [
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
];

export const SocialCloud: React.FC<SocialCloudProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="p-2.5 rounded-full border border-border/40 hover:border-border hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialCloud;
