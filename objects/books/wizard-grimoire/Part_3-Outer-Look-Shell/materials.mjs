const fract=x=>x-Math.floor(x);
const hash=(x,y)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453123);
function noise(x,y){const a=Math.floor(x),b=Math.floor(y),u=fract(x),v=fract(y),s=u*u*(3-2*u),t=v*v*(3-2*v);return (hash(a,b)*(1-s)+hash(a+1,b)*s)*(1-t)+(hash(a,b+1)*(1-s)+hash(a+1,b+1)*s)*t;}

export function createMaterials(T,spec) {
  const textures=[],materials=[];
  const texture=(data,n,colour=false)=>{const t=new T.DataTexture(data,n,n,T.RGBAFormat);t.colorSpace=colour?T.SRGBColorSpace:T.NoColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.generateMipmaps=true;t.minFilter=T.LinearMipmapLinearFilter;t.magFilter=T.LinearFilter;t.needsUpdate=true;textures.push(t);return t;};
  const N=768,height=new Float32Array(N*N),colour=new Uint8Array(N*N*4),rough=new Uint8Array(N*N*4),normal=new Uint8Array(N*N*4);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const u=i/N,v=j/N,k=j*N+i;
    const pores=noise(u*230,v*230),wrinkle=Math.abs(Math.sin(u*680+noise(u*13,v*18)*9+Math.sin(v*140)*.7));
    height[k]=pores*.60+noise(u*85,v*110)*.25+Math.pow(wrinkle,14)*.15;
    const corner=Math.pow(Math.abs(u-.5)*2,8)*Math.pow(Math.abs(v-.5)*2,5),handling=Math.exp(-((u-.86)**2/.012+(v-.24)**2/.018));
    const tone=38+noise(u*6,v*8)*20+pores*10+corner*19;
    colour[k*4]=tone*1.45;colour[k*4+1]=tone*.86;colour[k*4+2]=tone*.59;colour[k*4+3]=255;
    rough[k*4]=rough[k*4+1]=rough[k*4+2]=Math.round(176+pores*24-corner*28-handling*35);rough[k*4+3]=255;
  }
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const k=(j*N+i)*4,dx=height[j*N+(i+1)%N]-height[j*N+(i+N-1)%N],dy=height[((j+1)%N)*N+i]-height[((j+N-1)%N)*N+i];
    normal[k]=128-dx*92;normal[k+1]=128-dy*92;normal[k+2]=250;normal[k+3]=255;
  }
  const leatherMap=texture(colour,N,true),roughnessMap=texture(rough,N),normalMap=texture(normal,N);
  // Proposed 0.12 mm micrograin; unique colour and handling wear remain at cover scale.
  normalMap.repeat.set(8,8);
  const standard=o=>{const m=new T.MeshStandardMaterial(o);materials.push(m);return m;};
  const leather=standard({color:'#b89c84',map:leatherMap,roughness:.86,roughnessMap,normalMap,normalScale:new T.Vector2(.24,.24),metalness:0});
  const original=new T.Color('#503125'),requested=new T.Color(spec.leather.colour);leather.color.multiply(new T.Color(requested.r/original.r,requested.g/original.g,requested.b/original.b));
  const coverColour=colour.slice();
  const coverWidth=(spec.paper.width-spec.binding.shoulder+spec.board.square)/1000,coverHeight=(spec.paper.height+2*spec.board.square)/1000;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=i/N*coverWidth,z=(.5-j/N)*coverHeight,d=Math.min(x,coverWidth-x,coverHeight/2-Math.abs(z));
    const border=Math.exp(-Math.pow((d-.009)/.00075,2))+.65*Math.exp(-Math.pow((d-.013)/.00055,2)),cx=x-coverWidth*.5,cz=z;
    const circle=Math.exp(-Math.pow((Math.hypot(cx,cz)-.026)/.0007,2)),stem=Math.exp(-Math.pow((cx-.002*Math.sin(cz*110))/.0007,2))*Math.max(0,1-Math.max(0,Math.abs(cz)-.018)/.003);
    const tool=Math.min(1,border+circle*.8+stem*.6),k=(j*N+i)*4;
    for(let c=0;c<3;c++)coverColour[k+c]*=1-tool*.32;
  }
  const cover=leather.clone();cover.map=texture(coverColour,N,true);materials.push(cover);
  const patch=leather.clone();patch.color.set('#987d5b');patch.roughness=.92;patch.normalScale.set(.16,.16);materials.push(patch);
  const woodData=new Uint8Array(512*512*4);
  for(let j=0;j<512;j++)for(let i=0;i<512;i++){const k=(j*512+i)*4,grain=noise(i*.09+Math.sin(j*.02)*2,j*.007),f=Math.sin(i*.29+noise(i*.02,j*.006)*10),c=90+grain*35+f*7;woodData[k]=c*1.18;woodData[k+1]=c*.88;woodData[k+2]=c*.56;woodData[k+3]=255;}
  const wood=standard({color:'#a58b65',map:texture(woodData,512,true),roughness:.8});
  const paper=standard({color:'#d4c6a0',roughness:.94});
  const paperEdge=standard({color:'#c5b68d',roughness:1});
  const edgeData=new Uint8Array(512*512*4);for(let j=0;j<512;j++)for(let i=0;i<512;i++){const k=(j*512+i)*4,value=236+Math.sin(j/512*Math.PI*480)*8+noise(i*.15,j*.08)*8;edgeData[k]=edgeData[k+1]=edgeData[k+2]=value;edgeData[k+3]=255;}
  const proxyEdges=[0,1].map(()=>standard({color:'#c5b68d',roughness:1,map:texture(edgeData.slice(),512,true)}));
  const paperVariants=Array.from({length:7},(_,i)=>standard({color:new T.Color('#d4c6a0').multiplyScalar(.92+i*.014),roughness:.95}));
  const endpaper=standard({color:'#c1b18b',roughness:.98});
  const board=standard({color:'#858475',roughness:1}),kraft=standard({color:'#a68c61',roughness:.98}),stiffener=standard({color:'#a09b82',roughness:1}),hollow=standard({color:'#cbb68e',roughness:.97});
  const linen=standard({color:'#a49169',roughness:.96});
  const brass=standard({color:'#9d7941',metalness:.88,roughness:.52});
  const darkBrass=standard({color:'#5d4d31',metalness:.68,roughness:.76});
  const lining=standard({color:'#655340',roughness:1});
  const cradle=standard({color:'#8b7862',roughness:.83,map:wood.map});
  const pad=standard({color:'#695d4e',roughness:1});
  const stone=standard({color:'#b4ada0',roughness:.91});
  const clay=standard({color:'#aca596',roughness:.78});
  return {leather,cover,patch,wood,board,kraft,stiffener,hollow,paper,paperEdge,proxyEdges,paperVariants,endpaper,linen,brass,darkBrass,lining,cradle,pad,stone,clay,materials,textures,
    dispose(){for(const m of materials)m.dispose();for(const t of textures)t.dispose();}};
}
