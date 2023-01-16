import React, { FC, useState } from "react";

import {
  Counter,
  SymbolView,
  TextPrinting,
  View,
  SettingArray,
  RadioSegmented,
  MouseMove,
  Gallery,
  VirtualList,
  initialList,
  Element,
} from "./components";

import { SegmentItem } from "./components/RadioSegmented/RadioSegmented";

import "./App.style.scss";

const ThemesList: SegmentItem[] = [
  // { name: "Symbol" },
  // { name: "BroadcastChannel" },
  // { name: ".onstorage" },
  // { name: "map/set" },
  // { name: "MouseMove" },
  // { name: "Gallery" },
  { name: "virtual-list" },
];

function App() {
  const [theme, setTheme] = useState(ThemesList.at(-1) as SegmentItem);

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
      {theme.name === "MouseMove" && <MouseMove />}
      {theme.name === "Gallery" && <Gallery />}
      {theme.name === "virtual-list" && (
        <VirtualList
          list={initialList}
          renderItem={Element as FC}
          heightItem={20}
        />
      )}
    </View>
  );
}

export default App;
