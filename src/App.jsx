import { QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { queryClient } from './hooks/useCharacters';

import './App.css';
import Home from './pages/home';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DndProvider backend={HTML5Backend}>
                <div className="App">
                    <Home />
                </div>
            </DndProvider>
        </QueryClientProvider>
    );
}

export default App;
