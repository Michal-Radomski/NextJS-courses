import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { SearchParams } from "next/dist/server/request/search-params";

import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import React from "react";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}: {
  searchParams: SearchParams;
}): Promise<JSX.Element> => {
  await connectDB();

  const locationPattern = new RegExp(location as string, "i");

  // Match location pattern against database fields
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
    type: "" as unknown,
  };

  // Only check for property if its not 'All'
  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType as string, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults) as PropertyI[];

  return (
    <React.Fragment>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: PropertyI) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};
export default SearchResultsPage;
