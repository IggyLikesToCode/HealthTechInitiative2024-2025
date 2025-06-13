'use client'

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

export default function Data() {

    return (
        <main className="w-full h-full flex flex-col items-center mt-20">
            <h1 className="text-3xl font-bold mb-4">Data Page</h1>
            <p className="text-lg max-w-[800px] text-center">
                This page displays a map with various data layers. You can switch between different data types to visualize their distribution across the United States.
            </p>

            <Map />
        </main>
    )
}