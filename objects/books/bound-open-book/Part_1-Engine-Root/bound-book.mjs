export function buildBoundBook(THREE,kit,{wood,paper,pageMat,gold,cover},large=true){
  const root=new THREE.Group();root.name='Bound open book';root.userData.noBatch=true;
  const add=(g,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;root.add(o);return o;};
  for(const side of [-1,1]){
    add(kit.roundedBox(.374,.006,.544,.0014),cover,side*.195,-.004,0).name='Six millimetre cover board';
    add(kit.roundedBox(.358,.0006,.514,.0001),paper,side*.194,.0002,0).name='Pasted endpaper';
    const curve=(u,v)=>.0025+.017*Math.sin(u*Math.PI*.95)+.0007*Math.sin(v*9)*u;
    for(let k=0;k<6;k++){
      const offset=.00015*Math.sin(k*2.9),top=(u,v)=>curve(u,v)+(k+1)*.0046,bottom=(u,v)=>curve(u,v)+k*.0046;
      const g=kit.surfaceSolid(.360+offset,.508-k*.00016,top,bottom,44,28,24,.000035),o=add(g,[k===5?pageMat:paper,paper],side*(.010+offset),0,0);o.scale.x=side;o.name='Closed sewn signature '+(k+1);o.userData.signature=true;
    }
    for(let k=0;k<3;k++){
      const top=(u,v)=>curve(u,v)+.0278+k*.00035+(.005+k*.006)*u*u*(.7+.3*Math.sin(v*Math.PI)),g=kit.surfaceSolid(.36,.506,top,(u,v)=>top(u,v)-.00016,44,28),o=add(g,[pageMat,paper],side*.010,0,0);o.scale.x=side;o.name='Individual 0.16 mm curled leaf';o.userData.leafThickness=.00016;
    }
    // Recessed hinge rolls, brass cover corners, and blind-tooled raised borders.
    const hinge=add(new THREE.CylinderGeometry(.004,.004,.522,16),cover,side*.008,.003,0);hinge.rotation.x=Math.PI/2;
    for(const z of [-.247,.247]){const band=add(new THREE.CylinderGeometry(.0023,.0023,.020,12),gold,side*.017,.015,z);band.rotation.z=Math.PI/2;for(let i=0;i<7;i++){const stitch=add(new THREE.TorusGeometry(.0027,.00045,5,9),paper,side*(.009+i*.0026),.015,z);stitch.rotation.y=Math.PI/2;}}
    for(const z of [-.251,.251])add(kit.roundedBox(.34,.0009,.0018,.00025),gold,side*.195,.0001,z);
    for(const z of [-.263,.263])add(kit.roundedBox(.025,.0018,.018,.0006),gold,side*.360,.0002,z);
  }
  const spine=add(kit.roundedBox(.024,.009,.538,.003),cover,0,-.004,0);spine.name='Flexible spine lining';
  return root;
}
