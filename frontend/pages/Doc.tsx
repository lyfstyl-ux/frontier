"use client";

const DocPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto pt-10 px-4">
                <h1 className="text-3xl font-bold mb-4">Documentation</h1>
                <p className="text-gray-400">Welcome to the documentation page. Here you will find all the resources and guides to help you understand and use our platform effectively.</p>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
                    <p className="text-gray-400">Learn how to set up your account and start using our services.</p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">API Reference</h2>
                    <p className="text-gray-400">Explore our API endpoints and their functionalities.</p>
                </div>
            </div>
        </div>
    );
};

export default DocPage;
