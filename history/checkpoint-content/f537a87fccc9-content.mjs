import {SPREADS} from './specification.mjs';
export const CONTENT = [
  {title:'The winter garden',subtitle:'Observations made beyond the north wall',date:'Second winter · waning moon',lines:[
    'The silverleaf keeps its scent after the first frost.',
    'Gather the lower leaves before the morning light.',
    'The pale veins must be whole; reject a bruised stem.',
    'Rain changes the measure. Dry upon linen, never iron.',
    'A specimen from the west bed yielded little colour.',
    'The same plant, kept in shade, was notably stronger.',
    'I have marked the sheltered beds upon the next leaf.',
    'Do not confuse the young shoot with bitter rue.'
  ],notes:['Compare the small veins.','The root is not required.','M. found three by the well.']},
  {title:'Stones that remember',subtitle:'A small cabinet of mineral observations',date:'Third year · after the thaw',lines:[
    'The grey specimen takes a pale line when scratched.',
    'Its broken face is brighter than the weathered skin.',
    'I weighed it dry, then again after a night in water.',
    'No change was found beyond the error of the balance.',
    'The green stone leaves a stain upon damp linen.',
    'Keep it apart from the white salts in the lower tray.',
    'Crystal from the quarry cleaves along three planes.',
    'A glass likeness lacks both the grain and the weight.'
  ],notes:['Repeat with a smaller weight.','No silver is present.','Edges drawn at twice their size.']},
  {title:'The patient moon',subtitle:'Tables for the return of a familiar light',date:'Fifth year · clear nights',lines:[
    'The eastern ridge obscures the first observation.',
    'Take the measure from the brass line on the sill.',
    'Clouds delayed the third reading by half an hour.',
    'An interval is entered here rather than a false point.',
    'The narrow crescent returned beneath the old star.',
    'Correct the clock before comparing these columns.',
    'The garden work follows the season before the moon.',
    'A pleasing pattern alone is insufficient evidence.'
  ],notes:['Clock was slow this night.','Leave the doubtful entry blank.','Return here at the next new moon.']},
  {title:'A measured distillation',subtitle:'Concerning clear water and a patient fire',date:'Sixth year · first attempt',lines:[
    'Set the clean vessel upon a bed of fine dry sand.',
    'Raise the warmth slowly and watch the upper neck.',
    'The first drops carried the scent of the old stopper.',
    'I discarded them and washed the receiver once more.',
    'The second measure was clear, without a green cast.',
    'The drawing records the height of the cooling tube.',
    'At dusk the yield was less than the winter trial.',
    'A small leak was later found beneath the binding.'
  ],notes:['Replace this cracked stopper.','A gentler warmth sufficed.','Record the failed trials also.']},
  {title:'Errors and amendments',subtitle:'Notes worth keeping because they were wrong',date:'Ninth year · revised in brown ink',lines:[
    'The former conclusion depended on a single trial.',
    'I mistook a stain on the glass for a change of colour.',
    'With a new vessel the expected mark did not appear.',
    'The table opposite replaces the earlier reckoning.',
    'A second hand has confirmed the smaller measure.',
    'Do not erase the old account: it explains the error.',
    'The folded note was added after the autumn journey.',
    'A useful book must have room to contradict its owner.'
  ],notes:['Wrong vessel, not wrong season.','E. V. · checked twice.','See the mineral notes.']},
  {title:'A book passed onward',subtitle:'Names, repairs, and the keeping of observations',date:'Fourteenth year · at the south window',lines:[
    'These leaves were first gathered for Elian Vey.',
    'The lower joint was repaired after the river journey.',
    'The new leather is firmer and lighter than the old.',
    'Mara added the garden notes during the long winter.',
    'The little brass catch was renewed in the eighth year.',
    'Keep the loose measures with their original account.',
    'Whoever receives this book: add what you have seen.',
    'Leave enough margin for the person who follows you.'
  ],notes:['Mara · keeper of the west beds.','The repair holds well.','Returned to the study, year fourteen.']},
];

function botanical(c,x,y,s){
  c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle='#4f5440';c.lineWidth=3;
  c.beginPath();c.moveTo(0,220);c.bezierCurveTo(-35,80,35,-100,5,-270);c.stroke();
  for(let i=0;i<7;i++){const yy=150-i*58,side=i%2?1:-1;c.save();c.translate(i%2?8:-7,yy);c.scale(side,1);c.beginPath();c.moveTo(0,0);c.bezierCurveTo(70,-90,170,-90,160,-160);c.bezierCurveTo(35,-135,15,-65,0,0);c.fillStyle=i%2?'#89917655':'#777f6b55';c.fill();c.stroke();c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(100,-90,160,-160);c.stroke();for(let j=1;j<5;j++){c.beginPath();c.moveTo(j*24,-j*23);c.lineTo(j*24+15,-j*23-34);c.stroke();}c.restore();}
  c.beginPath();c.ellipse(5,-290,35,18,-.6,0,Math.PI*2);c.stroke();c.restore();
}
function mineral(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.lineWidth=3;c.strokeStyle='#575950';for(let k=0;k<3;k++){c.save();c.translate((k-1)*170,k%2*90);c.rotate((k-1)*.25);c.beginPath();c.moveTo(-65,140);c.lineTo(-70,-80);c.lineTo(-10,-160);c.lineTo(65,-100);c.lineTo(70,140);c.closePath();c.fillStyle=['#6e76682a','#a08a592a','#6681782a'][k];c.fill();c.stroke();c.beginPath();c.moveTo(-70,-80);c.lineTo(0,-30);c.lineTo(65,-100);c.moveTo(0,-30);c.lineTo(0,140);c.moveTo(-10,-160);c.lineTo(0,-30);c.stroke();c.restore();}c.restore();}
function lunar(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle='#55564a';c.lineWidth=2.5;for(let k=0;k<8;k++){const a=k/8*Math.PI*2,xx=Math.cos(a)*210,yy=Math.sin(a)*210;c.beginPath();c.arc(xx,yy,32,0,Math.PI*2);c.stroke();c.save();c.beginPath();c.arc(xx,yy,31,0,Math.PI*2);c.clip();c.fillStyle='#55564a99';c.beginPath();c.ellipse(xx+(k-3.5)*9,yy,31,34,0,0,Math.PI*2);c.fill();c.restore();}c.setLineDash([8,8]);c.beginPath();c.arc(0,0,210,0,Math.PI*2);c.stroke();c.setLineDash([]);c.beginPath();c.arc(0,0,85,0,Math.PI*2);c.stroke();for(let i=0;i<36;i++){const a=i/36*Math.PI*2;c.beginPath();c.moveTo(Math.cos(a)*88,Math.sin(a)*88);c.lineTo(Math.cos(a)*100,Math.sin(a)*100);c.stroke();}c.restore();}
function vessel(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle='#57554b';c.lineWidth=3;c.beginPath();c.moveTo(-150,130);c.bezierCurveTo(-280,0,-130,-60,-125,-160);c.lineTo(-90,-160);c.bezierCurveTo(-80,-45,35,-5,-15,130);c.closePath();c.fillStyle='#9eaf9a22';c.fill();c.stroke();c.beginPath();c.moveTo(-110,-160);c.lineTo(-110,-220);c.lineTo(110,-120);c.lineTo(140,90);c.stroke();c.beginPath();c.moveTo(65,90);c.lineTo(190,90);c.lineTo(195,180);c.lineTo(65,180);c.closePath();c.stroke();c.beginPath();c.moveTo(-240,155);c.lineTo(30,155);c.moveTo(-235,170);c.lineTo(25,170);c.stroke();c.restore();}

export function createPageArt(T) {
  const textures=[],materials=[],canvases=[];
  function make(index,side) {
    const data=CONTENT[index],canvas=document.createElement('canvas');canvas.width=1536;canvas.height=2112;const c=canvas.getContext('2d');
    c.fillStyle='#d9cfaf';c.fillRect(0,0,1536,2112);
    let seed=433+index*17;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    const image=c.getImageData(0,0,1536,2112);for(let i=0;i<image.data.length;i+=4){const n=(rnd()-.5)*9;image.data[i]+=n;image.data[i+1]+=n;image.data[i+2]+=n;}c.putImageData(image,0,0);
    const edge=c.createLinearGradient(0,0,1536,0);edge.addColorStop(0,'#77634733');edge.addColorStop(.045,'#77634700');edge.addColorStop(.95,'#77634700');edge.addColorStop(1,'#77634722');c.fillStyle=edge;c.fillRect(0,0,1536,2112);
    const thumb=c.createRadialGradient(side?100:1440,1730,1,side?100:1440,1730,150);thumb.addColorStop(0,'#77614019');thumb.addColorStop(1,'#77614000');c.fillStyle=thumb;c.fillRect(0,0,1536,2112);
    c.save();c.translate(1536,0);c.scale(-1,1);c.fillStyle='#51483509';c.font='italic 24px Georgia';for(let i=0;i<12;i++)c.fillText(data.lines[(i+3)%8],180,1050+i*49);c.restore();
    c.strokeStyle='#8b7c5d45';c.lineWidth=1;c.beginPath();c.moveTo(155,150);c.lineTo(155,1910);c.stroke();
    c.fillStyle='#2d251b';c.font='20px Georgia';c.letterSpacing='3px';c.fillText('FIELD OBSERVATIONS · E. VEY',180,130);c.letterSpacing='0px';
    c.font='italic 56px Georgia';c.fillText(side?data.subtitle.split(' ').slice(0,4).join(' '):data.title,180,245);
    c.font='italic 25px Georgia';c.fillStyle='#766048';c.fillText(data.date,184,300);
    c.strokeStyle='#8a654b';c.lineWidth=2;c.beginPath();c.moveTo(180,335);c.lineTo(1360,335);c.stroke();
    c.fillStyle='#2d251d';c.font='italic 29px Georgia';
    for(let i=0;i<8;i++){c.save();c.translate(185,1055+i*59);c.rotate(Math.sin(i*2.5+index)*.003);c.fillText(data.lines[(i+(side?3:0))%8],0,0);c.restore();}
    if(index===0)botanical(c,760,710,side?.63:.75);
    if(index===1)mineral(c,790,690,.85);
    if(index===2)lunar(c,790,690,.90);
    if(index===3)vessel(c,830,720,1.02);
    if(index===4){mineral(c,800,650,.65);c.strokeStyle='#975b45';c.lineWidth=2;c.beginPath();c.moveTo(184,1183);c.lineTo(1180,1171);c.stroke();c.font='italic 28px Georgia';c.fillStyle='#87543e';c.fillText('Replace this observation with the second trial.',255,1550);}
    if(index===5){c.save();c.translate(790,700);c.strokeStyle='#635541';c.lineWidth=3;for(const r of [135,150]){c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke();}c.font='italic 67px Georgia';c.fillStyle='#635541';c.fillText('E. V.',-75,20);c.font='24px Georgia';c.fillText('IN THE FOURTEENTH YEAR',-160,205);c.restore();}
    c.fillStyle='#6d3f2a';c.font='24px "Segoe Script", "Segoe Print", Georgia, serif';for(let i=0;i<3;i++){c.save();c.translate(260+i%2*90,1680+i*70);c.rotate(-.035+i*.018);c.fillText(data.notes[i],0,0);c.restore();}
    c.fillStyle='#716044';c.font='23px Georgia';c.textAlign='center';c.fillText(String(SPREADS[index].leaf*2+(side?0:1)),768,1995);c.textAlign='left';
    const t=new T.CanvasTexture(canvas);t.colorSpace=T.SRGBColorSpace;t.anisotropy=8;textures.push(t);canvases.push(canvas);
    const m=new T.MeshStandardMaterial({map:t,color:'#ffffff',roughness:.94});materials.push(m);return m;
  }
  const spreads=SPREADS.map((_,i)=>({left:make(i,1),right:make(i,0)}));
  return {spreads,canvases,materials,textures,dispose(){materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
