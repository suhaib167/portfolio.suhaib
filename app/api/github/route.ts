import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type') || 'github';

  if (type === 'leetcode') {
    try {
      const username = process.env.LEETCODE_USERNAME || 'arjunmehta';
      const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query userProfile($username: String!) {
              matchedUser(username: $username) {
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
                profile {
                  ranking
                }
              }
            }
          `,
          variables: { username },
        }),
      });

      if (!response.ok) throw new Error('LeetCode API error');

      const json = await response.json();
      const stats = json.data?.matchedUser?.submitStats?.acSubmissionNum || [];
      const ranking = json.data?.matchedUser?.profile?.ranking || 0;

      return NextResponse.json({
        totalSolved: stats.reduce((acc: number, s: any) => acc + (s.count || 0), 0),
        easySolved: stats.find((s: any) => s.difficulty === 'Easy')?.count || 0,
        mediumSolved: stats.find((s: any) => s.difficulty === 'Medium')?.count || 0,
        hardSolved: stats.find((s: any) => s.difficulty === 'Hard')?.count || 0,
        ranking,
      });
    } catch {
      // Return mock data as fallback
      return NextResponse.json({
        totalSolved: 347,
        easySolved: 142,
        mediumSolved: 168,
        hardSolved: 37,
        ranking: 284562,
      });
    }
  }

  // GitHub stats (placeholder)
  return NextResponse.json({
    repositories: 32,
    stars: 186,
    followers: 214,
  });
}