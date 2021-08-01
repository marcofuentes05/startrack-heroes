import { useEffect, useState } from "react";
import {PowerStats} from './interfaces';
export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const calculatePowerScore = (powerStats: PowerStats): number => {
  const {
    intelligence,
    strength,
    speed,
    durability,
    power,
    combat,
  } = powerStats;
  return Math.round((intelligence + strength + speed + durability + power + combat) / 60)
}