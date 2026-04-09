export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "pizza",
    name: "Pizza",
    icon: "Pizza",
    items: [
      { id: "p1", name: "Pizza margarita", price: 18 },
      { id: "p2", name: "Pizza thon", price: 25 },
      { id: "p3", name: "Pizza viande hachée", price: 25 },
      { id: "p4", name: "Pizza poulet", price: 25 },
      { id: "p5", name: "Pizza mixte", price: 35 },
    ],
  },
  {
    id: "sandwich",
    name: "Sandwich",
    icon: "Sandwich",
    items: [
      { id: "s1", name: "Sandwich thon", price: 15 },
      { id: "s2", name: "Sandwich thon fromage", price: 18 },
      { id: "s3", name: "Sandwich viande hachée", price: 20 },
      { id: "s4", name: "Sandwich viande hachée fromage", price: 22 },
      { id: "s5", name: "Sandwich dinde", price: 20 },
      { id: "s6", name: "Sandwich dinde au fromage", price: 22 },
      { id: "s7", name: "Sandwich mixte", price: 25 },
      { id: "s8", name: "Sandwich mixte au fromage", price: 28 },
    ],
  },
  {
    id: "panini",
    name: "Panini",
    icon: "Flame",
    items: [
      { id: "pn1", name: "Panini thon", price: 18 },
      { id: "pn2", name: "Panini thon fromage", price: 20 },
      { id: "pn3", name: "Panini viande hachée", price: 20 },
      { id: "pn4", name: "Panini viande hachée fromage", price: 22 },
      { id: "pn5", name: "Panini dinde", price: 20 },
      { id: "pn6", name: "Panini dinde fromage", price: 22 },
      { id: "pn7", name: "Panini mixte", price: 28 },
      { id: "pn8", name: "Panini mixte fromage", price: 30 },
    ],
  },
  {
    id: "the",
    name: "Thé",
    icon: "Coffee",
    items: [
      { id: "t1", name: "Thé petit", price: 10 },
      { id: "t2", name: "Thé grand", price: 15 },
    ],
  },
  {
    id: "cafe",
    name: "Café",
    icon: "CupSoda",
    items: [
      { id: "c1", name: "Café au lait", price: 10 },
      { id: "c2", name: "Café noir", price: 10 },
      { id: "c3", name: "Lait", price: 10 },
      { id: "c4", name: "Café au lait séparer", price: 12 },
    ],
  },
  {
    id: "jus",
    name: "Jus",
    icon: "GlassWater",
    items: [
      { id: "j1", name: "Jus orange", price: 15 },
      { id: "j2", name: "Jus avocat", price: 15 },
      { id: "j3", name: "Jus pomme", price: 13 },
      { id: "j4", name: "Jus banane", price: 13 },
      { id: "j5", name: "Jus fraise", price: 15 },
    ],
  },
  {
    id: "limonade",
    name: "Limonade",
    icon: "Wine",
    items: [
      { id: "l1", name: "Limonade", price: 10 },
    ],
  },
  {
    id: "omelettes",
    name: "Omelettes",
    icon: "Egg",
    items: [
      { id: "o1", name: "Omelette nature", price: 10 },
      { id: "o2", name: "Omelette fines herbes", price: 15 },
      { id: "o3", name: "Omelette oignon", price: 15 },
      { id: "o4", name: "Omelette tomate", price: 15 },
      { id: "o5", name: "Omelette fromage", price: 15 },
      { id: "o6", name: "Omelette khliaa", price: 15 },
      { id: "o7", name: "Omelette kachaire", price: 15 },
    ],
  },
  {
    id: "supplements",
    name: "Supplément",
    icon: "Plus",
    items: [
      { id: "su1", name: "Miel", price: 5 },
      { id: "su2", name: "L'huile d'olive", price: 5 },
      { id: "su3", name: "Amlou", price: 5 },
      { id: "su4", name: "Beurre", price: 5 },
      { id: "su5", name: "Jben", price: 5 },
      { id: "su6", name: "Olives", price: 5 },
    ],
  },
  {
    id: "traditionnel",
    name: "Traditionnel",
    icon: "Soup",
    items: [
      { id: "tr1", name: "Msemen", price: 5 },
      { id: "tr2", name: "Bissara", price: 10 },
    ],
  },
  {
    id: "tajine",
    name: "Tajine",
    icon: "Utensils",
    items: [
      { id: "tj1", name: "Poulet au citron", price: 30 },
      { id: "tj2", name: "Kefta", price: 30 },
    ],
  },
];

export const restaurantInfo = {
  name: "Espace Délice",
  tagline: "Café - Restaurant",
  whatsappNumber: "+212663584353",
  address: "Votre adresse ici",
  hours: "Ouvert tous les jours",
};
