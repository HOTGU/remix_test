import React, { useEffect, useRef } from "react";

import { gsap } from "gsap";

import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";
import { getDb } from "~/libs/db.server";
import type { Portfolio } from "~/schemas/portfolio.server";
import { useLoaderData } from "react-router";

export const loader = async () => {
  const db = await getDb();

  const portfolios = await db
    .collection<Portfolio>("Portfolio")
    .find()
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  const imgs = portfolios.map((i) => {
    return i.thumb;
  });

  return { imgs };
};

const POOL_SIZE = 6;

const OFFSET = 12;

const LERP = 0.25;

const portfolio = () => {
  const { imgs } = useLoaderData<typeof loader>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    //-------------------------------
    // mouse
    //-------------------------------

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const cursor = {
      x: mouse.x,
      y: mouse.y,
    };

    let lastSpawn = {
      x: cursor.x,
      y: cursor.y,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    //-------------------------------
    // image pool
    //-------------------------------

    const pool: HTMLImageElement[] = [];

    for (let i = 0; i < POOL_SIZE; i++) {
      const img = document.createElement("img");

      img.src = imgs[i % imgs.length];

      img.className =
        "pointer-events-none fixed w-[200px] h-[140px] object-cover rounded-xl object-cover will-change-transform";

      img.style.opacity = "0";

      container.appendChild(img);

      pool.push(img);
    }

    let poolIndex = 0;
    let imageIndex = 0;

    //-------------------------------
    // spawn
    //-------------------------------

    function spawn(x: number, y: number, angle: number) {
      const img = pool[poolIndex];

      poolIndex = (poolIndex + 1) % POOL_SIZE;

      img.src = imgs[imageIndex];

      imageIndex = (imageIndex + 1) % imgs.length;

      gsap.killTweensOf(img);

      const hold = gsap.utils.random(1.8, 2.8);

      let currentZIndex = 1;

      gsap.set(img, {
        x: x - Math.cos(angle) * 20,
        y: y - Math.sin(angle) * 20,

        xPercent: -50,
        yPercent: -50,

        opacity: 0,
        scale: 0.78,
        filter: "blur(3px)",
        zIndex: currentZIndex++,
      });
      gsap
        .timeline()

        .to(img, {
          x,
          y,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.35,
          ease: "power3.out",
        })

        .to(
          img,
          {
            opacity: 0,

            scale: 1.05,

            filter: "blur(3px)",

            duration: 1.5,

            ease: "power2.out",
          },
          hold - 0.2,
        );
    }

    //-------------------------------
    // RAF
    //-------------------------------

    let raf = 0;

    const tick = () => {
      cursor.x += (mouse.x - cursor.x) * LERP;
      cursor.y += (mouse.y - cursor.y) * LERP;
      const dx = cursor.x - lastSpawn.x;
      const dy = cursor.y - lastSpawn.y;

      const distance = Math.hypot(dx, dy);

      const speed = Math.min(distance, 200);

      const dynamicDistance = gsap.utils.mapRange(0, 200, 80, 150, speed);

      if (distance >= dynamicDistance) {
        const angle = Math.atan2(dy, dx);

        const spawnX =
          lastSpawn.x +
          Math.cos(angle) * dynamicDistance +
          (cursor.x - lastSpawn.x) * 0.2;

        const spawnY =
          lastSpawn.y +
          Math.sin(angle) * dynamicDistance +
          (cursor.y - lastSpawn.y) * 0.2;

        lastSpawn = {
          x: spawnX,
          y: spawnY,
        };

        spawn(
          spawnX + Math.cos(angle) * OFFSET,
          spawnY + Math.sin(angle) * OFFSET,
          angle,
        );
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener("mousemove", handleMouseMove);

      pool.forEach((img) => {
        gsap.killTweensOf(img);
        img.remove();
      });
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="h-screen w-full flex justify-center items-center">
        <div
          ref={containerRef}
          className=" pointer-events-none fixed inset-0 overflow-hidden shadow-2xl"
        />
        <h1 className=" font-racing text-8xl z-10000">Created by Weavement</h1>
      </div>
    </div>
  );
};

export default portfolio;
