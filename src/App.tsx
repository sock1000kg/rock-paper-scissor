import { AppHeader } from './components/AppHeader';
import { getRoomIdFromUrl } from './multiplayer/room';
import { ClassicScreen } from './screens/ClassicScreen';
import { HomeScreen } from './screens/HomeScreen';
import { OnlineGameScreen } from './screens/OnlineGameScreen';
import { RoomHomeScreen } from './screens/RoomHomeScreen';

type View = 'home' | 'classic' | 'ottv2';

function getView(): View {
  const exercise = new URLSearchParams(window.location.search).get('exercise');
  return exercise === 'classic' || exercise === 'ottv2' ? exercise : 'home';
}

export default function App() {
  const current = getView();
  const roomId = getRoomIdFromUrl();

  const navigate = (destination: View) => {
    const url = new URL(window.location.href);
    url.hash = '';
    if (destination === 'home') url.searchParams.delete('exercise');
    else url.searchParams.set('exercise', destination);
    window.location.assign(url.toString());
  };

  return (
    <div className="app-shell">
      <AppHeader current={current} onNavigate={navigate} />
      {current === 'home' && <HomeScreen onChoose={navigate} />}
      {current === 'classic' && <ClassicScreen />}
      {current === 'ottv2' && (roomId ? <OnlineGameScreen roomId={roomId} /> : <RoomHomeScreen />)}
    </div>
  );
}
