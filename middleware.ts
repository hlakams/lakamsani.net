// Next.js middleware (for context, this is used in a Nextra blog project)
import { NextRequest, NextResponse } from 'next/server';
const fs = require("fs");

// forwards declaration for call var caching
let robotsTXTCall: Promise<any>, modifiedRobotsTXTData: string;

export async function middleware(req: NextRequest) {      
    // generate the robots.txt if not cached
    if (req.nextUrl.pathname.startsWith('/robots.txt')) {
        const headers = new Headers();
        headers.set("Content-Type", "text/plain");
        
        // take a shot at using the Dark Visitors API
        try {
            modifiedRobotsTXTData = await getRobotsTXT()
        } catch (e) {
            // if that fails, we can use a static robots.txt
            console.log(e);
            modifiedRobotsTXTData = readFile("public/robots.txt")
        }

        // serve (hopefully cached) robots.txt
        return new NextResponse(
            modifiedRobotsTXTData,
            {
                status: 200,
                statusText: "OK",
                headers
            }
        );
    }
}

// note: this response needs to be cached!
async function getRobotsTXT(): Promise<any> {
    const url = 'https://api.darkvisitors.com/robots-txts';
    robotsTXTCall = fetch(url, {
        next: {
            revalidate: 43200
        },
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

// helper function to read static files for serving failback requests
const readFile = function (file: string) : string {
    return fs.readFileSync(file).toString();
};
