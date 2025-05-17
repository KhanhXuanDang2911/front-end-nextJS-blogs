"use client";
import { getUserFromToken } from "@/util/decode_jwt";
import React, { useEffect, useState } from "react";
const App: React.FC = () => {

  const data = getUserFromToken();
  console.log(data);
  return (
    <>
        <p>hello</p>
    </>
  );
};

export default App;
