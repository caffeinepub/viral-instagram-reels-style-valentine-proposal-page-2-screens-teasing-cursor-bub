import { ThemeProvider } from 'next-themes';
import ValentineScreen from './pages/ValentineScreen';
import FloatingHearts from './components/FloatingHearts';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200">
        <FloatingHearts />
        <ValentineScreen />
      </div>
    </ThemeProvider>
  );
}

export default App;
