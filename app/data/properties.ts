export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  area: number; 
  image: string; 
}

export const properties: Property[] = [
  { id: 1, title: "Metro Jayakarta Hotel & Spa", location: "North Carolina, USA", price: 7400, beds: 4, area: 28, image: "/property-1.png" },
  { id: 2, title: "Metro Jayakarta Hotel & Spa", location: "North Carolina, USA", price: 7400, beds: 4, area: 28, image: "/property-2.png" },
  { id: 3, title: "Star Sun Hotel & Apartment", location: "Condong City, USA", price: 8500, beds: 6, area: 29, image: "/property-3.png" },
  { id: 4, title: "Lotus Apy Hotel & Apartment", location: "Margoluwih Caloriya, USA", price: 7900, beds: 3, area: 25, image: "/property-4.png" },
  { id: 5, title: "Lavender Apartment", location: "North Carolina, USA", price: 9000, beds: 3, area: 20, image: "/property-5.png" },
  { id: 6, title: "Star Sun Hotel & Apartment", location: "North Carolina, USA", price: 4800, beds: 5, area: 28, image: "/property-6.png" },
  { id: 7, title: "Almander Hotel & Apartment", location: "Suryodiningratan, UK", price: 7400, beds: 2, area: 22, image: "/property-7.png" },
  { id: 8, title: "Almander Hotel & Apartment", location: "Suryodiningratan, UK", price: 6500, beds: 5, area: 26, image: "/property-8.png" },
  { id: 9, title: "Metro Jayakarta Hotel & Spa", location: "North Carolina, USA", price: 8100, beds: 4, area: 28, image: "/property-9.png" },
  { id: 10, title: "Metro Jayakarta Hotel & Spa", location: "North Carolina, USA", price: 5800, beds: 4, area: 28, image: "/property-10.png" },
];

export async function getLatestProperties(limit = 8) {
  return properties.slice(0, limit);
}