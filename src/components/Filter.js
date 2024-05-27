import React, { useState } from 'react';
import { Input, Modal, Space, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';


const FilterComponent = ({ onSearch, name, price, date }) => {
    // State variables for item name, date range, and price range
    const [itemName, setItemName] = useState('');
    const [startDate, setStartDate] = useState(dayjs('2000-01-01'));
    const [endDate, setEndDate] = useState(dayjs(Date.now()));
    const [dateRange, setDateRange] = useState([startDate, endDate]);
    const [minPrice, setMinPrice] = useState(0.00);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingPrice, setEditingPrice] = useState('min'); // Track which price is being edited

    // Event handler for item name change
    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
        onSearch && onSearch({ itemName: e.target.value, dateRange, minPrice, maxPrice });
    };

    // Event handler for date range change
    
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setDateRange([date, endDate]);
        onSearch && onSearch({ itemName, dateRange: [date, endDate], minPrice, maxPrice });
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
        setDateRange([startDate, date]);
        onSearch && onSearch({ itemName, dateRange: [startDate, date], minPrice, maxPrice });
    }

    // Function to format price
    const formatPrice = (price) => {
        try{
            if (price >= 1e12) {
                return `${(price / 1e12).toFixed(2)}t`;
            } else if (price >= 1e9) {
                return `${(price / 1e9).toFixed(2)}b`;
            } else if (price >= 1e6) {
                return `${(price / 1e6).toFixed(2)}m`;
            } else if (price >= 1e3) {
                return `${(price / 1e3).toFixed(2)}k`;
            } else {
                return `${price}`;
            }
        } catch (error) {
            return '0.00';
        }
    };

    // Event handler for minimum price change
    const handleMinPriceChange = (e) => {
        try{
            setMinPrice(e.target.value);
        }catch(error){
            setMinPrice(minPrice);
        }
        onSearch && onSearch({ itemName, dateRange, minPrice: e.target.value, maxPrice });
    };

    // Event handler for maximum price change
    const handleMaxPriceChange = (e) => {
        try{
            setMaxPrice(e.target.value);
        }catch(error){
            setMaxPrice(minPrice);
        }
        onSearch && onSearch({ itemName, dateRange, minPrice, maxPrice: e.target.value });
    };

    // Event handler for opening the price editing modal
    const handleEditPrice = (priceType) => {
        setEditingPrice(priceType);
        setModalVisible(true);
    };

    // Event handler for closing the price editing modal
    const handleModalOk = () => {
        setModalVisible(false);
    };

    // Event handler for canceling the price editing modal
    const handleModalCancel = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {name?<Input
                    addonBefore={<SearchOutlined />}
                    placeholder="Find item"
                    style={{ borderRadius: '1px', marginRight: '1px' }}
                    onChange={handleItemNameChange}
                    value={itemName}
                />:<></>}

                {date?<>
                    <DatePicker placeholder='Start Date' defaultValue={startDate} onChange={handleStartDateChange} />
                    <DatePicker placeholder='End Date' defaultValue={endDate} onChange={handleEndDateChange} />
                    </>:<></>}
            </div>
            {price?
                <Space direction="vertical" style={{ marginTop: '0px' }}>
                    <Space>
                        <Input
                            prefix="$"
                            placeholder="Min Price"
                            value={minPrice !== null ? formatPrice(minPrice) : ''}
                            onChange={handleMinPriceChange}
                            style={{ width: '100px' }}
                            onClick={() => handleEditPrice('min')}
                            
                        />
                        <Input
                            prefix="$"
                            placeholder="Max Price"
                            value={maxPrice !== null ? formatPrice(maxPrice) : ''}
                            onChange={handleMaxPriceChange}
                            style={{ width: '100px' }}
                            onClick={() => handleEditPrice('max')}
                        />
                    </Space>
                    <Modal
                        title={`Edit ${editingPrice === 'min' ? 'Min' : 'Max'} Price`}
                        visible={modalVisible}
                        onOk={handleModalOk}
                        onCancel={handleModalCancel}
                    >
                        <Input
                            prefix="$"
                            placeholder={`Enter ${editingPrice === 'min' ? 'Min' : 'Max'} Price`}
                            value={editingPrice === 'min' ? minPrice : maxPrice}
                            onChange={editingPrice === 'min' ? handleMinPriceChange : handleMaxPriceChange}
                        />
                    </Modal>
                </Space>:
                <></>}
        </div>
    );
};

export default FilterComponent;
