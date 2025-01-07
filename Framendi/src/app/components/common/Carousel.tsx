import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPostNOtLoggedIn {
  title: string;
  excerpt: string;
  imageAlt: string;
  imageSrc: string;
}

const BlogPostNOtLoggedIn: BlogPostNOtLoggedIn[] = [
  {
    title: "Menu",
    excerpt: "Dishes and Drinks",
    imageAlt: "Wine and Pasta",
    imageSrc: "/photos/Dish1.png",
  },
  {
    title: "Your last orders",
    excerpt: "View your last orders",
    imageAlt: "Orders",
    imageSrc: "/photos/Dish1.png",
  },
  {
    title: "Register",
    excerpt: "Create an account",
    imageAlt: "Register",
    imageSrc: "/photos/Dish1.png",
  },
  {
    title: "Login to create an order",
    excerpt: "Login to create an order",
    imageAlt: "Login",
    imageSrc: "/photos/Dish1.png",
  },
];

// Gallery Images Array
const galleryImages = [
    "/public/Dish1.png",
    "/gallery/gallery2.jpg",
    "/gallery/gallery3.jpg",
    "/gallery/gallery4.jpg",
    "/gallery/gallery5.jpg",
    "/gallery/gallery6.jpg",
  ];

const HomePageNotLoggedIn: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-center text-3xl font-bold mb-6">
        Upplýsingar um all tengt stuðnings eða ?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {BlogPostNOtLoggedIn.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <div className="relative h-48">
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href="/older-orders">
      <button className="border-red-600 text-black-600 hover:text-gray-700">
        Take a look <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageNotLoggedIn;
