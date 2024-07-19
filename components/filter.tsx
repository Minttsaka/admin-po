import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

interface Filters {
  category: string[];
  price: { min: number; max: number };
}

const Component: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    category: [],
    price: { min: 0, max: Infinity },
  });

  const products: Product[] = [
    {
      id: 1,
      image: '/placeholder.svg',
      name: 'Stylish Sunglasses',
      description: 'UV protection',
      price: 29.99,
    },
    {
      id: 2,
      image: '/placeholder.svg',
      name: 'Leather Crossbody Bag',
      description: 'Stylish and practical',
      price: 49.99,
    },
    {
      id: 3,
      image: '/placeholder.svg',
      name: 'Wireless Headphones',
      description: 'High-quality sound',
      price: 79.99,
    },
    {
      id: 4,
      image: '/placeholder.svg',
      name: 'Classic Wristwatch',
      description: 'Timeless design',
      price: 59.99,
    },
    {
      id: 5,
      image: '/placeholder.svg',
      name: 'Beach Bliss Flip-Flops',
      description: 'Comfortable Footwear',
      price: 19.99,
    },
    {
      id: 6,
      image: '/placeholder.svg',
      name: 'Sunset Shades Sunglasses',
      description: 'UV Protection Eyewear',
      price: 29.99,
    },
  ];

  const handleFilterChange = (type: 'category' | 'price', value: string | { min: number; max: number }) => {
    if (type === 'category') {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        category: prevFilters.category.includes(value as string)
          ? prevFilters.category.filter((item) => item !== value)
          : [...prevFilters.category, value as string],
      }));
    } else if (type === 'price' && typeof value === 'object') {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        price: value as { min: number; max: number },
      }));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product:Product) => {
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.name)) {
        return false;
      }
      if (product.price < selectedFilters.price.min || product.price > selectedFilters.price.max) {
        return false;
      }
      return true;
    });
  }, [selectedFilters]);

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              {/* Replace with actual icons or text */}
              <span className="">Acme Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              {/* Replace with actual icons */}
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <div className="grid gap-4 px-4">
              <h3 className="text-base font-medium">Filters</h3>
              <Accordion type="single" collapsible className="w-full" defaultValue="category">
                <AccordionItem value="category">
                  <AccordionTrigger className="text-base">Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox onCheckedChange={() => handleFilterChange('category', 'Accessories')} />
                        Accessories
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox onCheckedChange={() => handleFilterChange('category', 'Clothing')} />
                        Clothing
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox onCheckedChange={() => handleFilterChange('category', 'Electronics')} />
                        Electronics
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox onCheckedChange={() => handleFilterChange('category', 'Home')} />
                        Home
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base">Price</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price-min" className="text-sm">
                          Min Price
                        </Label>
                        <Input
                          id="price-min"
                          type="number"
                          min="0"
                          value={selectedFilters.price.min.toString()}
                          onChange={(e) =>
                            handleFilterChange('price', {
                              min: parseFloat(e.target.value),
                              max: selectedFilters.price.max,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price-max" className="text-sm">
                          Max Price
                        </Label>
                        <Input
                          id="price-max"
                          type="number"
                          min="0"
                          value={selectedFilters.price.max.toString()}
                          onChange={(e) =>
                            handleFilterChange('price', {
                              min: selectedFilters.price.min,
                              max: parseFloat(e.target.value),
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden" prefetch={false}>
            {/* Replace with actual icons */}
            <span className="sr-only">Home</span>
          </Link>
          <h1 className="font-semibold text-lg md:text-xl">Product Dashboard</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative overflow-hidden rounded-lg group">
                <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                  <span className="sr-only">View {product.name}</span>
                </Link>
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
                />
                <div className="p-4 bg-background">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold">${product.price.toFixed(2)}</h4>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Component;
