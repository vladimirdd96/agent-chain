"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const AgentCard: React.FC<AgentCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  price,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-md border border-white/10 transition-all hover:border-white/20">
      <Link href={`/agent-store/${id}`} className="block">
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="mt-2 text-sm text-white/70">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-white font-medium">${price.toFixed(2)}</span>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AgentCard;
