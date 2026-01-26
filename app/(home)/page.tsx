import { NotesUIContextProvider } from '@/contexts/notesUI';
import { NotesList } from './components/NotesList/NotesList';
import { Search } from './components/Search/Search';
import { SideBar } from './components/SideBar/SideBar';

export default function Home() {
  return (
    <NotesUIContextProvider>
      <div className="h-full flex flex-row">
        <SideBar />
        <div className="flex flex-col py-4 px-4 md:px-8 w-full">
          <Search />
          <NotesList />
        </div>
      </div>
    </NotesUIContextProvider>
  );
}
