interface HomeScreenProps {
  onChoose: (exercise: 'classic' | 'ottv2') => void;
}

export function HomeScreen({ onChoose }: HomeScreenProps) {
  return (
    <main className="home-screen">
      <section className="home-intro">
        <p className="context-line">Hai bài tập · Một ứng dụng React</p>
        <h1>Chọn cách bạn muốn chơi Oẳn Tù Tì.</h1>
        <p>
          Bắt đầu bằng luật cổ điển hoặc bước lên bàn cờ 9×9, nơi mỗi nước đi đều là một lựa chọn chiến thuật.
        </p>
      </section>
      <section className="exercise-list" aria-label="Danh sách bài tập">
        <article className="exercise-item classic-preview">
          <div className="exercise-number">Bài 1</div>
          <div className="preview-hands" aria-hidden="true"><span>✊</span><span>✋</span><span>✌️</span></div>
          <div>
            <h2>OTTv2 · Chơi tại chỗ</h2>
            <p>Bàn cờ 9×9 cho hai người chơi thay phiên trên cùng thiết bị, không cần tạo phòng.</p>
          </div>
          <button className="primary-button" onClick={() => onChoose('classic')}>Chơi tại chỗ</button>
        </article>
        <article className="exercise-item strategy-preview">
          <div className="exercise-number">Bài 2</div>
          <div className="mini-board" aria-hidden="true">
            {Array.from({ length: 25 }, (_, index) => <span key={index} />)}
          </div>
          <div>
            <h2>OTTv2 · Bàn cờ 9×9</h2>
            <p>Tạo phòng, chia sẻ mã và điều khiển đội quân Kéo–Búa–Bao.</p>
          </div>
          <button className="secondary-button" onClick={() => onChoose('ottv2')}>Vào sảnh OTTv2</button>
        </article>
      </section>
    </main>
  );
}
