// import axios from 'axios';

// export const checkInteraction = (medicines) =>
//   axios.post('http://localhost:8000/check-interaction', { medicines });


import axios from 'axios';

export const checkInteraction = async (medicines) => {
  try {
    // 🔥 convert [{name:"Aspirin"}] → ["aspirin"]
    const medicineNames = medicines.map(m =>
      typeof m === 'string' ? m.toLowerCase() : m.name.toLowerCase()
    );

    const res = await axios.post(
      'http://localhost:8000/api/check-interactions', // ✅ FIXED URL
      { medicines: medicineNames }
    );

    return res.data;
  } catch (err) {
    console.error("❌ AI Service Error:", err.message);
    return null;
  }
};