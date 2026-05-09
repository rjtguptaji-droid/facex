// MOCK DATA — we'll replace this with real API later
const mockResults = [
  {
    emotion: 'Happy',
    age: '22-26',
    gender: 'Male',
    smile: 'Yes',
    confidence: '97%',
  },
  {
    emotion: 'Neutral',
    age: '28-32',
    gender: 'Female',
    smile: 'No',
    confidence: '91%',
  },
];

export const detectFaces = async (imageFile) => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Later you'll replace the above with real API call like:
  // const formData = new FormData();
  // formData.append('image_file', imageFile);
  // formData.append('api_key', 'YOUR_KEY');
  // formData.append('api_secret', 'YOUR_SECRET');
  // formData.append('return_attributes', 'gender,age,smiling,emotion');
  // const res = await axios.post('https://api-us.faceplusplus.com/facepp/v3/detect', formData);
  // return res.data.faces.map(f => ({ ... }));

  return mockResults;
};