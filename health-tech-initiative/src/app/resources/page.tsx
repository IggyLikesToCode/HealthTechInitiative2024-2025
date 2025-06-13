import Link from "next/link";

export default function Resources() {
    return (
        <main className="w-full h-full min-h-96 flex flex-row justify-center mt-6 p-6">
            {/* Resources Tab */}
            <div className="w-1/2 max-w-[600px] h-full flex flex-col mr-6">
                <h1 className="font-bold text-3xl mb-4">Resources</h1>
                <div className="bg-secondary rounded-lg p-4 space-y-4">
                    <h2 className="font-bold text-xl mb-2">Testing</h2>
                    <div className="flex flex-col px-4 space-y-4">
                        <Link
                            href="https://www.epa.gov/lead/protect-your-family-sources-lead"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Find Lead Testing Kits
                        </Link>
                        <Link
                            href="https://www.cdc.gov/nceh/lead/faqs/lead-testing.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            How to Test Your Water
                        </Link>
                        <Link
                            href="https://www.epa.gov/lead/lead-testing-and-certification"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Certified Labs Near You
                        </Link>
                    </div>
                    <h2 className="font-bold text-xl mb-2">Health</h2>
                    <div className="flex flex-col px-4 space-y-4">
                        <Link
                            href="https://www.cdc.gov/nceh/lead/health-effects.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Health Effects of Lead
                        </Link>
                        <Link
                            href="https://www.cdc.gov/nceh/lead/prevention/default.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Protecting Children
                        </Link>
                        <Link
                            href="https://www.cdc.gov/nceh/lead/default.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            CDC Guidelines
                        </Link>
                    </div>
                    <h2 className="font-bold text-xl mb-2">Reliable Sources</h2>
                    <div className="flex flex-col px-4 space-y-4">
                        <Link
                            href="https://www.epa.gov/lead"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            EPA Lead Resources
                        </Link>
                        <Link
                            href="https://www.who.int/news-room/fact-sheets/detail/lead-poisoning-and-health"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            WHO on Lead Exposure
                        </Link>
                        <Link
                            href="https://www.ncbi.nlm.nih.gov/pmc/?term=lead+poisoning"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            NIH Articles
                        </Link>
                    </div>
                </div>
            </div>
            {/* News Tab */}
            {/* maybe CMS system (sanity.io) to simplify content? */}
            <div className="w-1/2 max-w-[600px] h-full flex flex-col">
                <h1 className="font-bold text-3xl mb-4">Recent News</h1>
                <div className="flex flex-col space-y-4">
                    <Article 
                        title="City Launches New Water Testing Initiative" 
                        author="John Doe"
                        date="April 10, 2025"
                        link="https://www.nytimes.com/2023/10/04/us/milwaukee-lead-pipes.html"
                    />
                    <Article 
                        title="Schools Push for Safer Drinking Water" 
                        author="Jane Smith"
                        date="April 8, 2025"
                        link="https://www.nbcnews.com/news/us-news/lead-water-schools-epa-rule-rcna110529"
                    />
                    <Article 
                        title="New Federal Guidelines on Lead Pipes" 
                        author="Mike Johnson"
                        date="April 5, 2025"
                        link="https://www.epa.gov/newsreleases/epa-announces-proposed-rule-remove-lead-pipes"
                    />
                </div>
                
            </div>
        </main>
    )
}

interface ArticleProps {
    title: string;
    author: string;
    date: string;
    link: string;
}

function Article({ title, author, date, link }: ArticleProps) {
    return (
        <Link href={link} target="_blank" className="w-full p-4 border-2 border-black rounded-lg">
            <h1 className="font-bold">{title}</h1>
            <p className="italic">by {author} · {date}</p>
        </Link>
    )
}