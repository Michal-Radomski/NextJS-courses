import FeaturedPropertyCard from "@/components/FeaturedPropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const FeaturedProperties = async (): Promise<JSX.Element> => {
  await connectDB();

  const properties = (await Property.find({
    is_featured: true,
  }).lean()) as unknown as PropertyI[];

  return properties.length > 0 ? (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property: PropertyI) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : (
    (null as any)
  );
};

export default FeaturedProperties;