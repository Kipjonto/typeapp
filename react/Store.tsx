import React, { useState } from 'react';
import { useBetween } from 'use-between';

const Store = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [visibleInput, setVisibleInput] = useState("");
  const [mode, setMode] = useState("Words");
  const [progress, setProgress] = useState("0 / 10");
  const [wordsVariance, setWordsVariance] = useState("10");
  const [timeVariance, setTimeVariance] = useState("15");

  return {
    isMenuActive, setIsMenuActive,
    visibleInput, setVisibleInput,
    mode, setMode,
    progress, setProgress,
    wordsVariance, setWordsVariance,
    timeVariance, setTimeVariance
  }
}
  
const useStore = () => useBetween(Store);

export default useStore;