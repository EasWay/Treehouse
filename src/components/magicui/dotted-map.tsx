import React, { useMemo } from 'react';
// @ts-ignore
import DottedMapCore from 'dotted-map';

export function DottedMap() {
  const svgMap = useMemo(() => {
    const map = new DottedMapCore({ height: 60, grid: 'diagonal' });

    // Pin for Accra, Ghana
    map.addPin({
      lat: 5.6037,
      lng: -0.1870,
      svgOptions: { color: '#B6915E', radius: 0.6 },
    });

    return map.getSVG({
      radius: 0.22,
      color: 'rgba(245, 241, 234, 0.15)', // ivory color with opacity
      shape: 'circle',
      backgroundColor: 'transparent',
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-screen opacity-70">
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`} className="w-[150%] md:w-full h-auto object-cover opacity-80" alt="World Map with Accra pinned" />
    </div>
  );
}
