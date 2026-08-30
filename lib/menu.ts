export type PackColumn = {
  qty: string;
  label: string;
};

export type MenuRow = {
  name: string;
  orderName: string;
  prices: string[];
};

export type MenuSection = {
  id: string;
  title: string;
  minimum: string;
  columns: PackColumn[];
  rows: MenuRow[];
};

export type ExtraRow = {
  name: string;
  price: string;
  pack: string;
};

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "samoosas",
    title: "Samoosas",
    minimum: "Minimum of 25 per filling",
    columns: [
      { qty: "25", label: "25" },
      { qty: "50", label: "50" },
      { qty: "100", label: "100" },
    ],
    rows: [
      { name: "Mince", orderName: "Samoosas — Mince", prices: ["R175", "R350", "R700"] },
      { name: "Chicken", orderName: "Samoosas — Chicken", prices: ["R175", "R350", "R700"] },
      { name: "Cheese", orderName: "Samoosas — Cheese", prices: ["R200", "R400", "R800"] },
      { name: "Potato", orderName: "Samoosas — Potato", prices: ["R175", "R350", "R700"] },
      { name: "Veg", orderName: "Samoosas — Veg", prices: ["R162,50", "R325", "R650"] },
    ],
  },
  {
    id: "spring-rolls",
    title: "Spring Rolls",
    minimum: "Minimum of 25 per filling",
    columns: [
      { qty: "25", label: "25" },
      { qty: "50", label: "50" },
      { qty: "100", label: "100" },
    ],
    rows: [
      {
        name: "Chicken",
        orderName: "Spring Rolls — Chicken",
        prices: ["R212,50", "R425", "R850"],
      },
    ],
  },
  {
    id: "pies-cocktail",
    title: "Pies — Cocktail",
    minimum: "Minimum of 25 per filling",
    columns: [
      { qty: "25", label: "25" },
      { qty: "50", label: "50" },
      { qty: "100", label: "100" },
    ],
    rows: [
      { name: "Steak", orderName: "Pies (Cocktail) — Steak", prices: ["R212,50", "R425", "R850"] },
      { name: "Mince", orderName: "Pies (Cocktail) — Mince", prices: ["R175", "R350", "R700"] },
      { name: "Chicken", orderName: "Pies (Cocktail) — Chicken", prices: ["R187,50", "R375", "R750"] },
    ],
  },
  {
    id: "pies-medium",
    title: "Pies — Medium",
    minimum: "Minimum of 6 per filling",
    columns: [
      { qty: "6", label: "6" },
      { qty: "12", label: "12" },
    ],
    rows: [
      { name: "Steak", orderName: "Pies (Medium) — Steak", prices: ["R150", "R280"] },
      { name: "Mince", orderName: "Pies (Medium) — Mince", prices: ["R140", "R260"] },
      { name: "Chicken", orderName: "Pies (Medium) — Chicken", prices: ["R150", "R280"] },
    ],
  },
  {
    id: "sausage-rolls-cocktail",
    title: "Sausage Rolls — Cocktail",
    minimum: "Minimum of 25 per filling",
    columns: [
      { qty: "25", label: "25" },
      { qty: "50", label: "50" },
      { qty: "100", label: "100" },
    ],
    rows: [
      {
        name: "Cocktail",
        orderName: "Sausage Rolls — Cocktail",
        prices: ["R150", "R300", "R600"],
      },
    ],
  },
  {
    id: "sausage-rolls-12cm",
    title: "Sausage Rolls — 12cm",
    minimum: "Minimum of 6 per filling",
    columns: [
      { qty: "6", label: "6" },
      { qty: "12", label: "12" },
    ],
    rows: [
      {
        name: "12cm",
        orderName: "Sausage Rolls — 12cm",
        prices: ["R140", "R260"],
      },
    ],
  },
  {
    id: "quiche",
    title: "Quiche",
    minimum: "Minimum of 25 per filling",
    columns: [
      { qty: "25", label: "25" },
      { qty: "50", label: "50" },
      { qty: "100", label: "100" },
    ],
    rows: [
      { name: "Chicken", orderName: "Quiche — Chicken", prices: ["R200", "R400", "R800"] },
      {
        name: "Spinach & Feta",
        orderName: "Quiche — Spinach & Feta",
        prices: ["R175", "R350", "R700"],
      },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    minimum: "Minimum of 25 per filling",
    columns: [
      { qty: "25", label: "25" },
      { qty: "50", label: "50" },
      { qty: "100", label: "100" },
    ],
    rows: [
      { name: "Vienna", orderName: "Pizzas — Vienna", prices: ["R250", "R500", "R1000"] },
      { name: "Chicken", orderName: "Pizzas — Chicken", prices: ["R300", "R600", "R1200"] },
      { name: "Steak", orderName: "Pizzas — Steak", prices: ["R325", "R650", "R1300"] },
    ],
  },
  {
    id: "half-moons",
    title: "Half Moons",
    minimum: "Minimum of 25 per filling",
    columns: [
      { qty: "25", label: "25" },
      { qty: "50", label: "50" },
      { qty: "100", label: "100" },
    ],
    rows: [
      { name: "Chicken", orderName: "Half Moons — Chicken", prices: ["R212,50", "R425", "R850"] },
      { name: "Steak", orderName: "Half Moons — Steak", prices: ["R225", "R450", "R900"] },
    ],
  },
];

export const EXTRAS: ExtraRow[] = [
  { name: "Pastry", price: "R80 / kg", pack: "1 kg" },
  { name: "Butter Pastry", price: "R150 / kg", pack: "1 kg" },
  { name: "Samoosa Leaves (pur)", price: "R70 / 100 sheets", pack: "100 sheets" },
];
