"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface ChartDataPoint {
  month: string;
  enrolled: number;
  inTraining: number;
  completed: number;
}

const DEFAULT_DATA: ChartDataPoint[] = [
  { month: "Jan", enrolled: 680, inTraining: 620, completed: 870 },
  { month: "Feb", enrolled: 300, inTraining: 740, completed: 720 },
  { month: "Mar", enrolled: 220, inTraining: 760, completed: 780 },
  { month: "Apr", enrolled: 680, inTraining: 410, completed: 410 },
  { month: "May", enrolled: 410, inTraining: 860, completed: 250 },
  { month: "Jun", enrolled: 500, inTraining: 450, completed: 830 },
];

export const LearnerProgressChart: React.FC = () => {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const maxY = 1000;
  const yTicks = [1000, 800, 600, 400, 200, 0];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-bold text-neutral-primary">
          Learner &amp; Candidate Progress
        </h2>
        <button
          type="button"
          onClick={() => {}}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          View All
          <FiChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full pt-4 pb-2">
        {/* Y-axis Labels & Gridlines */}
        <div className="relative h-60 w-full flex flex-col justify-between pointer-events-none select-none">
          {yTicks.map((tick) => (
            <div key={tick} className="flex items-center gap-2 w-full">
              <span className="w-8 text-[11px] text-gray-400 font-medium text-right shrink-0">
                {tick}
              </span>
              <div className="flex-1 border-b border-gray-100/90" />
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="absolute inset-0 pl-11 pr-2 pt-2 pb-5 flex items-end justify-between">
          {DEFAULT_DATA.map((d) => {
            const hEnrolled = (d.enrolled / maxY) * 100;
            const hTraining = (d.inTraining / maxY) * 100;
            const hCompleted = (d.completed / maxY) * 100;

            const isHovered = hoveredMonth === d.month;

            return (
              <div
                key={d.month}
                onMouseEnter={() => setHoveredMonth(d.month)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 flex flex-col items-center justify-end h-full px-1 sm:px-2 group cursor-pointer relative"
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-14 z-20 bg-gray-900 text-white rounded-xl py-1.5 px-3 shadow-xl text-[11px] font-medium whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95">
                    <p className="font-bold text-amber-300">{d.month}</p>
                    <p>Enrolled: {d.enrolled}</p>
                    <p>In-Training: {d.inTraining}</p>
                    <p>Completed: {d.completed}</p>
                  </div>
                )}

                {/* 3 Bars */}
                <div className="flex items-end gap-1 sm:gap-1.5 w-full justify-center h-[90%]">
                  {/* Total Enrolled Bar (Dark Wine Red) */}
                  <div
                    style={{ height: `${hEnrolled}%` }}
                    className="w-2.5 sm:w-3.5 bg-[#8F1532] rounded-t-sm transition-all duration-300 hover:brightness-110"
                    title={`Enrolled: ${d.enrolled}`}
                  />
                  {/* In-Training Bar (Amber/Gold) */}
                  <div
                    style={{ height: `${hTraining}%` }}
                    className="w-2.5 sm:w-3.5 bg-[#F59E0B] rounded-t-sm transition-all duration-300 hover:brightness-110"
                    title={`In Training: ${d.inTraining}`}
                  />
                  {/* Completed Bar (Green) */}
                  <div
                    style={{ height: `${hCompleted}%` }}
                    className="w-2.5 sm:w-3.5 bg-[#10B981] rounded-t-sm transition-all duration-300 hover:brightness-110"
                    title={`Completed: ${d.completed}`}
                  />
                </div>

                {/* X-axis Label */}
                <span className="text-xs font-semibold text-gray-500 mt-2">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 mt-1 border-t border-gray-100 text-[11px] sm:text-xs text-neutral-secondary font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#8F1532] rounded-xs" />
          <span>Total Enrolled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-xs" />
          <span>In training/Assessment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#10B981] rounded-xs" />
          <span>Completed/Certified</span>
        </div>
      </div>
    </div>
  );
};
