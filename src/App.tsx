import React, { useState } from "react";

import {
  Counter,
  SymbolView,
  TextPrinting,
  View,
  SettingArray,
  RadioSegmented,
} from "./components";

import { SegmentItem } from "./components/RadioSegmented/RadioSegmented";

import "./App.style.scss";

const ThemesList: SegmentItem[] = [
  { name: "Symbol" },
  { name: "BroadcastChannel" },
  { name: ".onstorage" },
  { name: "map/set" },
];

function App() {
  const [theme, setTheme] = useState(ThemesList.at(0) as SegmentItem);

  return (
    <View>
      <RadioSegmented
        items={ThemesList}
        activeItem={theme}
        widthItem={150}
        onSelect={setTheme}
      />
      {theme.name === "Symbol" && <SymbolView />}
      {theme.name === "BroadcastChannel" && <TextPrinting />}
      {theme.name === ".onstorage" && <Counter />}
      {theme.name === "map/set" && <SettingArray />}
    </View>
  );
}

export default App;
