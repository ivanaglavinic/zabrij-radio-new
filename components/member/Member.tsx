/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import "./member.css";

type MemberProps = {
  name: string;
  instagram: string;
  image?: string; // optional, you can add your own picture later
};

export const Member = ({ name, instagram, image }: MemberProps) => {
  return (
    <a
      className="member-card"
      href={instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="member-image">
        <img
          src={image || "/placeholder-profile.png"}
          alt={name}
          width={200}
          height={200}
        />
      </div>
      <h3 className="member-name">{name}</h3>
    </a>
  );
};
