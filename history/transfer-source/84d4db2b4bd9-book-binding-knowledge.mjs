// Governing user brief: Andre Olivier, The Anatomy & Physics of the Book, 24 October 2026.
// Workshop dimensions are starting points. Binding families must not be combined implicitly.
export const BOOK_KNOWLEDGE = {
  version:2, authority:{title:'The Anatomy & Physics of the Book',author:'Andre Olivier',date:'2026-10-24',kind:'user-supplied governing design brief'},
  assemblies:{textBlock:['folded bifolia','gatherings','through-fold sewing','kettle stitches','supports','spine adhesive','mull','kraft lining','endbands','free endpapers'],case:['boards','covering','turn-ins','spine stiffener','exterior joints','pastedowns'],interface:['mull flanges','endpaper hinges']},
  structures:{
    'hollow-back-case':{separateCase:true,coverBondedToBlock:false,hollow:true,loadPath:'gatherings → sewing/lining → mull flanges and endpaper hinges → boards',opening:'text-block spine throws up; case spine bows separately',supports:'tapes; no board lacing in this configuration'},
    'tight-back':{separateCase:false,coverBondedToBlock:true,hollow:false,loadPath:'sewing and linings into board attachment',opening:'lined text-block spine and covering flex together'},
    'laced-board-flexible':{separateCase:false,coverBondedToBlock:true,hollow:false,loadPath:'raised sewing cords → actual board holes/channels → boards',opening:'flexible tight back; board lacing is an additional structural attachment'},
    limp:{boards:false,opening:'flexible cover and laced supports'},
    perfect:{foldsRetained:false,attachment:'adhesive-only leaves; adhesive and grain govern opening'},
    coptic:{coveringSpine:false,opening:'exposed chain sewing; can approach 180°'}
  },
  rules:[
    'Size from the sewn, rounded and backed text block outward; do not force the block into a preselected cover envelope.',
    'A leaf has two pages. A gathering may contain several nested folded sheets; do not equate every gathering with one loose sheet.',
    'Keep paper, endpaper, board and applicable lining grain parallel to the spine; leather has directional response rather than a machine-paper grain.',
    'Sewing swell belongs at the fold, not as a uniform air gap across every leaf.',
    'Rounding creates a convex spine and concave fore-edge; backing creates shoulders matched to board thickness.',
    'Boards rotate at their joint lines, outside the shoulder. A case spine is not an extra cover board or a long hanging loop.',
    'Endbands follow the text-block spine. A stuck-on endband is decorative; a structural endband requires gathering tie-downs.',
    'In case binding, mull flanges and endpaper hinges transfer the block load. Laced boards have an additional support-to-board load path.',
    'Tight-back covering and spine flex together; hollow-back case and text-block spines are distinct surfaces separated by a tube/space.',
    'A normal-offset closed leaf is required for inspection. Edge textures may replace subpixel rendering only when individual physical leaf identities remain.',
    'Material response, moisture and gravity are not proved by an authored pose or a closed-mesh report.'
  ],
  formulas:{caliper:'leafCount × leafCaliper',ppi:'pageCount / pagesPerInch × 25.4 mm',sewingSwell:'gatheringCount × threadDiameter × proposed compression factor',boardHeight:'blockHeight + 2 × square',boardWidth:'blockWidth − shoulderAllowance + foreEdgeSquare',jointGap:'5 mm + boardThickness + 1 mm (workshop starting rule)',shoulder:'boardThickness',plateBending:'D = E t³ / (12 (1 − ν²)); anisotropic paper needs directional E'},
  workshop:{boardMm:[2,3],squareMm:3,jointBaseMm:6,mullFlangeMm:[25,40],turnInMm:15,roundArcDeg:120,humidityRH:[40,50],crossGrainExpansionRatio:[1.5,4],status:'approximate workshop values; not standards or constitutive calibration'},
  failureModes:[
    ['inward board warp','unbalanced pastedown/cover drying','balance layers, grain and restrained drying'],
    ['gutter rippling','cross grain or moisture mismatch','spine-parallel grain and conditioning'],
    ['springing shut','overlining, heavy paper or cross grain','correct drape and flexible lining'],
    ['sprung block','excess swell or collapsing sections','control thread/swell; round and back'],
    ['starting hinge','heavy block or weak/narrow flanges','adequate flange load path and endpaper hinge'],
    ['cracked outer joint','local flex fatigue or brittle leather','spread bending and pare joints deliberately'],
    ['torn headcap','pulling from head','handle at mid spine; heavy books stored flat'],
    ['loose paperback leaves','adhesive failure','suitable adhesive or through-fold sewing'],
    ['skewed block','leaning storage','support upright or store flat'],
    ['cracked spine tooling','tight-back decoration flexing','choose structure and decoration together']
  ],
  supersedes:['independent board rotations about the spine centre','fixed 55 mm leather return as universal spine law','mixed case and laced-board load paths','uniform sewing swell at the fore-edge','one endband following the case spine','topology/FPS used as a craftsmanship score'],
  evidence:[
    {url:'https://cool.culturalheritage.org/don/dt/dt1763.html',use:'hollow-back separation and case construction'},
    {url:'https://cool.culturalheritage.org/don/dt/dt2916.html',use:'rounding, concave fore-edge, preparation for backing'},
    {url:'https://cool.culturalheritage.org/don/dt/dt0198.html',use:'backing shoulders'},
    {url:'https://conservation-wiki.com/wiki/Endbands',use:'endband terminology and tie-down distinction'}
  ]
};
