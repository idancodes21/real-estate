export type ReviewStatus = "PENDING" | "PUBLISHED" | "DELETED";

export interface ReviewTag {
  label: string;
  tone: "positive" | "negative";
}

export interface Review {
  id: string; 
  name: string;
  avatar: string;
  joinedAt: string; 
  rating: number; 
  title: string;
  text: string;
  tags: ReviewTag[];
  status: ReviewStatus;
}

const good = (...labels: string[]): ReviewTag[] =>
  labels.map((label) => ({ label, tone: "positive" }));
const bad = (...labels: string[]): ReviewTag[] =>
  labels.map((label) => ({ label, tone: "negative" }));

const TEXT =
  "Josh, Lunar and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.";

type Seed = Omit<Review, "avatar">;

const seed: Seed[] = [
  { id: "C01234", name: "James Sullivan", joinedAt: "2022-04-25T12:42:00Z", rating: 5, title: "Friendly service", text: TEXT, tags: good("Excellent", "Great", "Best service"), status: "PENDING" },
  { id: "C01225", name: "Jakir Hussen", joinedAt: "2022-09-15T11:40:00Z", rating: 2, title: "Friendly service", text: TEXT, tags: bad("Bad service", "Unexpected"), status: "PENDING" },
  { id: "C01245", name: "Deborah Saragi", joinedAt: "2022-10-25T22:22:00Z", rating: 5, title: "Smooth process", text: TEXT, tags: good("Excellent", "Great", "Best service"), status: "PUBLISHED" },
  { id: "C01248", name: "Delwar Hussen", joinedAt: "2022-08-15T00:42:00Z", rating: 1.5, title: "Could be better", text: TEXT, tags: bad("Bad service", "Unexpected"), status: "PENDING" },
  { id: "C01287", name: "Jubed Ahmed", joinedAt: "2022-04-24T20:42:00Z", rating: 5, title: "Friendly service", text: TEXT, tags: good("Excellent", "Great", "Best service"), status: "PENDING" },
  { id: "C01290", name: "Maria Okafor", joinedAt: "2022-11-02T09:15:00Z", rating: 4.5, title: "Great communication", text: TEXT, tags: good("Great", "Responsive"), status: "PUBLISHED" },
  { id: "C01291", name: "Samuel Adeyemi", joinedAt: "2022-06-18T14:05:00Z", rating: 3, title: "Average experience", text: TEXT, tags: good("Fair") , status: "PENDING" },
  { id: "C01295", name: "Chen Wei", joinedAt: "2022-07-09T16:30:00Z", rating: 1, title: "Unexpected delays", text: TEXT, tags: bad("Late", "Unexpected"), status: "DELETED" },
  { id: "C01301", name: "Priya Nair", joinedAt: "2023-01-12T10:10:00Z", rating: 5, title: "Smooth process", text: TEXT, tags: good("Excellent", "Best service"), status: "PUBLISHED" },
  { id: "C01305", name: "Tunde Bakare", joinedAt: "2023-02-03T18:45:00Z", rating: 2.5, title: "Could be better", text: TEXT, tags: bad("Bad service"), status: "PENDING" },
  { id: "C01310", name: "Hannah Weber", joinedAt: "2023-03-21T08:20:00Z", rating: 4, title: "Friendly service", text: TEXT, tags: good("Great", "Friendly"), status: "PENDING" },
  { id: "C01312", name: "Omar Farouk", joinedAt: "2023-04-07T13:55:00Z", rating: 1, title: "Unexpected delays", text: TEXT, tags: bad("Late", "Bad service"), status: "DELETED" },
];

// 5 avatar photos in /public/reviewers (1.jpg to 5.jpg) cover all 12 reviews
export const reviews: Review[] = seed.map((review, index) => ({
  ...review,
  avatar: `/reviewers/${(index % 5) + 1}.png`,
}));