# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DOTE is a minimalist wallpaper generator for mindful living. It creates dynamic calendar images that users can set as their phone lock screen, updating automatically via iOS Shortcuts or Android MacroDroid.

**Reference**: thelifecalendar.com

## Core Concept

The app generates wallpaper images visualizing time:
- **Year Calendar**: 365 dots representing days of the current year, highlighting progress
- **Goal Calendar** (planned): Countdown to a specific deadline

> Note: Life Calendar은 구현하지 않음

Users configure their settings on the website, receive a unique URL, and set up phone automation to fetch the image daily and update their lock screen.

## Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint
```

## Architecture

### Current Flow
1. User visits website, configures settings (birthday, phone model, etc.)
2. Website generates a unique URL for image endpoint
3. User sets up iOS Shortcuts / Android MacroDroid automation
4. Automation fetches image from URL daily and sets as lock screen

### Key Technical Requirements
- **Dynamic image generation**: Canvas API to render dots as PNG
- **API endpoint**: `/api/year` (or similar) returns generated image
- **URL parameters**: birthday, phone model, theme, etc.
- **Phone-specific sizing**: Different resolutions for iPhone/Android models

### Data Flow
- No user authentication required for basic functionality
- Future: Login to sync study records and customize dot colors

## Technology Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript 5.x
- **Icons**: lucide-react

## Phone Automation Integration

### iOS (Shortcuts app)
1. Create automation: Time of Day → 6:00 AM → Daily
2. Add actions: "Get Contents of URL" → "Set Wallpaper Photo"

### Android (MacroDroid)
Similar automation flow with MacroDroid app

## Future Features
- Goal Calendar (deadline countdown)
- User authentication
- Study time logging that changes dot colors

## Progress Log
- [2026-02-05] Year Calendar 최적화
  - Days: 15열 그리드, 왼쪽 정렬
  - Months: 3x4 레이아웃, 7열(주간) 기준 dot
  - Quarters: 2x2 레이아웃, 여백 확대
  - 색상: Stone 팔레트 (과거=#78716c, 오늘=#f5f5f4, 미래=#1c1917)
