import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages, updateImageOrder } from "../imageSlice";

const ItemType = {
  IMAGE: "image",
};

const ImageItem = ({ image, index, moveImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [, dragRef] = useDrag({
    type: ItemType.IMAGE,
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: ItemType.IMAGE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Gallery Image with Drag and Drop */}
      <div ref={(node) => dragRef(dropRef(node))} className="relative">
        <div
          className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
          onClick={openModal}
        >
          <img
            src={image.image}
            alt={image.title}
            className="w-full h-32 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <p className="text-center mt-1 text-sm font-semibold">{image.title}</p>
        </div>
      </div>

      {/* Modal for Full-Size Image */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

// Main Component for Image Reorder
const ImageReorder = () => {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.images);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setImageList(images);
    }
  }, [images, status]);

  const moveImage = (fromIndex, toIndex) => {
    const updatedList = [...imageList];
    const [movedImage] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedImage);
    setImageList(updatedList);
  };

  const saveReorderedImages = () => {
    dispatch(updateImageOrder(imageList));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {imageList.map((image, index) => (
          <ImageItem
            key={image.id}
            image={image}
            index={index}
            moveImage={moveImage}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={saveReorderedImages}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Save Order
        </button>
      </div>
    </DndProvider>
  );
};

export default ImageReorder;
