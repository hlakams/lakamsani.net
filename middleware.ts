import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
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

async function getRobotsTXT() {
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