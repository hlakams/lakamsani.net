import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.match('/((?!api|_next/static|_next/image|favicon.ico).*)')) {
        await sendAgentAnalytics(req);
    }

    if (req.nextUrl.pathname.startsWith('/robots.txt')) {
        const headers = new Headers();
        headers.set("Content-Type", "text/plain");
        
        return new NextResponse(
            await getRobotsTXT(),
            {
                status: 200,
                statusText: "OK",
                headers
            }
        );
    }
}

async function sendAgentAnalytics(req: NextRequest): Promise<any> {
    const url = 'https://api.darkvisitors.com/robots-txts';
    const agentAnalyticsCall = fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + process.env.DARK_VISITORS_API_KEY,
        },
        body: JSON.stringify({
            request_path: req.nextUrl.pathname,
            request_method: req.method,
            request_headers: req.headers
        })
    })
    return agentAnalyticsCall
}

async function getRobotsTXT(): Promise<any> {
    const url = 'https://api.darkvisitors.com/robots-txts';
    const robotsTXTCall = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + process.env.DARK_VISITORS_API_KEY,
        },
        body: JSON.stringify({
            agent_types: [
                "AI Assistant",
                "AI Data Scraper",
                "AI Search Crawler",
                "Undocumented AI Agent"
            ],
            disallow: "/"
        })
    })
    .then((response) => response.text())
    .then(function(data) {return data;
    });

    return robotsTXTCall;
} 

export const config = {
    matcher: '/robots.txt',
}