'use client'

import * as React from 'react'

export function AnimatedLogo() {
  const svgRef = React.useRef<SVGSVGElement>(null)

  const handleMouseEnter = React.useCallback(() => {
    if (!svgRef.current) return

    const elements = [
      svgRef.current.querySelector('#emeaj8oku8za5'),
      svgRef.current.querySelector('#emeaj8oku8za8'),
      svgRef.current.querySelector('#emeaj8oku8za12'),
      svgRef.current.querySelector('#emeaj8oku8za13'),
    ].filter(Boolean) as HTMLElement[]

    // Restart animations by removing and re-adding
    elements.forEach((el) => {
      el.style.animation = 'none'
      void el.offsetWidth
      el.style.animation = ''
    })
  }, [])

  const ANIMATION_DURATION = 8 // Slower: 8 seconds instead of 5

  return (
    <svg
      ref={svgRef}
      id="emeaj8oku8za1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 615 615"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      className="h-12 w-12 text-current"
      onMouseEnter={handleMouseEnter}
    >
      <style>
        {`
          @keyframes rotate-720 {
            from { transform: rotate(0deg); }
            to { transform: rotate(720deg); }
          }
          
          @keyframes rotate-360 {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes dashoffset-1 {
            0% { stroke-dashoffset: 317.4; }
            34% { stroke-dashoffset: 317.4; }
            60% { stroke-dashoffset: 634.8; }
            80% { stroke-dashoffset: 634.8; }
            100% { stroke-dashoffset: 317.4; }
          }
          
          @keyframes dashoffset-2 {
            0% { stroke-dashoffset: 326.18; }
            34% { stroke-dashoffset: 652.36; }
            60% { stroke-dashoffset: 652.36; }
            80% { stroke-dashoffset: 326.18; }
            100% { stroke-dashoffset: 326.18; }
          }
          
          .ghost {
            opacity: 0.1;
            stroke: currentColor;
          }
          
          #emeaj8oku8za5 {
            transform-origin: 284.25026703px 284.250160215px;
            animation: rotate-720 ${ANIMATION_DURATION}s linear infinite;
          }
          
          #emeaj8oku8za8 {
            transform-origin: 284.24970000999997px 284.24950004000004px;
            animation: rotate-360 ${ANIMATION_DURATION}s linear infinite;
          }
          
          #emeaj8oku8za12 {
            animation: dashoffset-1 ${ANIMATION_DURATION}s linear infinite;
          }
          
          #emeaj8oku8za13 {
            animation: dashoffset-2 ${ANIMATION_DURATION}s linear infinite;
          }
        `}
      </style>
      <g id="emeaj8oku8za2">
        <g id="emeaj8oku8za3" transform="matrix(1 0 0 1 -48 -44)">
          <g id="emeaj8oku8za4" transform="matrix(1 0 0 1 71 67)">
            {/* Ghosted static version */}
            <g id="ghost-layer" className="ghost">
              {/* Full circle for outer ring */}
              <circle
                cx="284.25026703"
                cy="284.250160215"
                r="189.105"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
              />
              {/* Full circle for inner ring */}
              <circle
                cx="284.24970000999997"
                cy="284.24950004000004"
                r="283.965"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
              />
              <path
                d="M379.451000,302.373700L321.595000,357.949700C321.595000,357.949700,306.383000,378.886700,281.808000,382.398700C266.730000,384.554700,244.788000,380.931700,226.548000,361.789700C211.915000,346.434700,209.628000,328.779700,210.616000,315.214700C212.658000,287.195700,236.948000,267.602700,236.948000,267.602700L252.053000,252.212700"
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="317.400000"
              />
              <path
                d="M370.244000,381.819000L244.477000,243.401000C244.477000,243.401000,221.407000,211.773000,255.826000,188.331000C266.414000,181.119000,281.034000,182.208000,290.058000,186.285000C303.578000,192.393000,309.111000,205.341000,313.128000,217.447000"
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="326.180000"
              />
            </g>
            {/* Animated version on top */}
            <g
              id="emeaj8oku8za5"
              transform="matrix(0.95105651629515 0.30901699437495 -0.30901699437495 0.95105651629515 101.75032847271760 -73.92597008330398)"
            >
              <path
                id="emeaj8oku8za6"
                d="M418.356300,418.356100C381.324300,455.388100,332.787300,473.905100,284.250300,473.905100C235.713300,473.905100,187.176300,455.388100,150.144300,418.356100C113.140300,381.353100,94.624300,332.863100,94.595266,284.364100C94.566300,235.789100,113.082300,187.205100,150.144300,150.144100C187.176300,113.111100,235.713300,94.595100,284.250300,94.595100C332.787300,94.595100,381.324300,113.111100,418.356300,150.144100C455.388300,187.176100,473.905300,235.713100,473.905300,284.250100C473.905300,332.787100,455.388300,381.324100,418.356300,418.356100Z"
                fill="none"
                fillRule="evenodd"
                stroke="none"
                strokeWidth="1"
              />
              <path
                id="emeaj8oku8za7"
                d="M150.143900,150.144200C187.175900,113.111200,235.712900,94.595200,284.249900,94.595200C332.786900,94.595200,381.323900,113.111200,418.355900,150.144200C455.388900,187.176200,473.904900,235.713200,473.904900,284.249200C473.904900,332.787200,455.388900,381.324200,418.355900,418.356200C381.323900,455.388200,332.786900,473.905200,284.249900,473.905200C235.712900,473.905200,187.175900,455.388200,150.143900,418.356200"
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="47.500000"
              />
            </g>
            <g
              id="emeaj8oku8za8"
              transform="matrix(-0.98768834059514 -0.15643446504023 0.15643446504023 -0.98768834059514 520.53339605083215 609.46586680841563)"
            >
              <path
                id="emeaj8oku8za9"
                d="M484.714700,484.714500C429.357700,540.071500,356.803700,567.749500,284.249700,567.749500C211.695700,567.749500,139.141700,540.071500,83.784700,484.714500C28.428700,429.358500,0.749700,356.804500,0.749700,284.249500C0.749700,211.695500,28.428700,139.142500,83.784700,83.784500C139.141700,28.428500,211.695700,0.749500,284.249700,0.749500C356.803700,0.749500,429.357700,28.428500,484.714700,83.784500C540.071700,139.142500,567.749700,211.695500,567.749700,284.249500C567.749700,356.804500,540.071700,429.358500,484.714700,484.714500Z"
                fill="none"
                fillRule="evenodd"
                stroke="none"
                strokeWidth="1"
              />
              <path
                id="emeaj8oku8za10"
                d="M484.714700,484.714500C429.357700,540.071500,356.803700,567.749500,284.249700,567.749500C211.695700,567.749500,139.141700,540.071500,83.784700,484.714500C28.428700,429.358500,0.749700,356.804500,0.749700,284.249500C0.749700,211.695500,28.428700,139.142500,83.784700,83.784500C139.141700,28.428500,211.695700,0.749500,284.249700,0.749500C356.803700,0.749500,429.357700,28.428500,484.714700,83.784500"
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="47.500000"
              />
            </g>
            <g id="emeaj8oku8za11">
              <path
                id="emeaj8oku8za12"
                d="M379.451000,302.373700L321.595000,357.949700C321.595000,357.949700,306.383000,378.886700,281.808000,382.398700C266.730000,384.554700,244.788000,380.931700,226.548000,361.789700C211.915000,346.434700,209.628000,328.779700,210.616000,315.214700C212.658000,287.195700,236.948000,267.602700,236.948000,267.602700L252.053000,252.212700"
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="47.500000"
                strokeDasharray="317.400000"
              />
              <path
                id="emeaj8oku8za13"
                d="M370.244000,381.819000L244.477000,243.401000C244.477000,243.401000,221.407000,211.773000,255.826000,188.331000C266.414000,181.119000,281.034000,182.208000,290.058000,186.285000C303.578000,192.393000,309.111000,205.341000,313.128000,217.447000"
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="47.500000"
                strokeDasharray="326.180000"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
