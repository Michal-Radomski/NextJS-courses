// Types and interfaces

interface ObjectI {
  [key: string]: any;
}

interface PropertyI {
  deleteOne(): void;
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly: number;
    weekly: number;
    monthly: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserI {
  save(): void;
  id?: string;
  email: string;
  username: string;
  image: string;
  bookmarks: Schema.Types.ObjectId[] | any;
}

interface ViewportI {
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}

interface MessageI {
  createdAt: string | number | Date;
  _id: string;
  sender: string;
  recipient: string;
  property: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
}
