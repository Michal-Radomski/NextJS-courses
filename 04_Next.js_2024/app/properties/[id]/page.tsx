import React from "react";
import { Params } from "next/dist/server/request/params";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyPage = async ({ params }: { params: Params }): Promise<JSX.Element> => {
  await connectDB();
  const propertyDoc = (await Property.findById(params.id).lean()) as unknown as PropertyI;
  console.log("propertyDoc:", propertyDoc);

  const property = convertToSerializableObject(propertyDoc) as PropertyI;

  if (!property) {
    return <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>;
  }

  return (
    <React.Fragment>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />

            {/* <!-- Sidebar --> */}
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </React.Fragment>
  );
};

export default PropertyPage;
