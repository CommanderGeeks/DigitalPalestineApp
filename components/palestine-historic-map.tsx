"use client"

import { useState } from "react"
import clsx from "clsx"
import RegionDetailMap from "./region-detail-map"
import { RegionKey, RegionMeta } from "../data/types"

const REGIONS: Record<RegionKey, RegionMeta> = {
  safad: { title: "Safad", blurb: "Hill-country district famed for mysticism & olives." },
  acre: { title: "Acre", blurb: "Coastal stronghold and historic port." },
  haifa: { title: "Haifa", blurb: "Bay-side industrial hub and cultural mosaic." },
  tiberias: { title: "Tiberias", blurb: "Sea-of-Galilee shore, healing hot springs." },
  nazareth: { title: "Nazareth", blurb: "Galilee's largest Arab city, cradle of crafts." },
  baysan: { title: "Baysan", blurb: "Fertile Jordan Valley bread-basket." },
  jenin: { title: "Jenin", blurb: "Northern gateway, olive groves & markets." },
  nablus: { title: "Nablus", blurb: "Ancient Sychar—soap, sweets & Samaritan peaks." },
  tulkarm: { title: "Tulkarm", blurb: "Agricultural heartland along the coastal plain." },
  jaffa: { title: "Jaffa", blurb: "Orange-scented port, once the economic engine." },
  alramla: { title: "al-Ramla", blurb: "White-domed crossroads between hills & sea." },
  ramallah: { title: "Ramallah", blurb: "Hill-town of culture, vineyards and breeze." },
  jerusalem: { title: "Jerusalem", blurb: "Sacred mosaic of faiths, stone & story." },
  gaza: { title: "Gaza", blurb: "Maritime entrepôt, poets' and traders' haunt." },
  hebron: { title: "Hebron", blurb: "Vine-covered hills, glass-blowers, shrine of ages." },
  beersheba: { title: "Beersheba", blurb: "Negev hub—gateway to desert caravans." }
}



export default function PalestineHistoricMap() {
  const [hoveredRegion, setHoveredRegion] = useState<RegionKey | null>(null)
  const [nazarethDetailOpen, setNazarethDetailOpen] = useState(false)
  const [tooltip, setTooltip] = useState<{ region: RegionMeta, x: number, y: number } | null>(null)
  const [activeDetailRegion, setActiveDetailRegion] = useState<RegionKey | null>(null)

  const handleRegionHover = (regionKey: RegionKey | null, event?: React.MouseEvent) => {
  setHoveredRegion(regionKey)
  
  if (regionKey && event && REGIONS[regionKey]) {
    // Get the map container position
    const mapContainer = event.currentTarget.closest('.relative')
    const containerRect = mapContainer?.getBoundingClientRect()
    
    if (containerRect) {
      // Position relative to the map container
      const relativeX = event.clientX - containerRect.left
      const relativeY = event.clientY - containerRect.top
      
      setTooltip({
        region: REGIONS[regionKey],
        x: relativeX + 15, // 15px to the right within the container
        y: relativeY - 10  // 10px above within the container
      })
    }
  } else {
    setTooltip(null)
  }
}

  const handleRegionClick = (regionKey: RegionKey) => {
    console.log("Clicked region:", regionKey)
    console.log(`Opening ${regionKey} detail`)
    setActiveDetailRegion(regionKey)
  }
  

  const getFillColor = (regionKey: RegionKey) => {
    if (hoveredRegion === regionKey) {
      return "rgba(220, 38, 38, 0.7)" // Red on hover
    }
    return "rgba(34, 197, 94, 0.5)" // Green default
  }

  const getStrokeColor = (regionKey: RegionKey) => {
    if (hoveredRegion === regionKey) {
      return "#ffffff"
    }
    return "#000000"
  }

  return (
    <>
      <div className="relative">
        <svg width="50%" height="auto" viewBox="0 0 336 940" className="max-w-lg mx-auto">
          <rect width="336" height="940" fill="transparent"/>
          <g id="PalestineMap">
            viewBox="0 0 336 940"
        className="w-full max-w-md select-none"
        <path
          id="safad"
          d="M306.5 2L309 8.5L316 11.5L321.5 8.5L326 10L331 8.5L334.5 30.5L332.5 38V48L323 56.5L321.5 91L332.5 101V106.5L324.5 110L312 112H309L306.5 108H302.5L293.5 117.5L289.5 115.5L286.5 112L274.5 110L273 101L274.5 96L272 93L270.5 82H267L261.5 85L254.5 83.5V76.5L256.5 68.5V63.5L267 60.5L274.5 56.5L280 51H289.5L295 44L296.5 27L306.5 2Z"
          stroke={getStrokeColor("safad")}
          fill={getFillColor("safad")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("safad", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("safad")}
        />
        <path
          id="acre"
          d="M203.5 58.5L198.5 66L192.5 68.5V77.5L188.5 88.5L190 106.5H198.5L202 110L206.5 122.5L211 129L224 130.5L227.5 134.5L231 133L232 127L236.5 125L243.5 127L245 134.5L248 142H252L256 137L260 134.5H264L268.5 137L270 127L266.5 122.5L264 116.5L265.5 112L268.5 110H274.5L272 102L274.5 95.5L272 93.5L270 82H266.5L261.5 85.5L254.5 83.5V76L256 68.5V63.5L248 51.5H236.5L220.5 58.5H203.5Z"
          stroke={getStrokeColor("acre")}
          fill={getFillColor("acre")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("acre", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("acre")}
        />
        <path
          id="tiberias"
          d="M270.5 127L269 137.5V145L264 150.5L265 155.5L268 159.5L276 167L277 178H294C295.6 178 298.667 178.667 300 179L306.5 185.5L313.5 182.5L320 175.5L321 168L316.5 164.5L312 158.5L316.5 154.5L324.5 153L328.5 145L332.5 142.5V137.5L328.5 136L325.5 132.5L331 124L332.5 106.5L325.5 110.5L309 112.5L306.5 108.5H302L293 117L287 112.5L274.5 110.5H269L266 112.5L264 117L270.5 127Z"
          stroke={getStrokeColor("tiberias")}
          fill={getFillColor("tiberias")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("tiberias", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("tiberias")}
        />
        <path
          id="haifa"
          d="M190.5 115.5V107H199L202 110.5L207 122L210.5 128.5L225 131L227 134L230 145.5L225 150.5L223 160.5L216 167L212 175.5L213.5 182.5H225L230 185V190.5L220 192.5V197L209 195.5L207 202.5L202 207.5V214.5L207 218V222L203.5 224.5H192.5L186.5 226.5L182 234.5H174L170 237.5L162.5 244.5L152.5 247.5H138V241.5L142.5 232.5L146 218L147.5 202.5L152.5 189.5L156 173.5C156.333 169.167 157.2 160.2 158 159C159 157.5 157.5 143.5 158 142C158.4 140.8 159.5 136.167 160 134L162.5 128.5H170L176 132.5L182 128.5L186.5 122L190.5 115.5Z"
          stroke={getStrokeColor("haifa")}
          fill={getFillColor("haifa")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("haifa", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("haifa")}
        />
        <path
          id="nazareth"
          d="M230 133.5L227 135L229.5 146.5L225 151L222.5 161.5L216 167L212 176L213.5 183H225L229.5 185.5L231 191L238.5 195L245.5 197.5L253 195L259 193L264 195L272 192V187.5L268.5 184.5V180L270.5 176L277 177.5L275.5 167L265.5 156.5L264 150L268.5 145V137L264 135H259L256 137L251.5 142H248L243 127L236 125L232 127L230 133.5Z"
          stroke={getStrokeColor("nazareth")}
          fill={getFillColor("nazareth")}
          className="cursor-pointer transition-all duration-200 hover:stroke-2"
          onMouseEnter={(e) => handleRegionHover("nazareth", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("nazareth")}
        />
        <path
          id="baysan"
          d="M313.5 183L307 185.5L300 179L295 177.5H277.5L270.5 176L269 180.5V185.5L272 187.5V192L263.5 195L259.5 201L258 205L265 208.5L267.5 214.5L277.5 216.5L282 220.5L284.5 226V236.5L290.5 242L297.5 246L303 243L313.5 242V226V214.5L319 201V194L313.5 189.5V183Z"
          stroke={getStrokeColor("baysan")}
          fill={getFillColor("baysan")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("baysan", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("baysan")}
        />
        <path
          id="jenin"
          d="M196.5 229.5V225H203L207.5 222.5L208.5 218L202 215L203 207L207.5 202.5L209.5 196L220 197V193.5L230 190.5L246.5 197L258.5 193.5L263.5 196L258.5 205L265.5 209L268 214.5L277 217L282 221L285 226.5L283.5 236.5L276 238L277 245.5L270 248.5L268 253H257L254 256.5L254.5 267L252.5 269.5H248L243.5 267H239.5L235.5 272H230L224 265H220L216 260H211L205 255.5V239L196.5 229.5Z"
          stroke={getStrokeColor("jenin")}
          fill={getFillColor("jenin")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("jenin", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("jenin")}
        />
        <path
          id="tulkarm"
          d="M135.5 261L138.5 247.5H154L163.5 243.5L175 234.5H182.5L187 226.5L192.5 225.5H197V230L205.5 239.5V256.5L211.5 259.5H217L219.5 265.5H213L210 268.5L213 273H218L219.5 277.5L213 283.5L210 293H202.5V301.5L197 309L188.5 315.5H181L178 323H169.5V318.5L167 316.5L159 315.5L163.5 313V308L160.5 300L144 301.5L142 297L138.5 291.5L130 289L132.5 275L135.5 261Z"
          stroke={getStrokeColor("tulkarm")}
          fill={getFillColor("tulkarm")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("tulkarm", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("tulkarm")}
        />
        <path
          id="jaffa"
          d="M126 306.5L130 289.5L139 291.5L144.5 300.5H161L163.5 308V313.5L158.5 316H167L169.5 318.5L168.5 323L162.5 327L158.5 333L162.5 338L169.5 340L168.5 345.5L167 351.5L163.5 358L154.5 351.5L147.5 354V363.5L144.5 362L142 356L136 354L130 358L128 351.5L120 348L112.5 345.5L116 339L121.5 323L126 306.5Z"
          stroke={getStrokeColor("jaffa")}
          fill={getFillColor("jaffa")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("jaffa", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("jaffa")}
        />
        <path
          id="nablus"
          d="M304 242.5H314L318 249.5L320 257L318 269L316 278L311 289L309 300.5L310 310L318 317L316 325L311 329L309 335L311 339.5L318 342.5L316 348H311L300 349L295.5 346H289L280.5 348L274.5 352L272 350L274.5 342.5H270.5H265L263 346H256.5L255 344L253.5 337L250.5 333.5L243 331.5H231L228 337H224L216 333.5L214 329L205 331.5L198 337H191.5L186.5 333.5L177 335V329L178 323L181.5 315H189L198 309L203 302V292.5H210L212.5 283L219 278L217.5 273L212.5 272L210 267.5L214 264.5H224L229.5 272H236L240.5 267.5H243L247 270L253.5 269L255 267.5L253.5 257L256.5 253.5H268.5L270.5 248L276.5 246V238.5L284 236.5L299 246L304 242.5Z"
          stroke={getStrokeColor("nablus")}
          fill={getFillColor("nablus")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("nablus", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("nablus")}
        />
        <path
          id="ramallah"
          d="M190.5 343.5L191.5 337.5H198.5L206 331.5L214.5 329L216 333.5L224 337.5H228L231 331.5H243.5L251 333.5L254 337.5V343.5L256.5 346H263.5L265 342L274 343.5L271.5 350.5L274 352.5L270 360V368L274 376V383.5L271.5 388.5L262 390.5L256.5 387L251 381H242L234 380H228H224L225 385.5L219.5 383.5H211.5H203.5L200.5 388.5L195 392L190.5 387L188.5 381L190.5 373.5L200.5 368V362L196.5 356L190.5 350.5V343.5Z"
          stroke={getStrokeColor("ramallah")}
          fill={getFillColor("ramallah")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("ramallah", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("ramallah")}
        />
        <path
          id="alramla"
          d="M109.5 353L112 346L128 351L130 357.5L136.5 354L142.5 356L144.5 362.5L147 364V354L155 351L163.5 357.5L168 348.5L170 340L162 338.5L159 334L162 326.5L170 323H177.5V334H187L191.5 337L190 343.5V351L195.5 354L201 362.5V367.5L190 374L189 382L190 389L195 391.5V398L190 396.5L182.5 398L177.5 405.5H168L162 407L152 413.5V417.5L150 424L144.5 423L140 417.5V411.5L135 404L123 402.5L119.5 398V389L112 384L99 378.5L100.5 372.5L104.5 362.5L109.5 353Z"
          stroke={getStrokeColor("alramla")}
          fill={getFillColor("alramla")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("alramla", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("alramla")}
        />
        <path
          id="jerusalem"
          d="M319 353L316 348.5H300L296 345.5H288L280.5 348.5L274.5 353L270 361V369L274.5 376L273 383.5L271.5 389L262 390L256.5 387L252 380.5H242.5H235H223.5L225.5 385L220 383.5H204L201 389L195 391.5V399L190.5 396L183 397.5L176.5 406H167L163.5 407.5V422H167H176.5L181 425.5L185 422H190.5V424.5L192 431L196.5 434L206 436.5L215 440L216 447.5L223.5 450.5L227.5 445.5L232.5 447.5L233.5 453L235 455L245.5 463H252L258.5 464.5V471.5L255 478.5L256.5 484L264 490.5L273 495L285 499.5L292.5 485.5L298.5 474.5L303.5 461.5V447V431V413.5L305 404.5L312.5 389L319 378V369L316 358.5L319 353Z"
          stroke={getStrokeColor("jerusalem")}
          fill={getFillColor("jerusalem")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("jerusalem", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("jerusalem")}
        />
        <path
          id="gaza"
          d="M112.5 384.5L99 379L90.5 392.5L83 406L75.5 420.5L65.5 437L54.5 449.5L45.5 461L37.5 467.5L26 478.5L22 482L19.5 491.5L12.5 495.5L6.5 499L1.5 504.5L6.5 508.5L10 517.5L12.5 529.5L16 539.5L19.5 545L28 539.5L33.5 535.5H40.5L47 533L43.5 529.5L40.5 527L43.5 525L45.5 520.5H38.5L33.5 519.5L37.5 510L45.5 506.5L47 497.5L54.5 495.5L60 499L70 497.5L72.5 502H79L83 497.5L86.5 491.5C88.5 490.833 92.8 489.5 94 489.5C95.2 489.5 98.8333 487.167 100.5 486L103.5 489.5V493.5L112.5 491.5L108.5 486L110.5 482V474L108.5 467.5L112.5 463.5L114 458.5H117.5H127L131 455H134L141.5 457V452.5L138.5 448L134 445.5L135.5 441H138.5L144.5 437V433V429.5L138.5 424.5V420.5L140 416.5V412L135.5 404L123 402.5L119.5 398V389.5L112.5 384.5Z"
          stroke={getStrokeColor("gaza")}
          fill={getFillColor("gaza")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("gaza", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("gaza")}
        />
        <path
          id="hebron"
          d="M145.5 461.5L141.5 457.5L141 450.5L134 445V442.5L137.5 440.5L144 436.5V428.5L137.5 423.5L140 417.5L145.5 422.5H150L152.5 412.5L164 406.5V422.5H177.5L181.5 425.5L186 422.5H190.5L192 431.5L197 435L216 440.5V448.5L224 449.5L228.5 445L233 448.5L234 454.5L245.5 462.5L253 464.5H259.5V469.5L256.5 472L254.5 478.5L256.5 484L259.5 487L268 492.5L274 495.5L285 500.5L287 505L291.5 510L297.5 516.5L304 525.5V532.5L305 539.5L300.5 549L291.5 547.5C289 547.167 283.7 546.2 282.5 545C281.3 543.8 273.333 544.5 269.5 545L263.5 547.5H253H238.5L222 546.5L209.5 543L206 536C205.833 534.167 205.3 530.4 204.5 530C203.7 529.6 204.167 528.167 204.5 527.5H201.5L199 531.5L194.5 537.5L179 536L172 530L165.5 523.5L162 515V505L155.5 502.5L147 500.5L144 494L141.5 484V472L145.5 467.5V461.5Z"
          stroke={getStrokeColor("hebron")}
          fill={getFillColor("hebron")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("hebron", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("hebron")}
        />
        <path
          id="beersheba"
          d="M33 535.5L20.5 545.5L22 553L27.5 562L32.5 569.5L34.5 575.5L36.5 585.5L38.5 591.5L42.5 595L48.5 599L50.5 606.5L55.5 617.5L61.5 629.5L72 647L77 657L81 662.5V667.5V680.5V689.5L83.5 695L86.5 698L91.5 703.5L89.5 715V725.5L95.5 730C98.5 731.333 104.9 734.1 106.5 734.5C108.1 734.9 110.833 736.667 112 737.5L115.5 745L118 754L124 764.5L130 776.5C132.5 780 137.7 787.2 138.5 788C139.3 788.8 141.167 794.667 142 797.5L143.5 808V826L151 835.5L159.5 843.5L165 856L167 866.5L173.5 882.5L178.5 897V907V919L182 928.5L188 936L194 939C195 938.333 197.2 936.8 198 936C198.8 935.2 200 932 200.5 930.5C202.667 929.667 207 927.7 207 926.5C207 925 206.5 919 207 917.5C207.5 916 211 911.5 212 910C212.8 908.8 216 904.167 217.5 902V894V884C218 881 219.1 874.7 219.5 873.5C219.9 872.3 220.667 868.333 221 866.5V857L226.5 850V843.5C226.5 842.3 225.167 834 224.5 830L226.5 822.5L231 816.5L232.5 804L236.5 797.5L242.5 793L247.5 784V778C246.667 776.5 245 773 245 771C245 769 241.667 767.5 240 767V758.5L242.5 752.5V745V737.5L250.5 733.5V723.5L242.5 718L238 714.5L240 704.5L245 699L247.5 689.5L250.5 678L253 668.5L258.5 655.5L264 645L268 633L269 620L274.5 614L281.5 608L278 600L281.5 594.5L289.5 586L296.5 577L293 568.5L295 559L300 549H296.5L287 545.5L281.5 543.5L269 545.5L264 547.5H250.5L223 545.5L210 543.5L206.5 537.5L205 527.5H201.5L194 537.5L179 535.5L166.5 525.5L162.5 515.5V505L147 500L141 486V472L146 467.5V461.5L141 456.5L130.5 455L127 459H114L112.5 464.5L108 467.5L111 472V481.5L108 486L112.5 492H104V489L100.5 486L94 489L86.5 492L78.5 502H73L71 497L60 499L54.5 495.5L47 497L45.5 506.5L37 510.5L33 519L45.5 520.5L44 525.5L40.5 527.5L47 533.5L40.5 535.5H33Z"
          stroke={getStrokeColor("beersheba")}
          fill={getFillColor("beersheba")}
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={(e) => handleRegionHover("beersheba", e)}
          onMouseLeave={() => handleRegionHover(null)}
          onClick={() => handleRegionClick("beersheba")}
        />
          </g>
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div 
            className="absolute z-50 bg-white border-2 border-green-600 rounded-lg shadow-xl p-4 pointer-events-none max-w-xs"
            style={{ 
              left: `${tooltip.x}px`, 
              top: `${tooltip.y}px`,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="space-y-2">
              <h4 className="font-bold text-green-800 text-lg">{tooltip.region.title}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {tooltip.region.blurb}
              </p>
                <p className="text-green-600 text-xs mt-2 font-medium">
                  Click to explore villages in detail
                </p>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-600"></div>
          </div>
        )}
      </div>

      {/* Region Detail Map Modal */}
      {activeDetailRegion && (
        <RegionDetailMap 
          regionKey={activeDetailRegion}
          isOpen={!!activeDetailRegion} 
          onClose={() => setActiveDetailRegion(null)} 
        />
      )}
    </>
  )
}

  