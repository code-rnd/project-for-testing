import React, { useState } from "react";

import {
  Counter,
  SymbolView,
  TextPrinting,
  View,
  SettingArray,
  RadioSegmented,
} from "./components";

import "./App.style.scss";

const ThemesList: string[] = [
  "Symbol",
  "BroadcastChannel",
  ".onstorage",
  "map/set",
];

function App() {
  const [theme, setTheme] = useState("Symbol");

  return (
    <View>
      <RadioSegmented
        items={ThemesList}
        activeItem={theme}
        widthItem={100}
        onSelect={setTheme}
      />
      {theme === "Symbol" && <SymbolView />}
      {theme === "BroadcastChannel" && <TextPrinting />}
      {theme === ".onstorage" && <Counter />}
      {theme === "map/set" && <SettingArray />}
    </View>
  );
}

export default App;
