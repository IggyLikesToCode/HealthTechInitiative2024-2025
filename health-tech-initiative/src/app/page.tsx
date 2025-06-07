import Image from "next/image";
import Link from "next/link";

//icons
import { UserRound } from 'lucide-react';
import { House } from 'lucide-react';
import { TriangleAlert } from 'lucide-react';

export default function HomePage() {

  const hotspots = [
    { top: "42%", left: "51%" },
    { top: "58%", left: "63.5%" },
    { top: "40%", left: "30%" },
    { top: "50.5%", left: "70.3%" },
    { top: "60%", left: "40%" },
    { top: "26%", left: "26%" },
    { top: "26%", left: "83%" },
    { top: "60%", left: "69%" },
    { top: "65%", left: "54%" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

      {/* main top header (title + map) */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center py-10 px-4">

        {/* Left side: Title and buttons */}
        <div className="w-full md:w-1/2 max-w-[900px] flex flex-col py-2 md:p-2">
          <h3 className="font-semibold text-text text-5xl p-2">
            Tracking Lead Contamination, Protecting Communities
          </h3>
          <h6 className="text-text text-xl p-2">
            A nationwide open-source database to report and visualize lead contamination data.
          </h6>

          <div className="flex space-x-2 p-2">
            <Link className="bg-primary hover:bg-primary-hover transition text-white text-sm rounded p-2 px-4 mt-2" href="/report">
              Report Contamination
            </Link>

            <Link className="bg-gray-200 hover:bg-gray-300 transition text-text text-sm rounded p-2 px-4 mt-2" href="/report">
              View Data
            </Link>
          </div>
        </div>

        {/* Right side: Map with hotspots */}
        <div className="w-full md:w-[500px] bg-secondary relative flex items-center justify-center rounded-lg p-2">
          <Image
            src="/images/usmap.png"
            alt="Lead Contamination Map"
            width={800}
            height={800}
            className="relative w-full h-auto"
          />

          <div className="absolute w-full h-full inset-0 pointer-events-none">
            {hotspots.map((hotspot, index) => (
              <div key={index}>
                <div
                  className="absolute bg-[#bfdbfe] rounded-full w-1/24 aspect-square"
                  style={{
                    top: hotspot.top,
                    left: hotspot.left,
                    transform: "translate(-50%, -50%)",
                    animation: "pulse 2s infinite",
                    animationDelay: `${index * 0.2}s`
                  }}
                />
                <div
                  className="absolute bg-[#1d4ed8] rounded-full w-1/36 aspect-square"
                  style={{
                    top: hotspot.top,
                    left: hotspot.left,
                    transform: "translate(-50%, -50%)"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* stats banner */}
      <div className="w-full flex justify-center md:py-10 px-4 md:px-8 rounded-lg">
        <div className="w-full bg-secondary flex items-center justify-around p-4 md:p-6 rounded-lg">
          <div className="flex flex-col items-center">
            <UserRound className="text-primary mb-2" size={64} />
            <p className="font-bold text-primary text-xl md:text-3xl">2.3M+</p>
            <p className="text-primary text-sm md:text-md">people affected</p>
          </div>
          <div className="flex flex-col items-center">
            <House className="text-primary mb-2" size={64} />
            <p className="font-bold text-primary text-xl md:text-3xl">1,250+</p>
            <p className="text-primary text-sm md:text-md">cities reported</p>
          </div>
          <div className="flex flex-col items-center">
            <TriangleAlert className="text-primary mb-2" size={64} />
            <p className="font-bold text-primary text-xl md:text-3xl">780</p>
            <p className="text-primary text-sm md:text-md">active warnings</p>
          </div>
        </div>
      </div>

      {/* mission statement */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full p-10">
        <Image
          src="/images/waterdrop.svg"
          alt="waterdrop graphic"
          width={300}
          height={300}
          className="bg-secondary rounded-xl p-8"
        />

        <div className="w-full md:w-1/2 flex flex-col items-start max-w-[600px] p-4 md:px-14 text-center md:text-left">
          <h3 className="text-text w-full font-bold text-5xl p-2">
            Our Mission
          </h3>
          <h6 className="text-text text-xl p-2">
            Empowering every community with data to uncover and eliminate lead exposure risks.
          </h6>
          <h6 className="text-text text-xl p-2">
            We believe no child should grow up drinking contaminated water. Our mission is to build the most comprehensive, accessible, and transparent platform for lead reporting in the United States.
          </h6>
        </div>
      </div>

      {/* partners */}
      <div className="w-full flex flex-col items-start p-10">
        <h3 className="text-text font-bold text-5xl p-2">
          Our Partners
        </h3>
        <h3 className="text-text text-xl p-2">
          Thank you to our amazing sponsors and partners who help keep Health
          Tech Initiative running!
        </h3>

        <div className="flex flex-row items-start justify-center py-5">
          <Image 
            src="/images/stapleshighschool.png"
            alt="Staples High School Logo"
            width={150}
            height={150}
          />
        </div>
      </div>

      <footer
        className="w-full text-center p-[20px] border-t-2 border-gray-300 text-gray-400"
      >
        &copy; 2025 Health Tech Initiative. All rights reserved.
      </footer>

    </main>
  );
}
