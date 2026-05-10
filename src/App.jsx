import { useState, useEffect, useRef } from "react";


// ── Brand tokens from EHUB International Knights logo ──
// Deep navy: #0B1929 | Mid navy: #0F2744 | Sky blue: #4DB8D8 | Gold: #F5C842
const C = {
  navyDark:  "#0B1929",
  navyMid:   "#0F2744",
  navyLight: "#162F50",
  sky:       "#4DB8D8",
  skyLight:  "#7ECFE3",
  skyPale:   "#C8EDF6",
  gold:      "#F5C842",
  white:     "#FFFFFF",
  offWhite:  "#F0F8FC",
  cream:     "#E8F4F8",
};


const LOGO = "/website-demo-ehubbasketball/EHUB_logo_2.jpg";


// New logo is rectangular — render as a horizontal lockup, no circular crop
const LogoImg = ({ size = 48, style = {} }) => (
  <img src={LOGO} alt="EHUB International" style={{ height: size, width: "auto", objectFit: "contain", ...style }} />
);


const Ball = ({ size = 80, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <circle cx="40" cy="40" r="38" fill={C.sky} stroke={C.skyLight} strokeWidth="2"/>
    <path d="M40 2 Q55 20 55 40 Q55 60 40 78" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
    <path d="M40 2 Q25 20 25 40 Q25 60 40 78" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
    <path d="M2 40 Q20 30 40 30 Q60 30 78 40" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
    <path d="M2 40 Q20 50 40 50 Q60 50 78 40" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
  </svg>
);


const useInView = (threshold = 0.15) => {
  const ref = useRef(null);

