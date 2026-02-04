import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// iPhone 모델별 해상도 + 잠금화면 safe area
const PHONE_CONFIGS: Record<
  string,
  {
    width: number;
    height: number;
    // 잠금화면에서 시계/위젯 피하는 영역 (비율)
    safeArea: {
      top: number; // 시계 아래부터 시작 (상단에서 %)
      bottom: number; // 하단 버튼 위까지 (하단에서 %)
      left: number;
      right: number;
    };
  }
> = {
  // iPhone 13 mini
  "iphone-13-mini": {
    width: 1080,
    height: 2340,
    safeArea: { top: 0.32, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  // iPhone 13, 14
  "iphone-13": {
    width: 1170,
    height: 2532,
    safeArea: { top: 0.30, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  "iphone-14": {
    width: 1170,
    height: 2532,
    safeArea: { top: 0.30, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  // iPhone 14 Pro (Dynamic Island)
  "iphone-14-pro": {
    width: 1179,
    height: 2556,
    safeArea: { top: 0.32, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  "iphone-14-pro-max": {
    width: 1290,
    height: 2796,
    safeArea: { top: 0.32, bottom: 0.11, left: 0.05, right: 0.05 },
  },
  // iPhone 15
  "iphone-15": {
    width: 1179,
    height: 2556,
    safeArea: { top: 0.32, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  "iphone-15-plus": {
    width: 1290,
    height: 2796,
    safeArea: { top: 0.32, bottom: 0.11, left: 0.05, right: 0.05 },
  },
  "iphone-15-pro": {
    width: 1179,
    height: 2556,
    safeArea: { top: 0.32, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  "iphone-15-pro-max": {
    width: 1290,
    height: 2796,
    safeArea: { top: 0.32, bottom: 0.11, left: 0.05, right: 0.05 },
  },
  // iPhone 16
  "iphone-16": {
    width: 1179,
    height: 2556,
    safeArea: { top: 0.32, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  "iphone-16-plus": {
    width: 1290,
    height: 2796,
    safeArea: { top: 0.32, bottom: 0.11, left: 0.05, right: 0.05 },
  },
  "iphone-16-pro": {
    width: 1206,
    height: 2622,
    safeArea: { top: 0.32, bottom: 0.12, left: 0.06, right: 0.06 },
  },
  "iphone-16-pro-max": {
    width: 1320,
    height: 2868,
    safeArea: { top: 0.31, bottom: 0.11, left: 0.05, right: 0.05 },
  },
  // Android
  "android-fhd": {
    width: 1080,
    height: 1920,
    safeArea: { top: 0.28, bottom: 0.10, left: 0.05, right: 0.05 },
  },
  "android-qhd": {
    width: 1440,
    height: 2560,
    safeArea: { top: 0.28, bottom: 0.10, left: 0.05, right: 0.05 },
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // 파라미터
  const style = searchParams.get("style") || "days";
  const model = searchParams.get("model") || "iphone-15";

  const config = PHONE_CONFIGS[model] || PHONE_CONFIGS["iphone-15"];
  const { width, height, safeArea } = config;

  // Safe area 계산
  const contentTop = height * safeArea.top;
  const contentBottom = height * safeArea.bottom;
  const contentHeight = height - contentTop - contentBottom;
  const contentLeft = width * safeArea.left;
  const contentRight = width * safeArea.right;
  const contentWidth = width - contentLeft - contentRight;

  // 오늘 날짜 계산
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear =
    Math.floor(
      (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
  const daysLeft = 365 - dayOfYear;
  const percent = Math.round((dayOfYear / 365) * 100);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Content Area - 시계 아래, 하단 버튼 위 */}
        <div
          style={{
            position: "absolute",
            top: contentTop,
            left: contentLeft,
            width: contentWidth,
            height: contentHeight,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {style === "days" && (
            <DaysLayout
              dayOfYear={dayOfYear}
              contentWidth={contentWidth}
              contentHeight={contentHeight}
            />
          )}
          {style === "months" && (
            <MonthsLayout
              dayOfYear={dayOfYear}
              contentWidth={contentWidth}
              contentHeight={contentHeight}
            />
          )}
          {style === "quarters" && (
            <QuartersLayout
              dayOfYear={dayOfYear}
              contentWidth={contentWidth}
              contentHeight={contentHeight}
            />
          )}

          {/* Bottom Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: Math.round(contentWidth * 0.025),
              marginTop: contentHeight * 0.05,
            }}
          >
            <span
              style={{
                color: "#78716c", // stone-500
                fontSize: Math.round(contentWidth * 0.028),
                fontWeight: 400,
              }}
            >
              {percent}%
            </span>
            <span
              style={{
                color: "#44403c", // stone-700
                fontSize: Math.round(contentWidth * 0.028),
              }}
            >
              ·
            </span>
            <span
              style={{
                color: "#a8a29e", // stone-400
                fontSize: Math.round(contentWidth * 0.028),
                fontWeight: 500,
              }}
            >
              {daysLeft}d left
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}

// Days 레이아웃 - 365일 전체 그리드
function DaysLayout({
  dayOfYear,
  contentWidth,
}: {
  dayOfYear: number;
  contentWidth: number;
  contentHeight: number;
}) {
  // 15열 그리드
  const cols = 15;
  const rows = Math.ceil(365 / cols); // 25

  // dot 크기와 간격
  const dotSize = Math.floor(contentWidth * 0.038);
  const gap = Math.floor(dotSize * 0.5);

  // 전체 그리드 크기 (정확한 중앙 정렬용)
  const gridWidth = cols * dotSize + (cols - 1) * gap;

  // 행별로 렌더링
  const rowsArray = [];
  for (let row = 0; row < rows; row++) {
    const dotsInRow = [];
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col;
      if (i >= 365) break;

      const isPast = i < dayOfYear - 1;
      const isToday = i === dayOfYear - 1;

      dotsInRow.push(
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            marginRight: col < cols - 1 ? gap : 0,
            backgroundColor: isToday
              ? "#f5f5f4"
              : isPast
              ? "#78716c"
              : "#1c1917",
          }}
        />
      );
    }
    rowsArray.push(
      <div
        key={row}
        style={{
          display: "flex",
          marginBottom: row < rows - 1 ? gap : 0,
        }}
      >
        {dotsInRow}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: gridWidth,
      }}
    >
      {rowsArray}
    </div>
  );
}

// Months 레이아웃 - 12개월 그리드 (3x4)
function MonthsLayout({
  dayOfYear,
  contentWidth,
  contentHeight,
}: {
  dayOfYear: number;
  contentWidth: number;
  contentHeight: number;
}) {
  const months = [
    { name: "Jan", days: 31, start: 0 },
    { name: "Feb", days: 28, start: 31 },
    { name: "Mar", days: 31, start: 59 },
    { name: "Apr", days: 30, start: 90 },
    { name: "May", days: 31, start: 120 },
    { name: "Jun", days: 30, start: 151 },
    { name: "Jul", days: 31, start: 181 },
    { name: "Aug", days: 31, start: 212 },
    { name: "Sep", days: 30, start: 243 },
    { name: "Oct", days: 31, start: 273 },
    { name: "Nov", days: 30, start: 304 },
    { name: "Dec", days: 31, start: 334 },
  ];

  // 3열 4행 레이아웃
  const cols = 3;
  const rows = 4;

  // 간격
  const monthGapX = Math.floor(contentWidth * 0.08);
  const monthGapY = Math.floor(contentHeight * 0.045);

  // 월별 박스 크기
  const monthWidth = Math.floor((contentWidth * 0.85 - monthGapX * (cols - 1)) / cols);

  // dot 크기 (7열 기준)
  const dotsPerRow = 7;
  const dotGap = Math.floor(monthWidth * 0.05);
  const dotSize = Math.floor((monthWidth - dotGap * (dotsPerRow - 1)) / dotsPerRow);
  const fontSize = Math.floor(contentWidth * 0.022);

  // 전체 크기
  const gridWidth = monthWidth * cols + monthGapX * (cols - 1);

  // 행별로 렌더링 (4행)
  const monthRows = [];
  for (let row = 0; row < rows; row++) {
    const monthsInRow = [];
    for (let col = 0; col < cols; col++) {
      const monthIndex = row * cols + col;
      const month = months[monthIndex];

      // 월 내부 dot 행 생성
      const dotRows = [];
      const monthDotRows = Math.ceil(month.days / dotsPerRow);
      for (let dotRow = 0; dotRow < monthDotRows; dotRow++) {
        const dots = [];
        for (let dotCol = 0; dotCol < dotsPerRow; dotCol++) {
          const dayIndex = dotRow * dotsPerRow + dotCol;
          if (dayIndex >= month.days) break;

          const dayNum = month.start + dayIndex + 1;
          const isPast = dayNum < dayOfYear;
          const isToday = dayNum === dayOfYear;

          dots.push(
            <div
              key={dayIndex}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                marginRight: dotCol < dotsPerRow - 1 ? dotGap : 0,
                backgroundColor: isToday
                  ? "#f5f5f4"
                  : isPast
                  ? "#78716c"
                  : "#1c1917",
              }}
            />
          );
        }
        dotRows.push(
          <div
            key={dotRow}
            style={{
              display: "flex",
              marginBottom: dotRow < monthDotRows - 1 ? dotGap : 0,
            }}
          >
            {dots}
          </div>
        );
      }

      monthsInRow.push(
        <div
          key={month.name}
          style={{
            display: "flex",
            flexDirection: "column",
            width: monthWidth,
            marginRight: col < cols - 1 ? monthGapX : 0,
          }}
        >
          <span
            style={{
              color: "#57534e",
              fontSize: fontSize,
              marginBottom: Math.floor(dotSize * 0.7),
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            {month.name}
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {dotRows}
          </div>
        </div>
      );
    }

    monthRows.push(
      <div
        key={row}
        style={{
          display: "flex",
          marginBottom: row < rows - 1 ? monthGapY : 0,
        }}
      >
        {monthsInRow}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: gridWidth,
      }}
    >
      {monthRows}
    </div>
  );
}

// Quarters 레이아웃 - Q1~Q4 (2x2)
function QuartersLayout({
  dayOfYear,
  contentWidth,
  contentHeight,
}: {
  dayOfYear: number;
  contentWidth: number;
  contentHeight: number;
}) {
  const quarters = [
    { name: "Q1", start: 0, days: 90 },
    { name: "Q2", start: 90, days: 91 },
    { name: "Q3", start: 181, days: 92 },
    { name: "Q4", start: 273, days: 92 },
  ];

  // 2x2 레이아웃
  const cols = 2;
  const rows = 2;

  // 간격 (넉넉하게)
  const quarterGapX = Math.floor(contentWidth * 0.12);
  const quarterGapY = Math.floor(contentHeight * 0.1);

  // 분기별 박스 크기
  const quarterWidth = Math.floor((contentWidth * 0.78 - quarterGapX) / 2);

  // dot 크기 (10열 기준)
  const dotsPerRow = 10;
  const dotGap = Math.floor(quarterWidth * 0.04);
  const dotSize = Math.floor((quarterWidth - dotGap * (dotsPerRow - 1)) / dotsPerRow);
  const fontSize = Math.floor(contentWidth * 0.026);

  // 전체 크기
  const gridWidth = quarterWidth * cols + quarterGapX;

  // 행별로 렌더링 (2행)
  const quarterRows = [];
  for (let row = 0; row < rows; row++) {
    const quartersInRow = [];
    for (let col = 0; col < cols; col++) {
      const qIndex = row * cols + col;
      const q = quarters[qIndex];

      // 분기 내부 dot 행 생성
      const dotRows = [];
      const qDotRows = Math.ceil(q.days / dotsPerRow);
      for (let dotRow = 0; dotRow < qDotRows; dotRow++) {
        const dots = [];
        for (let dotCol = 0; dotCol < dotsPerRow; dotCol++) {
          const dayIndex = dotRow * dotsPerRow + dotCol;
          if (dayIndex >= q.days) break;

          const dayNum = q.start + dayIndex + 1;
          const isPast = dayNum < dayOfYear;
          const isToday = dayNum === dayOfYear;

          dots.push(
            <div
              key={dayIndex}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                marginRight: dotCol < dotsPerRow - 1 ? dotGap : 0,
                backgroundColor: isToday
                  ? "#f5f5f4"
                  : isPast
                  ? "#78716c"
                  : "#1c1917",
              }}
            />
          );
        }
        dotRows.push(
          <div
            key={dotRow}
            style={{
              display: "flex",
              marginBottom: dotRow < qDotRows - 1 ? dotGap : 0,
            }}
          >
            {dots}
          </div>
        );
      }

      quartersInRow.push(
        <div
          key={q.name}
          style={{
            display: "flex",
            flexDirection: "column",
            width: quarterWidth,
            marginRight: col < cols - 1 ? quarterGapX : 0,
          }}
        >
          <span
            style={{
              color: "#57534e",
              fontSize: fontSize,
              marginBottom: Math.floor(dotSize * 0.8),
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            {q.name}
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {dotRows}
          </div>
        </div>
      );
    }

    quarterRows.push(
      <div
        key={row}
        style={{
          display: "flex",
          marginBottom: row < rows - 1 ? quarterGapY : 0,
        }}
      >
        {quartersInRow}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: gridWidth,
      }}
    >
      {quarterRows}
    </div>
  );
}
