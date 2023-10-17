import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import {useEffect, useState} from "react";
import {helloWorld} from "./services/api.ts";

export default function App() {
  const [test, setTest] = useState<string>("");
  useEffect(() => {
    helloWorld().then(res => {
      setTest(res.message);
    })
  }, []);
  return <MantineProvider theme={theme}>
    {test}
  </MantineProvider>;
}
