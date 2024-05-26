import React, { useState } from 'react';
import { Timeline as AntTimeline, Image, Grid ,Modal} from 'antd';
import videoplayimg from '../assets/videoplayimg.png';

const { useBreakpoint } = Grid;

const Timeline = ({ data}) => {
    const screens = useBreakpoint();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    // Function to handle opening the modal when an image or video is clicked
    const handleMediaClick = (media) => {
        setSelectedMedia(media);
        setModalVisible(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setSelectedMedia(null);
        setModalVisible(false);
    };



    return (
        <div style={{ overflowX: 'auto'}}>
            <AntTimeline mode="left">
                {data.map((event, index) => (
                    <AntTimeline.Item key={index}>
                        <div style={{ marginBottom: '20px', marginTop:'20px' }}>
                            <h3>{event.title}</h3>
                            <p>{event.date}</p>
                            <p>{event.description}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {event.media.map((media, mediaIndex) => (
                                    <>
                                    <div key={mediaIndex} style={{ cursor: 'pointer', marginRight: '10px', marginBottom: '10px' }}>
                                        {media.type === 'image' && (
                                            <Image src={media.src} alt={media.alt} width={screens.xs ? 100 : 180} height={screens.xs ? 100:180}/>
                                        )}
                                        {media.type === 'video' && (
                                            <img src={videoplayimg} alt={media.alt} width={screens.xs ? 100 : 180} height={screens.xs ? 100:180} onClick={()=> handleMediaClick(media)} />
                                        )}
                                    </div>
                                    <Modal
                                        visible={modalVisible}
                                        onCancel={handleCloseModal}
                                        footer={null}
                                        closable={false}
                                        centered
                                        width={800} // Adjust modal width as needed
                                        destroyOnClose
                                    >
                                        {/* Render image or video based on selectedMedia */}
                                        {selectedMedia && selectedMedia.type === 'image' && (
                                            <img src={selectedMedia.src} alt={selectedMedia.alt} style={{ width: '100%', height: '70vh' }} />
                                        )}
                                        {selectedMedia && selectedMedia.type === 'video' && (
                                            <video controls style={{ width: '100%' }}>
                                                <source src={selectedMedia.src} type="video/mp4" />
                                            </video>
                                        )}
                                    </Modal>
                                    </>
                                    
                                ))}

                            </div>
                        </div>
                    </AntTimeline.Item>
                ))}
            </AntTimeline>
        </div>
    );
};

export default Timeline;
