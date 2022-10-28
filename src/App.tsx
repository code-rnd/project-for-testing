import React, { useState } from "react";

import {
  Counter,
  SymbolView,
  TextPrinting,
  View,
  Controls,
} from "./components";

import { ThemesType } from "./types";

import "./App.style.scss";

const ThemesList: ThemesType[] = ["Symbol", "BroadcastChannel", ".onstorage"];

function App() {
  const [theme, setTheme] = useState<ThemesType>("Symbol");

  return (
    <View>
      <Controls onSelect={setTheme} list={ThemesList} activeControl={theme} />
      {theme === "Symbol" && <SymbolView />}
      {theme === "BroadcastChannel" && <TextPrinting />}
      {theme === ".onstorage" && <Counter />}
    </View>
  );
}

export default App;
