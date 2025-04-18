import React from 'react'
import HeroSection from './HeroSection';
import CompanyForm from './CompanyForm';

const CompanyRegistration = () => {

    return (
        <>
            <div className="min-h-screen py-6 sm:py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <a
                        href="/our-services"
                        className="flex items-center text-blue-800 hover:text-blue-800 text-sm sm:text-base mb-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Services
                    </a>

                    <HeroSection />
                    <CompanyForm />
                </div>
            </div>
        </>
    )
}

export default CompanyRegistration
