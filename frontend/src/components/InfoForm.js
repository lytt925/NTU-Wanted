import React from 'react';
import { Button, Form, Input, InputNumber, DatePicker } from 'antd';
import "./infoForm.css";
import { useNavigate } from 'react-router-dom';

const layout = {
    labelCol: { span: 3, offset: 4 },
    wrapperCol: { span: 14, offset: 1 },
};

const validateMessages = {
    required: '請填寫您的${label}。',
    types: {
        email: '${label} 不符合電子信箱格式',
    },
};

const InfoForm = () => {

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
        console.log("submit")

    };

    return (

    <Form {...layout} name="infoForm" onFinish={navigateToHome} validateMessages={validateMessages}>
        <h3>基本資料：</h3>
        <Form.Item name={['user', 'name']} label="單位名稱" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
            <Input />
        </Form.Item>
        <div className='InfoBox'>
            <h3>受試者條件：</h3>
            <Form.Item name={['user', 'age']} label="受試者年齡" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="其他條件" >
                <Input.TextArea />
            </Form.Item>
        </div>
        <div className='InfoBox'>
            <h3>研究內容：</h3>
            <Form.Item name={['user', 'date']} label="研究時間">
                <DatePicker placeholder='請填寫實驗日期 / 問卷截止日期' style={{ width: "300px" }} />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="研究簡介" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['user', 'website']} label="相關網址">
                <Input placeholder='可放入問卷連結、貴單位官網等資訊' />
            </Form.Item>
        </div>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
)}


export default InfoForm;