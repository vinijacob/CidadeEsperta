const tintColorLight = "#1F8A4C";
const tintColorDark = "#4ADE80";

export const Colors = {
  light: {
    text: "#1B1B1B",
    background: "#F2F8F4",
    card: "#FFFFFF",
    border: "#D8E6DC",
    tint: tintColorLight,
    tintSoft: "#E1F4E8",
    muted: "#5F6F66",
    input: "#FFFFFF",
    icon: "#687076",
    success: "#1F8A4C",
    successSoft: "#E1F4E8",
    danger: "#D32F2F",
    dangerSoft: "#FDE7E7",
    warning: "#B7791F",
    warningSoft: "#FFF4D6",
    track: "#DCE8E0",
  },

  dark: {
    text: "#F5F5F5",
    background: "#0E1512",
    card: "#17211C",
    border: "#2A3A32",
    tint: tintColorDark,
    tintSoft: "#183626",
    muted: "#A9B8AF",
    input: "#1D2822",
    icon: "#BDBDBD",
    success: "#4ADE80",
    successSoft: "#173A26",
    danger: "#F87171",
    dangerSoft: "#3A1A1A",
    warning: "#FACC15",
    warningSoft: "#3A3216",
    track: "#2A3A32",
  },
};

export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 32,
  eight: 40,
};

export const MaxContentWidth = 600;

export const BottomTabInset = 0;

export const Radius = {
  small: 10,
  medium: 14,
  large: 20,
  round: 999,
};

export function getColors(scheme: string | null | undefined) {
  return scheme === "dark" ? Colors.dark : Colors.light;
}
