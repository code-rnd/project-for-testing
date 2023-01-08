import React, { useState } from "react";

import {
  Counter,
  SymbolView,
  TextPrinting,
  View,
  SettingArray,
  RadioSegmented,
  MouseMove,
  Gallery,
} from "./components";

import { SegmentItem } from "./components/RadioSegmented/RadioSegmented";

import "./App.style.scss";

const ThemesList: SegmentItem[] = [
  { name: "Symbol" },
  { name: "BroadcastChannel" },
  { name: ".onstorage" },
  { name: "map/set" },
  { name: "MouseMove" },
  { name: "Gallery" },
];

function App() {
  const [theme, setTheme] = useState(ThemesList.at(-1) as SegmentItem);

  return (
    <View>
      <RadioSegmented
        items={ThemesList}
        activeItem={theme}
        widthItem={50}
        onSelect={setTheme}
      />
      {theme.name === "Symbol" && <SymbolView />}
      {theme.name === "BroadcastChannel" && <TextPrinting />}
      {theme.name === ".onstorage" && <Counter />}
      {theme.name === "map/set" && <SettingArray />}
      {theme.name === "MouseMove" && <MouseMove />}
      {theme.name === "Gallery" && <Gallery />}
    </View>
  );
}

export default App;
