"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteContent } from "@/components/content-provider";
import { Button } from "@/components/ui/button";

export default function TipeRumahPage() {
  const { propertyTypes } = useSiteContent();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-accent/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Tipe Hunian</h1>
          <p className="text-gray-600 text-lg">
            Temukan desain rumah modern tropis yang sesuai dengan gaya hidup dan kebutuhan keluarga Anda di Grand Arunika.
          </p>
        </div>

        <div className="space-y-24">
          {propertyTypes.map((type, index) => (
            <motion.div 
              key={type.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                  <Image 
                    src={type.images[0]} 
                    alt={type.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full">
                    {type.status}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-serif font-bold text-primary">{type.name}</h2>
                <div className="text-3xl text-secondary font-bold">Mulai dari {type.price}</div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {type.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Luas Tanah</div>
                    <div className="font-bold text-primary text-xl">{type.landArea} m²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Luas Bangunan</div>
                    <div className="font-bold text-primary text-xl">{type.buildingArea} m²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Kamar Tidur</div>
                    <div className="font-bold text-primary text-xl">{type.bedrooms}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Kamar Mandi</div>
                    <div className="font-bold text-primary text-xl">{type.bathrooms}</div>
                  </div>
                </div>
                
                <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
                  <Link href={`/tipe-rumah/${type.slug}`}>
                    Lihat Detail {type.name}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
