export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const weekdays = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
];

export const weeks = Array(18)
  .fill("0")
  .map((_, i) => (i + 1).toString());

export const drawerWidth = 240;
