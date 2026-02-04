"use client";

import { useState, useEffect } from "react";

type CalendarType = "life" | "year" | "goal";
type StyleType = "days" | "months" | "quarters";

const IPHONE_MODELS = [
  { id: "iphone-13-mini", name: "iPhone 13 mini" },
  { id: "iphone-13", name: "iPhone 13 / 14" },
  { id: "iphone-14-pro", name: "iPhone 14 Pro" },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max / 15 Plus" },
  { id: "iphone-15", name: "iPhone 15 / 15 Pro" },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max" },
  { id: "iphone-16", name: "iPhone 16" },
  { id: "iphone-16-plus", name: "iPhone 16 Plus" },
  { id: "iphone-16-pro", name: "iPhone 16 Pro" },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max" },
];

const ANDROID_MODELS = [
  { id: "android-fhd", name: "FHD+ (1080 x 1920)" },
  { id: "android-qhd", name: "QHD+ (1440 x 2560)" },
];

const STYLES: { id: StyleType; name: string; desc: string }[] = [
  { id: "days", name: "Days", desc: "365 dots in grid" },
  { id: "months", name: "Months", desc: "12 month blocks" },
  { id: "quarters", name: "Quarters", desc: "Q1-Q4 sections" },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState<CalendarType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 오늘이 올해의 몇 번째 날인지
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor(
    (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="pt-20 pb-16 text-center px-6">
        <p className="text-white/30 text-sm tracking-widest uppercase mb-6">dote</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
          Time flows. Track it.
        </h1>
        <p className="text-white/40 text-sm">
          Wallpapers that update daily on your lock screen.
        </p>
      </header>

      {/* Phone Mockups */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

          {/* Life Calendar */}
          <PhoneMockup
            title="Life"
            subtitle="in weeks"
            comingSoon
            onClick={() => {}}
          >
            {mounted && <LifeDotsPreview />}
          </PhoneMockup>

          {/* Year Calendar - Featured */}
          <PhoneMockup
            title="Year"
            subtitle="in days"
            featured
            onClick={() => setSelectedType("year")}
          >
            {mounted && <YearDotsPreview dayOfYear={dayOfYear} />}
          </PhoneMockup>

          {/* Goal Calendar */}
          <PhoneMockup
            title="Goal"
            subtitle="countdown"
            comingSoon
            onClick={() => {}}
          >
            {mounted && <GoalDotsPreview />}
          </PhoneMockup>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-white/20 text-xs">
          Tap Year card to get started
        </p>
      </footer>

      {/* Modal */}
      {selectedType === "year" && (
        <SetupModal onClose={() => setSelectedType(null)} />
      )}
    </main>
  );
}

// Phone Mockup Component
function PhoneMockup({
  title,
  subtitle,
  children,
  featured = false,
  comingSoon = false,
  onClick,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  featured?: boolean;
  comingSoon?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={comingSoon ? undefined : onClick}
      className={`
        transition-all duration-300 relative
        ${featured ? "scale-105 md:scale-110" : "opacity-60"}
        ${comingSoon ? "cursor-not-allowed" : "cursor-pointer hover:opacity-100"}
      `}
    >
      {comingSoon && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
            soon
          </span>
        </div>
      )}

      {/* Label */}
      <div className="text-center mb-4">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-white/30">{subtitle}</p>
      </div>

      {/* Phone Frame */}
      <div className={`
        relative bg-zinc-950 rounded-[2rem] p-1.5
        border border-white/10
        ${featured ? "w-44 h-80" : "w-36 h-64"}
        ${!comingSoon && "hover:border-white/20"} transition-colors
      `}>
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full" />

        {/* Screen */}
        <div className="w-full h-full bg-black rounded-[1.6rem] flex flex-col items-center justify-center p-4">
          {/* Time */}
          <div className="text-center mb-4">
            <p className="text-[8px] text-white/30">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <p className={`font-light ${featured ? "text-3xl" : "text-2xl"}`}>
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </p>
          </div>

          {/* Dots */}
          <div className={featured ? "scale-100" : "scale-90"}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Life Calendar Preview
function LifeDotsPreview() {
  const totalWeeks = 52 * 8;
  const filled = Math.floor(totalWeeks * 0.4);

  return (
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: "repeat(26, 1fr)" }}
    >
      {Array.from({ length: totalWeeks }).map((_, i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{
            backgroundColor: i < filled ? "#fff" : "#fff",
            opacity: i < filled ? 0.8 : 0.15,
          }}
        />
      ))}
    </div>
  );
}

// Year Calendar Preview
function YearDotsPreview({ dayOfYear }: { dayOfYear: number }) {
  return (
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
    >
      {Array.from({ length: 365 }).map((_, i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{
            backgroundColor: "#fff",
            opacity: i < dayOfYear ? 0.9 : 0.15,
          }}
        />
      ))}
    </div>
  );
}

// Goal Calendar Preview
function GoalDotsPreview() {
  const total = 60;
  const passed = 23;

  return (
    <div className="text-center">
      <p className="text-[7px] text-white/30 mb-2 tracking-wider">PROJECT</p>
      <div
        className="grid gap-px mb-2"
        style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: "#fff",
              opacity: i < passed ? 0.8 : 0.15,
            }}
          />
        ))}
      </div>
      <p className="text-[8px] text-white/50">{total - passed}d left</p>
    </div>
  );
}

// Setup Modal
function SetupModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"config" | "guide">("config");
  const [device, setDevice] = useState<"iphone" | "android">("iphone");
  const [model, setModel] = useState("iphone-15");
  const [style, setStyle] = useState<StyleType>("days");
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const imageUrl = `${baseUrl}/api/year?style=${style}&model=${model}`;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const models = device === "iphone" ? IPHONE_MODELS : ANDROID_MODELS;

  // 디바이스 변경 시 모델 초기화
  const handleDeviceChange = (newDevice: "iphone" | "android") => {
    setDevice(newDevice);
    setModel(newDevice === "iphone" ? "iphone-15" : "android-fhd");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-zinc-950 w-full max-w-md rounded-t-3xl md:rounded-3xl border border-white/10 max-h-[90vh] overflow-auto">
        {/* Handle */}
        <div className="sticky top-0 pt-4 pb-2 bg-zinc-950 z-10">
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto" />
        </div>

        <div className="px-6 pb-8">
          {step === "config" ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium mb-1">Year Calendar</h3>
                <p className="text-sm text-white/40">Configure your wallpaper</p>
              </div>

              {/* Device Selection */}
              <div className="mb-6">
                <label className="text-xs text-white/40 mb-2 block">Device</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleDeviceChange("iphone")}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      device === "iphone"
                        ? "border-white/30 bg-white/5"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <AppleIcon />
                    <span className="text-sm">iPhone</span>
                  </button>
                  <button
                    onClick={() => handleDeviceChange("android")}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      device === "android"
                        ? "border-white/30 bg-white/5"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <AndroidIcon />
                    <span className="text-sm">Android</span>
                  </button>
                </div>
              </div>

              {/* Model Selection */}
              <div className="mb-6">
                <label className="text-xs text-white/40 mb-2 block">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm appearance-none cursor-pointer hover:border-white/20 transition-colors"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id} className="bg-zinc-900">
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style Selection */}
              <div className="mb-8">
                <label className="text-xs text-white/40 mb-2 block">Layout Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`p-3 rounded-xl border transition-all ${
                        style === s.id
                          ? "border-white/30 bg-white/5"
                          : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Link */}
              <div className="mb-6">
                <label className="text-xs text-white/40 mb-2 block">Image URL</label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/50 truncate">
                    {imageUrl}
                  </div>
                  <button
                    onClick={copyUrl}
                    className={`px-4 rounded-xl border transition-all ${
                      copied
                        ? "border-green-500/50 bg-green-500/10 text-green-400"
                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    {copied ? (
                      <CheckIcon />
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                </div>
              </div>

              {/* Preview Button */}
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-center block hover:bg-white/10 transition-colors mb-4"
              >
                Preview Image ↗
              </a>

              {/* Next Button */}
              <button
                onClick={() => setStep("guide")}
                className="w-full p-4 bg-white text-black rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Setup Instructions
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-full p-3 text-white/30 text-sm hover:text-white/50 transition-colors mt-2"
              >
                Close
              </button>
            </>
          ) : (
            <>
              {/* Guide Header */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setStep("config")}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h3 className="text-lg font-medium">Setup Guide</h3>
                  <p className="text-xs text-white/40">
                    {device === "iphone" ? "iOS Shortcuts" : "MacroDroid"}
                  </p>
                </div>
              </div>

              {device === "iphone" ? (
                <div className="space-y-6">
                  <Step
                    n={1}
                    title="Open Shortcuts App"
                    desc="Tap 'Automation' tab at the bottom"
                  />
                  <Step
                    n={2}
                    title="Create Automation"
                    desc="New Automation → Time of Day → Choose time (e.g. 6:00 AM) → Daily → Run Immediately"
                  />
                  <Step
                    n={3}
                    title="Add Actions"
                  >
                    <div className="space-y-3 mt-2">
                      <div className="p-3 bg-white/5 rounded-lg text-xs">
                        <p className="text-white/60 mb-1">3.1 Add "Get Contents of URL"</p>
                        <p className="text-white/40">Paste your image URL</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg text-xs">
                        <p className="text-white/60 mb-1">3.2 Add "Set Wallpaper"</p>
                        <p className="text-white/40">Choose "Lock Screen"</p>
                      </div>
                    </div>
                  </Step>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-xs text-blue-400 font-medium mb-1">Important</p>
                    <p className="text-xs text-white/50">
                      In "Set Wallpaper", tap the arrow (→) and disable "Crop to Subject" and "Show Preview"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <Step
                    n={1}
                    title="Install MacroDroid"
                    desc="Download from Play Store"
                  />
                  <Step
                    n={2}
                    title="Create Macro"
                    desc="Add Trigger → Day/Time → Select daily time"
                  />
                  <Step
                    n={3}
                    title="Add Actions"
                  >
                    <div className="space-y-3 mt-2">
                      <div className="p-3 bg-white/5 rounded-lg text-xs">
                        <p className="text-white/60 mb-1">3.1 HTTP Request</p>
                        <p className="text-white/40">Download image from URL</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg text-xs">
                        <p className="text-white/60 mb-1">3.2 Set Wallpaper</p>
                        <p className="text-white/40">Choose Lock Screen</p>
                      </div>
                    </div>
                  </Step>
                </div>
              )}

              {/* URL Copy Section */}
              <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-xs text-white/40 mb-2">Your Image URL</p>
                <p className="text-xs text-white/70 break-all mb-3">{imageUrl}</p>
                <button
                  onClick={copyUrl}
                  className={`w-full p-3 rounded-lg text-sm font-medium transition-all ${
                    copied
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  {copied ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Step Component
function Step({
  n,
  title,
  desc,
  children
}: {
  n: number;
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-medium">{n}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        {desc && <p className="text-xs text-white/40 mt-0.5">{desc}</p>}
        {children}
      </div>
    </div>
  );
}

// Icons
function AppleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.42-.59-3.02-.94-4.7-.94-1.68 0-3.28.35-4.7.94L5.23 5.67c-.18-.28-.54-.37-.83-.22-.31.16-.42.54-.26.85L5.98 9.48C2.76 11.34 1.12 14.5 1 18h22c-.12-3.5-1.76-6.66-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
