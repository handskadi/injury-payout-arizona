/** Small user-agent reader for the tracking table (no dependency). */
export type UaInfo = {
  browser_name: string | null;
  browser_version: string | null;
  os_name: string | null;
  os_version: string | null;
  device_type: "mobile" | "tablet" | "desktop" | "bot";
};

const first = (ua: string, re: RegExp) => ua.match(re)?.[1] ?? null;

export function parseUserAgent(ua: string): UaInfo {
  const s = ua || "";
  let browser_name: string | null = null;
  let browser_version: string | null = null;
  const browsers: [string, RegExp][] = [
    ["Edge", /Edg(?:e|A|iOS)?\/([\d.]+)/],
    ["Opera", /(?:OPR|Opera)\/([\d.]+)/],
    ["Samsung Internet", /SamsungBrowser\/([\d.]+)/],
    ["Facebook in-app", /FBAV\/([\d.]+)/],
    ["Instagram in-app", /Instagram ([\d.]+)/],
    ["Chrome", /(?:Chrome|CriOS)\/([\d.]+)/],
    ["Firefox", /(?:Firefox|FxiOS)\/([\d.]+)/],
    ["Safari", /Version\/([\d.]+).*Safari/],
  ];
  for (const [name, re] of browsers) {
    const v = first(s, re);
    if (v) {
      browser_name = name;
      browser_version = v;
      break;
    }
  }

  let os_name: string | null = null;
  let os_version: string | null = null;
  if (/iPhone|iPad|iPod/.test(s)) {
    os_name = "iOS";
    os_version = first(s, /OS ([\d_]+)/)?.replace(/_/g, ".") ?? null;
  } else if (/Android/.test(s)) {
    os_name = "Android";
    os_version = first(s, /Android ([\d.]+)/);
  } else if (/Windows NT/.test(s)) {
    os_name = "Windows";
    os_version = first(s, /Windows NT ([\d.]+)/);
  } else if (/CrOS/.test(s)) {
    os_name = "ChromeOS";
  } else if (/Mac OS X/.test(s)) {
    os_name = "macOS";
    os_version = first(s, /Mac OS X ([\d_.]+)/)?.replace(/_/g, ".") ?? null;
  } else if (/Linux/.test(s)) {
    os_name = "Linux";
  }

  const device_type = /bot|crawler|spider|crawling|headless/i.test(s)
    ? "bot"
    : /iPad|Tablet|PlayBook|Silk/.test(s) || (/Android/.test(s) && !/Mobile/.test(s))
      ? "tablet"
      : /Mobi|iPhone|iPod|Android/.test(s)
        ? "mobile"
        : "desktop";

  return { browser_name, browser_version, os_name, os_version, device_type };
}
