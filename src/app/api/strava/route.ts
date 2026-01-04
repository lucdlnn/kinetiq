import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;

    if (!code) {
        // Step 1: Redirect to Strava OAuth
        if (!clientId) return NextResponse.json({ error: "Missing STRAVA_CLIENT_ID" }, { status: 500 });

        const redirectUri = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/strava`;
        const scope = 'activity:read_all';
        const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

        return NextResponse.redirect(stravaAuthUrl);
    } else {
        // Step 2: Exchange code for token
        try {
            const tokenRes = await fetch('https://www.strava.com/oauth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: code,
                    grant_type: 'authorization_code'
                })
            });

            const data = await tokenRes.json();

            // In a real app, save 'data.access_token' and 'data.refresh_token' to DB associated with user.
            // For now, we'll redirect back to dashboard with a query param.

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard/settings?strava_connected=true`);

        } catch (e) {
            return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
        }
    }
}
