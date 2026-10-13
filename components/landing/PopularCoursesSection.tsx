"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiSearch } from "react-icons/hi";

interface Course {
  id: number;
  title: string;
  badge: string;
  description: string;
  image: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: "Painting & Decoration",
    badge: "Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
  {
    id: 2,
    title: "Painting & Decoration",
    badge: "Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
  {
    id: 3,
    title: "Painting & Decoration",
    badge: "Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
  {
    id: 4,
    title: "Painting & Decoration",
    badge: "Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
  {
    id: 5,
    title: "Painting & Decoration",
    badge: "Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
  {
    id: 6,
    title: "Painting & Decoration",
    badge: "/Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
  {
    id: 7,
    title: "Painting & Decoration",
    badge: "Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
  {
    id: 8,
    title: "Painting & Decoration",
    badge: "Top Rated",
    description:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien...",
    image: "/hero-img-4.jpg",
  },
];

export function PopularCoursesSection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = COURSES.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section
      id="courses"
      className="w-full px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto py-12 lg:py-16"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight">
            Our Most Popular <br className="hidden sm:inline" /> Courses
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm sm:text-right leading-relaxed font-normal">
          Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in nisl
          pretium non dui scelerisque varius tristique mollis vitae.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:max-w-xs">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors"
          />
        </div>

        <div className="w-full sm:w-auto flex justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 focus:border-secondary focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Construction">Construction</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Finishing">Finishing &amp; Painting</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs select-none">
                Top Rated
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-text-dark leading-snug">
                  {course.title}
                </h3>
                <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-4 pt-2">
                <a
                  href="https://training.elimi.africa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-xl bg-secondary py-2.5 text-xs font-bold text-white shadow-xs hover:bg-secondary-hover transition-all cursor-pointer"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 sm:mt-12 flex justify-center">
        <a
          href="https://training.elimi.africa/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-[#20252B] hover:bg-black px-8 py-3 text-xs sm:text-sm font-bold text-white transition-all shadow-md cursor-pointer"
        >
          See More Courses
        </a>
      </div>
    </section>
  );
}
