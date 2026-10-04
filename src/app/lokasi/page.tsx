import { MapPin, Navigation } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { Button } from "@/components/ui/button";

export async function generateMetadata() {
  const { projectData } = await getSiteContent();
  return { title: `Lokasi - ${projectData.name}`, description: `Informasi lokasi dan aksesibilitas menuju ${projectData.name}.` };
}

const nearbyPlaces = [
  { name: "Pintu Tol TB Simatupang", time: "5 Menit" },
  { name: "Cilandak Town Square", time: "10 Menit" },
  { name: "High Scope School", time: "12 Menit" },
  { name: "RS Fatmawati", time: "15 Menit" },
  { name: "Kawasan CBD Sudirman", time: "30 Menit" },
];

export default async function LokasiPage() {
  const { projectData } = await getSiteContent();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Lokasi Strategis</h1>
          <p className="text-gray-600 text-lg">
            Terletak di pusat {projectData.location}, {projectData.name} menawarkan kemudahan akses ke berbagai fasilitas publik terbaik.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
              {/* Dummy Map Placeholder */}
              <iframe
                src={projectData.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="bg-accent p-8 rounded-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-white rounded-full text-secondary shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Alamat Lengkap</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {projectData.address}
                  </p>
                </div>
              </div>
              
              <Button className="w-full gap-2 text-lg h-12" asChild>
                <a href={projectData.mapUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-5 h-5" /> Buka di Google Maps
                </a>
              </Button>
            </div>

            <div className="border rounded-2xl p-8">
              <h3 className="font-serif font-bold text-2xl text-primary mb-6">Aksesibilitas</h3>
              <ul className="space-y-4">
                {nearbyPlaces.map((place, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-700 font-medium">{place.name}</span>
                    <span className="bg-secondary/10 text-secondary font-bold px-3 py-1 rounded-full text-sm">
                      {place.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
