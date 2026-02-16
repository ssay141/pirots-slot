import './globals.css';

export const metadata = {
  title: 'Pirots - HTML5 Slot Machine',
  description: 'A pirate-themed slot machine game with cluster pays and cascading reels',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
