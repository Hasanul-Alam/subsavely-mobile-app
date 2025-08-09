export interface Subscription {
  id: string;
  name: string;
  image: string; // URL to image
  url: string; // Main website URL
  billingUrl: string; // URL to manage billing
}

export const subscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    image: "https://via.placeholder.com/150/E50914/FFFFFF?text=Netflix",
    url: "https://www.netflix.com/",
    billingUrl: "https://www.netflix.com/youraccount",
  },
  {
    id: "2",
    name: "Spotify Premium",
    image: "https://via.placeholder.com/150/1DB954/FFFFFF?text=Spotify",
    url: "https://www.spotify.com/",
    billingUrl: "https://www.spotify.com/account/overview/",
  },
  {
    id: "3",
    name: "Adobe Creative Cloud",
    image: "https://via.placeholder.com/150/FA0F00/FFFFFF?text=Adobe",
    url: "https://www.adobe.com/",
    billingUrl: "https://account.adobe.com/plans",
  },
  {
    id: "4",
    name: "Amazon Prime",
    image: "https://via.placeholder.com/150/00A8E0/FFFFFF?text=Prime",
    url: "https://www.amazon.com/prime",
    billingUrl: "https://www.amazon.com/gp/primecentral",
  },
  {
    id: "5",
    name: "Disney+",
    image: "https://via.placeholder.com/150/0066CC/FFFFFF?text=Disney%2B",
    url: "https://www.disneyplus.com/",
    billingUrl: "https://www.disneyplus.com/account",
  },
];
