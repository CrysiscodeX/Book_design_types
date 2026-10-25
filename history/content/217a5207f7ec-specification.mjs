export const DEFAULT_SPEC = Object.freeze({
  version:1, units:'mm', title:'The Field Observations of Elian Vey',
  board:{height:300,width:220,thickness:4,cornerRadius:3,bevel:.6},
  leather:{thickness:.9,turnIn:16,colour:'#503125',toolingDepth:.23},
  paper:{height:292,width:212,thickness:.16,leaves:240,gatherings:24,leavesPerGathering:10,interleafAllowance:.008},
  binding:{type:'proposed supported tight back',cords:5,cordDiameter:2.4,threadDiameter:.35,sewingSwell:2.4,endpaperLeaves:4,endpaperThickness:.18,pastedownThickness:.20,neutralSpineLength:55},
  motion:{maximumOpening:130,minimumTurnOpening:110},
  evidence:'proposed',
});
export const SPREADS = [
  {id:'botanical',label:'01 · The winter garden',leaf:24,heading:'Botanical observation'},
  {id:'mineral',label:'02 · Stones that remember',leaf:60,heading:'Mineral study'},
  {id:'lunar',label:'03 · The patient moon',leaf:104,heading:'Lunar calculation'},
  {id:'experiment',label:'04 · A measured distillation',leaf:144,heading:'Experimental procedure'},
  {id:'corrections',label:'05 · Errors & amendments',leaf:188,heading:'Corrected working notes'},
  {id:'ownership',label:'06 · A book passed onward',leaf:232,heading:'Ownership & history'},
];
export const REFERENCES = [
  {id:'anatomy',title:'Science History Institute · Book anatomy',url:'https://www.sciencehistory.org/collections/blog/how-to-judge-a-book-by-its-cover/',use:'Anatomy, gatherings, supported sewing, board attachment; no dimensions inferred.'},
  {id:'clasps',title:'Princeton · Clasps, furniture, and closures',url:'https://static-prod.lib.princeton.edu/visual_materials/hb/cases/closures/index.html',use:'Strap, anchor, hook and catch relationship; proposed contemporary reconstruction.'},
  {id:'models',title:'Library of Congress · Structural book models',url:'https://blogs.loc.gov/loc/2021/05/library-preservation-making-models-of-ancient-books/',use:'Structural modelling method and distinction between regional binding traditions.'},
  {id:'pages',title:'ETH Zurich · Book simulation',url:'https://igl.ethz.ch/projects/book-simulation/',use:'Selective page interaction reference. Runtime here uses controlled geometry, not their solver.'},
  {id:'wear',title:'Science History Institute · Alchemical miscellany',url:'https://digital.sciencehistory.org/works/3arao9u',use:'Use-related soiling and annotations. Its parchment is not represented as rag-paper evidence.'},
];
export function validateSpec(value) {
  if(!value || value.version!==1 || value.units!=='mm') throw Error('Expected version 1, millimetre specification.');
  const base=JSON.parse(JSON.stringify(DEFAULT_SPEC));
  for(const group of ['board','leather','paper','binding','motion']) {
    if(!value[group] || typeof value[group]!=='object') throw Error('Missing '+group+' specification.');
    for(const [key,expected] of Object.entries(base[group])) {
      const actual=value[group][key];
      if(group==='binding'&&key==='neutralSpineLength'&&actual===undefined)continue;
      if(typeof expected==='number' && (!Number.isFinite(actual) || actual!==expected)) throw Error(group+'.'+key+' is fixed for this construction study.');
    }
  }
  if(typeof value.leather.colour!=='string' || !/^#[\da-f]{6}$/i.test(value.leather.colour)) throw Error('Invalid leather colour.');
  base.leather.colour=value.leather.colour;
  return base;
}
export function thicknessBudget(spec=DEFAULT_SPEC) {
  const writing=spec.paper.leaves*spec.paper.thickness;
  const allowance=(spec.paper.leaves-1)*spec.paper.interleafAllowance;
  const endpapers=spec.binding.endpaperLeaves*spec.binding.endpaperThickness;
  const boards=spec.board.thickness*2, outerLeather=spec.leather.thickness*2;
  const pastedowns=spec.binding.pastedownThickness*2,endpaperClearance=.048;
  return {writing,allowance,endpapers,endpaperClearance,boards,outerLeather,pastedowns,body:writing+allowance+endpapers+endpaperClearance+boards+outerLeather+pastedowns,
    spineMaximum:writing+allowance+endpapers+endpaperClearance+boards+outerLeather+pastedowns+spec.binding.sewingSwell,
    note:'Turn-ins occupy perimeter recesses; hardware and curved spine projections are measured separately.'};
}
