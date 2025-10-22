export default {
  tshirt: {
    back: 0.2,
    front: -0.19,
    leftHand: 0.05,
    rigthHand: 0.05,
    leftHandFullPos: [0.35, 0.05, 0.3],
    rigthHandFullPos: [-0.35, 0.05, 0.3],
    nameFa: "تیشرت",
    nameFile: "OptimizedBlender.glb",
    th: "/thModel/t.png",

    //? data spwan
    scale: 0.1,
    spawnY: 0,
    spawnX: 0,

    //? data of mesh
    meshs: [
      { name: "جلو لباس", value: "front" },
      { name: "پشت لباس", value: "back" },
      { name: "استین چپ", value: "leftHand" },
      { name: "استین راست", value: "rigthHand" },
    ],
  },
  hoodie: {
    back: -5,
    front: 4,
    nameFa: "هودی",
    nameFile: "Hoodie_Revision2.glb",
    th: "/thModel/h.png",

    //? data spwan
    scale: 4,
    spawnY: 0,
    spawnX: 0,

    //? data of mesh
    meshs: [
      { name: "جلو لباس", value: "front" },
      { name: "پشت لباس", value: "back" },
      { name: "استین چپ", value: "leftHand" },
      { name: "استین راست", value: "rigthHand" },
      { name: "کلاه", value: "head" },
      { name: "جیب", value: "bag" },
    ],
  },
  mug: {
    back: -0.53,
    front: 0.58,
    nameFa: "ماگ",
    nameFile: "Mug_Revision2.glb",
    th: "/thModel/m.png",

    //? data spwan
    scale: 0.5,
    spawnY: -0.931999999999989,
    spawnX: -0.11000000000000007,

    //? data of mesh
    meshs: [
      { name: "جلو ماگ", value: "front" },
      { name: "پشت ماگ", value: "back" },
    ],
  },

  oversizeTshirt: {
    back: 0.2,
    front: -0.19,
    leftHand: 0.05,
    rigthHand: 0.05,
    leftHandFullPos: [0.35, 0.05, 0.3],
    rigthHandFullPos: [-0.35, 0.05, 0.3],
    nameFa: "تیشرت بگ",
    nameFile: "OverSize_Revision.glb",
    th: "/thModel/o.png",

    //? data spwan
    scale: 0.1,
    spawnY: 0,
    spawnX: 0,

    //? data of mesh
    meshs: [
      { name: "جلو لباس", value: "front" },
      { name: "پشت لباس", value: "back" },
      { name: "استین چپ", value: "leftHand" },
      { name: "استین راست", value: "rigthHand" },
    ],
  },
};
