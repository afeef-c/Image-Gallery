import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, deleteImage, updateImageTitle } from '../imageSlice'; // Import update action
import { FaTrashAlt, FaTimes, FaEdit, FaCheck, FaBan } from 'react-icons/fa';

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.images);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteImage(id));
    setSelectedImage(null); // Close modal after deletion
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTitle(selectedImage.title); // Set initial title in edit field
  };

  const handleSaveClick = () => {
    dispatch(updateImageTitle({ id: selectedImage.id, title: newTitle })).then((action) => {
      if (action.type === 'images/updateImageTitle/fulfilled') {
        // If the update is successful, update the local state immediately
        const updatedImage = { ...selectedImage, title: newTitle };
        const updatedImages = images.map(image => 
          image.id === selectedImage.id ? updatedImage : image
        );
        setSelectedImage(updatedImage);
        dispatch({ type: 'images/updateImages', payload: updatedImages }); // Update the global state if needed
      }
      setIsEditing(false);
    });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTitle(''); // Clear the title field
  };

  return (
    <div className="p-4">
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer"
            onClick={() => {
              setSelectedImage(image);
              setIsEditing(false); // Reset edit state when a new image is selected
            }}
          >
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-40 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
            />
            <p className="text-center text-sm font-medium mt-2 text-gray-800">{image.title}</p>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-black text-2xl"
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* Full-Size Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-w-lg h-auto rounded-lg mb-4"
            />

            {/* Title Display / Edit */}
            <div className="flex items-center mb-4">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                  <button onClick={handleSaveClick} className="ml-2 text-green-600">
                    <FaCheck />
                  </button>
                  <button onClick={handleCancelClick} className="ml-2 text-red-600">
                    <FaBan />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-gray-900">{selectedImage.title}</p>
                  <button onClick={handleEditClick} className="ml-2 text-blue-600">
                    <FaEdit />
                  </button>
                </>
              )}
            </div>

            {/* Delete Button */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => handleDelete(selectedImage.id)}
                className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
                aria-label="Delete"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
