/* Core rules and map factories.  Coordinates are zero-based: r = row, c = column. */
const OTT = (() => {
  const types={rock:{icon:'✊',name:'Đấm'},paper:{icon:'🖐',name:'Lá'},scissors:{icon:'✌',name:'Kéo'}};
  const beats={rock:'scissors',scissors:'paper',paper:'rock'};
  const clone=value=>JSON.parse(JSON.stringify(value));
  const at=(map,r,c)=>map.pieces.find(piece=>piece.r===r&&piece.c===c);
  const inBounds=(map,r,c)=>r>=0&&c>=0&&r<map.rows&&c<map.cols;
  const winner=(attacker,defender)=>attacker.type===defender.type?'draw':beats[attacker.type]===defender.type?'attacker':'defender';
  const validMoves=(map,piece)=>{const moves=[];for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const r=piece.r+dr,c=piece.c+dc;if(!inBounds(map,r,c)||map.obstacles.some(x=>x.r===r&&x.c===c))continue;const target=at(map,r,c);if(!target||(target.player!==piece.player&&target.type!==piece.type))moves.push({r,c,attack:Boolean(target)})}return moves};
  const pattern=['rock','paper','scissors'];
  const addPieces=(positions,player,prefix)=>positions.map(([r,c],index)=>({id:`${prefix}-${index}`,player,type:pattern[index%3],r,c}));
  // Default formation matches the supplied reference diagram: two 10-piece wedges.
  const classicPieces=()=>[
    ...addPieces([[5,0],[5,1],[6,0],[6,1],[6,2],[7,1],[7,2],[7,3],[8,2],[8,3]],1,'p1'),
    ...addPieces([[0,5],[0,6],[1,5],[1,6],[1,7],[2,6],[2,7],[2,8],[3,7],[3,8]],2,'p2')
  ];
  const base=(name='Classic Duel',rows=9,cols=9)=>({name,rows,cols,bases:{1:{r:rows-1,c:0},2:{r:0,c:cols-1}},obstacles:[],pieces:rows===9&&cols===9?classicPieces():standardPieces(rows,cols)});
  const standardPieces=(rows,cols)=>{const pieces=[];for(let c=0;c<cols;c++){pieces.push({id:`p1-${c}`,player:1,type:pattern[c%3],r:rows-1,c});pieces.push({id:`p2-${c}`,player:2,type:pattern[c%3],r:0,c})}return pieces};
  const maps={
    classic:()=>base('Classic Duel'),
    chokepoint:()=>{const map=base('Hẻm núi hẹp (Chokepoint)');map.obstacles=[1,2,3,5,6,7].map(c=>({r:4,c}));return map},
    maze:()=>{const map=base('Mê cung góc (Diagonal Maze)');map.obstacles=[{r:2,c:2},{r:2,c:3},{r:3,c:3},{r:3,c:5},{r:4,c:4},{r:5,c:3},{r:5,c:5},{r:6,c:4},{r:6,c:5}];return map},
    island:()=>{const map=base('Đấu trường trung tâm (Island Core)');map.obstacles=[{r:3,c:3},{r:3,c:4},{r:3,c:5},{r:4,c:3},{r:4,c:5},{r:5,c:3},{r:5,c:4},{r:5,c:5}];return map}
  };
  const randomMap=()=>{
    const size=7+Math.floor(Math.random()*5),map=base('Chiến trường hỗn loạn',size,size);
    // A blocked coordinate may never contain a base, a starting unit, or the
    // guaranteed diagonal path between both bases.
    const blocked=new Set([`${map.bases[1].r},${map.bases[1].c}`,`${map.bases[2].r},${map.bases[2].c}`]);
    map.pieces.forEach(piece=>blocked.add(`${piece.r},${piece.c}`));
    for(let i=0;i<size;i++)blocked.add(`${i},${i}`);
    const amount=Math.floor(size*size*.13);
    while(map.obstacles.length<amount){const r=Math.floor(Math.random()*size),c=Math.floor(Math.random()*size),key=`${r},${c}`;if(!blocked.has(key)){blocked.add(key);map.obstacles.push({r,c})}}
    return map;
  };
  return {types,clone,at,winner,validMoves,maps,randomMap,base};
})();
