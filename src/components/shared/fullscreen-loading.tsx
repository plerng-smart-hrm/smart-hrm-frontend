"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

const FullScreenLoading: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="h-screen flex items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center space-y-6">
          <m.div
            className="relative"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            style={{ boxShadow: "none", filter: "none", backdropFilter: "none" }}
          >
            <Image
              src="/logo/logo.png"
              alt="Company Logo"
              width={96}
              height={96}
              priority
              className="pointer-events-none select-none"
              style={{ backgroundColor: "transparent" }}
            />
          </m.div>

          <m.p
            className="text-lg font-medium text-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          >
            Loading...
          </m.p>

          <div className="w-44 h-1.5 rounded-full bg-muted-foreground/20 overflow-hidden">
            <m.span
              className="block h-full bg-foreground"
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default FullScreenLoading;
