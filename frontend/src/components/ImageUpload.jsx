import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImages } from '../imageSlice';
import api from '../api';
import { toast } from 'react-toastify';

const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const [titles, setTitles] = useState({});
  const [orders, setOrders] = useState({});
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);

    const newTitles = uploadedFiles.reduce((acc, file, index) => {
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      acc[index] = fileNameWithoutExtension;
      return acc;
    }, {});
    setTitles(newTitles);
  };

  const handleTitleChange = (index, e) => {
    setTitles((prevTitles) => ({ ...prevTitles, [index]: e.target.value }));
  };

  const handleOrderChange = (index, e) => {
    setOrders((prevOrders) => ({ ...prevOrders, [index]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append('images', file);
      formData.append(`titles`, titles[index] || '');
      formData.append(`orders`, orders[index] || index);
    });

    try {
      const response = await api.post('api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Error uploading images');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-5 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Upload Images</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />

          {Array.from(files).map((file, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg mt-2">
              <p className="font-medium text-gray-700">{file.name}</p>
              
              <input
                type="text"
                placeholder="Title"
                value={titles[index] || ''}
                onChange={(e) => handleTitleChange(index, e)}
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />

              <input
                type="number"
                placeholder="Order"
                value={orders[index] || index}
                onChange={(e) => handleOrderChange(index, e)}
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}

          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Upload Images
          </button>
          
          {status && (
            <p className={`text-center mt-4 ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
