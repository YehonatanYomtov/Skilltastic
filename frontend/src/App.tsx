import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<string>();

  useEffect(() => {
    fetch('/api/bob')
      .then((res) => res.text())
      .then((data) => setData(data))
      .catch((err) => console.error('error fetching data:>>', err));
  }, []);

  if (!data) return <h1>Loading...</h1>;

  return <h1>{data} i like food</h1>;
}

export default App;
