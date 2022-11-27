import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Verify from './Verify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reset from './Reset';
import Register from './Register';




function App() {
  // const [searchParams] = useSearchParams();
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Verify/>}></Route>
      <Route path={`/reset`} element={<Reset/>}></Route>
      <Route path={`/register`} element={<Register/>}></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;
