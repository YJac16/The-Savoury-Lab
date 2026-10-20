import { MENU_SECTIONS } from "@/lib/menu";

type FeaturedSpec = {
  sectionId: string;
  filling: string;
  qty: string;
  image: string;
};

const FEATURED_SPECS: FeaturedSpec[] = [
  {
    sectionId: "samoosas",
    filling: "Chicken",
    qty: "25",
    image: "/images/catalogue/samoosas.jpg",
  },
  {
    sectionId: "pies-cocktail",
    filling: "Steak",
    qty: "25",
    image: "/images/catalogue/cocktail-pies.jpg",
  },
  {
    sectionId: "spring-rolls",
    filling: "Chicken",
    qty: "25",
    image: "/images/catalogue/spring-rolls.jpg",
  },
];

export type FeaturedProduct = {
  orderName: string;
  category: string;
  filling: string;
  qty: string;
  price: string;
  image: string;
};

export function getFeaturedProducts(): FeaturedProduct[] {
  return FEATURED_SPECS.map((spec) => {
    const section = MENU_SECTIONS.find((item) => item.id === spec.sectionId);
    const row = section?.rows.find((item) => item.name === spec.filling);
    const columnIndex =
      section?.columns.findIndex((column) => column.qty === spec.qty) ?? -1;
    const price = columnIndex >= 0 ? row?.prices[columnIndex] : undefined;

    if (!section || !row || !price) {
      throw new Error(
        `Featured pack not in menu: ${spec.sectionId} / ${spec.filling} / ${spec.qty}`,
      );
    }

    return {
      orderName: row.orderName,
      category: section.title,
      filling: row.name,
      qty: spec.qty,
      price,
      image: spec.image,
    };
  });
}
