"use client"

export default function TestKits() {
    const handleSubmit = async (e: any) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("http://localhost:3001/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Your request has been sent successfully.");
          e.target.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (err) {
        console.error(err);
        alert("Server error. Try again later.");
      }
    };

    return (
        <main className="w-full h-full flex flex-col items-center mt-20">
            <h1 className="text-3xl font-bold mb-6">Request a Free Lead Test Kit</h1>
            <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-bold">Full Name</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold">Mailing Address</label>
                    <input
                        type="text"
                        name="address"
                        required
                        className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold">Reason for Request (optional)</label>
                    <textarea
                        name="reason"
                        rows={3}
                        className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit Report
                </button>
            </form>
        </main>
    )
}