import prisma from "../lib/prisma.js";

const generateEating = async (userId) => {
  const eatingData = [];
  for (let day = 1; day <= 30; day++) {
    eatingData.push({
      day,
      items: "",
      price: 0,
      gizi: "",
      eating_exp: 0,
      eating_status: "Unfinished",
      userId,
    });
  }

  await prisma.eating.createMany({ data: eatingData });
};

const generateAllocation = async (userId) => {
  const allocationData = [];
  for (let allocation_day = 1; allocation_day <= 30; allocation_day++) {
    allocationData.push({
      allocation_day,
      items: "",
      price: 0,
      allocation_exp: 0,
      allocation_status: "Unfinished",
      userId,
    });
  }

  await prisma.allocation.createMany({ data: allocationData });
};

export default { generateEating, generateAllocation };