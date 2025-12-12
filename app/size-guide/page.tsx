'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function SizeGuidePage() {
  const sizeCharts = {
    shirts: {
      title: 'Shirts',
      measurements: ['S', 'M', 'L', 'XL', 'XXL'],
      data: [
        { label: 'Chest (inches)', values: ['36', '38', '40', '42', '44'] },
        { label: 'Chest (cm)', values: ['91', '97', '102', '107', '112'] },
        { label: 'Length (inches)', values: ['28', '29', '30', '31', '32'] },
        { label: 'Length (cm)', values: ['71', '74', '76', '79', '81'] },
        { label: 'Shoulder (inches)', values: ['16', '17', '18', '19', '20'] },
        { label: 'Shoulder (cm)', values: ['41', '43', '46', '48', '51'] },
      ],
    },
    pants: {
      title: 'Pants / Trousers',
      measurements: ['S', 'M', 'L', 'XL', 'XXL'],
      data: [
        { label: 'Waist (inches)', values: ['30', '32', '34', '36', '38'] },
        { label: 'Waist (cm)', values: ['76', '81', '86', '91', '97'] },
        { label: 'Hip (inches)', values: ['36', '38', '40', '42', '44'] },
        { label: 'Hip (cm)', values: ['91', '97', '102', '107', '112'] },
        { label: 'Inseam (inches)', values: ['30', '31', '32', '33', '34'] },
        { label: 'Inseam (cm)', values: ['76', '79', '81', '84', '86'] },
      ],
    },
    shorts: {
      title: 'Shorts',
      measurements: ['S', 'M', 'L', 'XL', 'XXL'],
      data: [
        { label: 'Waist (inches)', values: ['30', '32', '34', '36', '38'] },
        { label: 'Waist (cm)', values: ['76', '81', '86', '91', '97'] },
        { label: 'Hip (inches)', values: ['36', '38', '40', '42', '44'] },
        { label: 'Hip (cm)', values: ['91', '97', '102', '107', '112'] },
        { label: 'Length (inches)', values: ['9', '10', '11', '12', '13'] },
        { label: 'Length (cm)', values: ['23', '25', '28', '30', '33'] },
      ],
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Clothing Store */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80&auto=format&fit=crop)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-900/50 via-black/60 to-slate-900/50" />
          </div>
        </div>
        
        {/* Gradient Overlay - Lighter for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-black/40 to-slate-900/30" />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Animated Circles */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#1e40af]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-[#1e40af]/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-6xl mx-auto space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              SIZE GUIDE
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Find your perfect fit. Use the measurements below to determine your size. All measurements are in inches and centimeters.
            </p>
          </div>

          {/* Size Charts with Image on Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Size Chart Image - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border-2 border-slate-700/50 backdrop-blur-sm shadow-2xl overflow-hidden sticky top-24">
                <CardContent className="p-0">
                  <div className="relative w-full h-auto min-h-[400px] md:min-h-[600px] bg-slate-900/50">
                    <Image
                      src="/Size chart.jpg"
                      alt="Clothing Size Chart"
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Size Charts Tables - Right Side */}
            <div className="lg:col-span-2 space-y-8">
            {Object.entries(sizeCharts).map(([key, chart], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 + index * 0.05 }}
              >
                  <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border-2 border-slate-700/50 backdrop-blur-sm shadow-2xl hover:border-[#1e40af]/50 transition-all duration-200">
                  <CardHeader className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="h-1 w-12 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-full" />
                      {chart.title}
                      <div className="h-1 flex-1 bg-gradient-to-r from-[#1e40af] to-transparent rounded-full" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto rounded-lg">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80">
                            <th className="pb-4 pt-4 pl-6 pr-6 text-sm font-bold text-white uppercase tracking-wider">
                              Measurement
                            </th>
                            {chart.measurements.map((size) => (
                              <th 
                                key={size} 
                                className="pb-4 pt-4 px-5 text-sm font-bold text-white text-center bg-gradient-to-b from-[#1e40af]/20 to-transparent border-l border-slate-700/50 first:border-l-0"
                              >
                                <div className="flex flex-col items-center gap-1">
                                  <span className="text-lg">{size}</span>
                                  <div className="h-0.5 w-8 bg-[#1e40af] rounded-full" />
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {chart.data.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className="border-b border-slate-800/50 hover:bg-gradient-to-r hover:from-slate-800/30 hover:to-slate-700/20 transition-all duration-150 group"
                            >
                              <td className="py-4 pl-6 pr-6 text-sm text-white font-semibold bg-slate-900/30 group-hover:bg-slate-800/40 transition-colors">
                                {row.label}
                              </td>
                              {row.values.map((value, valueIndex) => (
                                <td 
                                  key={valueIndex} 
                                  className="py-4 px-5 text-sm text-white/90 text-center font-medium border-l border-slate-800/30 first:border-l-0 group-hover:text-white transition-colors"
                                >
                                  <span className="inline-block px-3 py-1 rounded-md bg-slate-800/40 group-hover:bg-[#1e40af]/20 group-hover:scale-105 transition-all duration-150">
                                    {value}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </div>
          </div>

          {/* How to Measure Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
          >
            <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border-2 border-slate-700/50 backdrop-blur-sm shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50">
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-full" />
                  How to Measure
                  <div className="h-1 flex-1 bg-gradient-to-r from-[#1e40af] to-transparent rounded-full" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      <h3 className="font-bold text-white text-lg">For Shirts</h3>
                    </div>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#1e40af] mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Chest:</strong> Measure around the fullest part of your chest, under your arms.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#1e40af] mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Length:</strong> Measure from the top of the shoulder to the bottom hem.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#1e40af] mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Shoulder:</strong> Measure from shoulder seam to shoulder seam.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">P</span>
                      </div>
                      <h3 className="font-bold text-white text-lg">For Pants & Shorts</h3>
                    </div>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#1e40af] mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Waist:</strong> Measure around your natural waistline.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#1e40af] mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Hip:</strong> Measure around the fullest part of your hips.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#1e40af] mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Inseam:</strong> Measure from the crotch to the bottom of the leg (for pants).
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#1e40af] mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Length:</strong> Measure from the waist to the bottom hem (for shorts).
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="text-center"
          >
            <p className="text-sm text-white/60">
              If you're between sizes, we recommend sizing up for a more comfortable fit.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

