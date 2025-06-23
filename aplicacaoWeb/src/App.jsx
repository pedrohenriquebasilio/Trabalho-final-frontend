import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Home from './pages/Home';


function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;
