"use client";

import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { MapLib, Marker } from "react-map-gl";
import { setDefaults, fromAddress, GeocodeOptions } from "react-geocode";
import Image from "next/image";

import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

const PropertyMap = ({ property }: { property: PropertyI }): JSX.Element => {
  const [lat, setLat] = React.useState<number | null>(null);
  const [lng, setLng] = React.useState<number | null>(null);
  const [viewport, setViewport] = React.useState<ViewportI>({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [geocodeError, setGeocodeError] = React.useState<boolean>(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY as string,
    language: "en",
    region: "us",
  } as GeocodeOptions);

  React.useEffect(() => {
    const fetchCoords = async (): Promise<void> => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        //  Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    <React.Fragment>
      {!loading ? (
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
          mapLib={import("mapbox-gl") as unknown as MapLib<any>}
          initialViewState={{
            longitude: lng as number,
            latitude: lat as number,
            zoom: 15,
          }}
          style={{ width: "100%", height: 500 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker longitude={lng as number} latitude={lat as number} anchor="bottom">
            <Image src={pin} alt="location" width={40} height={40} />
          </Marker>
        </Map>
      ) : null}
    </React.Fragment>
  );
};

export default PropertyMap;
