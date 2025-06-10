'use client'

import Map from '../components/Map'

export default function Data() {

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Data Page</h1>
            <p className="text-lg">This is the data page.</p>

            <div className="w-[800px] h-[800px]">
                <Map />
            </div>
        </main>
    )
}