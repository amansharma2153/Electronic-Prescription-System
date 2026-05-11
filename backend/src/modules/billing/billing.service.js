export const calculateBill = (medicines) => {
  let total = 0;

  medicines.forEach((med) => {
    total += med.price * med.quantity;
  });

  return total;
};