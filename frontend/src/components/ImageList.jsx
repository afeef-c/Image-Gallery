import React, { useState, useEffect } from 'react';
import api from '../api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ImageList() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await api.get('api/images/');
            setImages(response.data);
        } catch (error) {
            console.error("Failed to fetch images:", error);
            setError("Failed to load images. Please try again later.");
        }
    };

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedImages = Array.from(images);
        const [movedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, movedImage);

        setImages(reorderedImages);

        // Sending the new order to the backend
        try {
            await api.post('api/images/reorder/', {
                order: reorderedImages.map((img, idx) => ({ id: img.id, order: idx }))
            });
        } catch (error) {
            console.error("Failed to update order:", error);
            setError("Failed to update image order. Please try again later.");
        }
    };

    if (error) {
        return <div className="error">{error}</div>; // Render error message if there's an error
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="images">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={String(image.id)} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="image-item" // Add a class for styling
                                    >
                                        <h3>{image.title}</h3>
                                        <img src={image.image} alt={image.title} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default ImageList;
