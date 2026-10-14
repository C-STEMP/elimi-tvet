"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiSearch, HiChevronDown } from "react-icons/hi";

interface Course {
  id: number;
  title: string;
  category: string;
  badge: string;
  description: string;
  image: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: "Solar PV Installation & Repair",
    category: "Electrical",
    badge: "Trending",
    description:
      "Master clean energy design, solar PV arrays, inverters, and battery storage systems.",
    image: "/hero-img-4.jpg",
  },
  {
    id: 2,
    title: "Electrical Wiring & Systems",
    category: "Electrical",
    badge: "Top Rated",
    description:
      "Learn domestic and industrial circuit wiring, panel installation, and fault diagnostics.",
    image: "/hero-img-4.jpg",
  },
  {
    id: 3,
    title: "Plumbing & Modern Pipefitting",
    category: "Plumbing",
    badge: "Popular",
    description:
      "Gain hands-on expertise in water distribution, drainage networks, and sanitary fixtures.",
    image: "/hero-img-4.jpg",
  },
  {
    id: 4,
    title: "Welding & Metal Fabrication",
    category: "Construction",
    badge: "Top Rated",
    description:
      "Develop precision arc, MIG and TIG welding techniques, blueprint reading, and safety.",
    image: "/hero-img-4.jpg",
  },
  {
    id: 5,
    title: "Automotive Diagnostics & Care",
    category: "Construction",
    badge: "In Demand",
    description:
      "Understand modern vehicle diagnostics, engine maintenance, and mechanical troubleshooting.",
    image: "/hero-img-4.jpg",
  },
  {
    id: 6,
    title: "Carpentry & Furniture Joinery",
    category: "Construction",
    badge: "Top Rated",
    description:
      "Build precision architectural woodwork, modern cabinetry, and structural timber frames.",
    image: "/hero-img-4.jpg",
  },
  {
    id: 7,
    title: "Painting & Interior Finishing",
    category: "Finishing",
    badge: "Top Rated",
    description:
      "Learn surface prep, spray application, decorative coatings, and professional aesthetics.",
    image: "/hero-img-4.jpg",
  },
  {
    id: 8,
    title: "HVAC & Commercial Cooling",
    category: "Electrical",
    badge: "Certified",
    description:
      "Install, service, and maintain residential and commercial air conditioning equipment.",
    image: "/hero-img-4.jpg",
  },
];

export function PopularCoursesSection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = COURSES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="courses"
      className="w-full px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto py-12 lg:py-16"
    >
      <div
        data-aos="fade-up"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#333333] tracking-tight">
            Our Most Popular <br className="hidden sm:inline" /> Courses
          </h2>
        </div>
        <p className="text-xs md:text-sm lg:text-base text-[#333333] max-w-lg text-left sm:text-right sm:place-self-end leading-relaxed font-normal">
          Explore practical, industry-accredited vocational courses designed by
          master craftspeople to equip you with job-ready trade skills.
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
      >
        <div className="relative w-full sm:max-w-xs">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-xl border border-[#12312B33] bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#12312B80] placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors"
          />
        </div>

        <div className="relative w-full sm:w-44 flex justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#12312B33] bg-white pl-4 pr-10 py-2.5 text-xs sm:text-sm font-semibold text-black focus:border-secondary focus:outline-none cursor-pointer transition-colors"
          >
            <option value="All">All</option>
            <option value="Construction">Construction</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Finishing">Finishing &amp; Painting</option>
          </select>
          <HiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCourses.map((course, idx) => (
          <div
            key={course.id}
            data-aos="fade-up"
            data-aos-delay={(idx % 4) * 100 + 100}
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
                {course.badge}
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-input-bg">
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

      <div data-aos="fade-up" className="mt-10 sm:mt-12 flex justify-center">
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
