import React, { useState } from "react";

import {
  Counter,
  SymbolView,
  TextPrinting,
  View,
  Controls,
  SettingArray,
} from "./components";

import { ThemesType } from "./types";

import "./App.style.scss";

const ThemesList: ThemesType[] = [
  "Symbol",
  "BroadcastChannel",
  ".onstorage",
  "map/set",
];

function App() {
  const [theme, setTheme] = useState<ThemesType>("Symbol");

  return (
    <View>
      <Controls onSelect={setTheme} list={ThemesList} activeControl={theme} />
      {theme === "Symbol" && <SymbolView />}
      {theme === "BroadcastChannel" && <TextPrinting />}
      {theme === ".onstorage" && <Counter />}
      {theme === "map/set" && <SettingArray />}
    </View>
  );
}

export default App;
