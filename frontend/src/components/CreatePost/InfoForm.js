import React from 'react';
import { Button, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import "./infoForm.css";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles'
import axios from '../../containers/api';
import { textAlign } from '@mui/system';

const { RangePicker } = DatePicker;
const { Option } = Select;

const layout = {
    labelCol: { span: 3, offset: 5 },
    wrapperCol: { span: 10, offset: 1 },
};

const validateMessages = {
    required: '請填寫您的${label}。',
    types: {
        email: '${label} 不符合電子信箱格式',
    },
};

// const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//         <Select style={{ width: 70 }}>
//             <Option value="86">+86</Option>
//             <Option value="87">+87</Option>
//         </Select>
//     </Form.Item>
// );

const InfoForm = () => {

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };

    const submitForm = async(values) => {
        console.log("submit form")
        const { data: { message } }  = 
            await axios.post("/postForm", values)

        if (message === 'success') {
            navigateToHome();
            console.log(" submitted successfully ") }
        else {
            console.log(" submission failed ")
        }
    }

    const onFinish = (fieldsValue) => {
        // Should format date value before submit.
        const rangeValue = fieldsValue['time'];
        const values = {
          ...fieldsValue,
          'age': {upper: fieldsValue['upper'], lower: fieldsValue['lower']},
          'time': `${rangeValue[0].format('YYYY年MM月DD日')} 至 ${rangeValue[1].format('YYYY年MM月DD日')} 止`,
          'timeRange': { from: rangeValue[0].format('YYYY/MM/DD') , to: rangeValue[1].format('YYYY/MM/DD') },
        };
        if (!fieldsValue['upper'] && !fieldsValue['lower']) delete values.age;
        submitForm(values);
        console.log('Received values of form: ', values);
    }
    

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';


    return (

        <Form {...layout} id='infoForm' name="infoForm" onFinish={onFinish} validateMessages={validateMessages}>
            <div className='infoBox'>
                <div className='infoName'><h3>基本資料</h3></div>
                <Form.Item name='experimenter' label="研究單位" rules={[{ required: true }]} 
                            wrapperCol={{ span: 6, offset: 1 }}>
                    <Input placeholder="請填寫單位或聯絡人名稱" />
                </Form.Item>
                <Form.Item name='email' label="Email" rules={[{ type: 'email', required: true }]} wrapperCol={{ span: 7, offset: 1 }}>
                    <Input />
                </Form.Item>
                <Form.Item name='phone' label="聯絡電話" wrapperCol={{ span: 7, offset: 1 }}>
                    <Input />
                </Form.Item>
                <Form.Item label="研究地點" rules={[{ required: true }]}>
                    <Input.Group compact>
                        <Form.Item
                            name='locationTags'
                            noStyle
                            rules={[{ required: true, message: "請選擇研究地點" }]}
                        >
                            <Select placeholder="選擇區域">
                                <Option value="校總區">校總區</Option>
                                <Option value="城中校區">城中校區</Option>
                                <Option value="線上">線上</Option>
                                <Option value="其他">其他</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='location'
                            noStyle
                            rules={[{ required: true, message: "請填完整地址" }]}
                        >
                            <Input style={{ width: '50%' }} placeholder="完整地址" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
            </div>
            <div className='infoBox'>
                <div className='infoName'><h3>受試者條件</h3></div>
                <Form.Item name='age' label="受試者年齡" tooltip='無限制最低年齡請填0，無限制最高年齡請填99'>
                    <div>
                        <Form.Item name='lower' style={{ display: 'inline-block' }}
                            rules={[{ type: 'number', min: 0, max: 99, message: "請填寫介於0-99的數字" }]}
                        >
                            <InputNumber placeholder="最低年齡" />
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '10%', textAlign: "center" }}>—</span>
                        <Form.Item name='upper' style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            rules={[{ type: 'number', min: 0, max: 99, message: "請填寫介於0-99的數字" }]}
                        >
                            <InputNumber placeholder="最高年齡" />
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item name='requirements' label="其他條件" >
                    <Input.TextArea />
                </Form.Item>
            </div>
            <div className='infoBox'>
                <div className='infoName'><h3>研究內容</h3></div>
                <Form.Item name='title' label="標題"  rules={[{ required: true }]} wrapperCol={{ span: 7, offset: 1 }}>
                    <Input />
                </Form.Item>
                <Form.Item name='time' label="研究時間" rules={[{ required: true }]} >
                    <RangePicker placeholder={["開始時間", "結束時間"]} style={{ width: "300px" }} />
                </Form.Item>
                <Form.Item label="研究時長" rules={[{ required: true }]}>
                    <Form.Item name="length" rules={[{ required: true, message: "請填寫您的研究時長" }]}
                                style={{ display: 'inline-block' }}>
                        <InputNumber />
                    </Form.Item>
                    <span style={{ marginLeft: 8 }}>
                        分鐘
                    </span>
                </Form.Item>

                {/* <Form.Item label="研究時間" name="length" rules={[{ required: true, message: "請填寫您的研究時長" }]}
                            style={{ display: 'inline-block' }} >
                        <InputNumber placeholder='以分鐘為單位'/>
                </Form.Item> */}

                <Form.Item name='typeTags' label="研究類型" rules={[{ required: true }]} wrapperCol={{ span: 7, offset: 1 }}>
                    <Select
                        mode="tags"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="請選擇或新增研究類型"
                        options={[{ label: "實驗", value: "實驗" },
                                    { label: "問卷", value: "問卷" },
                                    { label: "訪談", value: "訪談" }]}
                    />
                </Form.Item>
                <Form.Item name="rewardTags" label="研究報酬" rules={[{ required: true }]} wrapperCol={{ span: 7, offset: 1 }}>
                    <Select
                        mode="tags"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="請選擇或新增報酬形式"
                        options={[{ label: "普心加分", value: "普心加分" },
                                    { label: "食物", value: "食物" },
                                    { label: "現金", value: "現金" }]}
                    />
                </Form.Item>
                <Form.Item name="otherTags" label="自訂標籤" wrapperCol={{ span: 7, offset: 1 }}>
                    <Select
                        mode="tags"
                        style={{ width: '100%', }}
                        notFoundContent="輸入後請按Enter鍵以新增標籤"
                        allowClear={true}
                    />
                </Form.Item>
                <Form.Item name='introduction' label="研究簡介" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name='link' label="相關網址" tooltip='可放入問卷、官網連結等'>
                    <Input />
                </Form.Item>
            </div>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}


export default InfoForm;