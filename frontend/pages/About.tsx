"use client";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto pt-10 px-4">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-gray-400">We are a leading platform dedicated to providing innovative solutions for token management and trading.</p>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-400">To empower users with tools and resources to manage their tokens effectively.</p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Our Team</h2>
                    <p className="text-gray-400">Meet the talented individuals behind our platform.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
