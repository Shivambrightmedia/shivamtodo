import LeetCodeClient from './LeetCodeClient';

export const metadata = {
  title: 'LeetCode - Shivam',
  description: 'Track and practice LeetCode problems categorized by Recursion and Backtracking.',
  alternates: {
    canonical: '/leetcode',
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LeetCode Practice Tracker",
    "applicationCategory": "EducationalApplication"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LeetCodeClient />
    </>
  );
}
