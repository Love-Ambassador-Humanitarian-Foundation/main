import React from 'react';
import { Timeline as AntTimeline, Image, Grid } from 'antd';

const { useBreakpoint } = Grid;

const Timeline = ({ data, onMediaClick }) => {
    const screens = useBreakpoint();
    //const handleClick = (media) => {
    //    onMediaClick(media);
    //};

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
                                    <div key={mediaIndex} style={{ cursor: 'pointer', marginRight: '10px', marginBottom: '10px' }}>
                                        {media.type === 'image' && (
                                            <Image src={media.src} alt={media.alt} width={screens.xs ? 100 : 180} height={screens.xs ? 100:180} />
                                        )}
                                        {media.type === 'video' && (
                                            <div>
                                                <video controls poster="path_to_thumbnail_image" width={screens.xs ? 100 : 180} height={screens.xs ? 100:180}>
                                                    <source src={media.src} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        )}
                                    </div>
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
